import React from "react";
import { ENNEAGRAM_TYPES, CENTERS } from "@/lib/enneagram-data";
import { BookOpen, Activity, Check, AlertTriangle, Users, Zap, Feather } from "lucide-react";

export default function EnneagramSection({ selected, onSelect }) {
  const selectedType = ENNEAGRAM_TYPES.find(t => t.num === selected);

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
      <h2 className="text-white font-semibold mb-1">🔮 Ennéagramme</h2>
      <p className="text-gray-400 text-xs mb-4">9 types de personnalité — centres, ailes et dynamiques</p>

      {/* Type selector grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {ENNEAGRAM_TYPES.map(t => (
          <button
            key={t.num}
            onClick={() => onSelect(t.num)}
            className={`flex flex-col items-center py-2 rounded-lg transition-all ${
              selected === t.num
                ? "bg-white/15 ring-2"
                : "bg-white/5 hover:bg-white/10"
            }`}
            style={selected === t.num ? { boxShadow: `0 0 0 2px ${t.color}` } : {}}
          >
            <span className="text-lg font-black" style={{ color: t.color }}>{t.num}</span>
            <span className="text-[10px] text-gray-400 leading-tight text-center">{t.name}</span>
          </button>
        ))}
      </div>

      {/* Selected type details */}
      {selectedType ? (
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg"
              style={{ backgroundColor: selectedType.color }}>
              {selectedType.num}
            </div>
            <div>
              <h3 className="text-white font-bold">{selectedType.name}</h3>
              <span className="text-xs" style={{ color: CENTERS[selectedType.center].color }}>
                Centre {CENTERS[selectedType.center].label}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-3">{selectedType.desc}</p>

          {/* Définition du type */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Définition du type</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{selectedType.definition}</p>
          </div>

          {/* Fonctionnement détaillé */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Fonctionnement détaillé</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{selectedType.fonctionnement_detaille}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Forces */}
            <div className="bg-green-900/20 rounded-xl p-3 border border-green-700/30">
              <div className="flex items-center gap-1.5 mb-2">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Forces</span>
              </div>
              <ul className="space-y-1.5">
                {selectedType.forces.map((f, i) => (
                  <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5 leading-relaxed">
                    <span className="text-green-400 mt-0.5">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Faiblesses / Pièges */}
            <div className="bg-red-900/20 rounded-xl p-3 border border-red-700/30">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-300 text-xs font-semibold uppercase tracking-wide">Pièges caractéristiques</span>
              </div>
              <ul className="space-y-1.5">
                {selectedType.faiblesses.map((f, i) => (
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
            <p className="text-gray-300 text-xs leading-relaxed">{selectedType.relations}</p>
          </div>

          {/* Ailes */}
          <div className="mt-3 bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-1.5 mb-2">
              <Feather className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 text-xs font-semibold uppercase tracking-wide">Influence des ailes</span>
            </div>
            <div className="flex gap-1.5 mb-2">
              {selectedType.wings.map(w => {
                const wt = ENNEAGRAM_TYPES.find(t => t.num === w);
                return (
                  <span key={w} className="px-2 py-0.5 rounded-full text-xs"
                    style={{ color: wt.color, backgroundColor: wt.color + "20" }}>
                    {w} — {wt.name}
                  </span>
                );
              })}
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{selectedType.ailes}</p>
          </div>

          {/* Stress & Croissance */}
          <div className="mt-3 bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-orange-300 text-xs font-semibold uppercase tracking-wide">Sous stress et en croissance</span>
            </div>
            <div className="flex gap-3 mb-2">
              <div className="flex-1 text-center bg-red-900/15 rounded-lg py-1.5 border border-red-700/20">
                <p className="text-[10px] text-gray-500 mb-0.5">📉 Désintégration</p>
                <span className="text-xs font-bold text-red-400">→ Type {selectedType.stress}</span>
              </div>
              <div className="flex-1 text-center bg-green-900/15 rounded-lg py-1.5 border border-green-700/20">
                <p className="text-[10px] text-gray-500 mb-0.5">📈 Intégration</p>
                <span className="text-xs font-bold text-green-400">→ Type {selectedType.growth}</span>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{selectedType.stress_croissance}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center py-4">Sélectionnez votre type pour voir les détails</p>
      )}

      {/* Center legend */}
      <div className="flex gap-3 mt-4 justify-center">
        {Object.entries(CENTERS).map(([key, c]) => (
          <span key={key} className="flex items-center gap-1 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}