import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, BookOpen, Heart, Wind, Brain, TrendingUp, Sparkles, Users, Sun, HandHeart, HeartCrack } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import GroundingSection from "@/components/journal/GroundingSection";
import HypnosisSection from "@/components/journal/HypnosisSection";
import MeditationSection from "@/components/journal/MeditationSection";
import ImprovementSection from "@/components/journal/ImprovementSection";
import BesoinSection from "@/components/journal/BesoinSection";
import WoundSection from "@/components/journal/WoundSection";
import PersonalizedVideoDisplay from "@/components/video/PersonalizedVideoDisplay";

const SERIF = "'Playfair Display', Georgia, serif";

const THEMES = [
  {
    id: "emotions",
    label: "Émotion",
    fullLabel: "Gérer les émotions, la pensée et l'image de soi",
    icon: Brain,
    desc: "Réguler les émotions, apaiser le dialogue intérieur et cultiver une image de soi bienveillante.",
    context: "L'objectif thérapeutique est de gérer les émotions, la pensée et l'image de soi : aide la personne à réguler ses émotions, transformer son dialogue intérieur et cultiver une estime de soi saine.",
  },
  {
    id: "wound",
    label: "Blessure de l'âme",
    fullLabel: "Guérir les blessures de l'âme",
    icon: HeartCrack,
    desc: "Reconnaître et transformer les cinq blessures fondamentales : rejet, abandon, trahison, humiliation, injustice.",
    context: "L'objectif thérapeutique est de guérir les blessures de l'âme : aide la personne à reconnaître ses blessures fondamentales (rejet, abandon, trahison, humiliation, injustice), comprendre leur message et les transformer en forces.",
  },
  {
    id: "trauma",
    label: "Traumatisme",
    fullLabel: "Soulager le traumatisme",
    icon: Heart,
    desc: "Guérir les blessures du passé et apaiser la charge émotionnelle des événements difficiles.",
    context: "L'objectif thérapeutique est de soulager le traumatisme : aide la personne à guérir ses blessures passées, apaiser la charge émotionnelle et transformer la souffrance en résilience.",
  },
  {
    id: "conflits",
    label: "Conflit psychique",
    fullLabel: "Résoudre les conflits psychiques",
    icon: Sparkles,
    desc: "Harmoniser les tensions internes et réconcilier les parts de soi en conflit.",
    context: "L'objectif thérapeutique est de résoudre les conflits psychiques : aide la personne à identifier et harmoniser les tensions internes, réconcilier les parts d'elle-même en conflit.",
  },
  {
    id: "relations",
    label: "Relation",
    fullLabel: "Appréhender les relations",
    icon: Users,
    desc: "Comprendre les dynamiques relationnelles et cultiver des liens sains et authentiques.",
    context: "L'objectif thérapeutique est d'appréhender les relations : aide la personne à comprendre les dynamiques relationnelles, poser des limites saines et cultiver des liens authentiques.",
  },
  {
    id: "comportement",
    label: "Comportement",
    fullLabel: "Changer de comportement",
    icon: TrendingUp,
    desc: "Transformer les schémas automatiques et installer de nouveaux comportements alignés.",
    context: "L'objectif thérapeutique est de changer de comportement : aide la personne à identifier ses schémas automatiques, les transformer et installer de nouveaux comportements alignés avec ses valeurs.",
  },
  {
    id: "sens",
    label: "Sens de la vie",
    fullLabel: "Donner du sens à sa vie",
    icon: Sun,
    desc: "Explorer sa raison d'être et aligner sa vie avec ses valeurs profondes.",
    context: "L'objectif thérapeutique est de donner du sens à sa vie : aide la personne à explorer sa raison d'être, aligner sa vie avec ses valeurs profondes et trouver une direction porteuse de sens.",
  },
];

const TOOLS = [
  { id: "grounding", label: "Ancrage", icon: Heart },
  { id: "meditation", label: "Méditation", icon: Wind },
  { id: "hypnose", label: "Hypnose", icon: Brain },
  { id: "amelioration", label: "Axes", icon: TrendingUp },
  { id: "besoin", label: "Besoin", icon: HandHeart },
  { id: "wound", label: "Blessure de l'âme", icon: HeartCrack },
];

