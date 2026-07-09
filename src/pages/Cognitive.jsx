import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save } from "lucide-react";
import EnneagramSection from "@/components/cognitive/EnneagramSection";

// MBTI cognitive function stacks
const MBTI_FUNCTIONS = {
  INTP: { ego: ["Ti", "Ne", "Si", "Fe"], shadow: ["Te", "Ni", "Se", "Fi"] },
  INTJ: { ego: ["Ni", "Te", "Fi", "Se"], shadow: ["Ne", "Ti", "Fe", "Si"] },
  INFP: { ego: ["Fi", "Ne", "Si", "Te"], shadow: ["Fe", "Ni", "Se", "Ti"] },
  INFJ: { ego: ["Ni", "Fe", "Ti", "Se"], shadow: ["Ne", "Fi", "Te", "Si"] },
  ENTP: { ego: ["Ne", "Ti", "Fe", "Si"], shadow: ["Ni", "Te", "Fi", "Se"] },
  ENTJ: { ego: ["Te", "Ni", "Se", "Fi"], shadow: ["Ti", "Ne", "Si", "Fe"] },
  ENFP: { ego: ["Ne", "Fi", "Te", "Si"], shadow: ["Ni", "Fe", "Ti", "Se"] },
  ENFJ: { ego: ["Fe", "Ni", "Se", "Ti"], shadow: ["Fi", "Ne", "Si", "Te"] },
  ISTP: { ego: ["Ti", "Se", "Ni", "Fe"], shadow: ["Te", "Si", "Ne", "Fi"] },
  ISTJ: { ego: ["Si", "Te", "Fi", "Ne"], shadow: ["Se", "Ti", "Fe", "Ni"] },
  ISFP: { ego: ["Fi", "Se", "Ni", "Te"], shadow: ["Fe", "Si", "Ne", "Ti"] },
  ISFJ: { ego: ["Si", "Fe", "Ti", "Ne"], shadow: ["Se", "Fi", "Te", "Ni"] },
  ESTP: { ego: ["Se", "Ti", "Fe", "Ni"], shadow: ["Si", "Te", "Fi", "Ne"] },
  ESTJ: { ego: ["Te", "Si", "Ne", "Fi"], shadow: ["Ti", "Se", "Ni", "Fe"] },
  ESFP: { ego: ["Se", "Fi", "Te", "Ni"], shadow: ["Si", "Fe", "Ti", "Ne"] },
  ESFJ: { ego: ["Fe", "Si", "Ne", "Ti"], shadow: ["Fi", "Se", "Ni", "Te"] },
};

const FUNCTION_DESCRIPTIONS = {
  Ti: { label: "Pensée Introvertie", desc: "Logique interne, analyse systémique, cohérence personnelle", color: "#3b82f6" },
  Te: { label: "Pensée Extravertie", desc: "Rationalité externe, organisation, efficacité factuelle", color: "#2563eb" },
  Ni: { label: "Intuition Introvertie", desc: "Intuition profonde, vision long-terme, pressentiments", color: "#8b5cf6" },
  Ne: { label: "Intuition Extravertie", desc: "Déduction, connexion d'idées, exploration de possibilités", color: "#7c3aed" },
  Si: { label: "Sensation Introvertie", desc: "Souvenir, impressions, comparaison avec le passé", color: "#f59e0b" },
  Se: { label: "Sensation Extravertie", desc: "Sensation du moment, action immédiate, présence physique", color: "#d97706" },
  Fi: { label: "Sentiment Introverti", desc: "Authenticité, valeurs personnelles profondes, intégrité", color: "#ec4899" },
  Fe: { label: "Sentiment Extraverti", desc: "Empathie, harmonie sociale, conscience des émotions d'autrui", color: "#db2777" },
};

const POSITION_LABELS = ["Dominante", "Auxiliaire", "Tertiaire", "Inférieure"];
const SHADOW_LABELS = ["Opposant", "Critique", "Filou", "Démon"];

