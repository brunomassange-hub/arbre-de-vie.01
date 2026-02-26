import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, X } from "lucide-react";

const BRANCH_AXES = ["Social", "Physique", "Intellectuel", "Émotionnel", "Artistique", "Spirituel"];
const BRANCH_COLORS = {
  Social: "#38bdf8", Physique: "#4ade80", Intellectuel: "#818cf8",
  Émotionnel: "#f87171", Artistique: "#fbbf24", Spirituel: "#c084fc"
};

const EMOTION_COLORS = {
  Peur: "#6366f1", Colère: "#ef4444", Tristesse: "#3b82f6",
  Honte: "#eab308", Dégoût: "#84cc16", Abandon: "#ec4899",
  Trahison: "#f97316", Impuissance: "#a855f7"
};

// Branch positions (left 3, right 3) — angles from trunk center
const BRANCH_DEFS = [
  { name: "Social",       side: "left",  level: 0 },
  { name: "Physique",     side: "right", level: 0 },
  { name: "Intellectuel", side: "left",  level: 1 },
  { name: "Émotionnel",   side: "right", level: 1 },
  { name: "Artistique",   side: "left",  level: 2 },
  { name: "Spirituel",    side: "right", level: 2 },
];

function getBranchEnd(side, level) {
  const cx = 200;
  const baseY = 220 - level * 55;
  const spread = 130 - level * 20;
  const curveY = baseY - 40 - level * 10;
  if (side === "left")  return { x: cx - spread, y: curveY };
  return { x: cx + spread, y: curveY };
}

