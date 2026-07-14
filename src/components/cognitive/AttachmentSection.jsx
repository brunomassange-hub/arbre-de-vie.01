import React from "react";
import { ATTACHMENT_STYLES } from "@/lib/attachment-data";

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

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: info.color }}>Caractéristiques principales</p>
          <p className="text-gray-400 text-xs leading-relaxed">{info.caractéristiques}</p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: info.color }}>Peur centrale</p>
          <p className="text-gray-400 text-xs leading-relaxed">{info.peur}</p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: info.color }}>Comportements en relation</p>
          <p className="text-gray-400 text-xs leading-relaxed">{info.comportements}</p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: info.color }}>Déclencheurs de stress</p>
          <p className="text-gray-400 text-xs leading-relaxed">{info.stress}</p>
        </div>
      </div>
    </div>
  );
}