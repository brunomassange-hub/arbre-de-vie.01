import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ATTACHMENT_STYLES } from "@/lib/attachment-data";

const QUADRANTS = [
  {
    style: "secure",
    title: "Sécure",
    desc: "À l'aise avec l'intimité et l'autonomie. Fait confiance naturellement, communique ouvertement ses besoins.",
    axes: "Anxiété ↓ · Évitement ↓",
  },
  {
    style: "avoidant",
    title: "Évitant-détaché",
    desc: "Valorise l'indépendance. Inconfort avec l'intimité émotionnelle, garde une distance.",
    axes: "Anxiété ↓ · Évitement ↑",
  },
  {
    style: "anxious",
    title: "Anxieux-préoccupé",
    desc: "Désire la proximité, craint l'abandon. Besoin constant de réassurance.",
    axes: "Anxiété ↑ · Évitement ↓",
  },
  {
    style: "fearful",
    title: "Craintif-évitant",
    desc: "Veut la proximité mais en a peur. Oscille entre rapprochement et fuite.",
    axes: "Anxiété ↑ · Évitement ↑",
  },
];

export default function AttachmentGrid() {
  const [userStyle, setUserStyle] = useState(null);

  useEffect(() => {
    base44.entities.CognitiveProfile.list().then(data => {
      if (data[0]?.attachment_style) setUserStyle(data[0].attachment_style);
    });
  }, []);

  return (
    <div className="mt-8 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}>
        💝 Styles d'attachement
      </h2>
      <p className="text-xs mb-5" style={{ color: "#6b7b94" }}>
        Modèle à 2 dimensions : anxiété × évitement — Mary Ainsworth & Mary Main
      </p>

      {/* Grid with axes */}
      <div className="flex gap-2">
        {/* Y axis label */}
        <div className="flex items-center justify-center" style={{ width: "24px" }}>
          <span className="text-[10px] font-bold tracking-widest" style={{ color: "#8b9dc3", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            ANXIÉTÉ ↑
          </span>
        </div>

        {/* Grid + X axis */}
        <div className="flex-1">
          <div className="relative">
            <div className="grid grid-cols-2 gap-1.5">
              {QUADRANTS.map(q => {
                const info = ATTACHMENT_STYLES[q.style];
                const isActive = userStyle === q.style;
                return (
                  <div
                    key={q.style}
                    className="p-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? info.color + "15" : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${isActive ? info.color : "rgba(255,255,255,0.08)"}`,
                      boxShadow: isActive ? `0 0 16px ${info.color}40` : "none",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-base">{info.icon}</span>
                      <h3 className="text-sm font-bold" style={{ color: isActive ? info.color : "#e8d5c4" }}>
                        {q.title}
                      </h3>
                      {isActive && (
                        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ background: info.color + "25", color: info.color }}>
                          VOTRE STYLE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed mb-1.5" style={{ color: "#9ba8bc" }}>
                      {q.desc}
                    </p>
                    <p className="text-[9px] font-semibold" style={{ color: isActive ? info.color + "aa" : "#4a5568" }}>
                      {q.axes}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Central overlay box */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg text-center" style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p className="text-[10px] font-bold tracking-wide" style={{ color: "#e8d5c4" }}>
                  4 TYPES
                </p>
                <p className="text-[8px]" style={{ color: "#6b7b94" }}>
                  Ainsworth · Main
                </p>
              </div>
            </div>
          </div>

          {/* X axis label */}
          <div className="flex justify-center mt-2">
            <span className="text-[10px] font-bold tracking-widest" style={{ color: "#8b9dc3" }}>
              ÉVITEMENT →
            </span>
          </div>
        </div>
      </div>

      {userStyle && (
        <div className="mt-4 text-center text-xs" style={{ color: ATTACHMENT_STYLES[userStyle].color }}>
          ✓ Votre style d'attachement : {ATTACHMENT_STYLES[userStyle].label}
        </div>
      )}
    </div>
  );
}