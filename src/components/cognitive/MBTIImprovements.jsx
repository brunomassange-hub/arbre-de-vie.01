import React from "react";
import { TYPE_IMPROVEMENTS } from "@/lib/mbti-data";
import { TrendingUp } from "lucide-react";

export default function MBTIImprovements({ selectedType }) {
  const data = TYPE_IMPROVEMENTS[selectedType];
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur rounded-2xl p-5 mb-5 border border-indigo-500/20">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-indigo-400" />
        <h3 className="text-white font-semibold text-sm">
          Axes d'amélioration personnalisés
        </h3>
        <span className="text-indigo-300 text-xs ml-1">— {selectedType}</span>
      </div>
      <p className="text-gray-400 text-xs mb-4">
        Basés sur votre stack de fonctions cognitives — vos fonctions inférieures et tertiaires sont vos plus grandes zones de croissance.
      </p>
      <div className="space-y-2.5">
        {data.axes.map((axe, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600/40 border border-indigo-400/40 text-indigo-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-white text-xs font-semibold">{axe.titre}</p>
                <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">{axe.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}