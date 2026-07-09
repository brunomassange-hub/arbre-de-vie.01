import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Plus } from "lucide-react";
import TreeAddPanel from "@/components/tree/TreeAddPanel";
import { CHAKRAS } from "@/lib/chakras";
import {
  cx, trunkTop, trunkBot, BRANCH_DEFS, BRANCH_COLORS,
  getBranchGeometry, ROOT_DEFS, ROOT_DOT_POSITIONS, TRUNK_PATH, bezier
} from "@/components/tree/treeStyles";
import CellShadedArt from "@/components/tree/styles/CellShadedArt";
import LineArtArt from "@/components/tree/styles/LineArtArt";
import IllustratedArt from "@/components/tree/styles/IllustratedArt";

const SERIF = "'Playfair Display', Georgia, serif";

const EMOTION_COLORS = {
  Peur: "#5b6daf", Colère: "#c85450", Tristesse: "#5070b0",
  Honte: "#c9a430", Dégoût: "#7ba83a", Abandon: "#d06b9e",
  Trahison: "#d48040", Impuissance: "#8e5cb8"
};

const BIG5 = [
  { key: "ouverture", label: "O", color: "#8b5cf6" },
  { key: "agreabilite", label: "A", color: "#22c55e" },
  { key: "conscience", label: "C", color: "#3b82f6" },
  { key: "nervosite", label: "N", color: "#ef4444" },
  { key: "extraversion", label: "E", color: "#f59e0b" },
];

const SPLASH_SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "70% 30% 50% 50% / 30% 70% 30% 70%",
  "40% 60% 70% 30% / 50% 30% 70% 50%",
  "50% 50% 30% 70% / 40% 60% 40% 60%",
  "65% 35% 40% 60% / 55% 45% 60% 35%",
  "30% 70% 60% 40% / 70% 40% 60% 30%",
];

const STYLES = [
  { id: "illus", label: "Illustré", art: IllustratedArt },
  { id: "cell", label: "Cell-shading", art: CellShadedArt },
  { id: "line", label: "Linéaire", art: LineArtArt },
];

