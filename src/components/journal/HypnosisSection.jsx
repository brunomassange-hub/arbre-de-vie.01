import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAKRAS } from "@/lib/chakras";
import { getMaslowByChakra, getMaslowInfo } from "@/lib/therapy";
import { Loader2, Sparkles } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

export default function HypnosisSection() {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    base44.entities.TraumaticEvent.list().then(d => {
      const sorted = [...d].sort((a, b) => a.age - b.age);
      setEvents(sorted);
      if (sorted[0]) setSelectedId(sorted[0].id);
    });
  }, []);

  const selected = events.find(e => e.id === selectedId);
  const maslowNeed = selected ? getMaslowByChakra(selected.chakra) : "";
  const maslowInfo = getMaslowInfo(maslowNeed);

  const generate = async () => {
    if (!selected) return;
    setLoading(true);
    setContent(null);
    try {
      const prompt = `Tu es un hypnothérapeute éricksonnien bienveillant. Crée une séance d'hypnose de 5-7 minutes pour accompagner la guérison de cet événement:
Titre: ${selected.title}
Description: ${selected.description || "—"}
Émotion ressentie: ${selected.emotion} (chakra: ${selected.chakra})
Âge: ${selected.age} ans

Cette émotion "${selected.emotion}" indique un besoin non satisfait de niveau "${maslowNeed}" (${maslowInfo.desc}) dans la pyramide de Maslow.

La séance doit inclure:
1. Une induction douce et progressive
2. Une métaphore thérapeutique transformant la souffrance en guérison
3. Des suggestions positives liées au besoin "${maslowNeed}"
4. Un retour en pleine conscience

Réponds en français, ton chaleureux et sécurisant.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            need_focus: { type: "string" },
            induction: { type: "string" },
            metaphor: { type: "string" },
            suggestions: { type: "array", items: { type: "string" } },
            awakening: { type: "string" },
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
          Ajoutez d'abord des événements dans l'Arbre des Blessures.
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
              background: (CHAKRAS.find(c => c.name === selected.chakra)?.color || "#a1887f") + "10",
              borderColor: "#e0d6c8",
            }}>
              <p className="text-sm font-semibold" style={{ color: "#3e2723" }}>{selected.title}</p>
              {selected.description && <p className="text-xs mt-1" style={{ color: "#5d4037" }}>{selected.description}</p>}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: (CHAKRAS.find(c => c.name === selected.chakra)?.color || "#a1887f") + "25",
                  color: CHAKRAS.find(c => c.name === selected.chakra)?.color || "#a1887f",
                }}>🩸 {selected.emotion}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: maslowInfo.color + "20",
                  color: maslowInfo.color,
                }}>{maslowInfo.icon} Maslow : {maslowNeed}</span>
              </div>
              <p className="text-xs mt-1.5" style={{ color: "#8d6e63" }}>
                Besoin impliqué : {maslowInfo.desc}
              </p>
            </div>
          )}

          <Button onClick={generate} disabled={loading || !selected}
            className="w-full bg-amber-800 hover:bg-amber-700 text-white mb-4">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Génération..." : "Générer la séance d'hypnose"}
          </Button>

          {content && (
            <div className="rounded-xl p-4 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8", fontFamily: SERIF }}>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#3e2723" }}>{content.title}</h3>
              <p className="text-xs mb-4" style={{ color: "#a1887f" }}>Besoin : {content.need_focus}</p>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>🌀 Induction</p>
                <p className="text-sm" style={{ color: "#3e2723" }}>{content.induction}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>🌳 Métaphore</p>
                <p className="text-sm italic" style={{ color: "#5d4037" }}>{content.metaphor}</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#a1887f" }}>✨ Suggestions</p>
                <ul className="space-y-1">
                  {content.suggestions?.map((s, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "#3e2723" }}>
                      <span style={{ color: "#7fae7e" }}>✦</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg p-3 mt-3" style={{ background: "#7fae7e15" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#5d7a3a" }}>🌅 Retour</p>
                <p className="text-sm" style={{ color: "#3e2723" }}>{content.awakening}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}