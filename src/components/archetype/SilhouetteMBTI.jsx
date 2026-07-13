import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { FUNCTION_DESCRIPTIONS } from "@/lib/mbti-data";

// MBTI cognitive function stacks (ego = Dominante, Auxiliaire, Tertiaire, Inférieure)
const MBTI_FUNCTIONS = {
  INTP: { ego: ["Ti", "Ne", "Si", "Fe"], shadow: ["Te", "Ni", "Se", "Fi"] },
  INTJ: { ego: ["Ni", "Te", "Fi", "Se"], shadow: ["Ne", "Ti", "Fe", "Si"] },
  INFP: { ego: ["Fi", "Ne", "Si", "Te"], shadow: ["Fe", "Ni", "Se", "Ti"] },
  INFJ: { ego: ["Ni", "Fe", "Ti", "Se"], shadow: ["Ne", "Fi", "Te", "Si"] },
  ENTP: { ego: ["Ne", "Ti", "Fe", "Si"], shadow: ["Ni", "Te", "Fi", "Se"] },
  ENTJ: { ego: ["Te", "Ni", "Se", "Fi"], shadow: ["Ti", "Ne", "Si", "Fe"] },
  ENFP: { ego: ["Ne", "Fi", "Te", "Si"], shadow: ["Ni", "Fe", "Ti", "Se"] },
  ENFJ: { ego: ["Fe", "Ni", "Se", "Ti"], shadow: ["Fi", "Ne", "Si", "Te"] },
  ISTP: { ego: ["Ti", "Se", "Ni", "Fe"], shadow: ["Te", "Si", "Ne", "Fi"] },
  ISTJ: { ego: ["Si", "Te", "Fi", "Ne"], shadow: ["Se", "Ti", "Fe", "Ni"] },
  ISFP: { ego: ["Fi", "Se", "Ni", "Te"], shadow: ["Fe", "Si", "Ne", "Ti"] },
  ISFJ: { ego: ["Si", "Fe", "Ti", "Ne"], shadow: ["Se", "Fi", "Te", "Ni"] },
  ESTP: { ego: ["Se", "Ti", "Fe", "Ni"], shadow: ["Si", "Te", "Fi", "Ne"] },
  ESTJ: { ego: ["Te", "Si", "Ne", "Fi"], shadow: ["Ti", "Se", "Ni", "Fe"] },
  ESFP: { ego: ["Se", "Fi", "Te", "Ni"], shadow: ["Si", "Fe", "Ti", "Ne"] },
  ESFJ: { ego: ["Fe", "Si", "Ne", "Ti"], shadow: ["Fi", "Se", "Ni", "Te"] },
};

const POSITION_LABELS = ["Dominante", "Auxiliaire", "Tertiaire", "Inférieure"];

// Dot positions on the silhouette (viewBox 0 0 200 420)
// Tête: Ni (sommet), Ti (cerveau droite sujet), Ne (oreille gauche sujet), Si (haut tête)
// Gorge: Te · Torse: Fe/Fi · Bassin: Se
const DOTS = [
  { fn: "Ni", x: 100, y: 17 },   // Sommet du crâne
  { fn: "Ti", x: 84, y: 38 },    // Cerveau — côté droit du sujet (gauche écran), proche du centre
  { fn: "Ne", x: 122, y: 40 },   // Oreille gauche du sujet (droite écran)
  { fn: "Te", x: 100, y: 72 },   // Gorge
  { fn: "Fe", x: 118, y: 130 },  // Torse — légèrement à droite écran (gauche sujet), niveau cœur
  { fn: "Fi", x: 44, y: 150 },   // Bras droit du sujet (gauche écran), entre Fe et Si
  { fn: "Se", x: 100, y: 200 },  // Bassin — centre
  { fn: "Si", x: 120, y: 175 },  // Ventre — côté gauche du sujet (droite écran), entre Fi et Se
];

