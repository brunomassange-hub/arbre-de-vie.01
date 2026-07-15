import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aggregateData, JOURNAL_TOOLS, LIST_JOURNAL_RECOMMENDATIONS } from "@/lib/analysisEngine";
import { CLINICAL_LISTS } from "@/lib/clinicalCategories";

const LIST_COLORS = {
  trauma: { bg: "rgba(239,68,68,0.05)", border: "rgba(239,68,68,0.15)", text: "#ef4444" },
  rel: { bg: "rgba(244,63,94,0.05)", border: "rgba(244,63,94,0.15)", text: "#f43f5e" },
  conflict: { bg: "rgba(139,92,246,0.05)", border: "rgba(139,92,246,0.15)", text: "#8b5cf6" },
  behavior: { bg: "rgba(234,179,8,0.05)", border: "rgba(234,179,8,0.15)", text: "#eab308" },
  wound: { bg: "rgba(236,72,150,0.05)", border: "rgba(236,72,150,0.15)", text: "#ec4899" },
  need: { bg: "rgba(6,182,212,0.05)", border: "rgba(6,182,212,0.15)", text: "#06b6d4" },
};

export default function AggregateView({ traumaticEvents, links, limitingBeliefs }) {
  const data = aggregateData({ traumaticEvents, links, limitingBeliefs });
  const hasData = Object.keys(data.byList).length > 0;
  if (!hasData) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>📊 Vue agrégée par catégorie</h2>
      <div className="space-y-3">
        {CLINICAL_LISTS.map(list => {
          const items = data.byList[list.id];
          if (!items || items.length === 0) return null;
          const colors = LIST_COLORS[list.id] || LIST_COLORS.trauma;
          const rec = LIST_JOURNAL_RECOMMENDATIONS[list.id];
          const tool = JOURNAL_TOOLS[rec?.tool];
          return (
            <div key={list.id} className="rounded-xl border p-3" style={{ background: colors.bg, borderColor: colors.border }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: colors.text }}>{list.label}</p>
              <div className="space-y-1.5">
                {items.map(item => (
                  <div key={item.key} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-300 flex-1 min-w-0 truncate">{item.label}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: colors.text }}>{item.count} occ.</span>
                      <Link to={`/Journal?theme=${rec?.theme}&tool=${rec?.tool}`}
                        className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-md transition hover:opacity-80"
                        style={{ background: "rgba(139,157,195,0.1)", color: "#8b9dc3" }}>
                        {tool?.icon} {tool?.label}
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}