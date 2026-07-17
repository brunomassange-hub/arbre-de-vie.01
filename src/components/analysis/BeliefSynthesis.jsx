import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { synthesizeBeliefs, JOURNAL_THEMES, LIST_JOURNAL_RECOMMENDATIONS } from "@/lib/analysisEngine";
import { getListLabel } from "@/lib/clinicalCategories";

export default function BeliefSynthesis({ limitingBeliefs }) {
  const data = synthesizeBeliefs({ limitingBeliefs });
  if (data.total === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>🔒 Synthèse des croyances & sens de vie</h2>
      <div className="rounded-xl border p-3 mb-3" style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.15)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "#67e8f9" }}>
          {data.interpretation}
        </p>
      </div>
      {data.byTheme.length > 0 && (
        <div className="space-y-2">
          {data.byTheme.map(theme => {
            const rec = LIST_JOURNAL_RECOMMENDATIONS[theme.listId];
            const journalTheme = JOURNAL_THEMES[rec?.theme];
            return (
              <div key={theme.key} className="rounded-xl border p-3" style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.15)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#67e8f9" }}>{theme.label}</span>
                    <span className="text-[9px] text-gray-500">({getListLabel(theme.listId)})</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{theme.count} croyance{theme.count > 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-0.5 mb-2">
                  {theme.beliefs.map((b, i) => (
                    <p key={i} className="text-[11px] text-gray-400">• {b.belief}</p>
                  ))}
                </div>
                {journalTheme && (
                  <Link to={`/Journal?theme=${rec.theme}`}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition hover:opacity-80"
                    style={{ background: "rgba(139,157,195,0.1)", color: "#8b9dc3" }}>
                    {journalTheme.icon} Aller vers : {journalTheme.label}
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}