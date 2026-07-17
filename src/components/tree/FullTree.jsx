import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Plus, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TreeAddPanel from "@/components/tree/TreeAddPanel";
import BigFiveRadarModal from "@/components/tree/BigFiveRadarModal";
import { CHAKRAS } from "@/lib/chakras";
import NeedSelector from "@/components/tree/NeedSelector";
import {
  cx, trunkTop, trunkBot, BRANCH_DEFS, BRANCH_COLORS,
  getBranchGeometry, ROOT_DEFS, ROOT_CATEGORIES, TRUNK_PATH, bezier
} from "@/components/tree/treeStyles";
import CellShadedArt from "@/components/tree/styles/CellShadedArt";
import LineArtArt from "@/components/tree/styles/LineArtArt";
import IllustratedArt from "@/components/tree/styles/IllustratedArt";
import ZoomableWrapper from "@/components/tree/ZoomableWrapper";

const SERIF = "'Playfair Display', Georgia, serif";

const LINK_TYPES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];

const ENTITY_MAP = {
  event: "TraumaticEvent",
  pos_event: "PositiveEvent",
  wound_link: "Link",
  pos_link: "PositiveLink",
  wound_belief: "LimitingBelief",
  pos_belief: "PositiveBelief",
  activity: "Activity",
};

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

