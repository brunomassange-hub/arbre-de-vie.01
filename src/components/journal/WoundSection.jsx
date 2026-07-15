import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAKRAS } from "@/lib/chakras";
import { Loader2, Sparkles } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

const WOUND_INFO = {
  Trahison: { color: "#8b5cf6", icon: "🗡️", desc: "La confiance brisée, le sentiment d'avoir été trompé" },
  Rejet: { color: "#ef4444", icon: "🚪", desc: "Le sentiment de ne pas être accepté, d'être exclu" },
  Abandon: { color: "#3b82f6", icon: "💨", desc: "La solitude, le sentiment d'être laissé seul" },
  Humiliation: { color: "#f59e0b", icon: "🎭", desc: "La honte, le sentiment d'être rabaissé" },
  Injustice: { color: "#14b8a6", icon: "⚖️", desc: "Le sentiment d'avoir été traité injustement" },
};

export default function WoundSection({ theme }) {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    base44.entities.TraumaticEvent.list().then(d => {
      const withWound = d.filter(e => e.wound_type);
      const sorted = [...withWound].sort((a, b) => a.age - b.age);
      setEvents(sorted);
      if (sorted[0]) setSelectedId(sorted[0].id);
    });
  }, []);

  const selected = events.find(e => e.id === selectedId);
  const woundInfo = selected ? WOUND_INFO[selected.wound_type] : null;

  const generate = async () => {
    if (!selected) return;
    setLoading(true);
    setContent(null);
    try {
      const prompt = `Tu es un thérapeute spécialisé dans la guérison des blessures de l'âme (selon le modèle de Lise Bourbeau). ${theme || ""} Crée un exercice de guérison de 5-7 minutes pour accompagner la transformation de cette blessure:
Titre de l'événement: ${selected.title}
Description: ${selected.description || "—"}
Blessure de l'âme: ${selected.wound_type} — ${woundInfo?.desc || ""}
Émotion ressentie: ${selected.emotion} (chakra: ${selected.chakra})
Âge: ${selected.age} ans

La blessure "${selected.wound_type}" (${woundInfo?.desc}) s'exprime à travers l'émotion "${selected.emotion}".

L'exercice doit inclure:
1. Une reconnaissance de la blessure (nommer et accepter sa présence sans jugement)
2. Une compréhension de son origine et de son message
3. Une étape de libération émotionnelle (respiration, libération)
4. Une transformation de la blessure en force/leçon de vie
5. Une affirmation de guérison

Réponds en français, ton chaleureux, bienveillant et sécurisant.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            wound_recognition: { type: "string" },
            understanding: { type: "string" },
            release: { type: "string" },
            transformation: { type: "string" },
            affirmation: { type: "string" },
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
      {events.length === 0 ? (
        <p className="text-center py-8" style={{ color: "#8d6e63" }}>
          Ajoutez d'abord des événements avec un type de blessure dans l'Arbre des Blessures.
        </p>
      ) : (
        <>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] mb-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {events.map(e => (
                <SelectItem key={e.id} value={e.id}>
                  {e.age} ans — {e.title} ({e.wound_type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selected && woundInfo && (
            <div className="mb-4 p-3 rounded-xl border" style={{
              background: woundInfo.color + "10",
              borderColor: "#e0d6c8",
            }}>
              <p className="text-sm font-semibold" style={{ color: "#3e2723" }}>{selected.title}</p>
              {selected.description && <p className="text-xs mt-1" style={{ color: "#5d4037" }}>{selected.description}</p>}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: woundInfo.color + "20",
                  color: woundInfo.color,
                }}>{woundInfo.icon} {selected.wound_type}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: (CHAKRAS.find(c => c.name === selected.chakra)?.color || "#a1887f") + "25",
                  color: CHAKRAS.find(c => c.name === selected.chakra)?.color || "#a1887f",
                }}>🩸 {selected.emotion}</span>
              </div>
              <p className="text-xs mt-1.5" style={{ color: "#8d6e63" }}>
                {woundInfo.desc}
              </p>
            </div>
          )}

          <Button onClick={generate} disabled={loading || !selected}
            className="w-full bg-purple-800 hover:bg-purple-700 text-white mb-4">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Génération..." : "Guérir cette blessure"}
          </Button>

          {content && (
            <div className="rounded-xl p-4 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8", fontFamily: SERIF }}>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#3e2723" }}>{content.title}</h3>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>🤲 Reconnaissance</p>
                <p className="text-sm" style={{ color: "#3e2723" }}>{content.wound_recognition}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>💡 Compréhension</p>
                <p className="text-sm" style={{ color: "#3e2723" }}>{content.understanding}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>🌬️ Libération</p>
                <p className="text-sm italic" style={{ color: "#5d4037" }}>{content.release}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>🌱 Transformation</p>
                <p className="text-sm" style={{ color: "#3e2723" }}>{content.transformation}</p>
              </div>

              <div className="rounded-lg p-3 mt-3" style={{ background: "#8b5cf615" }}>
                <p className="text-sm italic" style={{ color: "#7c3aed" }}>✦ {content.affirmation}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}