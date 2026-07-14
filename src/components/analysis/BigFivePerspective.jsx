import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { crossReferenceBigFive, JOURNAL_TOOLS } from "@/lib/analysisEngine";

export default function BigFivePerspective({ bigFive, traumaticEvents, links, aggregated }) {
  const insights = crossReferenceBigFive({ bigFive, traumaticEvents, links, aggregated });

  if (!bigFive) {
    return (
      <div className="mb-8">
        <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>🧬 Perspective Big Five</h2>
        <div className="rounded-xl border p-3" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs text-gray-500">Renseignez votre profil Big Five (page « Force ») pour générer une mise en perspective avec vos données.</p>
        </div>
      </div>
    );
  }

  if (insights.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>🧬 Perspective Big Five</h2>
      <div className="space-y-2">
        {insights.map((insight, i) => {
          const tool = JOURNAL_TOOLS[insight.journal_tool];
          return (
            <div key={i} className="rounded-xl border p-3" style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.15)" }}>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "#a5b4fc" }}>{insight.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">{insight.description}</p>
              <Link to={`/Journal?theme=${insight.journal_theme}&tool=${insight.journal_tool}`}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(139,157,195,0.1)", color: "#8b9dc3" }}>
                {tool.icon} Aller vers : {tool.label}
                <ArrowRight className="w-3 h-3 ml-auto" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}