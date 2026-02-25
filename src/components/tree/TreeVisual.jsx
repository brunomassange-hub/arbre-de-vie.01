import React from "react";

const BRANCHES_CONFIG = [
  { name: "Corps", color: "#e74c3c", angle: -60, x: 160, y: 180 },
  { name: "Esprit", color: "#3498db", angle: -30, x: 220, y: 130 },
  { name: "Âme", color: "#9b59b6", angle: 0, x: 270, y: 100 },
  { name: "Social", color: "#f39c12", angle: 30, x: 320, y: 130 },
  { name: "Professionnel", color: "#27ae60", angle: 60, x: 370, y: 180 },
  { name: "Créativité", color: "#e91e63", angle: -15, x: 250, y: 80 },
];

const icons = {
  Corps: "💪",
  Esprit: "🧠",
  "Âme": "✨",
  Social: "👥",
  Professionnel: "💼",
  "Créativité": "🎨",
};

export default function TreeVisual({ branches, profile }) {
  const width = 500;
  const height = 480;
  const trunkX = 250;
  const trunkBaseY = 440;
  const trunkTopY = 260;

  const branchEndpoints = [
    { x: 100, y: 170 },
    { x: 150, y: 110 },
    { x: 220, y: 75 },
    { x: 310, y: 75 },
    { x: 370, y: 110 },
    { x: 410, y: 170 },
  ];

  return (
    <div className="w-full max-w-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full drop-shadow-2xl">
        {/* Ground */}
        <ellipse cx="250" cy="445" rx="200" ry="18" fill="#1a3a1a" opacity="0.6" />

        {/* Roots */}
        {[
          { x1: 250, y1: 440, x2: 130, y2: 470, cx1: 200, cy1: 455, cx2: 150, cy2: 460 },
          { x1: 250, y1: 440, x2: 185, y2: 475, cx1: 220, cy1: 458, cx2: 195, cy2: 468 },
          { x1: 250, y1: 440, x2: 250, y2: 478, cx1: 250, cy1: 458, cx2: 250, cy2: 470 },
          { x1: 250, y1: 440, x2: 315, y2: 475, cx1: 280, cy1: 458, cx2: 305, cy2: 468 },
          { x1: 250, y1: 440, x2: 370, y2: 470, cx1: 300, cy1: 455, cx2: 350, cy2: 460 },
        ].map((r, i) => (
          <path
            key={i}
            d={`M ${r.x1} ${r.y1} Q ${r.cx1} ${r.cy1} ${r.cx2} ${r.cy2} T ${r.x2} ${r.y2}`}
            stroke="#5d4037"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}

        {/* Trunk */}
        <path
          d={`M 225 ${trunkBaseY} Q 230 350 ${trunkX} ${trunkTopY}`}
          stroke="#6d4c41"
          strokeWidth="36"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M 275 ${trunkBaseY} Q 270 350 ${trunkX} ${trunkTopY}`}
          stroke="#8d6e63"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Foliage base (crown) */}
        <ellipse cx="250" cy="160" rx="120" ry="95" fill="#1b5e20" opacity="0.4" />
        <ellipse cx="250" cy="150" rx="100" ry="80" fill="#2e7d32" opacity="0.5" />

        {/* Branches */}
        {branches.map((branch, i) => {
          const end = branchEndpoints[i];
          const score = branch.score || 0;
          const color = branch.color;
          const midX = (trunkX + end.x) / 2 + (i < 3 ? -20 : 20);
          const midY = trunkTopY - 20;
          const leafRadius = 20 + (score / 100) * 25;

          return (
            <g key={branch.name}>
              {/* Branch line */}
              <path
                d={`M ${trunkX} ${trunkTopY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                stroke="#5d4037"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              {/* Leaf cluster */}
              <circle cx={end.x} cy={end.y} r={leafRadius + 8} fill={color} opacity="0.2" />
              <circle cx={end.x} cy={end.y} r={leafRadius} fill={color} opacity="0.7" />
              {/* Progress arc */}
              {score > 0 && (
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={leafRadius + 5}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray={`${(score / 100) * 2 * Math.PI * (leafRadius + 5)} ${2 * Math.PI * (leafRadius + 5)}`}
                  strokeDashoffset={Math.PI * (leafRadius + 5) / 2}
                  opacity="0.9"
                  strokeLinecap="round"
                />
              )}
              {/* Icon */}
              <text x={end.x} y={end.y - 4} textAnchor="middle" fontSize="14">{icons[branch.name]}</text>
              {/* Score */}
              <text x={end.x} y={end.y + 13} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                {score}%
              </text>
              {/* Branch label */}
              <text
                x={end.x + (i < 3 ? -leafRadius - 10 : leafRadius + 10)}
                y={end.y}
                textAnchor={i < 3 ? "end" : "start"}
                fontSize="11"
                fill="white"
                fontWeight="600"
                opacity="0.9"
              >
                {branch.name}
              </text>
            </g>
          );
        })}

        {/* Center of tree label */}
        <text x="250" y={trunkTopY + 30} textAnchor="middle" fontSize="10" fill="#a5d6a7" opacity="0.8">
          {profile?.identity ? "✦ " + profile.identity.slice(0, 20) + (profile.identity.length > 20 ? "…" : "") : "Définir mon identité"}
        </text>

        {/* Roots label */}
        <text x="250" y="490" textAnchor="middle" fontSize="10" fill="#81c784" opacity="0.7">
          🌱 {profile?.personal_history ? profile.personal_history.slice(0, 28) + "…" : "Mes racines & histoire"}
        </text>
      </svg>
    </div>
  );
}