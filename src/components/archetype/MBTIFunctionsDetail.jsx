import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { FUNCTION_DESCRIPTIONS, FUNCTION_SHORT } from "@/lib/mbti-data";
import EgoOmbreGrid from "./EgoOmbreGrid";

const MBTI_FUNCTIONS = {
  INTP: { ego: ["Ti", "Ne", "Si", "Fe"], shadow: ["Te", "Ni", "Se", "Fi"] },
  INTJ: { ego: ["Ni", "Te", "Fi", "Se"], shadow: ["Ne", "Ti", "Fe", "Si"] },
  INFP: { ego: ["Fi", "Ne", "Si", "Te"], shadow: ["Fe", "Ni", "Se", "Ti"] },
  INFJ: { ego: ["Ni", "Fe", "Ti", "Se"], shadow: ["Ne", "Fi", "Te", "Si"] },
  ENTP: { ego: ["Ne", "Ti", "Fe", "Si"], shadow: ["Ni", "Te", "Fi", "Se"] },
  ENTJ: { ego: ["Te", "Ni", "Se", "Fi"], shadow: ["Ti", "Ne", "Si", "Fe"] },
  ENFP: { ego: ["Ne", "Fi", "Te", "Si"], shadow: ["Ni", "Fe", "Ti", "Se"] },
  ENFJ: { ego: ["Fe", "Ni", "Se", "Ti"], shadow: ["Fi", "Ne", "Si", "Te"] },
  ISTP: { ego: ["Ti", "Se", "Ni", "Fe"], shadow: ["Te", "Si", "Ne", "Fi"] },
  ISTJ: { ego: ["Si", "Te", "Fi", "Ne"], shadow: ["Se", "Ti", "Fe", "Ni"] },
  ISFP: { ego: ["Fi", "Se", "Ni", "Te"], shadow: ["Fe", "Si", "Ne", "Ti"] },
  ISFJ: { ego: ["Si", "Fe", "Ti", "Ne"], shadow: ["Se", "Fi", "Te", "Ni"] },
  ESTP: { ego: ["Se", "Ti", "Fe", "Ni"], shadow: ["Si", "Te", "Fi", "Ne"] },
  ESTJ: { ego: ["Te", "Si", "Ne", "Fi"], shadow: ["Ti", "Se", "Ni", "Fe"] },
  ESFP: { ego: ["Se", "Fi", "Te", "Ni"], shadow: ["Si", "Fe", "Ti", "Ne"] },
  ESFJ: { ego: ["Fe", "Si", "Ne", "Ti"], shadow: ["Fi", "Se", "Ni", "Te"] },
};

const MBTI_TYPES = Object.keys(MBTI_FUNCTIONS);

export default function MBTIFunctionsDetail() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exploreType, setExploreType] = useState(null);
  const [fnDetail, setFnDetail] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.CognitiveProfile.list();
        if (data[0]?.mbti_type) setUserType(data[0].mbti_type);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  const activeType = userType || exploreType;
  const functions = activeType ? MBTI_FUNCTIONS[activeType] : null;
  const closeModal = () => setFnDetail(null);

  return (
    <div className="mb-6">
      {/* No user type: exploration mode */}
      {!userType && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className="text-center text-lg font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}>
            ✦ Fonctions Cognitives
          </h2>
          <p className="text-center text-xs mb-4" style={{ color: "#6b7b94" }}>
            Explorez les 16 types et leurs fonctions (Ego & Ombre)
          </p>

          <div className="text-center mb-4">
            <p className="text-xs" style={{ color: "#8b9dc3" }}>
              Vous n'avez pas encore défini votre type MBTI.{" "}
              <Link to={createPageUrl("Cognitive")} className="underline" style={{ color: "#a78bfa" }}>
                Faites le test ou choisissez votre type sur la page Personnalité
              </Link>
              {" "}pour voir vos fonctions détaillées automatiquement.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setExploreType(exploreType === type ? null : type)}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  exploreType === type
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Functions display (user type or exploration) */}
      {functions && (
        <>
          {userType && (
            <h2 className="text-center text-lg font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}>
              ✦ Fonctions Cognitives — {userType}
            </h2>
          )}
          <EgoOmbreGrid functions={functions} selectedType={activeType} onFnClick={setFnDetail} />
        </>
      )}

      {/* Function detail modal */}
      {fnDetail && (() => {
        const info = FUNCTION_DESCRIPTIONS[fnDetail];
        return (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={closeModal}>
            <div className="bg-[#0d1f2d] rounded-t-2xl p-6 w-full max-w-lg shadow-2xl border-t border-white/20" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black" style={{ color: info.color }}>{fnDetail}</span>
                  <span className="text-sm font-semibold" style={{ color: info.color + "cc" }}>{FUNCTION_SHORT[fnDetail]}</span>
                </div>
                <button onClick={closeModal} className="text-gray-400 text-2xl leading-none">×</button>
              </div>
              <h3 className="text-white font-semibold mb-1">{info.label}</h3>
              <p className="text-gray-400 text-sm mb-3">{info.desc}</p>
              <p className="text-gray-500 text-xs leading-relaxed border-t border-white/10 pt-3">{info.fonctionnement}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}