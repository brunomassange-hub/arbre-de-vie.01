import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BRANCHES = ["Corps", "Esprit", "Âme", "Social", "Professionnel", "Créativité", "Racines", "Tronc"];
const ICONS = { Corps: "💪", Esprit: "🧠", "Âme": "✨", Social: "👥", Professionnel: "💼", "Créativité": "🎨", Racines: "🌱", Tronc: "🌲" };
const MOODS = ["😊 Épanoui", "😌 Serein", "😐 Neutre", "😔 Difficile", "😤 Tendu"];
const BRANCH_COLORS = {
  Corps: "bg-red-500/20 text-red-300",
  Esprit: "bg-blue-500/20 text-blue-300",
  "Âme": "bg-purple-500/20 text-purple-300",
  Social: "bg-yellow-500/20 text-yellow-300",
  Professionnel: "bg-green-500/20 text-green-300",
  "Créativité": "bg-pink-500/20 text-pink-300",
  Racines: "bg-lime-500/20 text-lime-300",
  Tronc: "bg-amber-500/20 text-amber-300",
};

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ branch: "Esprit", title: "", content: "", mood: "😊 Épanoui", entry_date: new Date().toISOString().split("T")[0] });

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    const data = await base44.entities.JournalEntry.list("-created_date");
    setEntries(data);
  };

  const handleCreate = async () => {
    if (!form.content.trim()) return;
    await base44.entities.JournalEntry.create(form);
    setShowForm(false);
    setForm({ branch: "Esprit", title: "", content: "", mood: "😊 Épanoui", entry_date: new Date().toISOString().split("T")[0] });
    loadEntries();
  };

  const deleteEntry = async (id) => {
    await base44.entities.JournalEntry.delete(id);
    loadEntries();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">📖 Mon Journal</h1>
            <p className="text-gray-400">Réflexions et pensées</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4 mr-1" /> Écrire
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 text-lg">Nouvelle entrée</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((b) => <SelectItem key={b} value={b}>{ICONS[b]} {b}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={form.mood} onValueChange={(v) => setForm({ ...form, mood: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Écrivez votre réflexion..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" rows={4} />
              <Input type="date" value={form.entry_date} onChange={(e) => setForm({ ...form, entry_date: e.target.value })} className="bg-white/10 border-white/20 text-white" />
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 bg-blue-600 hover:bg-blue-500">Publier</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/20">Annuler</Button>
              </div>
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 hover:border-white/30 transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge className={`${BRANCH_COLORS[entry.branch]} text-xs`}>{ICONS[entry.branch]} {entry.branch}</Badge>
                    <span className="text-sm">{entry.mood}</span>
                    <span className="text-gray-500 text-xs ml-auto">
                      {entry.entry_date ? format(new Date(entry.entry_date), "d MMM yyyy", { locale: fr }) : ""}
                    </span>
                  </div>
                  {entry.title && <h3 className="text-white font-medium mb-1">{entry.title}</h3>}
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {!entries.length && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-4xl mb-3">📝</p>
              <p>Votre journal est vide.<br />Commencez à écrire vos réflexions !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}