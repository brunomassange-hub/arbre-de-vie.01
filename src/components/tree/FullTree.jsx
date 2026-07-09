import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Plus } from "lucide-react";
import TreeAddPanel from "@/components/tree/TreeAddPanel";

const BRANCH_COLORS = {
  Social: "#38bdf8", Physique: "#4ade80", Intellectuel: "#818cf8",
  Émotionnel: "#f87171", Artistique: "#fbbf24", Spirituel: "#c084fc"
};

const EMOTION_COLORS = {
  Peur: "#6366f1", Colère: "#ef4444", Tristesse: "#3b82f6",
  Honte: "#eab308", Dégoût: "#84cc16", Abandon: "#ec4899",
  Trahison: "#f97316", Impuissance: "#a855f7"
};

const BRANCH_DEFS = [
  { name: "Social", side: "left", level: 0 },
  { name: "Physique", side: "right", level: 0 },
  { name: "Intellectuel", side: "left", level: 1 },
  { name: "Émotionnel", side: "right", level: 1 },
  { name: "Artistique", side: "left", level: 2 },
  { name: "Spirituel", side: "right", level: 2 },
];

const BIG5 = [
  { key: "ouverture", label: "O", color: "#8b5cf6" },
  { key: "agreabilite", label: "A", color: "#22c55e" },
  { key: "conscience", label: "C", color: "#3b82f6" },
  { key: "nervosite", label: "N", color: "#ef4444" },
  { key: "extraversion", label: "E", color: "#f59e0b" },
];

function getBranchEnd(side, level) {
  const cx = 200;
  const baseY = 165 - level * 45;
  const spread = 130 - level * 18;
  return { x: side === "left" ? cx - spread : cx + spread, y: baseY };
}

