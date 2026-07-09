import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Save } from "lucide-react";

const TRAITS = [
  { key: "ouverture", label: "Ouverture", desc: "Curiosité, créativité, ouverture aux idées", color: "#8b5cf6" },
  { key: "conscience", label: "Conscience", desc: "Organisation, fiabilité, discipline", color: "#3b82f6" },
  { key: "extraversion", label: "Extraversion", desc: "Sociabilité, énergie, enthousiasme", color: "#f59e0b" },
  { key: "agreabilite", label: "Agréabilité", desc: "Empathie, coopération, confiance", color: "#22c55e" },
  { key: "nervosite", label: "Nervosité", desc: "Émotivité, anxiété, sensibilité", color: "#ef4444" },
];

export default function BigFivePanel({ profile, onSaved }) {
  const [scores, setScores] = useState({});
  const [qualites, setQualites] = useState([]);
  const [newQuality, setNewQuality] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setScores({
        ouverture: profile.ouverture ?? 50,
        conscience: profile.conscience ?? 50,
        extraversion: profile.extraversion ?? 50,
        agreabilite: profile.agreabilite ?? 50,
        nervosite: profile.nervosite ?? 50,
      });
      setQualites(profile.qualites || []);
    } else {
      setScores({ ouverture: 50, conscience: 50, extraversion: 50, agreabilite: 50, nervosite: 50 });
      setQualites([]);
    }
  }, [profile]);

  const handleScoreChange = (key, val) => {
    setScores(prev => ({ ...prev, [key]: val[0] }));
  };

  const addQuality = () => {
    const q = newQuality.trim();
    if (!q) return;
    setQualites(prev => [...prev, q]);
    setNewQuality("");
  };

  const removeQuality = (idx) => {
    setQualites(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (profile?.id) {
        await base44.entities.BigFiveProfile.update(profile.id, { ...scores, qualites: qualites });
      } else {
        await base44.entities.BigFiveProfile.create({ ...scores, qualites: qualites });
      }
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#0d1a0d] rounded-2xl border border-green-900/30 p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">🧬 Profil Big Five</h3>
          <p className="text-gray-500 text-xs">Ajustez vos scores et qualités</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm"
          className="bg-green-800 hover:bg-green-700 text-white">
          <Save className="w-3.5 h-3.5 mr-1" /> {saving ? "..." : "Enregistrer"}
        </Button>
      </div>

      <div className="space-y-4">
        {TRAITS.map(t => (
          <div key={t.key}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-sm font-semibold" style={{ color: t.color }}>{t.label}</span>
                <p className="text-gray-600 text-xs">{t.desc}</p>
              </div>
              <span className="text-lg font-bold" style={{ color: t.color }}>{scores[t.key] ?? 50}</span>
            </div>
            <Slider
              value={[scores[t.key] ?? 50]}
              onValueChange={(v) => handleScoreChange(t.key, v)}
              min={0} max={100} step={1}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <p className="text-sm font-semibold text-green-400 mb-2">✨ Mes qualités</p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newQuality}
            onChange={e => setNewQuality(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addQuality()}
            placeholder="Ex: Résilient, Créatif, Empathique..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
          />
          <Button onClick={addQuality} size="icon" className="bg-green-800 hover:bg-green-700 shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {qualites.length === 0 && (
            <p className="text-gray-600 text-xs">Aucune qualité ajoutée pour le moment.</p>
          )}
          {qualites.map((q, i) => (
            <span key={i} className="flex items-center gap-1 bg-green-900/30 border border-green-700/30 text-green-300 text-xs px-3 py-1.5 rounded-full">
              {q}
              <button onClick={() => removeQuality(i)} className="hover:text-red-400 transition">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}