import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, X, Save } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [identity, setIdentity] = useState("");
  const [history, setHistory] = useState("");
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await base44.entities.TreeProfile.list();
    if (data[0]) {
      setProfile(data[0]);
      setIdentity(data[0].identity || "");
      setHistory(data[0].personal_history || "");
      setValues(data[0].values || []);
    }
  };

  const addValue = () => {
    if (newValue.trim()) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (i) => setValues(values.filter((_, idx) => idx !== i));

  const save = async () => {
    setSaving(true);
    const data = { identity, personal_history: history, values };
    if (profile) {
      await base44.entities.TreeProfile.update(profile.id, data);
    } else {
      const created = await base44.entities.TreeProfile.create(data);
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

        <h1 className="text-3xl font-bold text-white mb-2">🌳 Mon Identité</h1>
        <p className="text-gray-400 mb-8">Le tronc et les racines de votre arbre de vie</p>

        {/* Trunk - Identity */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-5 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌲</span>
            <h2 className="text-xl font-semibold text-white">Le Tronc — Mon Identité</h2>
          </div>
          <p className="text-gray-400 text-sm mb-3">Qui êtes-vous en quelques mots ? Votre essence, ce qui vous définit.</p>
          <Textarea
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="Je suis quelqu'un qui..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none"
            rows={3}
          />
        </div>

        {/* Roots - History */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-5 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌱</span>
            <h2 className="text-xl font-semibold text-white">Les Racines — Mon Histoire</h2>
          </div>
          <p className="text-gray-400 text-sm mb-3">D'où venez-vous ? Votre passé, vos expériences fondatrices.</p>
          <Textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="Mon histoire a commencé..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none"
            rows={4}
          />
        </div>

        {/* Values */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💎</span>
            <h2 className="text-xl font-semibold text-white">Mes Valeurs Profondes</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {values.map((v, i) => (
              <Badge key={i} className="bg-green-700/50 text-green-200 text-sm px-3 py-1 flex items-center gap-1">
                {v}
                <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => removeValue(i)} />
              </Badge>
            ))}
            {!values.length && <p className="text-gray-500 text-sm">Aucune valeur ajoutée</p>}
          </div>
          <div className="flex gap-2">
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addValue()}
              placeholder="Ex: Honnêteté, Famille..."
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
            />
            <Button onClick={addValue} variant="outline" className="border-white/20 text-white hover:bg-white/20">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={save}
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-500 text-white py-6 text-lg rounded-xl font-semibold"
        >
          <Save className="w-5 h-5 mr-2" />
          {saved ? "✓ Sauvegardé !" : saving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>
    </div>
  );
}