export default function FullTree({ mode }) {
  const isWound = mode === "wounds";
  const polarityLock = isWound ? "wound" : "strength";
  const accent = isWound ? "#a1887f" : "#7fae7e";

  const [detail, setDetail] = useState(null);
  const [addZone, setAddZone] = useState(null);
  const [treeStyle, setTreeStyle] = useState("illus");

  const [bigFive, setBigFive] = useState(null);
  const [events, setEvents] = useState([]);
  const [woundLinks, setWoundLinks] = useState([]);
  const [limitBeliefs, setLimitBeliefs] = useState([]);
  const [posLinks, setPosLinks] = useState([]);
  const [posBeliefs, setPosBeliefs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [posEvents, setPosEvents] = useState([]);

  const loadData = () => {
    if (isWound) {
      Promise.all([base44.entities.TraumaticEvent.list(), base44.entities.Link.list(), base44.entities.LimitingBelief.list()])
        .then(([ev, wl, lb]) => {
          setEvents([...ev].sort((a, b) => a.age - b.age));
          setWoundLinks(wl);
          setLimitBeliefs(lb);
        });
    } else {
      Promise.all([base44.entities.BigFiveProfile.list(), base44.entities.PositiveLink.list(), base44.entities.PositiveBelief.list(), base44.entities.Activity.list(), base44.entities.PositiveEvent.list()])
        .then(([bf, pl, pb, act, pe]) => {
          setBigFive(bf[0] || null);
          setPosLinks(pl);
          setPosBeliefs(pb);
          setActivities(act);
          setPosEvents([...pe].sort((a, b) => a.age - b.age));
        });
    }
  };

  useEffect(() => { loadData(); }, [mode]);

  const trunkEvents = (isWound ? events.slice(0, 6) : posEvents.slice(0, 6)).slice().reverse();
  const rootDots = (isWound ? woundLinks : posLinks).slice(0, 6);
  const rootDotPositions = isWound ? ROOT_DOT_POSITIONS.wound : ROOT_DOT_POSITIONS.strength;

  const StyleArt = STYLES.find(s => s.id === treeStyle)?.art || CellShadedArt;

  const BRANCH_DISPLAY_ORDER = ["Émotionnel", "Physique", "Social", "Artistique", "Intellectuel", "Spirituel"];
  const chips = [
    { label: "Racines", onClick: () => setAddZone({ type: "root" }), color: isWound ? "#bcaaa4" : "#a5d6a7" },
    { label: "Tronc", onClick: () => setAddZone({ type: "trunk" }), color: "#a1887f" },
    ...BRANCH_DISPLAY_ORDER.map((name) => {
      const bd = BRANCH_DEFS.find((b) => b.name === name);
      return {
        label: bd.name,
        onClick: () => setAddZone({ type: "branch", name: bd.name }),
        color: BRANCH_COLORS[bd.name],
      };
    }),
  ];

  return (
    <div className="px-3 py-5" style={{ background: "#faf6f0" }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>
            {isWound ? "Arbre des Blessures" : "Arbre des Forces"}
          </h1>
          <p className="text-xs" style={{ color: "#8d6e63", fontStyle: "italic" }}>
            {isWound ? "🩸" : "✨"} Touchez une zone de l'arbre pour la remplir
          </p>
        </div>

        {/* Style selector */}
        <div className="flex gap-2 justify-center mb-4">
          {STYLES.map(s => (
            <button key={s.id} onClick={() => setTreeStyle(s.id)}
              className="px-3 py-1.5 text-xs rounded-full border transition"
              style={{
                fontFamily: SERIF,
                color: treeStyle === s.id ? "#3e2723" : "#8d6e63",
                background: treeStyle === s.id ? "#e0d6c8" : "transparent",
                borderColor: treeStyle === s.id ? "#a1887f" : "#d7ccc8",
                fontWeight: treeStyle === s.id ? 600 : 400,
              }}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#e0d6c8] shadow-sm" style={{ background: "#faf6f0" }}>
          <svg viewBox="0 0 400 520" className="w-full" style={{ maxHeight: 540 }}>
            {/* Style-specific tree art */}
            <StyleArt isWound={isWound} />

            {/* Root click areas */}
            {ROOT_DEFS.map((r, i) => (
              <path key={`rc-${i}`}
                d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
                stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
                style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "root" })} />
            ))}

            {/* Root dots */}
            {rootDots.map((lk, i) => {
              const pos = rootDotPositions[i] || { x: 0, y: 0 };
              const rx = cx + pos.x;
              const ry = trunkBot + pos.y;
              const color = isWound ? "#d4847a" : "#7fae7e";
              const bgColor = isWound ? "#f0d9d5" : "#d4e8c4";
              return (
                <g key={lk.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type: isWound ? "wound_link" : "pos_link", data: lk, color }); }}>
                  <circle cx={rx} cy={ry} r="9" fill={bgColor} stroke={color} strokeWidth="1.5" />
                  <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3e2723">{isWound ? "💔" : "💚"}</text>
                </g>
              );
            })}

            {/* Trunk click area */}
            <path d={TRUNK_PATH} fill="transparent" style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "trunk" })} />

            {/* Trunk badge */}
            <g style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "trunk" })}>
              <circle cx={cx} cy={trunkTop + 12} r="11" fill="#faf6f0" stroke={accent} strokeWidth="2" />
              <text x={cx} y={trunkTop + 13} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={accent} fontWeight="bold">+</text>
            </g>

            {/* Trunk events */}
            {trunkEvents.map((ev, i) => {
              const y = trunkTop + 40 + i * 28;
              const chakra = CHAKRAS.find(c => c.name === ev.chakra);
              const col = chakra?.color || (isWound ? "#a1887f" : "#7fae7e");
              const type = isWound ? "event" : "pos_event";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type, data: ev, color: col }); }}>
                  <circle cx={cx - 24} cy={y} r="10" fill={col} opacity={0.8} stroke="#fff" strokeWidth="1.5" />
                  <text x={cx - 24} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">{ev.age}</text>
                  {ev.emotion && <text x={cx - 10} y={y + 1} dominantBaseline="middle" fontSize="7" fill={col} fontWeight="600" pointerEvents="none">{ev.emotion}</text>}
                </g>
              );
            })}

            {/* Big Five bars — bottom of trunk */}
            {!isWound && bigFive && (
              <>
                <text x={cx} y={trunkBot + 26} textAnchor="middle" fontSize="7" fill="#8d6e63" fontWeight="600" pointerEvents="none">Big Five</text>
                {BIG5.map((t, i) => {
                  const val = bigFive[t.key] ?? 50;
                  const rowH = 12;
                  const y = trunkBot + 38 + i * rowH;
                  const barMaxW = 56;
                  const barW = (val / 100) * barMaxW;
                  const bx = cx - barMaxW / 2;
                  return (
                    <g key={t.key} pointerEvents="none">
                      <text x={bx - 4} y={y + 1} textAnchor="end" dominantBaseline="middle" fontSize="7" fontWeight="700" fill={t.color}>{t.label}</text>
                      <rect x={bx} y={y - 3.5} width={barMaxW} height={7} rx={3.5} fill="rgba(141,110,99,0.1)" />
                      <rect x={bx} y={y - 3.5} width={barW} height={7} rx={3.5} fill={t.color} opacity={0.7} />
                      <circle cx={bx + barW} cy={y} r="3" fill={t.color} />
                      <text x={bx + barMaxW + 4} y={y + 1} textAnchor="start" dominantBaseline="middle" fontSize="6.5" fill="#8d6e63">{val}%</text>
                    </g>
                  );
                })}
                {bigFive?.qualites?.slice(0, 6).map((q, i) => {
                  const n = Math.min(bigFive.qualites.length, 6);
                  const spread = 110;
                  const qx = cx - spread / 2 + (spread * i) / (n - 1 || 1);
                  const qy = trunkBot + 108;
                  return (
                    <g key={i} pointerEvents="none">
                      <ellipse cx={qx} cy={qy} rx={q.length * 3 + 5} ry={8} fill="rgba(127,174,126,0.15)" stroke="#7fae7e" strokeWidth="0.6" opacity={0.8}/>
                      <text x={qx} y={qy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#3e2723">{q}</text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Branch click areas + beliefs + activities + labels */}
            {BRANCH_DEFS.map((bd) => {
              const { startX, startY, midX, midY, end } = getBranchGeometry(bd);
              const color = BRANCH_COLORS[bd.name];
              const wBeliefs = isWound ? limitBeliefs.filter(b => b.branch === bd.name) : [];
              const sBeliefs = !isWound ? posBeliefs.filter(b => b.branch === bd.name) : [];
              const bActivities = !isWound ? activities.filter(a => a.branch === bd.name) : [];
              const bezierFn = (t) => bezier(t, startX, startY, midX, midY, end.x, end.y);

              return (
                <g key={bd.name}>
                  <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
                    style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "branch", name: bd.name })} />

                  {wBeliefs.slice(0, 4).map((b, i) => {
                    const p = bezierFn(0.3 + i * 0.2);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_belief", data: b, color: "#d4847a" }); }}>
                        <circle cx={p.x} cy={p.y} r="8" fill="#f0d9d5" stroke="#d4847a" strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#5d4037">✕</text>
                      </g>
                    );
                  })}

                  {sBeliefs.slice(0, 4).map((b, i) => {
                    const p = bezierFn(0.35 + i * 0.18);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_belief", data: b, color }); }}>
                        <circle cx={p.x} cy={p.y} r="8" fill="#d4e8c4" stroke={color} strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={color}>✦</text>
                      </g>
                    );
                  })}

                  {bActivities.slice(0, 8).map((a, i) => {
                    const angle = (i / 8) * Math.PI * 2 + (bd.side === "left" ? Math.PI : 0);
                    const lr = 14;
                    const lx = end.x + lr * Math.cos(angle);
                    const ly = end.y + lr * Math.sin(angle);
                    return (
                      <g key={a.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "activity", data: a, color }); }}>
                        <ellipse cx={lx} cy={ly} rx={8} ry={5} fill={color} opacity={0.75}
                          transform={`rotate(${(angle * 180 / Math.PI)} ${lx} ${ly})`} />
                      </g>
                    );
                  })}

                  {bActivities.length > 0 && (
                    <circle cx={end.x} cy={end.y} r={14} fill={color} opacity={0.12} pointerEvents="none" />
                  )}

                  <text x={end.x + (bd.side === "left" ? -6 : 6)} y={end.y - 12}
                    textAnchor={bd.side === "left" ? "end" : "start"}
                    fontSize="9" fontWeight="600" fill={color} opacity={0.85} pointerEvents="none"
                    style={{ fontFamily: SERIF }}>
                    {bd.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hint chips */}
        <div className="flex flex-wrap gap-2.5 mt-5 justify-center">
          {chips.map((chip, i) => (
            <button key={i} onClick={chip.onClick}
              className="px-3.5 py-2 text-xs font-medium transition hover:scale-105 active:scale-95"
              style={{
                color: "#3e2723",
                background: chip.color + "40",
                borderRadius: SPLASH_SHAPES[i % SPLASH_SHAPES.length],
                border: `1px solid ${chip.color}60`,
                fontFamily: SERIF,
              }}>
              <Plus className="w-3 h-3 inline mr-1" style={{ color: chip.color }} />
              {chip.label}
            </button>
          ))}
        </div>

        {/* Counts */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div className="rounded-sm p-3 text-center border" style={{ background: (isWound ? "#bcaaa4" : "#c5e1a5") + "30", borderColor: (isWound ? "#bcaaa4" : "#c5e1a5") + "60" }}>
            <p className="text-2xl font-bold" style={{ color: isWound ? "#8d6e63" : "#5d7a3a", fontFamily: SERIF }}>
              {isWound ? events.length : posEvents.length}
            </p>
            <p className="text-xs" style={{ color: "#8d6e63" }}>Événements</p>
          </div>
          <div className="rounded-sm p-3 text-center border" style={{ background: "#d7ccc830", borderColor: "#d7ccc860" }}>
            <p className="text-2xl font-bold" style={{ color: "#8d6e63", fontFamily: SERIF }}>
              {isWound ? woundLinks.length : posLinks.length}
            </p>
            <p className="text-xs" style={{ color: "#8d6e63" }}>Relations</p>
          </div>
          <div className="rounded-sm p-3 text-center border" style={{ background: "#b0bec530", borderColor: "#b0bec560" }}>
            <p className="text-2xl font-bold" style={{ color: "#5d4037", fontFamily: SERIF }}>
              {isWound ? limitBeliefs.length : posBeliefs.length}
            </p>
            <p className="text-xs" style={{ color: "#8d6e63" }}>Croyances</p>
          </div>
        </div>
      </div>

      {addZone && (
        <TreeAddPanel zone={addZone} onClose={() => setAddZone(null)} onSaved={loadData} polarityLock={polarityLock} />
      )}

      {detail && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" style={{ background: "rgba(62,39,35,0.4)" }} onClick={() => setDetail(null)}>
          <div className="rounded-t-3xl p-6 w-full max-w-lg border-t-2 shadow-2xl"
            style={{ borderColor: detail.color, background: "#faf6f0", fontFamily: SERIF }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-3">
              <div>
                {detail.type === "event" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: "#8d6e63" }}>Événement — {detail.data.age} ans</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>{detail.data.title}</h2>
                    <div className="flex gap-2 flex-wrap mt-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: detail.color + "30", color: detail.color }}>{detail.data.emotion}</span>
                      {detail.data.chakra && (() => {
                        const ch = CHAKRAS.find(c => c.name === detail.data.chakra);
                        return <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: (ch?.color || "#888") + "30", color: ch?.color || "#888" }}>{detail.data.chakra} — {ch?.shadow}</span>;
                      })()}
                    </div>
                    {detail.data.description && <p className="text-sm mt-2" style={{ color: "#5d4037" }}>{detail.data.description}</p>}
                  </>
                )}
                {detail.type === "pos_event" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: detail.color }}>Événement positif — {detail.data.age} ans</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>{detail.data.title}</h2>
                    <div className="flex gap-2 flex-wrap mt-1.5">
                      {detail.data.emotion && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: detail.color + "30", color: detail.color }}>{detail.data.emotion}</span>}
                      {detail.data.chakra && (() => {
                        const ch = CHAKRAS.find(c => c.name === detail.data.chakra);
                        return <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: (ch?.color || "#888") + "30", color: ch?.color || "#888" }}>{detail.data.chakra} — {ch?.light}</span>;
                      })()}
                    </div>
                    {detail.data.description && <p className="text-sm mt-2" style={{ color: "#5d4037" }}>{detail.data.description}</p>}
                  </>
                )}
                {detail.type === "wound_link" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: "#d4847a" }}>Relation douloureuse — {detail.data.type}</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>{detail.data.name}</h2>
                    {detail.data.description && <p className="text-sm mt-2" style={{ color: "#5d4037" }}>{detail.data.description}</p>}
                  </>
                )}
                {detail.type === "pos_link" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: "#7fae7e" }}>Relation positive — {detail.data.type}</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>{detail.data.name}</h2>
                    {detail.data.description && <p className="text-sm mt-2" style={{ color: "#5d7a3a" }}>💚 {detail.data.description}</p>}
                  </>
                )}
                {detail.type === "wound_belief" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: "#d4847a" }}>Croyance limitante — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>"{detail.data.belief}"</h2>
                    {detail.data.origin && <p className="text-sm mt-1" style={{ color: "#8d6e63" }}>Origine : {detail.data.origin}</p>}
                    {detail.data.reframe && <p className="text-sm mt-1" style={{ color: "#7fae7e" }}>✦ {detail.data.reframe}</p>}
                  </>
                )}
                {detail.type === "pos_belief" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: detail.color }}>Croyance positive — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>✦ {detail.data.belief}</h2>
                    {detail.data.note && <p className="text-sm mt-1" style={{ color: "#5d4037" }}>{detail.data.note}</p>}
                  </>
                )}
                {detail.type === "activity" && (
                  <>
                    <p className="text-xs mb-0.5" style={{ color: detail.color }}>Activité — {detail.data.branch}</p>
                    <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>🍃 {detail.data.name}</h2>
                    {detail.data.description && <p className="text-sm mt-2" style={{ color: "#5d4037" }}>{detail.data.description}</p>}
                  </>
                )}
              </div>
              <button onClick={() => setDetail(null)} className="transition ml-4" style={{ color: "#8d6e63" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}