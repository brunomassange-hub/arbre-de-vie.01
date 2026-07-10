import React, { useState } from "react";
import { createPageUrl } from "@/utils";
import { useNavigate } from "react-router-dom";
import ZoomContainer from "@/components/tree/ZoomContainer";

const CHAKRAS = [
  { light: "Spiritualité", shadow: "Solitude Paix", color: "#9333ea" },
  { light: "Intuition", shadow: "Colère Clarté", color: "#6366f1" },
  { light: "Communication", shadow: "Anxiété Assertivité", color: "#06b6d4" },
  { light: "Connexion", shadow: "Amour Peur", color: "#22c55e" },
  { light: "Volonté", shadow: "Pouvoir Culpabilité", color: "#eab308" },
  { light: "Créativité", shadow: "Plaisir Honte", color: "#eab308", dark: true },
  { light: "Stabilité", shadow: "Tristesse Joie", color: "#ef4440" },
];

const MASLOW = [
  { name: "Accomplissement", color: "#9333ea" },
  { name: "Estime", color: "#6366f1" },
  { name: "Appartenance", color: "#22c55e" },
  { name: "Sécurité", color: "#eab308" },
  { name: "Physiologique", color: "#ef4444" },
];

const SEPHIROTS = [
  // Top
  { id: "foi", name: "Foi", x: 50, y: 6, color: "#9333ea", textColor: "#9333ea" },
  // Second row
  { id: "comprehension", name: "Compréhension", x: 28, y: 18, color: "#06b6d4", textColor: "#06b6d4" },
  { id: "sagesse", name: "Sagesse", x: 72, y: 18, color: "#06b6d4", textColor: "#06b6d4" },
  // Third row
  { id: "desir", name: "Désir", x: 30, y: 33, color: "#06b6d4", textColor: "#06b6d4" },
  { id: "amour", name: "Amour", x: 70, y: 33, color: "#06b6d4", textColor: "#06b6d4" },
  // Fourth row - Beauté center
  { id: "beaute", name: "Beauté", x: 50, y: 46, color: "#22c55e", textColor: "#22c55e" },
  // Fifth row
  { id: "gloire", name: "Gloire", x: 32, y: 59, color: "#eab308", textColor: "#eab308" },
  { id: "victoire", name: "Victoire", x: 68, y: 59, color: "#eab308", textColor: "#eab308" },
  // Trunk
  { id: "personnalite", name: "Personnalité", x: 50, y: 72, color: "#000", bg: "#000", textColor: "#fff" },
  // Root
  { id: "instinct", name: "Instinct", x: 50, y: 84, color: "#ef4444", textColor: "#ef4444" },
];

const SEPHIROT_INFO = {
  foi: { title: "Foi (Keter)", desc: "La couronne, connexion au divin, conscience pure, potentiel infini.", chakra: "Spiritualité", maslow: "Accomplissement" },
  comprehension: { title: "Compréhension (Binah)", desc: "La grande mère, réception, structure, intuition profonde.", chakra: "Intuition", maslow: "Estime" },
  sagesse: { title: "Sagesse (Hokhmah)", desc: "Le père, éclair de l'inspiration, point originel de l'idée.", chakra: "Intuition", maslow: "Estime" },
  desir: { title: "Désir (Hod)", desc: "Splendeur, intellect, communication, pensée analytique.", chakra: "Communication", maslow: "Appartenance" },
  amour: { title: "Amour (Netzah)", desc: "Victoire des émotions, désir, nature, instinct, créativité.", chakra: "Amour Peur", maslow: "Appartenance" },
  beaute: { title: "Beauté (Tiferet)", desc: "Le cœur, équilibre, harmonie, compassion, beauté spirituelle.", chakra: "Connexion", maslow: "Appartenance" },
  gloire: { title: "Gloire (Hod)", desc: "Splendeur, intellect, communication, pensée analytique.", chakra: "Pouvoir Culpabilité", maslow: "Sécurité" },
  victoire: { title: "Victoire (Netzah)", desc: "Victoire, endurance, émotion, désir, créativité.", chakra: "Volonté", maslow: "Sécurité" },
  personnalite: { title: "Personnalité (Yesod)", desc: "Fondation, ego, inconscient, pont entre spirituel et matériel.", chakra: "Créativité", maslow: "Sécurité" },
  instinct: { title: "Instinct (Malkuth)", desc: "Le royaume, manifestation physique, la Terre, instinct de survie.", chakra: "Stabilité", maslow: "Physiologique" },
};

export default function Home() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const info = selected ? SEPHIROT_INFO[selected.id] : null;

  return (
    <div className="min-h-screen bg-[#f5f2ec] flex flex-col">
      {/* Title */}
      <div className="text-center pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">🌳 L'Arbre de la Vie</h1>
        <p className="text-gray-500 text-xs mt-1">Cliquez sur un sephirot pour explorer</p>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 w-full max-w-3xl mx-auto px-2 gap-0 relative" style={{ minHeight: 580 }}>

        {/* LEFT: Chakras */}
        <div className="flex flex-col justify-between py-4 w-28 shrink-0">
          <p className="text-xs font-bold text-gray-500 mb-2 text-center">Chakras</p>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {CHAKRAS.map((c, i) => (
              <div key={i} className="text-right pr-2 flex justify-end items-center gap-1">
                <span className="text-xs font-bold" style={{ color: c.dark ? "#fbbf24" : c.color }}>
                  {c.light}
                </span>
                <span className="text-xs text-gray-400">—</span>
                <span
                  className="text-xs font-semibold px-1 py-0.5 rounded"
                  style={{
                    color: c.dark ? "#fff" : c.color,
                    backgroundColor: c.dark ? c.color : "transparent",
                    border: c.dark ? "1px solid " + c.color : "none",
                  }}
                >
                  {c.shadow}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Tree SVG */}
        <div className="flex-1 relative flex items-center justify-center">
          <ZoomContainer className="w-full h-full" style={{ maxHeight: 560 }}>
          <svg viewBox="0 0 400 520" className="w-full h-full" style={{ maxHeight: 560 }}>
...
          </svg>
          </ZoomContainer>
        </div>

        {/* RIGHT: Maslow */}
        <div className="flex flex-col justify-between py-4 w-28 shrink-0">
          <p className="text-xs font-bold text-gray-500 mb-2 text-center">Besoins</p>
          <div className="flex flex-col gap-6 flex-1 justify-center">
            {MASLOW.map((m, i) => (
              <div key={i} className="text-left pl-2 border-b border-gray-300 pb-1">
                <span className="text-xs font-semibold" style={{ color: "#374151" }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && info && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-t-2xl p-6 w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-800">{info.title}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-2xl leading-none">×</button>
            </div>
            <p className="text-gray-600 text-sm mb-4">{info.desc}</p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                🔮 Chakra : {info.chakra}
              </span>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                🔺 Maslow : {info.maslow}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}