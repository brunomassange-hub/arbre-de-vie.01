import React from "react";
import { TYPE_META } from "@/lib/enneagram-quiz-data";

// Graphique en barres des pourcentages des 9 types.
// Alimenté par la même donnée source (enneagram_scores) que le radar :
// aucun recalcul ni stockage dupliqué.
export default function EnneagramBars({ scores }) {
  if (!Array.isArray(scores) || scores.length !== 9) return null;

  const rows = TYPE_META.map((meta, i) => ({
    n: meta.n,
    name: meta.name,
    color: meta.color,
    pct: Math.max(0, Math.min(100, Number(scores[i]) || 0)),
  })).sort((a, b) => b.pct - a.pct);

  return (
    <div className="space-y-1.5 mb-4">
      {rows.map(({ n, name, color, pct }) => (
        <div key={n} className="flex items-center gap-2">
          <span className="text-xs font-bold w-5 text-center" style={{ color }}>{n}</span>
          <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-xs text-gray-300 w-10 text-right">{pct.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}