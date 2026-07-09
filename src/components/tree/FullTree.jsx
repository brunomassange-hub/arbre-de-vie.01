import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Plus } from "lucide-react";
import TreeAddPanel from "@/components/tree/TreeAddPanel";
import { CHAKRAS } from "@/lib/chakras";

const PAPER_TEXTURE = "https://media.base44.com/images/public/699f59918276f816ec6e56d7/d6f62432f_generated_image.png";
const SERIF = "'Playfair Display', Georgia, serif";

const BRANCH_COLORS = {
  Social: "#7c9cb0",
  Physique: "#7fae7e",
  Intellectuel: "#8b93c7",
  Émotionnel: "#d4847a",
  Artistique: "#d4a559",
  Spirituel: "#b88bb8"
};

const EMOTION_COLORS = {
  Peur: "#5b6daf", Colère: "#c85450", Tristesse: "#5070b0",
  Honte: "#c9a430", Dégoût: "#7ba83a", Abandon: "#d06b9e",
  Trahison: "#d48040", Impuissance: "#8e5cb8"
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

const SPLASH_SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "70% 30% 50% 50% / 30% 70% 30% 70%",
  "40% 60% 70% 30% / 50% 30% 70% 50%",
  "50% 50% 30% 70% / 40% 60% 40% 60%",
  "65% 35% 40% 60% / 55% 45% 60% 35%",
  "30% 70% 60% 40% / 70% 40% 60% 30%",
];

function getBranchEnd(side, level) {
  const c = 200;
  const baseY = 165 - level * 45;
  const spread = 130 - level * 18;
  return { x: side === "left" ? c - spread : c + spread, y: baseY };
}

