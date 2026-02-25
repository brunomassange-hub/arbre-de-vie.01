import React, { useState } from "react";

const BRANCHES = [
  { name: "Physique",     side: "left",  index: 0, color: "#e74c3c", icon: "💪" },
  { name: "Social",       side: "left",  index: 1, color: "#f39c12", icon: "👥" },
  { name: "Intellectuel", side: "left",  index: 2, color: "#3498db", icon: "🧠" },
  { name: "Émotionnel",   side: "right", index: 0, color: "#e91e63", icon: "💗" },
  { name: "Artistique",   side: "right", index: 1, color: "#9b59b6", icon: "🎨" },
  { name: "Spirituel",    side: "right", index: 2, color: "#27ae60", icon: "✨" },
];

// Branch endpoints: left branches go up-left, right branches go up-right
// index 0 = lowest (near trunk base), index 2 = highest (near top)
const getBranchEndpoint = (side, index) => {
  const trunkX = 250;
  // Trunk goes from y=420 (base) to y=120 (top)
  // index 0 = low branch ~ y=340, index 1 = mid ~ y=240, index 2 = high ~ y=155
  const yPositions = [340, 240, 155];
  const yStart = yPositions[index];

  if (side === "left") {
    const xEnds = [100, 80, 90];
    const yEnds = [yPositions[index] - 60, yPositions[index] - 70, yPositions[index] - 65];
    return { x1: trunkX, y1: yStart, x2: xEnds[index], y2: yEnds[index] };
  } else {
    const xEnds = [400, 420, 410];
    const yEnds = [yPositions[index] - 60, yPositions[index] - 70, yPositions[index] - 65];
    return { x1: trunkX, y1: yStart, x2: xEnds[index], y2: yEnds[index] };
  }
};

const EMOTION_COLORS = {
  Peur: "#6366f1", Colère: "#ef4444", Tristesse: "#3b82f6",
  Honte: "#f59e0b", Dégoût: "#84cc16", Abandon: "#ec4899",
  Trahison: "#f97316", Impuissance: "#8b5cf6"
};