const TOOL_INTROS = {
  grounding: "💚 L'ancrage vous reconnecte à vos expériences positives pour retrouver stabilité et présence dans l'instant.",
  meditation: "🌬️ Des méditations guidées pour apaiser le mental, relâcher le corps et harmoniser vos énergies.",
  hypnose: "🌀 L'hypnose éricksonnienne accompagne la transformation intérieure, guidée par vos besoins profonds.",
  amelioration: "📈 Une analyse personnalisée de vos données pour identifier vos axes de croissance.",
  besoin: "💎 Explorez les besoins non satisfaits derrière vos émotions pour les reconnaître et commencer à y répondre.",
  wound: "🩹 Reconnaissance et guérison des cinq blessures de l'âme : rejet, abandon, trahison, humiliation, injustice.",
};

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
  const [activeTheme, setActiveTheme] = useState("trauma");
  const [activeTool, setActiveTool] = useState("grounding");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get("theme");
    const tool = params.get("tool");
    if (theme || tool) {
      setActiveTab("therapy");
      if (theme) setActiveTheme(theme);
      if (tool) setActiveTool(tool);
    }
  }, []);

  const selectedTheme = THEMES.find(t => t.id === activeTheme);

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#faf6f0" }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>📖 Journal thérapeutique</h1>
        <p className="text-sm mb-5" style={{ color: "#8d6e63" }}>Outils d'introspection et de guérison personnalisés</p>

        {/* Top tabs: Journal + 6 themes */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          <button onClick={() => setActiveTab("journal")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap border"
            style={{
              background: activeTab === "journal" ? "#5d7a3a" : "transparent",
              borderColor: activeTab === "journal" ? "#5d7a3a" : "#e0d6c8",
              color: activeTab === "journal" ? "#fff" : "#8d6e63",
              fontFamily: SERIF,
            }}>
            <BookOpen className="w-3.5 h-3.5" />
            Journal
          </button>
          {THEMES.map(theme => {
            const Icon = theme.icon;
            const active = activeTab === "therapy" && activeTheme === theme.id;
            return (
              <button key={theme.id} onClick={() => { setActiveTab("therapy"); setActiveTheme(theme.id); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap border"
                style={{
                  background: active ? "#5d7a3a" : "transparent",
                  borderColor: active ? "#5d7a3a" : "#e0d6c8",
                  color: active ? "#fff" : "#8d6e63",
                  fontFamily: SERIF,
                }}>
                <Icon className="w-3.5 h-3.5" />
                {theme.label}
              </button>
            );
          })}
        </div>

        {/* Journal free writing */}
        {activeTab === "journal" && <JournalEntries />}

        {/* Therapy themes with tools */}
        {activeTab === "therapy" && selectedTheme && (
          <div>
            <div className="mb-4 p-3 rounded-xl border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8" }}>
              <h2 className="text-base font-bold mb-0.5" style={{ color: "#3e2723", fontFamily: SERIF }}>
                {selectedTheme.fullLabel}
              </h2>
              <p className="text-xs" style={{ color: "#8d6e63" }}>{selectedTheme.desc}</p>
            </div>

            {/* Tool sub-tabs */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
              {TOOLS.map(tool => {
                const Icon = tool.icon;
                const active = activeTool === tool.id;
                return (
                  <button key={tool.id} onClick={() => setActiveTool(tool.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap border"
                    style={{
                      background: active ? "#7fae7e" : "transparent",
                      borderColor: active ? "#7fae7e" : "#e0d6c8",
                      color: active ? "#fff" : "#8d6e63",
                      fontFamily: SERIF,
                    }}>
                    <Icon className="w-3.5 h-3.5" />
                    {tool.label}
                  </button>
                );
              })}
            </div>

            <div className="mb-4">
              <PersonalizedVideoDisplay />
            </div>

            <p className="text-sm mb-4" style={{ color: "#5d4037", fontFamily: SERIF }}>
              {TOOL_INTROS[activeTool]}
            </p>

            {activeTool === "grounding" && <GroundingSection theme={selectedTheme.context} />}
            {activeTool === "meditation" && <MeditationSection theme={selectedTheme.context} />}
            {activeTool === "hypnose" && <HypnosisSection theme={selectedTheme.context} />}
            {activeTool === "amelioration" && <ImprovementSection theme={selectedTheme.context} />}
            {activeTool === "besoin" && <BesoinSection theme={selectedTheme.context} />}
            {activeTool === "wound" && <WoundSection theme={selectedTheme.context} />}
          </div>
        )}
      </div>
    </div>
  );
}