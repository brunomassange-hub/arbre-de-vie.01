import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";

const BRANCHES = [
  { name: "Social", icon: "👥", color: "#38bdf8", side: "left", level: 0 },
  { name: "Physique", icon: "💪", color: "#4ade80", side: "right", level: 0 },
  { name: "Intellectuel", icon: "🧠", color: "#818cf8", side: "left", level: 1 },
  { name: "Émotionnel", icon: "❤️", color: "#f87171", side: "right", level: 1 },
  { name: "Artistique", icon: "🎨", color: "#fbbf24", side: "left", level: 2 },
  { name: "Spirituel", icon: "✨", color: "#c084fc", side: "right", level: 2 },
];

export default function ForcesTree() {
  const [sel, setSel] = useState(null);
  const [beliefs, setBeliefs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [bForm, setBForm] = useState({ belief: "", note: "" });
  const [aForm, setAForm] = useState({ name: "", description: "" });

  const reload = () => {
    base44.entities.PositiveBelief.list().then(setBeliefs);
    base44.entities.Activity.list().then(setActivities);
  };

  useEffect(() => { reload(); }, []);

  const addBelief = async () => {
    if (!bForm.belief.trim() || !sel) return;
    await base44.entities.PositiveBelief.create({ ...bForm, branch: sel });
    setBForm({ belief: "", note: "" });
    reload();
  };

  const addActivity = async () => {
    if (!aForm.name.trim() || !sel) return;
    await base44.entities.Activity.create({ ...aForm, branch: sel });
    setAForm({ name: "", description: "" });
    reload();
  };

  const delBelief = async (id) => {
    await base44.entities.PositiveBelief.delete(id);
    reload();
  };

  const delActivity = async (id) => {
    await base44.entities.Activity.delete(id);
    reload();
  };

  const cx = 200, trunkTop = 290, trunkBot = 400;

  const branchEnd = (side, level) => {
    const y = trunkTop - 10 - level * 55;
    const spread = 135 - level * 18;
    return { x: side === "left" ? cx - spread : cx + spread, y };
  };

  const selected = BRANCHES.find(b => b.name === sel);
  const selBeliefs = beliefs.filter(b => b.branch === sel);
  const selActivities = activities.filter(a => a.branch === sel);

  return (
    <div>
      {/* ── SVG Tree ── */}
      <div className="rounded-2xl overflow-hidden bg-[#0a1a0a] border border-white/10 mb-4">
        <svg viewBox="0 0 400 430" className="w-full" style={{ maxHeight: 450 }}>
          {/* Ground */}
          <ellipse cx={cx} cy={trunkBot + 6} rx={95} ry={10} fill="#1a0f05" opacity={0.6} />

          {/* Foliage canopy */}
          {[
            [cx, trunkTop - 40, 50],
            [cx - 45, trunkTop - 20, 38],
            [cx + 45, trunkTop - 20, 38],
            [cx - 25, trunkTop - 50, 32],
            [cx + 25, trunkTop - 50, 32],
          ].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx={r * 1.1} ry={r * 0.85}
              fill="#1a3a1a" opacity={0.7 - i * 0.05} pointerEvents="none" />
          ))}

          {/* Trunk */}
          <path d={`M ${cx - 15} ${trunkBot} L ${cx - 12} ${trunkTop} L ${cx + 12} ${trunkTop} L ${cx + 15} ${trunkBot} Z`}
            fill="#3d2008" />

          {/* Branches */}
          {BRANCHES.map(bd => {
            const end = branchEnd(bd.side, bd.level);
            const startX = bd.side === "left" ? cx - 12 : cx + 12;
            const startY = trunkTop - bd.level * 10;
            const midX = bd.side === "left" ? cx - 50 : cx + 50;
            const midY = (startY + end.y) / 2;
            const bBeliefs = beliefs.filter(b => b.branch === bd.name);
            const bActivities = activities.filter(a => a.branch === bd.name);
            const isSelected = sel === bd.name;

            // Quadratic bezier point helper
            const bezier = (t) => {
              const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * end.x;
              const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * end.y;
              return { x: bx, y: by };
            };

            return (
              <g key={bd.name}>
                {/* Visible branch */}
                <path
                  d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  stroke={bd.color} strokeWidth={isSelected ? 8 : 5} fill="none" strokeLinecap="round"
                  opacity={isSelected ? 1 : 0.55}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSel(isSelected ? null : bd.name)}
                />
                {/* Invisible hit area */}
                <path
                  d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  stroke="transparent" strokeWidth={22} fill="none" strokeLinecap="round"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSel(isSelected ? null : bd.name)}
                />

                {/* Belief nodes (✦) along the branch */}
                {bBeliefs.slice(0, 5).map((b, i) => {
                  const t = 0.25 + i * 0.15;
                  const p = bezier(t);
                  return (
                    <g key={b.id} style={{ cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); setSel(bd.name); }}>
                      <circle cx={p.x} cy={p.y} r={7} fill={bd.color} opacity={0.9}
                        stroke="#fff" strokeWidth={isSelected ? 1.5 : 0.5} />
                      <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle"
                        fontSize={7} fill="#0a1a0a" fontWeight="bold">✦</text>
                    </g>
                  );
                })}

                {/* Leaves (🍃) for activities at branch tip */}
                {bActivities.slice(0, 8).map((a, i) => {
                  const angle = (i / 8) * Math.PI * 2 + (bd.side === "left" ? Math.PI : 0);
                  const lr = 16;
                  const lx = end.x + lr * Math.cos(angle);
                  const ly = end.y + lr * Math.sin(angle);
                  const rot = (angle * 180 / Math.PI) % 360;
                  return (
                    <g key={a.id} style={{ cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); setSel(bd.name); }}>
                      <ellipse cx={lx} cy={ly} rx={9} ry={4.5} fill={bd.color} opacity={0.75}
                        transform={`rotate(${rot} ${lx} ${ly})`} />
                      <line x1={lx} y1={ly} x2={lx + 7 * Math.cos(angle)} y2={ly + 7 * Math.sin(angle)}
                        stroke={bd.color} strokeWidth={0.8} opacity={0.4} />
                    </g>
                  );
                })}

                {/* Glow at tip if activities exist */}
                {bActivities.length > 0 && (
                  <circle cx={end.x} cy={end.y} r={14} fill={bd.color} opacity={0.12} pointerEvents="none" />
                )}

                {/* Branch label */}
                <text x={end.x + (bd.side === "left" ? -8 : 8)} y={end.y - 14}
                  textAnchor={bd.side === "left" ? "end" : "start"}
                  fontSize={10} fontWeight="700" fill={bd.color} opacity={0.95}
                  style={{ pointerEvents: "none" }}>
                  {bd.icon} {bd.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mb-4 text-xs">
        <span className="flex items-center gap-1 text-gray-400">
          <span className="inline-block w-3 h-3 rounded-full bg-white opacity-80" /> Croyance
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <span className="inline-block w-4 h-2 rounded-full bg-green-400 opacity-70" /> Feuille = activité
        </span>
      </div>

      {/* ── Management panel for selected branch ── */}
      {selected ? (
        <div className="rounded-2xl border p-4 mb-4"
          style={{ borderColor: selected.color + "50", backgroundColor: selected.color + "0d" }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-lg">{selected.icon} {selected.name}</h3>
            <button onClick={() => setSel(null)} className="text-gray-400 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Beliefs */}
          <div className="mb-5">
            <p className="text-xs font-bold mb-2" style={{ color: selected.color }}>✦ Croyances positives</p>
            <div className="space-y-1.5 mb-2">
              {selBeliefs.map(b => (
                <div key={b.id} className="flex items-start gap-2 bg-black/25 rounded-lg p-2.5">
                  <p className="text-white text-sm flex-1">{b.belief}</p>
                  {b.note && <span className="text-gray-400 text-xs self-center mr-1">{b.note}</span>}
                  <button onClick={() => delBelief(b.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {!selBeliefs.length && <p className="text-gray-500 text-xs">Aucune croyance encore.</p>}
            </div>
            <div className="flex gap-2">
              <Input value={bForm.belief} onChange={e => setBForm({ ...bForm, belief: e.target.value })}
                onKeyDown={e => e.key === "Enter" && addBelief()}
                placeholder="Nouvelle croyance positive..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm flex-1" />
              <Button onClick={addBelief} size="sm" style={{ backgroundColor: selected.color }}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Activities (leaves) */}
          <div>
            <p className="text-xs font-bold mb-2 text-green-400">🍃 Activités qui me font du bien</p>
            <div className="space-y-1.5 mb-2">
              {selActivities.map(a => (
                <div key={a.id} className="flex items-start gap-2 bg-black/25 rounded-lg p-2.5">
                  <div className="flex-1">
                    <p className="text-white text-sm">🍃 {a.name}</p>
                    {a.description && <p className="text-gray-400 text-xs mt-0.5">{a.description}</p>}
                  </div>
                  <button onClick={() => delActivity(a.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {!selActivities.length && <p className="text-gray-500 text-xs">Aucune activité encore.</p>}
            </div>
            <div className="flex gap-2">
              <Input value={aForm.name} onChange={e => setAForm({ ...aForm, name: e.target.value })}
                onKeyDown={e => e.key === "Enter" && addActivity()}
                placeholder="Nouvelle activité..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm flex-1" />
              <Button onClick={addActivity} size="sm" className="bg-green-800 hover:bg-green-700">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center py-2">
          Touchez une branche pour ajouter croyances ✦ et activités 🍃
        </p>
      )}
    </div>
  );
}