export default function FullTree({ mode, zoomable = false }) {
  const isWound = mode === "wounds";
  const polarityLock = isWound ? "wound" : "strength";
  const accent = isWound ? "#a1887f" : "#7fae7e";

  const [detail, setDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addZone, setAddZone] = useState(null);
  const [treeStyle, setTreeStyle] = useState("illus");
  const [showBigFive, setShowBigFive] = useState(false);

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
  const allRootLinks = isWound ? woundLinks : posLinks;

  const StyleArt = STYLES.find(s => s.id === treeStyle)?.art || CellShadedArt;

  const handleDetailSave = async () => {
    const entityName = ENTITY_MAP[detail.type];
    const data = { ...editData };
    if (data.age !== undefined && data.age !== "") data.age = Number(data.age);
    if (detail.type === "event" || detail.type === "pos_event") {
      const chakra = CHAKRAS.find(c => detail.type === "event" ? c.shadow === data.emotion : c.light === data.emotion)?.name;
      if (chakra) data.chakra = chakra;
    }
    await base44.entities[entityName].update(detail.data.id, data);
    setIsEditing(false);
    setDetail(null);
    loadData();
  };

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
      <style>{`
        @keyframes treePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .tree-pulse { animation: treePulse 2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
      `}</style>
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

        <ZoomableWrapper enabled={zoomable}>
        <div className="rounded-2xl overflow-hidden border border-[#e0d6c8] shadow-sm" style={{ background: "#faf6f0" }}>
          <svg viewBox="0 0 400 520" className="w-full" style={{ maxHeight: 540 }}>
            {/* Style-specific tree art */}
            <StyleArt isWound={isWound} />

            {/* Root click areas + labels + dots */}
            {ROOT_DEFS.map((r, i) => {
              const category = ROOT_CATEGORIES[i];
              const rootLinks = allRootLinks.filter(lk => lk.type === category);
              const color = isWound ? "#d4847a" : "#7fae7e";
              const bgColor = isWound ? "#f0d9d5" : "#d4e8c4";
              const tipX = cx + r.dx;
              const tipY = trunkBot + r.dy;

              return (
                <g key={`root-${i}`}>
                  {/* Click area */}
                  <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${tipX} ${tipY}`}
                    stroke="transparent" strokeWidth="22" fill="none" strokeLinecap="round"
                    style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "root", category })} />

                  {/* Category label at tip */}
                  <text x={tipX} y={tipY + 15} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontWeight="700" fill={isWound ? "#8d6e63" : color} pointerEvents="none"
                    style={{ paintOrder: "stroke", stroke: "#faf6f0", strokeWidth: 2.5, fontFamily: SERIF }}>
                    {category}
                  </text>

                  {/* Links along root */}
                  {rootLinks.slice(0, 5).map((lk, j) => {
                    const t = 0.35 + j * 0.13;
                    const p = bezier(t, cx, trunkBot, cx + r.cp1x, trunkBot + r.cp1y, tipX, tipY);
                    return (
                      <g key={lk.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: isWound ? "wound_link" : "pos_link", data: lk, color }); }}>
                        <circle cx={p.x} cy={p.y} r="7" fill={bgColor} stroke={color} strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#3e2723">{isWound ? "💔" : "💚"}</text>
                        {lk.name && (
                          <text x={p.x} y={p.y - 11} textAnchor="middle" dominantBaseline="middle"
                            fontSize="7" fill="#3e2723" fontWeight="600" pointerEvents="none"
                            style={{ paintOrder: "stroke", stroke: "#faf6f0", strokeWidth: 2 }}>
                            {lk.name.length > 12 ? lk.name.slice(0, 12) + "…" : lk.name}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Empty badge */}
                  {rootLinks.length === 0 && (
                    <g style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "root", category })}>
                      <circle cx={tipX} cy={tipY} r="7" fill="#faf6f0" stroke={isWound ? "#bcaaa4" : "#a5d6a7"} strokeWidth="1.5" className="tree-pulse" />
                      <text x={tipX} y={tipY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={isWound ? "#bcaaa4" : "#a5d6a7"} fontWeight="bold">+</text>
                    </g>
                  )}
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
              const spacing = trunkEvents.length > 7 ? (isWound ? 24 : 20) : 28;
              const y = trunkTop + 30 + i * spacing;
              const chakra = CHAKRAS.find(c => c.name === ev.chakra);
              const col = chakra?.color || (isWound ? "#a1887f" : "#7fae7e");
              const type = isWound ? "event" : "pos_event";
              return (
                <g key={ev.id} style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setDetail({ type, data: ev, color: col }); }}>
                  <circle cx={cx - 24} cy={y} r="10" fill={col} opacity={0.8} stroke="#fff" strokeWidth="1.5" />
                  <text x={cx - 24} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">{ev.age}</text>
                  {ev.title && <text x={cx - 10} y={y + 1} dominantBaseline="middle" fontSize="7" fill={col} fontWeight="600" pointerEvents="none">{ev.title.length > 20 ? ev.title.slice(0, 20) + "…" : ev.title}</text>}
                </g>
              );
            })}

            {/* Big Five radar — bottom of trunk, above roots */}
            {!isWound && (() => {
              const rx = 34;
              const ry = trunkBot - rx - 14;
              const n = 5;
              const angs = BIG5.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
              const verts = angs.map(a => ({ x: cx + rx * Math.cos(a), y: ry + rx * Math.sin(a) }));
              const dpts = BIG5.map((d, i) => {
                const val = ((bigFive?.[d.key] ?? 50) / 100) * rx;
                return { x: cx + val * Math.cos(angs[i]), y: ry + val * Math.sin(angs[i]) };
              });
              const poly = dpts.map(p => `${p.x},${p.y}`).join(" ");
              return (
                <g style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setShowBigFive(true); }}>
                  {/* Colored sectors */}
                  {BIG5.map((d, i) => {
                    const next = (i + 1) % n;
                    return (
                      <polygon key={`sec-${d.key}`}
                        points={`${cx},${ry} ${dpts[i].x},${dpts[i].y} ${dpts[next].x},${dpts[next].y}`}
                        fill={d.color} opacity={0.5} stroke={d.color} strokeWidth="0.5" />
                    );
                  })}
                  {/* Grid */}
                  {[0.5, 1].map(f => (
                    <polygon key={f} points={verts.map(v => {
                      const dx = v.x - cx, dy = v.y - ry;
                      return `${cx + dx * f},${ry + dy * f}`;
                    }).join(" ")} fill="none" stroke="rgba(141,110,99,0.4)" strokeWidth="0.8" />
                  ))}
                  {verts.map((v, i) => (
                    <line key={i} x1={cx} y1={ry} x2={v.x} y2={v.y} stroke="rgba(141,110,99,0.35)" strokeWidth="0.8" />
                  ))}
                  {/* Data polygon — black fill for contrast */}
                  <polygon points={poly} fill="rgba(0,0,0,0.15)" stroke="#1a1a1a" strokeWidth="2" />
                  {dpts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill={BIG5[i].color} stroke="#1a1a1a" strokeWidth="1" />
                  ))}
                  {/* Percentage labels */}
                  {dpts.map((p, i) => {
                    const dx = p.x - cx, dy = p.y - ry;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const lx = p.x + (dx / dist) * 11;
                    const ly = p.y + (dy / dist) * 11;
                    return (
                      <text key={`pct-${i}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                        fontSize="7" fontWeight="700" fill="#1a1a1a" pointerEvents="none">{bigFive?.[BIG5[i].key] ?? 50}%</text>
                    );
                  })}
                  {verts.map((v, i) => {
                    const dx = v.x - cx, dy = v.y - ry;
                    const lx = cx + dx * 1.3, ly = ry + dy * 1.3;
                    return (
                      <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                        fontSize="6" fontWeight="700" fill={BIG5[i].color} pointerEvents="none">{BIG5[i].label}</text>
                    );
                  })}
                  <text x={cx} y={ry - rx - 6} textAnchor="middle" fontSize="6.5" fill="#8d6e63" fontWeight="600" pointerEvents="none">🧬 Big Five — toucher pour ajuster</text>
                </g>
              );
            })()}

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
                    const txt = b.belief.length > 28 ? b.belief.slice(0, 28) + "…" : b.belief;
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "wound_belief", data: b, color: "#d4847a" }); }}>
                        <circle cx={p.x} cy={p.y} r="7" fill="#f0d9d5" stroke="#d4847a" strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#5d4037">✕</text>
                        <text x={p.x + (bd.side === "left" ? -11 : 11)} y={p.y + 1} dominantBaseline="middle"
                          textAnchor={bd.side === "left" ? "end" : "start"}
                          fontSize="6.5" fill="#5d4037" fontWeight="600" pointerEvents="none"
                          style={{ paintOrder: "stroke", stroke: "#faf6f0", strokeWidth: 2.5, fontFamily: SERIF }}>{txt}</text>
                      </g>
                    );
                  })}

                  {sBeliefs.slice(0, 4).map((b, i) => {
                    const p = bezierFn(0.35 + i * 0.18);
                    const txt = b.belief.length > 28 ? b.belief.slice(0, 28) + "…" : b.belief;
                    return (
                      <g key={b.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "pos_belief", data: b, color }); }}>
                        <circle cx={p.x} cy={p.y} r="7" fill="#d4e8c4" stroke={color} strokeWidth="1.5" />
                        <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={color}>✦</text>
                        <text x={p.x + (bd.side === "left" ? -11 : 11)} y={p.y + 1} dominantBaseline="middle"
                          textAnchor={bd.side === "left" ? "end" : "start"}
                          fontSize="6.5" fill={color} fontWeight="600" pointerEvents="none"
                          style={{ paintOrder: "stroke", stroke: "#faf6f0", strokeWidth: 2.5, fontFamily: SERIF }}>{txt}</text>
                      </g>
                    );
                  })}

                  {bActivities.slice(0, 8).map((a, i) => {
                    // Distribute activities on the bottom semicircle only (0 to PI)
                    // so they never overlap the branch label which sits above the tip.
                    const n = Math.min(bActivities.length, 8);
                    const angle = n === 1 ? Math.PI / 2 : (i / (n - 1)) * Math.PI;
                    const lr = 22;
                    const lx = end.x + lr * Math.cos(angle) + (bd.side === "left" ? -4 : 4);
                    const ly = end.y + lr * Math.sin(angle);
                    // Wrap activity name into multiple lines instead of truncating
                    const wrapText = (str, maxChars) => {
                      const words = str.split(/\s+/);
                      const lines = [];
                      let line = "";
                      for (const w of words) {
                        if (line && (line + " " + w).length > maxChars) {
                          lines.push(line);
                          line = w;
                        } else {
                          line = line ? line + " " + w : w;
                        }
                      }
                      if (line) lines.push(line);
                      return lines.slice(0, 3);
                    };
                    const lines = wrapText(a.name, 10);
                    // Label goes outward from center
                    const labelDx = Math.cos(angle);
                    const labelDy = Math.sin(angle);
                    const labelX = lx + labelDx * 11;
                    const labelY = ly + labelDy * 4 + 1 - (lines.length - 1) * 4;
                    const anchor = labelDx < -0.3 ? "end" : labelDx > 0.3 ? "start" : "middle";
                    return (
                      <g key={a.id} style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); setDetail({ type: "activity", data: a, color }); }}>
                        <ellipse cx={lx} cy={ly} rx={8} ry={5} fill={color} opacity={0.75}
                          transform={`rotate(${(angle * 180 / Math.PI)} ${lx} ${ly})`} />
                        <text x={labelX} y={labelY} dominantBaseline="middle"
                          textAnchor={anchor}
                          fontSize="6.5" fill={color} fontWeight="600" pointerEvents="none"
                          style={{ paintOrder: "stroke", stroke: "#faf6f0", strokeWidth: 2.5, fontFamily: SERIF }}>
                          {lines.map((ln, li) => (
                            <tspan key={li} x={labelX} dy={li === 0 ? 0 : 8}>{ln}</tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}

                  {bActivities.length > 0 && (
                    <circle cx={end.x} cy={end.y} r={14} fill={color} opacity={0.12} pointerEvents="none" />
                  )}

                  {/* Branch interactive badge */}
                  {wBeliefs.length === 0 && sBeliefs.length === 0 && bActivities.length === 0 && (
                    <g style={{ cursor: "pointer" }} onClick={() => setAddZone({ type: "branch", name: bd.name })}>
                      <circle cx={end.x} cy={end.y} r="9" fill="#faf6f0" stroke={color} strokeWidth="1.5" className="tree-pulse" />
                      <text x={end.x} y={end.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill={color} fontWeight="bold">+</text>
                    </g>
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
        </ZoomableWrapper>

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

      {showBigFive && !isWound && (
        <BigFiveRadarModal profile={bigFive} onClose={() => setShowBigFive(false)} onSaved={loadData} />
      )}

      {detail && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" style={{ background: "rgba(62,39,35,0.4)" }} onClick={() => { setDetail(null); setIsEditing(false); }}>
          <div className="rounded-t-3xl p-6 w-full max-w-lg border-t-2 shadow-2xl max-h-[85vh] overflow-y-auto"
            style={{ borderColor: detail.color, background: "#faf6f0", fontFamily: SERIF }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 mr-4">
                {isEditing ? (
                  <div className="space-y-3">
                    {(detail.type === "event" || detail.type === "pos_event") && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <Input type="number" value={editData.age ?? ""} onChange={e => setEditData({ ...editData, age: e.target.value })}
                            placeholder="Âge" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                          <Select value={editData.emotion ?? ""} onValueChange={v => setEditData({ ...editData, emotion: v })}>
                            <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] h-9 text-sm"><SelectValue placeholder="Émotion" /></SelectTrigger>
                            <SelectContent>
                              {(detail.type === "event" ? CHAKRAS.map(c => c.shadow) : CHAKRAS.map(c => c.light)).map(em => <SelectItem key={em} value={em}>{em}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        {detail.type === "event" && (
                          <Select value={editData.wound_type ?? ""} onValueChange={v => setEditData({ ...editData, wound_type: v })}>
                            <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] h-9 text-sm"><SelectValue placeholder="Type de blessure" /></SelectTrigger>
                            <SelectContent>{["Trahison", "Rejet", "Abandon", "Humiliation", "Injustice"].map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                          </Select>
                        )}
                        <NeedSelector
                          value={editData.need_tags || []}
                          onChange={(tags) => setEditData({ ...editData, need_tags: tags })}
                          label={detail.type === "event" ? "Besoin troublé" : "Besoin comblé"}
                        />
                        <Input value={editData.title ?? ""} onChange={e => setEditData({ ...editData, title: e.target.value })}
                          placeholder="Titre" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Textarea value={editData.description ?? ""} onChange={e => setEditData({ ...editData, description: e.target.value })}
                          placeholder="Description" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                      </>
                    )}
                    {(detail.type === "wound_link" || detail.type === "pos_link") && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <Input value={editData.name ?? ""} onChange={e => setEditData({ ...editData, name: e.target.value })}
                            placeholder="Prénom / Nom" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                          <Select value={editData.type ?? ""} onValueChange={v => setEditData({ ...editData, type: v })}>
                            <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
                            <SelectContent>{LINK_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <Textarea value={editData.description ?? ""} onChange={e => setEditData({ ...editData, description: e.target.value })}
                          placeholder="Description" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                      </>
                    )}
                    {detail.type === "wound_belief" && (
                      <>
                        <Input value={editData.belief ?? ""} onChange={e => setEditData({ ...editData, belief: e.target.value })}
                          placeholder="Croyance" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Input type="number" value={editData.age ?? ""} onChange={e => setEditData({ ...editData, age: e.target.value })}
                          placeholder="Âge (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Input value={editData.origin ?? ""} onChange={e => setEditData({ ...editData, origin: e.target.value })}
                          placeholder="Origine" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Input value={editData.reframe ?? ""} onChange={e => setEditData({ ...editData, reframe: e.target.value })}
                          placeholder="Reformulation positive" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                      </>
                    )}
                    {detail.type === "pos_belief" && (
                      <>
                        <Input value={editData.belief ?? ""} onChange={e => setEditData({ ...editData, belief: e.target.value })}
                          placeholder="Croyance positive" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Input type="number" value={editData.age ?? ""} onChange={e => setEditData({ ...editData, age: e.target.value })}
                          placeholder="Âge (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Textarea value={editData.note ?? ""} onChange={e => setEditData({ ...editData, note: e.target.value })}
                          placeholder="Note" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                      </>
                    )}
                    {detail.type === "activity" && (
                      <>
                        <Input value={editData.name ?? ""} onChange={e => setEditData({ ...editData, name: e.target.value })}
                          placeholder="Nom de l'activité" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-9" />
                        <Textarea value={editData.description ?? ""} onChange={e => setEditData({ ...editData, description: e.target.value })}
                          placeholder="Description" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                      </>
                    )}
                    <div className="flex gap-2">
                      <Button onClick={handleDetailSave} size="sm" className="flex-1" style={{ background: detail.color }}>
                        <Save className="w-3 h-3 mr-1" /> Enregistrer
                      </Button>
                      <Button onClick={() => setIsEditing(false)} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723]">Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <>
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
                        {detail.data.wound_type && <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-600">{detail.data.wound_type}</span>}
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
                        {detail.data.age != null && <p className="text-sm mt-1" style={{ color: "#8d6e63" }}>Âge : {detail.data.age} ans</p>}
                        {detail.data.origin && <p className="text-sm mt-1" style={{ color: "#8d6e63" }}>Origine : {detail.data.origin}</p>}
                        {detail.data.reframe && <p className="text-sm mt-1" style={{ color: "#7fae7e" }}>✦ {detail.data.reframe}</p>}
                      </>
                    )}
                    {detail.type === "pos_belief" && (
                      <>
                        <p className="text-xs mb-0.5" style={{ color: detail.color }}>Croyance positive — {detail.data.branch}</p>
                        <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>✦ {detail.data.belief}</h2>
                        {detail.data.age != null && <p className="text-sm mt-1" style={{ color: "#8d6e63" }}>Âge : {detail.data.age} ans</p>}
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
                  </>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!isEditing && (
                  <button onClick={() => { setIsEditing(true); setEditData({ ...detail.data }); }} className="transition" style={{ color: "#8d6e63" }}>
                    <Pencil className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => { setDetail(null); setIsEditing(false); }} className="transition" style={{ color: "#8d6e63" }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}