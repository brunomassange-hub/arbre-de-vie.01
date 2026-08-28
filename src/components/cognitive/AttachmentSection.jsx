import React from "react";
import { ATTACHMENT_STYLES } from "@/lib/attachment-data";
import { Eye, Activity, Check, AlertTriangle, Zap, Sparkles } from "lucide-react";

export default function AttachmentSection({ style }) {
  const info = style ? ATTACHMENT_STYLES[style] : null;

  if (!info) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        Faites le test pour découvrir votre style d'attachement
      </p>
    );
  }

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: info.color + "20", border: `2px solid ${info.color}` }}>
          {info.icon}
        </div>
        <div>
          <h3 className="text-white font-bold">{info.label}</h3>
          <span className="text-xs" style={{ color: info.color }}>Style d'attachement</span>
        </div>
      </div>

      {/* Définition du style */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Eye className="w-3.5 h-3.5" style={{ color: info.color }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: info.color }}>Définition du style</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.definition}</p>
      </div>

      {/* Fonctionnement détaillé */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Activity className="w-3.5 h-3.5" style={{ color: info.color }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: info.color }}>Fonctionnement détaillé</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.fonctionnement_detaille}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Forces */}
        <div className="bg-green-900/20 rounded-xl p-3 border border-green-700/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Forces relationnelles</span>
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

        {/* Faiblesses / Zones de vigilance */}
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

      {/* Déclencheurs de stress */}
      <div className="mt-3 bg-orange-900/15 rounded-xl p-3 border border-orange-700/25">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Zap className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-orange-300 text-xs font-semibold uppercase tracking-wide">Déclencheurs de stress</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{info.stress}</p>
      </div>

      {/* Pistes de développement */}
      <div className="mt-3 bg-indigo-900/15 rounded-xl p-3 border border-indigo-700/25">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Pistes de développement</span>
        </div>
        <ul className="space-y-1.5">
          {info.developpement.map((d, i) => (
            <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5 leading-relaxed">
              <span className="text-indigo-400 mt-0.5">•</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}