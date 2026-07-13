import React, { useState } from "react";

const POINTS = [
  { num: 9, label: "Médiateur", color: "#FACC2E", angle: 0, desc: "Harmonieux, accommodant, évite les conflits. Voit tous les points de vue et cherche l'unité." },
  { num: 1, label: "Perfectionniste", color: "#82C341", angle: 40, desc: "Idéaliste, rigoureux, intègre. Cherche à améliorer le monde et à vivre selon ses principes." },
  { num: 2, label: "Altruiste", color: "#008000", angle: 80, desc: "Généreux, attentionné, serviable. Trouve sa valeur dans l'amour et le soutien des autres." },
  { num: 3, label: "Battant", color: "#008080", angle: 120, desc: "Ambitieux, efficace, adaptable. Cherche le succès et la reconnaissance par ses accomplissements." },
  { num: 4, label: "Romantique", color: "#5078E8", angle: 160, desc: "Sensible, créatif, authentique. Cherche son identité unique et ressent la vie en profondeur." },
  { num: 5, label: "Observateur", color: "#483D8B", angle: 200, desc: "Analytique, curieux, détaché. Cherche à comprendre le monde par l'observation et la connaissance." },
  { num: 6, label: "Loyal", color: "#C71585", angle: 240, desc: "Fiable, vigilant, engagé. Cherche la sécurité et le soutien, fidèle à ses engagements." },
  { num: 7, label: "Epicurien", color: "#DC143C", angle: 280, desc: "Enthousiaste, spontané, optimiste. Cherche la variété, l'aventure et les expériences positives." },
  { num: 8, label: "Protecteur", color: "#FF4500", angle: 320, desc: "Fort, direct, protecteur. Cherche le contrôle, protège les siens et affirme sa puissance." },
];

// Internal lines: triangle (9-3-6) and hexad (1-4-2-8-5-7-1)
const LINES = [
  [9, 3], [3, 6], [6, 9],
  [1, 4], [4, 2], [2, 8], [8, 5], [5, 7], [7, 1],
];

export default function EnneagramDiagram() {
  const [selected, setSelected] = useState(null);

  const cx = 150, cy = 150, r = 105;

  const coords = {};
  const labelCoords = {};
  POINTS.forEach(p => {
    const rad = (p.angle - 90) * Math.PI / 180;
    coords[p.num] = { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    const labelR = r + 26;
    labelCoords[p.num] = { x: cx + labelR * Math.cos(rad), y: cy + labelR * Math.sin(rad) };
  });

  const getAnchor = (x) => {
    if (x > cx + 15) return "start";
    if (x < cx - 15) return "end";
    return "middle";
  };

  const selPoint = selected ? POINTS.find(p => p.num === selected) : null;

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <h2
        className="text-center text-lg font-semibold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
      >
        ✦ Ennéagramme
      </h2>
      <p className="text-center text-xs mb-4" style={{ color: "#6b7b94" }}>
        Cliquez sur un type pour le découvrir
      </p>

      <svg viewBox="0 0 300 300" className="w-full mx-auto" style={{ maxWidth: 340 }}>
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#707070" strokeWidth="1" opacity="0.5" />

        {/* Internal lines */}
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={coords[a].x}
            y1={coords[a].y}
            x2={coords[b].x}
            y2={coords[b].y}
            stroke="#707070"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}

        {/* Labels outside the circle */}
        {POINTS.map(p => {
          const lc = labelCoords[p.num];
          return (
            <text
              key={`l${p.num}`}
              x={lc.x}
              y={lc.y + 3}
              textAnchor={getAnchor(lc.x)}
              fontSize="9"
              fontWeight="bold"
              fill={p.color}
            >
              {p.label}
            </text>
          );
        })}

        {/* Numbered circles */}
        {POINTS.map(p => {
          const c = coords[p.num];
          const isSelected = selected === p.num;
          return (
            <g
              key={p.num}
              onClick={() => setSelected(isSelected ? null : p.num)}
              style={{ cursor: "pointer" }}
            >
              {isSelected && <circle cx={c.x} cy={c.y} r="18" fill={p.color} opacity="0.2" />}
              <circle
                cx={c.x}
                cy={c.y}
                r="13"
                fill={p.color}
                stroke={isSelected ? "#fff" : "rgba(255,255,255,0.3)"}
                strokeWidth={isSelected ? 2 : 1}
              />
              <text
                x={c.x}
                y={c.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#fff"
              >
                {p.num}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Detail popover */}
      {selPoint && (
        <div
          className="mt-3 rounded-lg p-3 flex items-start gap-3"
          style={{ background: selPoint.color + "18", border: `1px solid ${selPoint.color}40` }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
            style={{ background: selPoint.color }}
          >
            {selPoint.num}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: selPoint.color }}>
                {selPoint.label}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 text-lg leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-xs mt-1" style={{ color: "#9ba8bc" }}>
              {selPoint.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}