export default function FullTree({ mode }) {
  const isWound = mode === "wounds";
  const accent = isWound ? "#ef4444" : "#22c55e";
  const polarityLock = isWound ? "wound" : "strength";

  const [detail, setDetail] = useState(null);
  const [addZone, setAddZone] = useState(null);

  const [bigFive, setBigFive] = useState(null);
  const [events, setEvents] = useState([]);
  const [woundLinks, setWoundLinks] = useState([]);
  const [limitBeliefs, setLimitBeliefs] = useState([]);
  const [posLinks, setPosLinks] = useState([]);
  const [posBeliefs, setPosBeliefs] = useState([]);
  const [activities, setActivities] = useState([]);

  const loadData = () => {
    const base = [base44.entities.BigFiveProfile.list()];
    if (isWound) {
      Promise.all([...base, base44.entities.TraumaticEvent.list(), base44.entities.Link.list(), base44.entities.LimitingBelief.list()])
        .then(([bf, ev, wl, lb]) => {
          setBigFive(bf[0] || null);
          setEvents([...ev].sort((a, b) => a.age - b.age));
          setWoundLinks(wl);
          setLimitBeliefs(lb);
        });
    } else {
      Promise.all([...base, base44.entities.PositiveLink.list(), base44.entities.PositiveBelief.list(), base44.entities.Activity.list()])
        .then(([bf, pl, pb, act]) => {
          setBigFive(bf[0] || null);
          setPosLinks(pl);
          setPosBeliefs(pb);
          setActivities(act);
        });
    }
  };

  useEffect(() => { loadData(); }, [mode]);

  const cx = 200;
  const trunkTop = 110;
  const trunkBot = 380;
  const trunkEvents = events.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#080f1a] px-2 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">
          {isWound ? "🩸 Arbre des Blessures" : "✨ Arbre des Forces"}
        </h1>
        <p className="text-xs mb-4" style={{ color: accent + "99" }}>
          Touchez une zone de l'arbre pour la remplir
        </p>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a1a0a]">
          <svg viewBox="0 0 400 520" className="w-full" style={{ maxHeight: 540 }}>

            {/* Ground */}
            <ellipse cx={cx} cy={trunkBot + 8} rx="90" ry="9" fill="#1a0f05" opacity={0.6} />

            {/* ── ROOTS ── */}
            {[
              { dx: -110, dy: 75, cp1x: -55, cp1y: 25 },
              { dx: -65, dy: 85, cp1x: -35, cp1y: 38 },
              { dx: -18, dy: 90, cp1x: -8, cp1y: 48 },
              { dx: 18, dy: 90, cp1x: 8, cp1y: 48 },
              { dx: 65, dy: 85, cp1x: 35, cp1y: 38 },
              { dx: 110, dy: 75, cp1x: 55, cp1y: 25 },
            ].map((r, i) => (
              <g key={`root-${i}`}>
                <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
                  stroke="#3d2008" strokeWidth={5 - i * 0.3} fill="none" strokeLinecap="round" />
                <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
                  stroke="transparent" strokeWidth="20" fill="none" strokeLinecap="round"
                  style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "root" })} />
              </g>
            ))}

            {/* Root dots */}
            {isWound
              ? woundLinks.slice(0, 6).map((lk, i) => {
                  const rxs = [-110, -65, -18, 18, 65, 110];
                  const rys = [75, 85, 90, 90, 85, 75];
                  const rx = cx + (rxs[i] || 0);
                  const ry = trunkBot + (rys[i] || 75);
                  return (
                    <g key={lk.id} style={{ cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_link", data: lk, color: "#f87171" }); }}>
                      <circle cx={rx} cy={ry} r="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
                      <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#fca5a5">💔</text>
                    </g>
                  );
                })
              : posLinks.slice(0, 6).map((lk, i) => {
                  const rxs = [-100, -60, -15, 15, 60, 100];
                  const rys = [68, 78, 85, 85, 78, 68];
                  const rx = cx + (rxs[i] || 0);
                  const ry = trunkBot + (rys[i] || 68);
                  return (
                    <g key={lk.id} style={{ cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_link", data: lk, color: "#4ade80" }); }}>
                      <circle cx={rx} cy={ry} r="8" fill="#14532d" stroke="#4ade80" strokeWidth="1.5" />
                      <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#4ade80">💚</text>
                    </g>
                  );
                })
            }

            {/* ── TRUNK ── */}
            <rect x={cx - 16} y={trunkTop} width={32} height={trunkBot - trunkTop}
              rx={6} fill="#3d2008" style={{ cursor: "pointer" }}
              onClick={() => setAddZone({ type: "trunk" })} />
            <line x1={cx - 7} y1={trunkTop + 10} x2={cx - 7} y2={trunkBot - 10} stroke="#5d3a1a" strokeWidth="1.5" opacity={0.4} pointerEvents="none" />
            <line x1={cx + 7} y1={trunkTop + 10} x2={cx + 7} y2={trunkBot - 10} stroke="#5d3a1a" strokeWidth="1.5" opacity={0.4} pointerEvents="none" />

            {/* Trunk add badge */}
            <g style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "trunk" })}>
              <circle cx={cx} cy={trunkTop + 15} r="10" fill="#1a0f05" stroke={accent} strokeWidth="1.5" opacity={0.9} />
              <text x={cx} y={trunkTop + 16} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={accent} fontWeight="bold">+</text>
            </g>

            {/* Wound events on upper trunk (left side) */}
            {isWound && trunkEvents.map((ev, i) => {
              const y = trunkTop + 40 + i * 28;
              const col = EMOTION_COLORS[ev.emotion] || "#888";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type: "event", data: ev, color: col }); }}>
                  <circle cx={cx - 24} cy={y} r="9" fill={col} opacity={0.85} />
                  <text x={cx - 24} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="white" fontWeight="bold">{ev.age}</text>
                </g>
              );
            })}

            {/* ── BIG FIVE BARS (bottom of trunk, right side) ── */}
            {bigFive ? (
              <>
                <text x={cx + 35} y={trunkBot - 88} textAnchor="middle" fontSize="7" fill="#666" fontWeight="600" pointerEvents="none">Big Five</text>
                {BIG5.map((t, i) => {
                  const val = bigFive[t.key] ?? 50;
                  const y = trunkBot - 78 + i * 16;
                  const barMaxW = 32;
                  const barW = (val / 100) * barMaxW;
                  return (
                    <g key={t.key} pointerEvents="none">
                      <rect x={cx + 20} y={y - 4} width={barMaxW} height={8} rx={4} fill="rgba(255,255,255,0.06)" />
                      <rect x={cx + 20} y={y - 4} width={barW} height={8} rx={4} fill={t.color} opacity={0.8} />
                      <circle cx={cx + 20 + barW} cy={y} r="3.5" fill={t.color} />
                      <text x={cx + 20 + barMaxW + 5} y={y + 1} textAnchor="start" dominantBaseline="middle" fontSize="8" fontWeight="700" fill={t.color}>{t.label}</text>
                    </g>
                  );
                })}
              </>
            ) : (
              <text x={cx + 35} y={trunkBot - 40} textAnchor="middle" fontSize="7" fill="#444" pointerEvents="none">Cliquez le tronc → Big Five</text>
            )}

            {/* ── QUALITIES (around Big Five, left side) ── */}
            {bigFive?.qualites?.slice(0, 6).map((q, i) => {
              const n = Math.min(bigFive.qualites.length, 6);
              const angle = Math.PI * 0.55 + (Math.PI * 0.9 * i) / (n - 1 || 1);
              const qr = 52;
              const qx = cx + qr * Math.cos(angle);
              const qy = trunkBot - 30 + qr * 0.32 * Math.sin(angle);
              return (
                <g key={i} pointerEvents="none">
                  <ellipse cx={qx} cy={qy} rx={q.length * 3 + 5} ry={8} fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="0.6" opacity={0.8} />
                  <text x={qx} y={qy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#86efac">{q}</text>
                </g>
              );
            })}

            {/* ── BRANCHES ── */}
            {BRANCH_DEFS.map((bd) => {
              const end = getBranchEnd(bd.side, bd.level);
              const startX = bd.side === "left" ? cx - 14 : cx + 14;
              const startY = trunkTop + 10 + bd.level * 8;
              const midX = bd.side === "left" ? cx - 45 - bd.level * 12 : cx + 45 + bd.level * 12;
              const midY = (startY + end.y) / 2;
              const color = BRANCH_COLORS[bd.name];

              const wBeliefs = isWound ? limitBeliefs.filter(b => b.branch === bd.name) : [];
              const sBeliefs = !isWound ? posBeliefs.filter(b => b.branch === bd.name) : [];
              const bActivities = !isWound ? activities.filter(a => a.branch === bd.name) : [];

              const bezier = (t) => {
                const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * end.x;
                const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * end.y;
                return { x: bx, y: by };
              };

              return (
                <g key={bd.name}>
                  <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity={0.6} pointerEvents="none" />
                  <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
                    style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "branch", name: bd.name })} />

                  {/* Wound belief nodes */}
                  {wBeliefs.slice(0, 4).map((b, i) => {
                    const t = 0.3 + i * 0.2;
                    const p = bezier(t);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_belief", data: b, color: "#ef4444" }); }}>
                        <circle cx={p.x} cy={p.y} r="7" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#fca5a5">✕</text>
                      </g>
                    );
                  })}

                  {/* Strength belief nodes */}
                  {sBeliefs.slice(0, 4).map((b, i) => {
                    const t = 0.35 + i * 0.18;
                    const p = bezier(t);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_belief", data: b, color: color }); }}>
                        <circle cx={p.x} cy={p.y} r="7" fill="#14532d" stroke={color} strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={color}>✦</text>
                      </g>
                    );
                  })}

                  {/* Activity leaves at branch tip */}
                  {bActivities.slice(0, 8).map((a, i) => {
                    const angle = (i / 8) * Math.PI * 2 + (bd.side === "left" ? Math.PI : 0);
                    const lr = 14;
                    const lx = end.x + lr * Math.cos(angle);
                    const ly = end.y + lr * Math.sin(angle);
                    return (
                      <g key={a.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "activity", data: a, color: color }); }}>
                        <ellipse cx={lx} cy={ly} rx={8} ry={4} fill={color} opacity={0.75}
                          transform={`rotate(${(angle * 180 / Math.PI)} ${lx} ${ly})`} />
                      </g>
                    );
                  })}

                  {bActivities.length > 0 && (
                    <circle cx={end.x} cy={end.y} r={13} fill={color} opacity={0.1} pointerEvents="none" />
                  )}

                  <text x={end.x + (bd.side === "left" ? -6 : 6)} y={end.y - 12}
                    textAnchor={bd.side === "left" ? "end" : "start"}
                    fontSize="9" fontWeight="700" fill={color} opacity={0.9} pointerEvents="none">
                    {bd.name}
                  </text>
                </g>
              );
            })}

            {/* ── FOLIAGE ── */}
            {[
              [cx, trunkTop - 30, 45],
              [cx - 40, trunkTop - 10, 35],
              [cx + 40, trunkTop - 10, 35],
              [cx - 22, trunkTop - 40, 28],
              [cx + 22, trunkTop - 40, 28],
            ].map(([x, y, r], i) => (
              <ellipse key={i} cx={x} cy={y} rx={r * 1.1} ry={r * 0.85}
                fill="#1a3a1a" opacity={0.85 - i * 0.05} pointerEvents="none" />
            ))}
          </svg>
        </div>

        {/* Hint chips */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <button onClick={() => setAddZone({ type: "trunk" })}
            className="flex items-center gap-1 bg-amber-900/30 border border-amber-700/30 text-amber-300 text-xs px-3 py-1.5 rounded-full hover:bg-amber-900/50 transition">
            <Plus className="w-3 h-3" /> Tronc
          </button>
          <button onClick={() => setAddZone({ type: "root" })}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition ${
              isWound ? "bg-rose-900/30 border-rose-700/30 text-rose-300 hover:bg-rose-900/50"
                       : "bg-emerald-900/30 border-emerald-700/30 text-emerald-300 hover:bg-emerald-900/50"
            }`}>
            <Plus className="w-3 h-3" /> Racines
          </button>
          {BRANCH_DEFS.map(bd => (
            <button key={bd.name} onClick={() => setAddZone({ type: "branch", name: bd.name })}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition"
              style={{ color: BRANCH_COLORS[bd.name], borderColor: BRANCH_COLORS[bd.name] + "40", backgroundColor: BRANCH_COLORS[bd.name] + "15" }}>
              <Plus className="w-3 h-3" /> {bd.name}
            </button>
          ))}
        </div>

        {/* Counts */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold" style={{ color: isWound ? "#ef4444" : "#4ade80" }}>
              {isWound ? events.length : posLinks.length}
            </p>
            <p className="text-gray-500 text-xs">{isWound ? "Événements" : "Relations"}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-amber-400">
              {isWound ? woundLinks.length : activities.length}
            </p>
            <p className="text-gray-500 text-xs">{isWound ? "Relations" : "Activités"}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-green-400">
              {isWound ? limitBeliefs.length : posBeliefs.length}
            </p>
            <p className="text-gray-500 text-xs">Croyances</p>
          </div>
        </div>
      </div>

      {/* Add panel */}
      {addZone && (
        <TreeAddPanel zone={addZone} onClose={() => setAddZone(null)} onSaved={loadData} polarityLock={polarityLock} />
      )}

      {/* Detail panel */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-end justify-center" onClick={() => setDetail(null)}>
          <div className="bg-[#0d1a0d] rounded-t-2xl p-6 w-full max-w-lg border-t-2 shadow-2xl"
            style={{ borderColor: detail.color }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-3">
              <div>
                {detail.type === "event" && (
                  <>
                    <p className="text-xs text-gray-400 mb-0.5">Événement — {detail.data.age} ans</p>
                    <h2 className="text-lg font-bold text-white">{detail.data.title}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: detail.color + "33", color: detail.color }}>{detail.data.emotion}</span>
                    {detail.data.description && <p className="text-gray-400 text-sm mt-2">{detail.data.description}</p>}
                  </>
                )}
                {detail.type === "wound_link" && (
                  <>
                    <p className="text-xs text-red-400 mb-0.5">Relation douloureuse — {detail.data.type}</p>
                    <h2 className="text-lg font-bold text-white">{detail.data.name}</h2>
                    {detail.data.description && <p className="text-gray-400 text-sm mt-2">{detail.data.description}</p>}
                  </>
                )}
                {detail.type === "pos_link" && (
                  <>
                    <p className="text-xs text-green-400 mb-0.5">Relation positive — {detail.data.type}</p>
                    <h2 className="text-lg font-bold text-white">{detail.data.name}</h2>
                    {detail.data.description && <p className="text-emerald-400 text-sm mt-2">💚 {detail.data.description}</p>}
                  </>
                )}
                {detail.type === "wound_belief" && (
                  <>
                    <p className="text-xs text-red-400 mb-0.5">Croyance limitante — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold text-white">"{detail.data.belief}"</h2>
                    {detail.data.origin && <p className="text-gray-400 text-sm mt-1">Origine : {detail.data.origin}</p>}
                    {detail.data.reframe && <p className="text-green-400 text-sm mt-1">✦ {detail.data.reframe}</p>}
                  </>
                )}
                {detail.type === "pos_belief" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: detail.color }}>Croyance positive — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold text-white">✦ {detail.data.belief}</h2>
                    {detail.data.note && <p className="text-gray-400 text-sm mt-1">{detail.data.note}</p>}
                  </>
                )}
                {detail.type === "activity" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: detail.color }}>Activité — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold text-white">🍃 {detail.data.name}</h2>
                    {detail.data.description && <p className="text-gray-400 text-sm mt-2">{detail.data.description}</p>}
                  </>
                )}
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white transition ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}