// Chakra labels aligned with function dot y-positions
const CHAKRA_LABELS = [
  { y: 17, name: "Spiritualité", sub: "Solitude / Paix", color: "#800080" },
  { y: 39, name: "Intuition", sub: "Colère / Clarté", color: "#3b6ee0" },
  { y: 72, name: "Communication", sub: "Anxiété / Assertivité", color: "#008080" },
  { y: 130, name: "Connexion", sub: "Amour / Peur", color: "#008000" },
  { y: 150, name: "Pouvoir", sub: "Pouvoir / Culpabilité", color: "#FFA500" },
  { y: 175, name: "Créativité", sub: "Plaisir / Honte", color: "#D2691E" },
  { y: 200, name: "Stabilité", sub: "Tristesse / Joie", color: "#dc3030" },
];

export default function SilhouetteMBTI() {
  const [mbtiType, setMbtiType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.CognitiveProfile.list()
      .then((data) => {
        if (data[0]?.mbti_type) setMbtiType(data[0].mbti_type);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const functions = mbtiType ? MBTI_FUNCTIONS[mbtiType] : null;
  const egoSet = functions ? new Set(functions.ego) : new Set();

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <h2
        className="text-center text-lg font-semibold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
      >
        ✦ Cartographie Cognitive
      </h2>
      <p className="text-center text-xs mb-4" style={{ color: "#6b7b94" }}>
        {loading
          ? "Chargement…"
          : mbtiType
          ? `Type ${mbtiType} — fonctions actives mises en surbrillance`
          : "Définissez votre type MBTI sur la page Personnalité"}
      </p>

      <svg viewBox="-90 0 290 420" className="w-full mx-auto" style={{ maxWidth: 320 }}>
        {/* Silhouette body */}
        <g fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5">
          {/* Head */}
          <rect x="75" y="12" width="50" height="55" rx="12" />
          {/* Neck */}
          <rect x="88" y="65" width="24" height="14" />
          {/* Torso */}
          <path d="M58 82 L142 82 L136 215 L64 215 Z" />
          {/* Left arm */}
          <rect x="28" y="88" width="28" height="130" rx="10" />
          {/* Right arm */}
          <rect x="144" y="88" width="28" height="130" rx="10" />
          {/* Left leg */}
          <rect x="70" y="215" width="28" height="180" rx="8" />
          {/* Right leg */}
          <rect x="102" y="215" width="28" height="180" rx="8" />
        </g>

        {/* Zone labels */}
        <text x="100" y="148" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.2)">
          Torse
        </text>
        <text x="100" y="192" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.2)">
          Bassin
        </text>

        {/* Chakra labels — left side, aligned with function dots */}
        {CHAKRA_LABELS.map(({ y, name, sub, color }) => (
          <g key={name}>
            <line x1="-5" y1={y} x2="20" y2={y} stroke={color} strokeWidth="0.5" strokeDasharray="1.5,1.5" opacity="0.5" />
            <text x="-8" y={y + 1.5} textAnchor="end" fontSize="7" fontWeight="bold" fill={color}>
              {name}
            </text>
            <text x="-8" y={y + 10} textAnchor="end" fontSize="5" fill="#6b7b94" fontStyle="italic">
              {sub}
            </text>
          </g>
        ))}

        {/* Function dots */}
        {DOTS.map(({ fn, x, y }) => {
          const isActive = egoSet.has(fn);
          const info = FUNCTION_DESCRIPTIONS[fn];
          const color = isActive ? info.color : "#4a5568";
          const opacity = isActive ? 1 : 0.3;

          return (
            <g key={fn} opacity={opacity}>
              {isActive && <circle cx={x} cy={y} r="14" fill={color} opacity="0.18" />}
              <circle cx={x} cy={y} r="9" fill={color} stroke="#fff" strokeWidth="1.5" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="#fff"
              >
                {fn}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text x="100" y="408" textAnchor="middle" fontSize="6" fill="#4a5568" fontStyle="italic">
          Silhouette vue de face — gauche/droite anatomiques du sujet
        </text>
      </svg>

      {/* Hierarchy legend */}
      {functions && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {functions.ego.map((fn, i) => {
            const info = FUNCTION_DESCRIPTIONS[fn];
            return (
              <div
                key={fn}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                style={{ background: info.color + "15" }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: info.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold" style={{ color: info.color }}>
                    {fn}
                  </span>
                  <span className="text-[10px] ml-1" style={{ color: "#6b7b94" }}>
                    {POSITION_LABELS[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}