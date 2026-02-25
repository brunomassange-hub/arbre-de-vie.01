import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const TYPES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];
const TYPE_COLORS = {
  Famille: "bg-red-500/20 text-red-300",
  "Ami(e)": "bg-yellow-500/20 text-yellow-300",
  Partenaire: "bg-pink-500/20 text-pink-300",
  Mentor: "bg-purple-500/20 text-purple-300",
  Collègue: "bg-blue-500/20 text-blue-300",
  Autre: "bg-gray-500/20 text-gray-300",
};
const TYPE_ICONS = { Famille: "👨‍👩‍👧", "Ami(e)": "🤝", Partenaire: "💑", Mentor: "🎓", Collègue: "💼", Autre: "🌐" };

export default function Roots() {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Famille", description: "" });

  useEffect(() => { base44.entities.Link.list().then(setLinks); }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    await base44.entities.Link.create(form);
    setForm({ name: "", type: "Famille", description: "" });
    setShowForm(false);
    base44.entities.Link.list().then(setLinks);
  };

  const handleDelete = async (id) => {
    await base44.entities.Link.delete(id);
    setLinks(links.filter(l => l.id !== id));
  };

  const grouped = TYPES.reduce((acc, t) => {
    acc[t] = links.filter(l => l.type === t);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">🌱 Mes Racines</h1>
            <p className="text-gray-400">Liens & relations qui me fondent</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-green-700 hover:bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>

        {showForm && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Nouveau lien</h3>
            <div className="space-y-3">
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Nom de la personne" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map(t => <SelectItem key={t} value={t}>{TYPE_ICONS[t]} {t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Description libre de ce lien..." rows={3}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 bg-green-700 hover:bg-green-600">Ajouter</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/20">Annuler</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {TYPES.map(type => {
            const group = grouped[type];
            if (!group.length) return null;
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{TYPE_ICONS[type]}</span>
                  <span className="text-white font-medium">{type}</span>
                  <span className="text-gray-500 text-sm">({group.length})</span>
                </div>
                <div className="space-y-2">
                  {group.map(link => (
                    <div key={link.id} className="bg-white/10 rounded-xl p-4 border border-white/10 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">{link.name}</span>
                          <Badge className={`${TYPE_COLORS[link.type]} text-xs`}>{link.type}</Badge>
                        </div>
                        {link.description && <p className="text-gray-400 text-sm">{link.description}</p>}
                      </div>
                      <button onClick={() => handleDelete(link.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {!links.length && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-4xl mb-3">🌱</p>
              <p>Ajoutez vos liens importants<br />pour les voir apparaître dans les racines</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}