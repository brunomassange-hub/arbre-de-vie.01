import React from "react";
import { synthesizeBeliefs } from "@/lib/analysisEngine";

export default function BeliefSynthesis({ limitingBeliefs }) {
  const data = synthesizeBeliefs({ limitingBeliefs });
  if (data.total === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>🔒 Synthèse des croyances</h2>
      <div className="rounded-xl border p-3 mb-3" style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.15)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "#67e8f9" }}>
          <span className="font-semibold">Sens de vie — </span>{data.interpretation}
        </p>
      </div>
      <div className="space-y-2">
        {data.byTheme.map(theme => (
          <div key={theme.key} className="rounded-xl border p-3" style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.15)" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: "#67e8f9" }}>{theme.label}</span>
              <span className="text-[10px] text-gray-500">{theme.count} croyance{theme.count > 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-0.5">
              {theme.beliefs.map((b, i) => (
                <p key={i} className="text-[11px] text-gray-400">• {b.belief}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}