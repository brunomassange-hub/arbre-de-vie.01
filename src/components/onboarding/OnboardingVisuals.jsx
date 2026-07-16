import React from "react";
import { ScanSearch, BookOpen, Brain, Grid3x3, Heart } from "lucide-react";

const CHAKRA_COLORS = ["#9b59b6", "#3b6ee0", "#00bcd4", "#2ecc71", "#f39c12", "#e67e22", "#e74c3c"];
const CHAKRA_LABELS = ["Spiritualité", "Intuition", "Communication", "Connexion", "Pouvoir", "Créativité", "Stabilité"];

export function TreeVisual({ variant }) {
  const isBlessure = variant === "blessure";
  const isForce = variant === "force";

  const trunkColor = isBlessure ? "#5a3535" : isForce ? "#6b7d3a" : "#6b5d4f";
  const trunkHighlight = variant === "arbre" ? "#4a9d5f" : isBlessure ? "#8b3a3a" : "#7dba5a";
  const rootColor = isBlessure ? "#3a2020" : "#4a3d2f";
  const leafColor = isForce ? "#5dbb5d" : isBlessure ? "#3a2a2a" : "#4a7d4a";

  return (
    <svg viewBox="0 0 200 300" className="w-44 h-64">
      {/* Canopy */}
      <circle cx="100" cy="55" r="42" fill={leafColor} opacity="0.12" />
      <circle cx="72" cy="65" r="22" fill={leafColor} opacity="0.1" />
      <circle cx="128" cy="65" r="22" fill={leafColor} opacity="0.1" />

      {/* Branches */}
      <path d="M100 110 L65 75 M100 105 L135 75 M100 120 L70 95 M100 115 L130 95"
        stroke={trunkColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Trunk */}
      <rect x="92" y="100" width="16" height="100" rx="4" fill={trunkColor}
        stroke={trunkHighlight} strokeWidth={variant === "arbre" ? "2.5" : "1.5"} opacity="0.9" />

      {/* Roots */}
      <path d="M100 200 Q75 225 55 250 M100 200 Q125 225 145 250 M100 200 Q90 230 82 255 M100 200 Q110 230 118 255"
        stroke={rootColor} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Chakra dots + labels (arbre only) */}
      {variant === "arbre" && CHAKRA_COLORS.map((color, i) => (
        <g key={i}>
          <circle cx="100" cy={18 + i * 26} r="5" fill={color} opacity="0.9" />
          <text x="115" y={21 + i * 26} fontSize="7" fill="rgba(255,255,255,0.5)" fontWeight="600">
            {CHAKRA_LABELS[i]}
          </text>
        </g>
      ))}

      {/* Wound marks (blessure) */}
      {isBlessure && (
        <>
          <line x1="90" y1="130" x2="110" y2="140" stroke="#a04040" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="160" x2="110" y2="170" stroke="#a04040" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Sparkles (force) */}
      {isForce && [55, 145, 100].map((x, i) => (
        <circle key={i} cx={x} cy={[55, 60, 38][i]} r="3" fill="#f1c40f" opacity="0.8" />
      ))}
    </svg>
  );
}

export function ArchetypeVisual() {
  const items = [
    { icon: Brain, color: "#818cf8", bg: "rgba(99,102,241,0.15)", label: "MBTI" },
    { icon: Grid3x3, color: "#fbbf24", bg: "rgba(245,158,11,0.15)", label: "Ennéagramme" },
    { icon: Heart, color: "#f472b6", bg: "rgba(236,72,153,0.15)", label: "Attachement" },
  ];
  return (
    <div className="flex items-center justify-center">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center" style={{ marginLeft: i === 0 ? 0 : -12 }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: item.bg, border: `2px solid ${item.color}40` }}>
            <item.icon className="w-8 h-8" style={{ color: item.color }} />
          </div>
          <span className="text-[9px] mt-1 font-semibold" style={{ color: item.color }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function AnalyseVisual() {
  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(59,130,246,0.1)", border: "2px solid rgba(59,130,246,0.3)" }}>
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded"
              style={{ background: `rgba(96,165,250,${0.15 + (i % 3) * 0.25})` }} />
          ))}
        </div>
      </div>
      <ScanSearch className="w-14 h-14 absolute -bottom-3 -right-3" style={{ color: "#60a5fa" }} />
    </div>
  );
}

export function JournalVisual() {
  return (
    <div className="relative">
      <div className="w-28 h-36 rounded-lg flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #c9956b, #b07d50)", boxShadow: "0 6px 16px rgba(0,0,0,0.25)" }}>
        <BookOpen className="w-12 h-12 text-white opacity-80" />
      </div>
      <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "#f0a040", boxShadow: "0 2px 8px rgba(240,160,64,0.4)" }}>
        <Heart className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}