import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAKRAS } from "@/lib/chakras";
import { Loader2, Sparkles } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

export default function GroundingSection() {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    base44.entities.PositiveEvent.list().then(d => {
      const sorted = [...d].sort((a, b) => a.age - b.age);
      setEvents(sorted);
      if (sorted[0]) setSelectedId(sorted[0].id);
    });
  }, []);

  const selected = events.find(e => e.id === selectedId);

  const generate = async () => {
    if (!selected) return;
    setLoading(true);
    setContent(null);
    try {
      const chakra = CHAKRAS.find(c => c.name === selected.chakra);
      const prompt = `Tu es un thérapeute spécialisé en ancrage et grounding. Crée un exercice d'ancrage de 2-3 minutes basé sur ce souvenir positif:
Titre: ${selected.title}
Description: ${selected.description || "—"}
Émotion positive: ${selected.emotion} (chakra: ${selected.chakra})
Âge: ${selected.age} ans

L'exercice doit aider la personne à se reconnecter à l'émotion positive "${selected.emotion}" dans le moment présent, en utilisant les 5 sens et la respiration. Réponds en français.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            emotion_focus: { type: "string" },
            steps: { type: "array", items: { type: "string" } },
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
          Ajoutez d'abord des événements positifs dans l'Arbre des Forces.
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
                  {e.age} ans — {e.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selected && (
            <div className="mb-4 p-3 rounded-xl border" style={{
              background: (CHAKRAS.find(c => c.name === selected.chakra)?.color || "#7fae7e") + "15",
              borderColor: "#e0d6c8",
            }}>
              <p className="text-sm font-semibold" style={{ color: "#3e2723" }}>{selected.title}</p>
              {selected.description && <p className="text-xs mt-1" style={{ color: "#5d4037" }}>{selected.description}</p>}
              <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full" style={{
                background: (CHAKRAS.find(c => c.name === selected.chakra)?.color || "#7fae7e") + "25",
                color: CHAKRAS.find(c => c.name === selected.chakra)?.color || "#7fae7e",
              }}>
                ✨ {selected.emotion} — {selected.chakra}
              </span>
            </div>
          )}

          <Button onClick={generate} disabled={loading || !selected}
            className="w-full bg-green-800 hover:bg-green-700 text-white mb-4">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Génération..." : "Générer l'exercice d'ancrage"}
          </Button>

          {content && (
            <div className="rounded-xl p-4 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8", fontFamily: SERIF }}>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#3e2723" }}>{content.title}</h3>
              <p className="text-xs mb-3" style={{ color: "#7fae7e" }}>Émotion : {content.emotion_focus}</p>
              <div className="space-y-2 mb-3">
                {content.steps?.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-bold flex-shrink-0" style={{ color: "#7fae7e" }}>{i + 1}.</span>
                    <p className="text-sm" style={{ color: "#3e2723" }}>{s}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg p-3 mt-3" style={{ background: "#7fae7e15" }}>
                <p className="text-sm italic" style={{ color: "#5d7a3a" }}>✦ {content.affirmation}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}