import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Sparkles } from "lucide-react";
import { generateSuggestions, CATEGORIES, aggregateData } from "@/lib/analysisEngine";
import SuggestionCard from "@/components/analysis/SuggestionCard";
import AggregateView from "@/components/analysis/AggregateView";
import PersonalityPerspective from "@/components/analysis/PersonalityPerspective";
import BeliefSynthesis from "@/components/analysis/BeliefSynthesis";
import SourceElementList from "@/components/analysis/SourceElementList";
import PersonalizedReport from "@/components/analysis/PersonalizedReport";

export default function Analysis() {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [validated, setValidated] = useState([]);
  const [rawData, setRawData] = useState({ events: [], links: [], beliefs: [], bigFive: null });
  const [cognitiveProfile, setCognitiveProfile] = useState(null);
  const [positiveLinks, setPositiveLinks] = useState([]);
  const [positiveBeliefs, setPositiveBeliefs] = useState([]);
  const [positiveEvents, setPositiveEvents] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [events, links, beliefs, existing, bigFiveList, cogList, posLinks, posBeliefs, posEvents] = await Promise.all([
      base44.entities.TraumaticEvent.list(),
      base44.entities.Link.list(),
      base44.entities.LimitingBelief.list(),
      base44.entities.AnalysisItem.list(),
      base44.entities.BigFiveProfile.list(),
      base44.entities.CognitiveProfile.list(),
      base44.entities.PositiveLink.list(),
      base44.entities.PositiveBelief.list(),
      base44.entities.PositiveEvent.list(),
    ]);
    const bigFive = bigFiveList[0] || null;
    setRawData({ events, links, beliefs, bigFive });
    setCognitiveProfile(cogList[0] || null);
    setPositiveLinks(posLinks);
    setPositiveBeliefs(posBeliefs);
    setPositiveEvents(posEvents);
    const keys = new Set(existing.map(e => `${e.category}|${e.title}`));
    setValidated(existing.filter(e => e.status === "validated"));
    const all = generateSuggestions({ traumaticEvents: events, links, limitingBeliefs: beliefs });
    setSuggestions(all.filter(s => !keys.has(`${s.category}|${s.title}`)));
    setLoading(false);
  };

  const handleValidate = async (suggestion) => {
    const item = await base44.entities.AnalysisItem.create({
      category: suggestion.category, title: suggestion.title,
      description: suggestion.description, source_data: suggestion.source_summary,
      journal_theme: suggestion.journal_theme, journal_tool: suggestion.journal_tool,
      status: "validated",
    });
    setValidated([...validated, item]);
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };

  const handleReject = async (suggestion) => {
    await base44.entities.AnalysisItem.create({
      category: suggestion.category, title: suggestion.title,
      description: suggestion.description, journal_theme: suggestion.journal_theme,
      journal_tool: suggestion.journal_tool, status: "rejected",
    });
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };

  const handleTagsChange = async (entityType, entityId, newTags) => {
    const entityMap = { event: "TraumaticEvent", link: "Link", belief: "LimitingBelief" };
    const entityName = entityMap[entityType];
    if (!entityName) return;
    await base44.entities[entityName].update(entityId, { clinical_tags: newTags });
    setRawData(prev => {
      const key = entityType === "event" ? "events" : entityType === "link" ? "links" : "beliefs";
      return { ...prev, [key]: prev[key].map(item => item.id === entityId ? { ...item, clinical_tags: newTags } : item) };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a1628" }}>
        <Loader2 className="w-6 h-6 animate-spin text-green-400" />
      </div>
    );
  }

  const grouped = Object.entries(CATEGORIES).map(([key, cat]) => ({
    ...cat, key,
    items: suggestions.filter(s => s.category === key),
  })).filter(g => g.items.length > 0);

  const aggregated = aggregateData({ traumaticEvents: rawData.events, links: rawData.links, limitingBeliefs: rawData.beliefs });
  const hasAnyData = rawData.events.length > 0 || rawData.links.length > 0 || rawData.beliefs.length > 0 || rawData.bigFive;

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0a1628" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}>
            🔍 Analyse
          </h1>
          <p className="text-sm" style={{ color: "#8b9dc3" }}>
            Détection automatique de patterns à partir de vos données
          </p>
        </div>

        <AggregateView traumaticEvents={rawData.events} links={rawData.links} limitingBeliefs={rawData.beliefs} positiveEvents={positiveEvents} />
        <PersonalityPerspective bigFive={rawData.bigFive} cognitiveProfile={cognitiveProfile} events={rawData.events} links={rawData.links} beliefs={rawData.beliefs} />
        <BeliefSynthesis limitingBeliefs={rawData.beliefs} />

        <PersonalizedReport
          events={rawData.events}
          links={rawData.links}
          beliefs={rawData.beliefs}
          bigFive={rawData.bigFive}
          cognitiveProfile={cognitiveProfile}
          positiveLinks={positiveLinks}
          positiveBeliefs={positiveBeliefs}
        />

        <SourceElementList
          events={rawData.events}
          links={rawData.links}
          beliefs={rawData.beliefs}
          onTagsChange={handleTagsChange}
        />

        {validated.filter(item => {
          const isExcluded = (item.title || "").toLowerCase().includes("pattern relationnel") ||
            (item.title || "").toLowerCase().includes("injustice");
          return !isExcluded;
        }).length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>
              ✅ Validé ({validated.filter(item => {
                const isExcluded = (item.title || "").toLowerCase().includes("pattern relationnel") ||
                  (item.title || "").toLowerCase().includes("injustice");
                return !isExcluded;
              }).length})
            </h2>
            <div className="space-y-2">
              {validated.filter(item => {
                const isExcluded = (item.title || "").toLowerCase().includes("pattern relationnel") ||
                  (item.title || "").toLowerCase().includes("injustice");
                return !isExcluded;
              }).map(item => {
                const cat = CATEGORIES[item.category];
                return (
                  <div key={item.id} className="rounded-xl border p-3"
                    style={{ background: "rgba(34,197,94,0.05)", borderColor: "rgba(34,197,94,0.2)" }}>
                    <div className="flex items-start gap-2">
                      <span className="text-base">{cat?.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white">{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!hasAnyData && suggestions.length === 0 && validated.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm" style={{ color: "#6b7b94" }}>Aucune suggestion disponible pour le moment.</p>
            <p className="text-xs mt-1" style={{ color: "#4a5568" }}>
              Renseignez des événements, relations et croyances dans les autres pages pour générer une analyse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}