const MBTI_TYPES = Object.keys(MBTI_FUNCTIONS);

export default function Cognitive() {
  const [profile, setProfile] = useState(null);
  const [selectedType, setSelectedType] = useState("INTP");
  const [notes, setNotes] = useState("");
  const [enneagramType, setEnneagramType] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.CognitiveProfile.list().then(data => {
      if (data[0]) {
        setProfile(data[0]);
        setSelectedType(data[0].mbti_type || "INTP");
        setNotes(data[0].notes || "");
        setEnneagramType(data[0].enneagram_type || null);
      }
    });
  }, []);

  const functions = MBTI_FUNCTIONS[selectedType] || MBTI_FUNCTIONS["INTP"];

  const handleSave = async () => {
    setSaving(true);
    const data = { mbti_type: selectedType, enneagram_type: enneagramType, notes };
    if (profile) {
      await base44.entities.CognitiveProfile.update(profile.id, data);
    } else {
      const created = await base44.entities.CognitiveProfile.create(data);
      setProfile(created);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <h1 className="text-3xl font-bold text-white mb-1">🧠 Fonctions Cognitives</h1>
        <p className="text-gray-400 mb-6">Modèle jungien — Ego & Ombre</p>

        {/* Type selector */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <h2 className="text-white font-semibold mb-3">Mon type MBTI</h2>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedType === type
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ego / Ombre split */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* EGO */}
          <div>
            <div className="text-center mb-3">
              <span className="bg-indigo-600/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
                ☀️ EGO
              </span>
            </div>
            <div className="space-y-2">
              {functions.ego.map((fn, i) => {
                const info = FUNCTION_DESCRIPTIONS[fn];
                return (
                  <div key={fn} className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-black" style={{ color: info.color }}>{fn}</span>
                      <span className="text-xs text-gray-500">{POSITION_LABELS[i]}</span>
                    </div>
                    <p className="text-white text-xs font-medium">{info.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OMBRE */}
          <div>
            <div className="text-center mb-3">
              <span className="bg-gray-700/50 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-600/30">
                🌑 OMBRE
              </span>
            </div>
            <div className="space-y-2">
              {functions.shadow.map((fn, i) => {
                const info = FUNCTION_DESCRIPTIONS[fn];
                return (
                  <div key={fn} className="bg-white/5 rounded-xl p-3 border border-white/5 opacity-80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-black" style={{ color: info.color + "99" }}>{fn}</span>
                      <span className="text-xs text-gray-600">{SHADOW_LABELS[i]}</span>
                    </div>
                    <p className="text-gray-300 text-xs font-medium">{info.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual hierarchy bar */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-5 border border-white/20">
          <h3 className="text-white font-semibold text-sm mb-3">Hiérarchie des fonctions — {selectedType}</h3>
          <div className="space-y-2">
            {functions.ego.map((fn, i) => {
              const info = FUNCTION_DESCRIPTIONS[fn];
              const widths = [100, 75, 55, 35];
              return (
                <div key={fn} className="flex items-center gap-3">
                  <span className="text-xs w-20 text-gray-400">{POSITION_LABELS[i]}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${widths[i]}%`, backgroundColor: info.color }} />
                  </div>
                  <span className="text-xs font-bold w-6" style={{ color: info.color }}>{fn}</span>
                </div>
              );
            })}
          </div>
        </div>

        <EnneagramSection selected={enneagramType} onSelect={setEnneagramType} />

        {/* Notes */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <h3 className="text-white font-semibold mb-2">Notes personnelles</h3>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Mes observations sur mon profil cognitif..."
            rows={3} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
        </div>

        <Button onClick={handleSave} disabled={saving}
          className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-5 rounded-xl font-semibold">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "✓ Sauvegardé !" : saving ? "Sauvegarde..." : "Sauvegarder mon profil"}
        </Button>
      </div>
    </div>
  );
}