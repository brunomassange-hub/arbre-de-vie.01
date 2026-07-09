import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { CHAKRAS } from "@/lib/chakras";
import { getMaslowByChakra, MASLOW_LEVELS } from "@/lib/therapy";
import { Loader2, Sparkles, TrendingUp } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

export default function ImprovementSection() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      base44.entities.TraumaticEvent.list(),
      base44.entities.PositiveEvent.list(),
      base44.entities.BigFiveProfile.list(),
      base44.entities.CognitiveProfile.list(),
      base44.entities.LimitingBelief.list(),
      base44.entities.PositiveBelief.list(),
    ]).then(([trauma, pos, big5, cog, limitBeliefs, posBeliefs]) => {
      setData({ trauma, pos, big5: big5[0], cog: cog[0], limitBeliefs, posBeliefs });
    });
  }, []);

  const maslowGaps = () => {
    if (!data?.trauma?.length) return [];
    const counts = {};
    MASLOW_LEVELS.forEach(m => { counts[m.name] = 0; });
    data.trauma.forEach(e => {
      const need = getMaslowByChakra(e.chakra);
      counts[need] = (counts[need] || 0) + 1;
    });
    return MASLOW_LEVELS.map(m => ({ ...m, count: counts[m.name] || 0 }))
      .filter(m => m.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const generate = async () => {
    if (!data) return;
    setLoading(true);
    setContent(null);
    try {
      const traumaSummary = data.trauma.map(e => `- ${e.age} ans: "${e.title}" — ${e.emotion} (${e.chakra}, besoin: ${getMaslowByChakra(e.chakra)})`).join("\n") || "Aucun";
      const posSummary = data.pos.map(e => `- ${e.age} ans: "${e.title}" — ${e.emotion} (${e.chakra})`).join("\n") || "Aucun";
      const big5Summary = data.big5 ? `Ouverture: ${data.big5.ouverture ?? 50}, Agréabilité: ${data.big5.agreabilite ?? 50}, Conscience: ${data.big5.conscience ?? 50}, Nervosité: ${data.big5.nervosite ?? 50}, Extraversion: ${data.big5.extraversion ?? 50}` : "Non renseigné";
      const cogSummary = data.cog ? `MBTI: ${data.cog.mbti_type || "?"}, Ennéagramme: ${data.cog.enneagram_type || "?"}` : "Non renseigné";
      const limitingBeliefs = data.limitBeliefs.map(b => `- ${b.branch}: "${b.belief}"`).join("\n") || "Aucune";

      const prompt = `Tu es un coach thérapeutique. Analyse les données de cet utilisateur et propose 3 à 5 axes d'amélioration concrets.

ÉVÉNEMENTS DOULOUREUX:
${traumaSummary}

ÉVÉNEMENTS POSITIFS:
${posSummary}

PROFIL BIG FIVE: ${big5Summary}
PROFIL COGNITIF: ${cogSummary}

CROYANCES LIMITANTES:
${limitingBeliefs}

Analyse les besoins de Maslow les plus touchés, les émotions récurrentes et les déséquilibres. Propose des axes d'amélioration concrets et actionnables. Réponds en français.`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            axes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  rationale: { type: "string" },
                  suggestions: { type: "array", items: { type: "string" } },
                  priority: { type: "string", enum: ["Haute", "Moyenne", "Faible"] },
                },
              },
            },
          },
        },
      });
      setContent(res);
    } finally {
      setLoading(false);
    }
  };

  const gaps = maslowGaps();

  return (
    <div>
      {data && (
        <div className="mb-4 p-3 rounded-xl border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#8d6e63" }}>📊 Aperçu de vos données</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg p-2" style={{ background: "#a1887f15" }}>
              <span style={{ color: "#a1887f" }}>🩸 Blessures</span>
              <p className="font-bold text-lg" style={{ color: "#3e2723" }}>{data.trauma.length}</p>
            </div>
            <div className="rounded-lg p-2" style={{ background: "#7fae7e15" }}>
              <span style={{ color: "#7fae7e" }}>✨ Forces</span>
              <p className="font-bold text-lg" style={{ color: "#3e2723" }}>{data.pos.length}</p>
            </div>
          </div>
          {gaps.length > 0 && (
            <div className="mt-2">
              <p className="text-xs mb-1" style={{ color: "#8d6e63" }}>Besoins de Maslow les plus touchés :</p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.map(g => (
                  <span key={g.name} className="text-xs px-2 py-0.5 rounded-full" style={{
                    background: g.color + "20",
                    color: g.color,
                  }}>{g.icon} {g.name} ({g.count})</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Button onClick={generate} disabled={loading || !data}
        className="w-full bg-purple-800 hover:bg-purple-700 text-white mb-4">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <TrendingUp className="w-4 h-4 mr-2" />}
        {loading ? "Analyse..." : "Analyser mes axes d'amélioration"}
      </Button>

      {content && (
        <div className="rounded-xl p-4 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8", fontFamily: SERIF }}>
          <div className="mb-4">
            <p className="text-sm" style={{ color: "#5d4037" }}>{content.summary}</p>
          </div>

          <div className="space-y-3">
            {content.axes?.map((axe, i) => {
              const priorityColor = axe.priority === "Haute" ? "#ef4444" : axe.priority === "Moyenne" ? "#eab308" : "#22c55e";
              return (
                <div key={i} className="rounded-lg p-3 border" style={{ background: "#fff", borderColor: "#e0d6c8" }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm" style={{ color: "#3e2723" }}>{i + 1}. {axe.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{
                      background: priorityColor + "20",
                      color: priorityColor,
                    }}>{axe.priority}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#8d6e63" }}>{axe.rationale}</p>
                  <ul className="space-y-1">
                    {axe.suggestions?.map((s, j) => (
                      <li key={j} className="text-xs flex gap-1.5" style={{ color: "#5d4037" }}>
                        <span style={{ color: "#7fae7e" }}>→</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}