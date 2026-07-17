import React from "react";
import { FUNCTION_DESCRIPTIONS, FUNCTION_SHORT } from "@/lib/mbti-data";

const POSITION_LABELS = ["Dominante", "Auxiliaire", "Tertiaire", "Inférieure"];
const SHADOW_LABELS = ["Opposant", "Critique", "Filou", "Démon"];

export default function EgoOmbreGrid({ functions, selectedType, onFnClick }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* EGO */}
        <div>
          <div className="text-center mb-3">
            <span className="bg-indigo-600/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
              ☀️ EGO
            </span>
          </div>
          <div className="space-y-2">
            {functions.ego.map((fn, i) => {
              const info = FUNCTION_DESCRIPTIONS[fn];
              return (
                <div key={fn} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <button onClick={() => onFnClick(fn)} className="text-lg font-black cursor-pointer hover:underline" style={{ color: info.color }}>
                      {fn}
                    </button>
                    <span className="text-xs font-semibold" style={{ color: info.color + "cc" }}>{FUNCTION_SHORT[fn]}</span>
                    <span className="text-xs text-gray-500 ml-auto">{POSITION_LABELS[i]}</span>
                  </div>
                  <p className="text-white text-xs font-medium">{info.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                  <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed border-t border-white/10 pt-1.5">{info.fonctionnement}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* OMBRE */}
        <div>
          <div className="text-center mb-3">
            <span className="bg-gray-700/50 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-600/30">
              🌑 OMBRE
            </span>
          </div>
          <div className="space-y-2">
            {functions.shadow.map((fn, i) => {
              const info = FUNCTION_DESCRIPTIONS[fn];
              return (
                <div key={fn} className="bg-white/5 rounded-xl p-3 border border-white/5 opacity-80">
                  <div className="flex items-center gap-2 mb-1">
                    <button onClick={() => onFnClick(fn)} className="text-lg font-black cursor-pointer hover:underline" style={{ color: info.color + "99" }}>
                      {fn}
                    </button>
                    <span className="text-xs font-semibold" style={{ color: info.color + "aa" }}>{FUNCTION_SHORT[fn]}</span>
                    <span className="text-xs text-gray-600 ml-auto">{SHADOW_LABELS[i]}</span>
                  </div>
                  <p className="text-gray-300 text-xs font-medium">{info.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                  <p className="text-gray-600 text-[11px] mt-1.5 leading-relaxed border-t border-white/5 pt-1.5">{info.fonctionnement}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}