export default function TreeVisual({ beliefs, events, links, onBranchClick, onTrunkClick, onRootClick }) {
  const [hoveredBranch, setHoveredBranch] = useState(null);

  const width = 500;
  const height = 520;
  const trunkX = 250;

  // Sort events by age for trunk display
  const sortedEvents = [...(events || [])].sort((a, b) => a.age - b.age);

  // Count beliefs per branch
  const beliefCount = (branchName) => (beliefs || []).filter(b => b.branch === branchName).length;

  return (
    <div className="w-full max-w-lg relative select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full drop-shadow-2xl">

        {/* Ground */}
        <ellipse cx="250" cy="455" rx="195" ry="16" fill="#1a3a1a" opacity="0.5" />

        {/* === ROOTS === */}
        {/* 5 roots spreading out */}
        {[
          { x2: 110, y2: 490, cx1: 190, cy1: 465, cx2: 140, cy2: 478 },
          { x2: 175, y2: 495, cx1: 215, cy1: 468, cx2: 188, cy2: 482 },
          { x2: 250, y2: 498, cx1: 250, cy1: 468, cx2: 250, cy2: 485 },
          { x2: 325, y2: 495, cx1: 285, cy1: 468, cx2: 312, cy2: 482 },
          { x2: 390, y2: 490, cx1: 310, cy1: 465, cx2: 360, cy2: 478 },
        ].map((r, i) => (
          <path
            key={i}
            d={`M ${trunkX} 450 Q ${r.cx1} ${r.cy1} ${r.cx2} ${r.cy2} T ${r.x2} ${r.y2}`}
            stroke="#5d4037"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}

        {/* Root link dots */}
        {(links || []).slice(0, 8).map((link, i) => {
          const angles = [-80, -55, -30, -10, 10, 30, 55, 80];
          const angle = (angles[i] || i * 20 - 40) * Math.PI / 180;
          const r = 75 + (i % 3) * 15;
          const cx = trunkX + Math.sin(angle) * r;
          const cy = 458 + Math.cos(angle) * 18 + (i % 2) * 8;
          const typeColors = { Famille: "#ef4444", "Ami(e)": "#f59e0b", Partenaire: "#ec4899", Mentor: "#8b5cf6", Collègue: "#3b82f6", Autre: "#6b7280" };
          return (
            <g key={link.id} className="cursor-pointer" onClick={() => onRootClick && onRootClick(link)}>
              <circle cx={cx} cy={cy} r={7} fill={typeColors[link.type] || "#6b7280"} opacity="0.9" />
              <circle cx={cx} cy={cy} r={9} fill="none" stroke={typeColors[link.type] || "#6b7280"} strokeWidth="1.5" opacity="0.5" />
              <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">
                {link.name.charAt(0).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Clickable root zone */}
        <ellipse cx="250" cy="472" rx="150" ry="22" fill="transparent" className="cursor-pointer"
          onClick={() => onRootClick && onRootClick(null)} />

        {/* === TRUNK === */}
        {/* Trunk shadow */}
        <path d={`M 228 450 Q 233 300 ${trunkX} 120`} stroke="#4e342e" strokeWidth="42" fill="none" strokeLinecap="round" />
        {/* Trunk main */}
        <path d={`M 228 450 Q 233 300 ${trunkX} 120`} stroke="#6d4c41" strokeWidth="36" fill="none" strokeLinecap="round" />
        {/* Trunk highlight */}
        <path d={`M 242 450 Q 244 300 248 120`} stroke="#8d6e63" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.4" />

        {/* Trauma event markers on trunk */}
        {sortedEvents.map((event, i) => {
          // Map age to trunk y position: age 0 = y~440, age 50+ = y~130
          const maxAge = Math.max(...sortedEvents.map(e => e.age), 30);
          const t = event.age / Math.max(maxAge, 1);
          const ty = 435 - t * 290;
          const tx = trunkX - 5 + Math.sin(i * 1.8) * 3;
          const eColor = EMOTION_COLORS[event.emotion] || "#888";
          return (
            <g key={event.id} className="cursor-pointer" onClick={() => onTrunkClick && onTrunkClick(event)}>
              <circle cx={tx} cy={ty} r={8} fill={eColor} opacity="0.85" />
              <circle cx={tx} cy={ty} r={10} fill="none" stroke={eColor} strokeWidth="2" opacity="0.4" />
              <text x={tx} y={ty + 3} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">{event.age}</text>
            </g>
          );
        })}

        {/* Trunk click zone */}
        <path d={`M 215 450 Q 220 300 235 120 L 265 120 Q 280 300 285 450 Z`}
          fill="transparent" className="cursor-pointer"
          onClick={() => onTrunkClick && onTrunkClick(null)} />

        {/* === FOLIAGE BASE === */}
        <ellipse cx="250" cy="155" rx="125" ry="90" fill="#1b5e20" opacity="0.25" />
        <ellipse cx="250" cy="145" rx="105" ry="75" fill="#2e7d32" opacity="0.3" />

        {/* === BRANCHES === */}
        {BRANCHES.map((branch) => {
          const ep = getBranchEndpoint(branch.side, branch.index);
          const midX = (ep.x1 + ep.x2) / 2 + (branch.side === "left" ? -25 : 25);
          const midY = (ep.y1 + ep.y2) / 2 - 10;
          const count = beliefCount(branch.name);
          const isHovered = hoveredBranch === branch.name;

          return (
            <g key={branch.name}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredBranch(branch.name)}
              onMouseLeave={() => setHoveredBranch(null)}
              onClick={() => onBranchClick && onBranchClick(branch)}
            >
              {/* Branch line */}
              <path
                d={`M ${ep.x1} ${ep.y1} Q ${midX} ${midY} ${ep.x2} ${ep.y2}`}
                stroke={isHovered ? branch.color : "#5d4037"}
                strokeWidth={isHovered ? 10 : 8}
                fill="none"
                strokeLinecap="round"
                style={{ transition: "stroke 0.2s" }}
              />

              {/* Leaf cluster at end */}
              <circle cx={ep.x2} cy={ep.y2} r={22} fill={branch.color} opacity="0.15" />
              <circle cx={ep.x2} cy={ep.y2} r={16} fill={branch.color} opacity={isHovered ? 0.85 : 0.55} style={{ transition: "opacity 0.2s" }} />

              {/* Belief nodes along branch */}
              {Array.from({ length: count }).map((_, ni) => {
                const t = (ni + 1) / (count + 1);
                const bx = ep.x1 + t * (ep.x2 - ep.x1) + (branch.side === "left" ? -25 : 25) * t * (1 - t) * 4;
                const by = ep.y1 + t * (ep.y2 - ep.y1) - 10 * t * (1 - t) * 4;
                return (
                  <g key={ni}>
                    <circle cx={bx} cy={by} r={5} fill={branch.color} opacity="0.9" />
                    <circle cx={bx} cy={by} r={7} fill="none" stroke={branch.color} strokeWidth="1.5" opacity="0.5" />
                  </g>
                );
              })}

              {/* Icon at tip */}
              <text x={ep.x2} y={ep.y2 + 5} textAnchor="middle" fontSize="12">{branch.icon}</text>

              {/* Branch label */}
              <text
                x={ep.x2 + (branch.side === "left" ? -24 : 24)}
                y={ep.y2 - 20}
                textAnchor={branch.side === "left" ? "end" : "start"}
                fontSize="10"
                fill="white"
                fontWeight="600"
                opacity={isHovered ? 1 : 0.75}
              >
                {branch.name}
              </text>

              {/* Belief count badge */}
              {count > 0 && (
                <g>
                  <circle cx={ep.x2 + (branch.side === "left" ? -16 : 16)} cy={ep.y2 - 14} r={8} fill={branch.color} />
                  <text x={ep.x2 + (branch.side === "left" ? -16 : 16)} y={ep.y2 - 10} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">{count}</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Root label */}
        <text x="250" y="510" textAnchor="middle" fontSize="9" fill="#81c784" opacity="0.6">
          🌱 Racines — liens & relations ({(links || []).length})
        </text>
        {/* Trunk label */}
        <text x="315" y="290" textAnchor="start" fontSize="9" fill="#a1887f" opacity="0.7">
          🌲 Tronc
        </text>
        <text x="315" y="302" textAnchor="start" fontSize="9" fill="#a1887f" opacity="0.7">
          ({(events || []).length} événements)
        </text>
      </svg>
    </div>
  );
}