import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { CHAKRAS } from "@/lib/chakras";
import { Loader2, Sparkles } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

const MEDITATION_TYPES = [
  { id: "scan", label: "🔬 Scan corporel", desc: "Relâcher les tensions du corps" },
  { id: "breath", label: "🌬️ Respiration consciente", desc: "Calmer le système nerveux" },
  { id: "chakra", label: "🌈 Méditation des chakras", desc: "Harmoniser ses 7 centres d'énergie" },
  { id: "loving", label: "💚 Bienveillance", desc: "Cultiver l'amour de soi" },
  { id: "forest", label: "🌲 Forêt intérieure", desc: "Se ressourcer dans la nature" },
];

export default function MeditationSection({ theme }) {
  const [selectedType, setSelectedType] = useState("scan");
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[0].name);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setContent(null);
    try {
      const typeLabel = MEDITATION_TYPES.find(t => t.id === selectedType)?.label;
      let chakraContext = "";
      if (selectedType === "chakra") {
        const ch = CHAKRAS.find(c => c.name === selectedChakra);
        chakraContext = `Centrée sur le chakra "${ch.name}" (couleur: ${ch.color}), lumière: ${ch.light}, ombre: ${ch.shadow}.`;
      }
      const prompt = `Tu es un guide de méditation. ${theme || ""} Crée une méditation guidée de 10 minutes: ${typeLabel}. ${chakraContext}
Ton apaisant, phrases courtes, pauses de respiration indiquées par "...". Réponds en français.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            duration: { type: "string" },
            intro: { type: "string" },
            steps: { type: "array", items: { type: "string" } },
            closing: { type: "string" },
          },
        },
      });
      setContent(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {MEDITATION_TYPES.map(t => (
          <button key={t.id} onClick={() => setSelectedType(t.id)}
            className="p-2 rounded-lg text-xs font-medium transition border text-left"
            style={{
              background: selectedType === t.id ? "#7fae7e20" : "transparent",
              borderColor: selectedType === t.id ? "#7fae7e" : "#e0d6c8",
              color: "#3e2723",
            }}>
            <div className="font-semibold">{t.label}</div>
            <div style={{ color: "#8d6e63", fontSize: 10 }}>{t.desc}</div>
          </button>
        ))}
      </div>

      {selectedType === "chakra" && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CHAKRAS.map(c => (
            <button key={c.name} onClick={() => setSelectedChakra(c.name)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition border"
              style={{
                background: selectedChakra === c.name ? c.color + "20" : "transparent",
                borderColor: selectedChakra === c.name ? c.color : "#e0d6c8",
                color: selectedChakra === c.name ? c.color : "#8d6e63",
              }}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      <Button onClick={generate} disabled={loading}
        className="w-full bg-indigo-800 hover:bg-indigo-700 text-white mb-4">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
        {loading ? "Génération..." : "Générer la méditation"}
      </Button>

      {content && (
        <div className="rounded-xl p-4 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8", fontFamily: SERIF }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: "#3e2723" }}>{content.title}</h3>
          <p className="text-xs mb-4" style={{ color: "#8d6e63" }}>⏱ {content.duration}</p>

          <div className="mb-3">
            <p className="text-sm" style={{ color: "#5d4037" }}>{content.intro}</p>
          </div>

          <div className="space-y-2 mb-3">
            {content.steps?.map((s, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-bold flex-shrink-0" style={{ color: "#8d6e63" }}>{i + 1}.</span>
                <p className="text-sm" style={{ color: "#3e2723" }}>{s}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-3 mt-3" style={{ background: "#7fae7e15" }}>
            <p className="text-sm italic" style={{ color: "#5d7a3a" }}>🌙 {content.closing}</p>
          </div>
        </div>
      )}
    </div>
  );
}