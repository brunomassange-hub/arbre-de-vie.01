import React from "react";
import { aggregateData } from "@/lib/analysisEngine";

export default function AggregateView({ traumaticEvents, links }) {
  const data = aggregateData({ traumaticEvents, links });

  const hasData = data.traumaTypes.length > 0 || data.relDifficulties.length > 0 || data.psychicConflicts > 0 || data.problematicBehaviors > 0;
  if (!hasData) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>📊 Vue agrégée</h2>
      <div className="space-y-3">
        {data.traumaTypes.length > 0 && (
          <div className="rounded-xl border p-3" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.15)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: "#ef4444" }}>Types de traumatisme</p>
            <div className="space-y-1">
              {data.traumaTypes.map(t => (
                <div key={t.key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{t.label}</span>
                  <span className="text-xs font-bold" style={{ color: "#ef4444" }}>{t.count} occurrence{t.count > 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.relDifficulties.length > 0 && (
          <div className="rounded-xl border p-3" style={{ background: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.15)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: "#f59e0b" }}>Difficultés relationnelles</p>
            <div className="space-y-1">
              {data.relDifficulties.map(d => (
                <div key={d.key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{d.label}</span>
                  <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>{d.count} occurrence{d.count > 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {data.psychicConflicts > 0 && (
            <div className="rounded-xl border p-3" style={{ background: "rgba(139,92,246,0.05)", borderColor: "rgba(139,92,246,0.15)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#8b5cf6" }}>Conflits psychiques</p>
              <p className="text-lg font-bold text-white mt-1">{data.psychicConflicts}</p>
            </div>
          )}
          {data.problematicBehaviors > 0 && (
            <div className="rounded-xl border p-3" style={{ background: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.15)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#eab308" }}>Comportements problématiques</p>
              <p className="text-lg font-bold text-white mt-1">{data.problematicBehaviors}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}