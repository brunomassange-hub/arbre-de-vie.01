import React from "react";
import SilhouetteMBTI from "@/components/archetype/SilhouetteMBTI";

export default function Archetype() {
  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0a1628" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
          >
            ✦ Archétypes
          </h1>
          <p className="text-sm" style={{ color: "#8b9dc3" }}>
            Explorez les modèles universels qui habitent votre psyché
          </p>
        </div>

        <SilhouetteMBTI />

        <div
          className="mt-8 rounded-2xl p-5 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs italic" style={{ color: "#6b7b94" }}>
            « Connais-toi toi-même et tu connaîtras l'univers et les dieux. »
          </p>
        </div>
      </div>
    </div>
  );
}