import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, BookOpen, Heart, Wind, Brain, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import GroundingSection from "@/components/journal/GroundingSection";
import HypnosisSection from "@/components/journal/HypnosisSection";
import MeditationSection from "@/components/journal/MeditationSection";
import ImprovementSection from "@/components/journal/ImprovementSection";

const SERIF = "'Playfair Display', Georgia, serif";

const TABS = [
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "grounding", label: "Ancrage", icon: Heart },
  { id: "hypnose", label: "Hypnose", icon: Brain },
  { id: "meditation", label: "Méditation", icon: Wind },
  { id: "amelioration", label: "Axes", icon: TrendingUp },
];

const BRANCHES = ["Corps", "Esprit", "Âme", "Social", "Professionnel", "Créativité", "Racines", "Tronc"];
const ICONS = { Corps: "💪", Esprit: "🧠", "Âme": "✨", Social: "👥", Professionnel: "💼", "Créativité": "🎨", Racines: "🌱", Tronc: "🌲" };
const MOODS = ["😊 Épanoui", "😌 Serein", "😐 Neutre", "😔 Difficile", "😤 Tendu"];
const BRANCH_COLORS = {
  Corps: "bg-red-500/20 text-red-300 border-red-500/30",
  Esprit: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Âme": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Social: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Professionnel: "bg-green-500/20 text-green-300 border-green-500/30",
  "Créativité": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Racines: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  Tronc: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

function JournalEntries() {
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
    <div>
      <Button onClick={() => setShowForm(!showForm)} size="sm"
        className="mb-4 bg-[#5d7a3a] hover:bg-[#4d6a2a] text-white">
        <Plus className="w-4 h-4 mr-1" /> Écrire une entrée
      </Button>

      {showForm && (
        <div className="rounded-xl p-4 mb-4 border space-y-3" style={{ background: "#f5f0e8", borderColor: "#e0d6c8" }}>
          <div className="grid grid-cols-2 gap-3">
            <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
              <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723]"><SelectValue /></SelectTrigger>
              <SelectContent>{BRANCHES.map((b) => <SelectItem key={b} value={b}>{ICONS[b]} {b}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.mood} onValueChange={(v) => setForm({ ...form, mood: v })}>
              <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723]"><SelectValue /></SelectTrigger>
              <SelectContent>{MOODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titre (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
          <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Écrivez votre réflexion..." rows={4}
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 resize-none" />
          <Input type="date" value={form.entry_date} onChange={(e) => setForm({ ...form, entry_date: e.target.value })}
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723]" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="flex-1 bg-[#5d7a3a] hover:bg-[#4d6a2a]">Publier</Button>
            <Button onClick={() => setShowForm(false)} variant="outline"
              className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60">Annuler</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-xl p-4 border" style={{ background: "#fff", borderColor: "#e0d6c8" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    background: "#e0d6c860",
                    color: "#5d4037",
                  }}>{ICONS[entry.branch]} {entry.branch}</span>
                  <span className="text-sm">{entry.mood}</span>
                  <span className="text-xs ml-auto" style={{ color: "#a1887f" }}>
                    {entry.entry_date ? format(new Date(entry.entry_date), "d MMM yyyy", { locale: fr }) : ""}
                  </span>
                </div>
                {entry.title && <h3 className="font-semibold mb-1" style={{ color: "#3e2723", fontFamily: SERIF }}>{entry.title}</h3>}
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#5d4037" }}>{entry.content}</p>
              </div>
              <button onClick={() => deleteEntry(entry.id)} className="transition flex-shrink-0" style={{ color: "#a1887f" }}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {!entries.length && (
          <div className="text-center py-12" style={{ color: "#8d6e63" }}>
            <p className="text-4xl mb-3">📝</p>
            <p>Votre journal est vide.<br />Commencez à écrire vos réflexions !</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Journal() {
  const [activeTab, setActiveTab] = useState("journal");

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#faf6f0" }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>📖 Journal thérapeutique</h1>
        <p className="text-sm mb-5" style={{ color: "#8d6e63" }}>Outils d'introspection et de guérison personnalisés</p>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap border"
                style={{
                  background: active ? "#5d7a3a" : "transparent",
                  borderColor: active ? "#5d7a3a" : "#e0d6c8",
                  color: active ? "#fff" : "#8d6e63",
                  fontFamily: SERIF,
                }}>
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "journal" && <JournalEntries />}
        {activeTab === "grounding" && (
          <div>
            <p className="text-sm mb-4" style={{ color: "#5d4037", fontFamily: SERIF }}>
              💚 L'ancrage vous reconnecte à vos expériences positives pour retrouver stabilité et ancrage dans le présent.
            </p>
            <GroundingSection />
          </div>
        )}
        {activeTab === "hypnose" && (
          <div>
            <p className="text-sm mb-4" style={{ color: "#5d4037", fontFamily: SERIF }}>
              🌀 L'hypnose éricksonnienne accompagne la guérison de vos blessures en transformant la souffrance, guidée par vos besoins profonds.
            </p>
            <HypnosisSection />
          </div>
        )}
        {activeTab === "meditation" && (
          <div>
            <p className="text-sm mb-4" style={{ color: "#5d4037", fontFamily: SERIF }}>
              🌬️ Des méditations guidées pour apaiser le mental, relâcher le corps et harmoniser vos énergies.
            </p>
            <MeditationSection />
          </div>
        )}
        {activeTab === "amelioration" && (
          <div>
            <p className="text-sm mb-4" style={{ color: "#5d4037", fontFamily: SERIF }}>
              📈 Une analyse personnalisée de vos données pour identifier vos axes de croissance.
            </p>
            <ImprovementSection />
          </div>
        )}
      </div>
    </div>
  );
}