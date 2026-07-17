import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const ENNEAGRAM_INFO = [
  { num: 1, name: "Le Réformateur", color: "#82C341", motivation: "Recherche de perfection et d'intégrité.", peur: "Peur d'être défectueux ou mauvais." },
  { num: 2, name: "L'Altruiste", color: "#008000", motivation: "Besoin d'être aimé en aidant les autres.", peur: "Peur de ne pas être digne d'amour si non nécessaire." },
  { num: 3, name: "Le Battant", color: "#008080", motivation: "Recherche de réussite et de valorisation.", peur: "Peur d'être sans valeur en dehors de ses accomplissements." },
  { num: 4, name: "L'Individualiste", color: "#5078E8", motivation: "Quête d'identité et d'authenticité.", peur: "Peur de ne pas avoir d'identité propre ou de signification." },
  { num: 5, name: "L'Observateur", color: "#483D8B", motivation: "Besoin de comprendre et de préserver ses ressources.", peur: "Peur d'être envahi ou incompétent." },
  { num: 6, name: "Le Loyaliste", color: "#C71585", motivation: "Recherche de sécurité et de soutien.", peur: "Peur d'être sans guide ni soutien face au danger." },
  { num: 7, name: "L'Épicurien", color: "#DC143C", motivation: "Recherche de stimulation et d'évitement de la douleur.", peur: "Peur d'être limité ou privé." },
  { num: 8, name: "Le Protecteur", color: "#FF4500", motivation: "Besoin de contrôle et de protection des siens.", peur: "Peur d'être vulnérable ou contrôlé par autrui." },
  { num: 9, name: "Le Médiateur", color: "#FACC2E", motivation: "Recherche de paix et d'harmonie.", peur: "Peur du conflit et de la perte de connexion." },
];

export default function EnneagramInfoCards() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const profiles = await base44.entities.CognitiveProfile.list();
        if (profiles[0]?.enneagram_type) {
          setUserType(profiles[0].enneagram_type);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <div className="mb-6">
      {/* Introduction */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs leading-relaxed" style={{ color: "#9ba8bc" }}>
          L'Ennéagramme est un système de 9 types de personnalité organisés en cercle. Chaque type est structuré autour d'une <strong style={{ color: "#e8d5c4" }}>peur fondamentale</strong> et d'une <strong style={{ color: "#e8d5c4" }}>motivation profonde</strong> qui orientent ses pensées, émotions et comportements. Les types sont reliés entre eux par les <strong style={{ color: "#e8d5c4" }}>ailes</strong> (types adjacents, qui nuancent le type principal) et les <strong style={{ color: "#e8d5c4" }}>flèches d'intégration/désintégration</strong> (types non-adjacents vers lesquels on évolue en croissance ou en stress).
        </p>
      </div>

      {/* 9 type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ENNEAGRAM_INFO.map(t => {
          const isUserType = userType === t.num;
          return (
            <div
              key={t.num}
              className="rounded-xl p-3 transition-all"
              style={{
                background: isUserType ? t.color + "18" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isUserType ? t.color + "60" : "rgba(255,255,255,0.06)"}`,
                boxShadow: isUserType ? `0 0 12px ${t.color}30` : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.num}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#e8d5c4" }}>
                  {t.name}
                </span>
                {isUserType && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full ml-auto" style={{ background: t.color + "30", color: t.color }}>
                    Votre type
                  </span>
                )}
              </div>
              <p className="text-xs mb-1" style={{ color: "#9ba8bc" }}>
                <span className="font-medium" style={{ color: "#7dd3fc" }}>Motivation : </span>
                {t.motivation}
              </p>
              <p className="text-xs" style={{ color: "#9ba8bc" }}>
                <span className="font-medium" style={{ color: "#fda4af" }}>Peur : </span>
                {t.peur}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}