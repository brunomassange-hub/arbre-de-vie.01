import React from "react";
import { TYPE_DESCRIPTIONS } from "@/lib/mbti-data";
import { Check, AlertTriangle, Activity, Eye, Users, Zap } from "lucide-react";

export default function MBTITypeInfo({ selectedType }) {
  const info = TYPE_DESCRIPTIONS[selectedType];
  if (!info) return null;

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-indigo-500/20">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-white font-semibold text-lg">{selectedType}</h3>
        <span className="text-indigo-300 text-sm font-medium">— {info.surnom}</span>
      </div>

      {/* Définition du type */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Définition du type</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.definition}</p>
      </div>

      {/* Fonctionnement détaillé */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Fonctionnement détaillé</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.fonctionnement_detaille}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Forces */}
        <div className="bg-green-900/20 rounded-xl p-3 border border-green-700/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Forces</span>
          </div>
          <ul className="space-y-1.5">
            {info.forces.map((f, i) => (
              <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5 leading-relaxed">
                <span className="text-green-400 mt-0.5">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Faiblesses */}
        <div className="bg-red-900/20 rounded-xl p-3 border border-red-700/30">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-300 text-xs font-semibold uppercase tracking-wide">Zones de vigilance</span>
          </div>
          <ul className="space-y-1.5">
            {info.faiblesses.map((f, i) => (
              <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5 leading-relaxed">
                <span className="text-red-400 mt-0.5">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dans les relations */}
      <div className="mt-3 bg-pink-900/15 rounded-xl p-3 border border-pink-700/25">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Users className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-pink-300 text-xs font-semibold uppercase tracking-wide">Dans les relations</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.relations}</p>
      </div>

      {/* Sous stress */}
      <div className="mt-3 bg-orange-900/15 rounded-xl p-3 border border-orange-700/25">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Zap className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-orange-300 text-xs font-semibold uppercase tracking-wide">Sous stress</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.stress}</p>
      </div>
    </div>
  );
}