export default function TreeView() {
  const [mode, setMode] = useState("both"); // "wounds" | "strengths" | "both"
  const [detail, setDetail] = useState(null);

  // Blessures data
  const [events, setEvents] = useState([]);
  const [woundLinks, setWoundLinks] = useState([]);
  const [limitBeliefs, setLimitBeliefs] = useState([]);

  // Forces data
  const [bigFive, setBigFive] = useState(null);
  const [posLinks, setPosLinks] = useState([]);
  const [posBeliefs, setPosBeliefs] = useState([]);

  useEffect(() => {
    Promise.all([
      base44.entities.TraumaticEvent.list(),
      base44.entities.Link.list(),
      base44.entities.LimitingBelief.list(),
      base44.entities.BigFiveProfile.list(),
      base44.entities.PositiveLink.list(),
      base44.entities.PositiveBelief.list(),
    ]).then(([ev, wl, lb, bf, pl, pb]) => {
      setEvents([...ev].sort((a, b) => a.age - b.age));
      setWoundLinks(wl);
      setLimitBeliefs(lb);
      setBigFive(bf[0] || null);
      setPosLinks(pl);
      setPosBeliefs(pb);
    });
  }, []);

  const showWounds = mode === "wounds" || mode === "both";
  const showStrengths = mode === "strengths" || mode === "both";

  const cx = 200;
  const trunkTop = 100;
  const trunkBot = 390;

  // Trunk event dots
  const trunkEvents = events.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#080f1a] px-2 py-6">
      <div className="max-w-lg mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-400 mb-4 hover:text-green-300 transition text-sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour
        </Link>

        <h1 className="text-2xl font-bold text-white mb-1">🌳 Mon Arbre Intérieur</h1>
        <p className="text-gray-400 text-xs mb-4">Visualisation de vos blessures et forces</p>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-5">
          {[["both", "🌳 Tout"], ["wounds", "🩸 Blessures"], ["strengths", "✨ Forces"]].map(([m, l]) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === m
                  ? m === "wounds" ? "bg-red-900/80 text-red-200 border border-red-700" :
                    m === "strengths" ? "bg-green-900/80 text-green-200 border border-green-700" :
                    "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
              }`}>
              {l}
            </button>
          ))}
        </div>

        {/* SVG Tree */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a1a0a]">
          <svg viewBox="0 0 400 500" className="w-full" style={{ maxHeight: 520 }}>

            {/* ── BRANCHES ── */}
            {BRANCH_DEFS.map((bd) => {
              const end = getBranchEnd(bd.side, bd.level);
              const midX = bd.side === "left" ? cx - 40 - bd.level * 15 : cx + 40 + bd.level * 15;
              const midY = 200 - bd.level * 55;
              const color = BRANCH_COLORS[bd.name];

              const wBeliefs = limitBeliefs.filter(b => b.branch === bd.name);
              const sBeliefs = posBeliefs.filter(b => b.branch === bd.name);

              return (
                <g key={bd.name}>
                  {/* Branch path */}
                  <path
                    d={`M ${cx} ${midY + 30} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7"
                  />

                  {/* Wound belief nodes (dark side) */}
                  {showWounds && wBeliefs.slice(0, 3).map((b, i) => {
                    const t = 0.4 + i * 0.2;
                    const nx = cx + (end.x - cx) * t + (bd.side === "left" ? -8 : 8);
                    const ny = (midY + 30) + (end.y - (midY + 30)) * t - 12;
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={() => setDetail({ type: "wound_belief", data: b, color: "#ef4444" })}>
                        <circle cx={nx} cy={ny} r="7" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                        <text x={nx} y={ny + 1} textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="#fca5a5">✕</text>
                      </g>
                    );
                  })}

                  {/* Strength belief nodes (light side) */}
                  {showStrengths && sBeliefs.slice(0, 3).map((b, i) => {
                    const t = 0.55 + i * 0.18;
                    const nx = cx + (end.x - cx) * t + (bd.side === "left" ? 10 : -10);
                    const ny = (midY + 30) + (end.y - (midY + 30)) * t - 8;
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={() => setDetail({ type: "pos_belief", data: b, color: color })}>
                        <circle cx={nx} cy={ny} r="7" fill="#14532d" stroke={color} strokeWidth="1.5" />
                        <text x={nx} y={ny + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={color}>✦</text>
                      </g>
                    );
                  })}

                  {/* Branch label */}
                  <text x={end.x + (bd.side === "left" ? -6 : 6)} y={end.y - 10}
                    textAnchor={bd.side === "left" ? "end" : "start"}
                    fontSize="9" fontWeight="700" fill={color} opacity="0.9">
                    {bd.name}
                  </text>

                  {/* Leaf cluster at tip */}
                  <circle cx={end.x} cy={end.y} r="12" fill={color} opacity="0.15" />
                  <circle cx={end.x} cy={end.y} r="6" fill={color} opacity="0.4" />
                </g>
              );
            })}

            {/* ── TRUNK ── */}
            <rect x={cx - 18} y={trunkTop + 100} width={36} height={trunkBot - trunkTop - 100}
              rx={8} fill="#3d2008" />
            {/* Trunk texture lines */}
            <line x1={cx - 8} y1={trunkTop + 110} x2={cx - 8} y2={trunkBot - 20} stroke="#5d3a1a" strokeWidth="2" opacity="0.5" />
            <line x1={cx + 8} y1={trunkTop + 110} x2={cx + 8} y2={trunkBot - 20} stroke="#5d3a1a" strokeWidth="2" opacity="0.5" />

            {/* ── WOUND EVENTS on trunk ── */}
            {showWounds && trunkEvents.map((ev, i) => {
              const y = trunkTop + 130 + i * ((trunkBot - trunkTop - 150) / Math.max(trunkEvents.length, 1));
              const col = EMOTION_COLORS[ev.emotion] || "#888";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={() => setDetail({ type: "event", data: ev, color: col })}>
                  <circle cx={cx - 26} cy={y} r="9" fill={col} opacity="0.85" />
                  <text x={cx - 26} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="white" fontWeight="bold">
                    {ev.age}
                  </text>
                </g>
              );
            })}

            {/* ── BIG FIVE on trunk (strengths) ── */}
            {showStrengths && bigFive && (() => {
              const traits = [
                { key: "ouverture", color: "#8b5cf6" },
                { key: "agreabilite", color: "#22c55e" },
                { key: "conscience", color: "#3b82f6" },
                { key: "nervosite", color: "#ef4444" },
                { key: "extraversion", color: "#f59e0b" },
              ];
              return traits.map((t, i) => {
                const val = bigFive[t.key] ?? 50;
                const y = trunkTop + 130 + i * 38;
                const barW = (val / 100) * 28;
                return (
                  <g key={t.key} style={{ cursor: "pointer" }}
                    onClick={() => setDetail({ type: "bigfive", data: { key: t.key, val, color: t.color }, color: t.color })}>
                    <rect x={cx + 20} y={y - 5} width={30} height={10} rx={5} fill="rgba(255,255,255,0.05)" />
                    <rect x={cx + 20} y={y - 5} width={barW} height={10} rx={5} fill={t.color} opacity="0.8" />
                    <circle cx={cx + 20 + barW} cy={y} r="4" fill={t.color} />
                  </g>
                );
              });
            })()}

            {/* ── ROOTS ── */}
            {/* Root paths */}
            {[
              { dx: -120, dy: 80, cp1x: -60, cp1y: 30 },
              { dx: -70,  dy: 90, cp1x: -40, cp1y: 40 },
              { dx: -20,  dy: 95, cp1x: -10, cp1y: 50 },
              { dx: 20,   dy: 95, cp1x: 10,  cp1y: 50 },
              { dx: 70,   dy: 90, cp1x: 40,  cp1y: 40 },
              { dx: 120,  dy: 80, cp1x: 60,  cp1y: 30 },
            ].map((r, i) => (
              <path key={i}
                d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
                stroke="#3d2008" strokeWidth={5 - i * 0.3} fill="none" strokeLinecap="round" />
            ))}

            {/* Wound root dots */}
            {showWounds && woundLinks.slice(0, 6).map((lk, i) => {
              const rootXs = [-120, -70, -20, 20, 70, 120];
              const rootYs = [80, 90, 95, 95, 90, 80];
              const rx = cx + (rootXs[i] || 0);
              const ry = trunkBot + (rootYs[i] || 80);
              return (
                <g key={lk.id} style={{ cursor: "pointer" }}
                  onClick={() => setDetail({ type: "wound_link", data: lk, color: "#f87171" })}>
                  <circle cx={rx} cy={ry} r="9" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
                  <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="#fca5a5" fontWeight="bold">💔</text>
                </g>
              );
            })}

            {/* Strength root dots */}
            {showStrengths && posLinks.slice(0, 6).map((lk, i) => {
              const rootXs = [-110, -65, -15, 15, 65, 110];
              const rootYs = [72, 82, 87, 87, 82, 72];
              const rx = cx + (rootXs[i] || 0);
              const ry = trunkBot + (rootYs[i] || 72);
              return (
                <g key={lk.id} style={{ cursor: "pointer" }}
                  onClick={() => setDetail({ type: "pos_link", data: lk, color: "#4ade80" })}>
                  <circle cx={rx} cy={ry} r="9" fill="#14532d" stroke="#4ade80" strokeWidth="1.5" />
                  <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#4ade80">💚</text>
                </g>
              );
            })}

            {/* ── FOLIAGE ── */}
            {[
              [cx, trunkTop + 15, 55],
              [cx - 55, trunkTop + 55, 42],
              [cx + 55, trunkTop + 55, 42],
              [cx - 30, trunkTop + 25, 35],
              [cx + 30, trunkTop + 25, 35],
            ].map(([x, y, r], i) => (
              <ellipse key={i} cx={x} cy={y} rx={r * 1.1} ry={r * 0.8}
                fill={showStrengths && !showWounds ? "#14532d" : showWounds && !showStrengths ? "#1c0f0f" : "#1a3a1a"}
                opacity={0.9 - i * 0.05} />
            ))}

            {/* Big five qualites floating around foliage */}
            {showStrengths && bigFive?.qualites?.slice(0, 5).map((q, i) => {
              const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
              const qr = 68;
              const qx = cx + qr * Math.cos(angle);
              const qy = trunkTop + 40 + qr * 0.5 * Math.sin(angle);
              return (
                <g key={i}>
                  <ellipse cx={qx} cy={qy} rx={q.length * 3.2 + 4} ry={9} fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="0.8" />
                  <text x={qx} y={qy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#86efac">{q}</text>
                </g>
              );
            })}

            {/* Ground */}
            <ellipse cx={cx} cy={trunkBot + 5} rx="80" ry="8" fill="#1a0f05" opacity="0.7" />

            {/* Legend */}
            {showWounds && (
              <g>
                <circle cx={16} cy={490} r="5" fill="#7f1d1d" stroke="#f87171" strokeWidth="1" />
                <text x={25} y={494} fontSize="8" fill="#f87171">Blessures</text>
              </g>
            )}
            {showStrengths && (
              <g>
                <circle cx={showWounds ? 85 : 16} cy={490} r="5" fill="#14532d" stroke="#4ade80" strokeWidth="1" />
                <text x={showWounds ? 94 : 25} y={494} fontSize="8" fill="#4ade80">Forces</text>
              </g>
            )}
          </svg>
        </div>

        {/* Counts */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-red-400">{events.length}</p>
            <p className="text-gray-500 text-xs">Événements</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-orange-400">{woundLinks.length + posLinks.length}</p>
            <p className="text-gray-500 text-xs">Relations</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-green-400">{limitBeliefs.length + posBeliefs.length}</p>
            <p className="text-gray-500 text-xs">Croyances</p>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-end justify-center" onClick={() => setDetail(null)}>
          <div className="bg-[#0d1a0d] rounded-t-2xl p-6 w-full max-w-lg border-t-2 shadow-2xl"
            style={{ borderColor: detail.color }}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-3">
              <div>
                {detail.type === "event" && (
                  <>
                    <p className="text-xs text-gray-400 mb-0.5">Événement traumatique — {detail.data.age} ans</p>
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
                {detail.type === "bigfive" && (
                  <>
                    <p className="text-xs text-gray-400 mb-0.5">Big Five</p>
                    <h2 className="text-lg font-bold" style={{ color: detail.color }}>{detail.data.key.charAt(0).toUpperCase() + detail.data.key.slice(1)}</h2>
                    <div className="mt-2 bg-white/10 rounded-full h-3 w-full">
                      <div className="h-3 rounded-full" style={{ width: `${detail.data.val}%`, backgroundColor: detail.color }} />
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{detail.data.val}%</p>
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