export default function FullTree({ mode }) {
  const isWound = mode === "wounds";
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

  const cx = 200;
  const trunkTop = 110;
  const trunkBot = 380;
  const trunkEvents = events.slice(0, 6);
  const trunkPosEvents = posEvents.slice(0, 6);

  const foliageColors = isWound
    ? ["#c4a5a0", "#b08b85", "#9c7670", "#d4b5ae", "#a89088"]
    : ["#a8c97f", "#8bb55c", "#73994a", "#bcd49a", "#9ab86d"];

  const trunkColor1 = isWound ? "#8d6e63" : "#7d6b5a";
  const trunkColor2 = isWound ? "#4e342e" : "#4d3a2a";
  const accent = isWound ? "#a1887f" : "#7fae7e";

  const chips = [
    { label: "Tronc", onClick: () => setAddZone({ type: "trunk" }), color: "#a1887f" },
    { label: "Racines", onClick: () => setAddZone({ type: "root" }), color: isWound ? "#bcaaa4" : "#a5d6a7" },
    ...BRANCH_DEFS.map((bd) => ({
      label: bd.name,
      onClick: () => setAddZone({ type: "branch", name: bd.name }),
      color: BRANCH_COLORS[bd.name],
    })),
  ];

  return (
    <div className="px-3 py-5" style={{ background: "#faf6f0" }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>
            {isWound ? "Arbre des Blessures" : "Arbre des Forces"}
          </h1>
          <p className="text-xs" style={{ color: "#8d6e63", fontStyle: "italic" }}>
            {isWound ? "🩸" : "✨"} Touchez une zone de l'arbre pour la remplir
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#e0d6c8] shadow-sm"
          style={{ background: `url(${PAPER_TEXTURE}) center/cover, #faf6f0` }}>
          <svg viewBox="0 0 400 520" className="w-full" style={{ maxHeight: 540 }}>
            <defs>
              <filter id="wc" x="-15%" y="-15%" width="130%" height="130%">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="2" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"/>
              </filter>
              <filter id="foliage" x="-15%" y="-15%" width="130%" height="130%">
                <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="5" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"/>
                <feGaussianBlur stdDeviation="1.5"/>
              </filter>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={trunkColor2}/>
                <stop offset="50%" stopColor={trunkColor1}/>
                <stop offset="100%" stopColor={trunkColor2}/>
              </linearGradient>
              <linearGradient id="rootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6d4c41"/>
                <stop offset="100%" stopColor="#3e2723"/>
              </linearGradient>
            </defs>

            {/* Ground */}
            <ellipse cx={cx} cy={trunkBot + 12} rx="95" ry="14" fill="#d7ccc8" opacity={0.6} filter="url(#wc)"/>
            <ellipse cx={cx} cy={trunkBot + 8} rx="70" ry="8" fill="#bcaaa4" opacity={0.4} filter="url(#wc)"/>

            {/* Roots */}
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
                  stroke="url(#rootGrad)" strokeWidth={6 - i * 0.4} fill="none" strokeLinecap="round"
                  filter="url(#wc)" opacity={0.8} />
                <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
                  stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
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
                      onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_link", data: lk, color: "#d4847a" }); }}>
                      <circle cx={rx} cy={ry} r="9" fill="#c4a5a0" stroke="#a1887f" strokeWidth="1.5" filter="url(#wc)"/>
                      <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3e2723">💔</text>
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
                      onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_link", data: lk, color: "#7fae7e" }); }}>
                      <circle cx={rx} cy={ry} r="9" fill="#c5e1a5" stroke="#7fae7e" strokeWidth="1.5" filter="url(#wc)"/>
                      <text x={rx} y={ry + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3e2723">💚</text>
                    </g>
                  );
                })
            }

            {/* Trunk */}
            <path
              d={`M ${cx - 16} ${trunkTop} Q ${cx - 18} ${(trunkTop + trunkBot) / 2} ${cx - 15} ${trunkBot} L ${cx + 15} ${trunkBot} Q ${cx + 18} ${(trunkTop + trunkBot) / 2} ${cx + 16} ${trunkTop} Z`}
              fill="url(#trunkGrad)" filter="url(#wc)"
              style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "trunk" })} />
            <path d={`M ${cx - 8} ${trunkTop + 15} Q ${cx - 9} ${(trunkTop + trunkBot) / 2} ${cx - 7} ${trunkBot - 15}`} stroke={trunkColor2} strokeWidth="1.2" fill="none" opacity={0.3} pointerEvents="none"/>
            <path d={`M ${cx} ${trunkTop + 10} Q ${cx + 1} ${(trunkTop + trunkBot) / 2} ${cx - 1} ${trunkBot - 10}`} stroke={trunkColor2} strokeWidth="0.8" fill="none" opacity={0.2} pointerEvents="none"/>
            <path d={`M ${cx + 8} ${trunkTop + 15} Q ${cx + 9} ${(trunkTop + trunkBot) / 2} ${cx + 7} ${trunkBot - 15}`} stroke={trunkColor2} strokeWidth="1.2" fill="none" opacity={0.3} pointerEvents="none"/>

            {/* Trunk add badge */}
            <g style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "trunk" })}>
              <circle cx={cx} cy={trunkTop + 12} r="11" fill="#faf6f0" stroke={accent} strokeWidth="2" filter="url(#wc)"/>
              <text x={cx} y={trunkTop + 13} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={accent} fontWeight="bold">+</text>
            </g>

            {/* Wound events */}
            {isWound && trunkEvents.map((ev, i) => {
              const y = trunkTop + 40 + i * 28;
              const chakra = CHAKRAS.find(c => c.name === ev.chakra);
              const col = chakra?.color || EMOTION_COLORS[ev.emotion] || "#888";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type: "event", data: ev, color: col }); }}>
                  <circle cx={cx - 24} cy={y} r="10" fill={col} opacity={0.7} filter="url(#wc)"/>
                  <circle cx={cx - 24} cy={y} r="10" fill="none" stroke={col} strokeWidth="1.5" opacity={0.9}/>
                  <text x={cx - 24} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">{ev.age}</text>
                </g>
              );
            })}

            {/* Positive events */}
            {!isWound && trunkPosEvents.map((ev, i) => {
              const y = trunkTop + 40 + i * 28;
              const chakra = CHAKRAS.find(c => c.name === ev.chakra);
              const col = chakra?.color || "#7fae7e";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_event", data: ev, color: col }); }}>
                  <circle cx={cx - 24} cy={y} r="10" fill={col} opacity={0.7} filter="url(#wc)"/>
                  <circle cx={cx - 24} cy={y} r="10" fill="none" stroke={col} strokeWidth="1.5" opacity={0.9}/>
                  <text x={cx - 24} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">{ev.age}</text>
                </g>
              );
            })}

            {/* Big Five bars */}
            {!isWound && bigFive && (
              <>
                <text x={cx + 35} y={trunkBot - 88} textAnchor="middle" fontSize="7" fill="#8d6e63" fontWeight="600" pointerEvents="none">Big Five</text>
                {BIG5.map((t, i) => {
                  const val = bigFive[t.key] ?? 50;
                  const y = trunkBot - 78 + i * 16;
                  const barMaxW = 32;
                  const barW = (val / 100) * barMaxW;
                  return (
                    <g key={t.key} pointerEvents="none">
                      <rect x={cx + 20} y={y - 4} width={barMaxW} height={8} rx={4} fill="rgba(141,110,99,0.1)" />
                      <rect x={cx + 20} y={y - 4} width={barW} height={8} rx={4} fill={t.color} opacity={0.7} />
                      <circle cx={cx + 20 + barW} cy={y} r="3.5" fill={t.color} />
                      <text x={cx + 20 + barMaxW + 5} y={y + 1} textAnchor="start" dominantBaseline="middle" fontSize="8" fontWeight="700" fill={t.color}>{t.label}</text>
                    </g>
                  );
                })}
                {bigFive?.qualites?.slice(0, 6).map((q, i) => {
                  const n = Math.min(bigFive.qualites.length, 6);
                  const angle = Math.PI * 0.55 + (Math.PI * 0.9 * i) / (n - 1 || 1);
                  const qr = 52;
                  const qx = cx + qr * Math.cos(angle);
                  const qy = trunkBot - 30 + qr * 0.32 * Math.sin(angle);
                  return (
                    <g key={i} pointerEvents="none">
                      <ellipse cx={qx} cy={qy} rx={q.length * 3 + 5} ry={8} fill="rgba(127,174,126,0.15)" stroke="#7fae7e" strokeWidth="0.6" opacity={0.8}/>
                      <text x={qx} y={qy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#3e2723">{q}</text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Branches */}
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
                    stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity={0.7} pointerEvents="none" filter="url(#wc)"/>
                  <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
                    style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "branch", name: bd.name })} />

                  {wBeliefs.slice(0, 4).map((b, i) => {
                    const t = 0.3 + i * 0.2;
                    const p = bezier(t);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_belief", data: b, color: "#d4847a" }); }}>
                        <circle cx={p.x} cy={p.y} r="8" fill="#e1c4bf" stroke="#a1887f" strokeWidth="1.5" filter="url(#wc)"/>
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#5d4037">✕</text>
                      </g>
                    );
                  })}

                  {sBeliefs.slice(0, 4).map((b, i) => {
                    const t = 0.35 + i * 0.18;
                    const p = bezier(t);
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_belief", data: b, color: color }); }}>
                        <circle cx={p.x} cy={p.y} r="8" fill="#d4e8c4" stroke={color} strokeWidth="1.5" filter="url(#wc)"/>
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
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "activity", data: a, color: color }); }}>
                        <ellipse cx={lx} cy={ly} rx={8} ry={5} fill={color} opacity={0.65}
                          transform={`rotate(${(angle * 180 / Math.PI)} ${lx} ${ly})`} filter="url(#wc)"/>
                      </g>
                    );
                  })}

                  {bActivities.length > 0 && (
                    <circle cx={end.x} cy={end.y} r={14} fill={color} opacity={0.12} pointerEvents="none" filter="url(#wc)"/>
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

            {/* Foliage */}
            <g filter="url(#foliage)" opacity={0.82}>
              <ellipse cx={cx} cy={75} rx={58} ry={50} fill={foliageColors[0]}/>
              <ellipse cx={cx - 48} cy={95} rx={42} ry={38} fill={foliageColors[2]}/>
              <ellipse cx={cx + 48} cy={95} rx={42} ry={38} fill={foliageColors[1]}/>
              <ellipse cx={cx - 22} cy={50} rx={35} ry={30} fill={foliageColors[3]}/>
              <ellipse cx={cx + 22} cy={50} rx={35} ry={30} fill={foliageColors[1]}/>
              <ellipse cx={cx} cy={35} rx={30} ry={26} fill={foliageColors[0]}/>
              <ellipse cx={cx - 30} cy={75} rx={28} ry={24} fill={foliageColors[3]}/>
              <ellipse cx={cx + 30} cy={75} rx={28} ry={24} fill={foliageColors[4]}/>
              <ellipse cx={cx - 58} cy={80} rx={25} ry={22} fill={foliageColors[2]}/>
              <ellipse cx={cx + 58} cy={80} rx={25} ry={22} fill={foliageColors[3]}/>
            </g>
          </svg>
        </div>

        {/* Hint chips - watercolor splashes */}
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

        {/* Counts - rectangular pills */}
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
                    {detail.data.chakra && (() => {
                      const ch = CHAKRAS.find(c => c.name === detail.data.chakra);
                      return <span className="text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block" style={{ background: (ch?.color || "#888") + "30", color: ch?.color || "#888" }}>{detail.data.chakra} — {ch?.light}</span>;
                    })()}
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