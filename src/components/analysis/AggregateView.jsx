import React from "react";
import { aggregateData } from "@/lib/analysisEngine";
import { CLINICAL_LISTS } from "@/lib/clinicalCategories";

const LIST_COLORS = {
  trauma: { bg: "rgba(239,68,68,0.05)", border: "rgba(239,68,68,0.15)", text: "#ef4444" },
  rel: { bg: "rgba(244,63,94,0.05)", border: "rgba(244,63,94,0.15)", text: "#f43f5e" },
  conflict: { bg: "rgba(139,92,246,0.05)", border: "rgba(139,92,246,0.15)", text: "#8b5cf6" },
  behavior: { bg: "rgba(234,179,8,0.05)", border: "rgba(234,179,8,0.15)", text: "#eab308" },
  wound: { bg: "rgba(236,72,150,0.05)", border: "rgba(236,72,150,0.15)", text: "#ec4899" },
  need: { bg: "rgba(6,182,212,0.05)", border: "rgba(6,182,212,0.15)", text: "#06b6d4" },
};

export default function AggregateView({ traumaticEvents, links, limitingBeliefs, positiveEvents = [] }) {
  const data = aggregateData({ traumaticEvents, links, limitingBeliefs, positiveEvents });
  const hasData = Object.keys(data.byList).length > 0;
  if (!hasData) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>📊 Vue agrégée par catégorie</h2>
      <div className="space-y-2">
        {CLINICAL_LISTS.map(list => {
          const items = data.byList[list.id];
          if (!items || items.length === 0) return null;
          const colors = LIST_COLORS[list.id] || LIST_COLORS.trauma;
          const total = items.reduce((sum, item) => sum + item.count, 0);
          return (
            <div key={list.id} className="rounded-xl border p-3 flex items-center justify-between gap-2"
              style={{ background: colors.bg, borderColor: colors.border }}>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: colors.text }}>{list.label}</span>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: colors.text }}>{total} occ.</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}