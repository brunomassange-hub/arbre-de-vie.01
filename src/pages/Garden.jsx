import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import FullTree from "@/components/tree/FullTree";
import { CHAKRAS } from "@/lib/chakras";

// ─── TRONC ───────────────────────────────────────────────
const EMOTIONS = ["Solitude", "Colère", "Anxiété", "Peur", "Culpabilité", "Honte", "Tristesse"];
const EMOTION_COLORS = {
  Solitude: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Colère: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Anxiété: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Peur: "bg-green-500/20 text-green-300 border-green-500/30",
  Culpabilité: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Honte: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Tristesse: "bg-red-500/20 text-red-300 border-red-500/30",
};

// ─── RACINES ─────────────────────────────────────────────
const LINK_TYPES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];
const LINK_COLORS = {
  Famille: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Ami(e)": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Partenaire: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Mentor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Collègue: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Autre: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

// ─── BRANCHES ────────────────────────────────────────────
const BRANCH_AXES = [
  { name: "Social", icon: "👥", color: "text-sky-300", bg: "bg-sky-500/10 border-sky-500/20" },
  { name: "Physique", icon: "💪", color: "text-green-300", bg: "bg-green-500/10 border-green-500/20" },
  { name: "Intellectuel", icon: "🧠", color: "text-indigo-300", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { name: "Émotionnel", icon: "❤️", color: "text-rose-300", bg: "bg-rose-500/10 border-rose-500/20" },
  { name: "Artistique", icon: "🎨", color: "text-amber-300", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Spirituel", icon: "✨", color: "text-purple-300", bg: "bg-purple-500/10 border-purple-500/20" },
];

// ─── SECTION WRAPPER ─────────────────────────────────────
function Section({ emoji, title, subtitle, accentClass, children }) {
  return (
    <div className="mb-8">
      <div className={`rounded-2xl border ${accentClass} p-5`}>
        <div className="mb-4">
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#3e2723" }}>{emoji} {title}</h2>
          <p className="text-sm" style={{ color: "#8d6e63" }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── TRONC SECTION ───────────────────────────────────────
function TroncSection() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ age: "", title: "", description: "", emotion: "Peur" });

  useEffect(() => {
    base44.entities.TraumaticEvent.list().then(d => setEvents([...d].sort((a, b) => a.age - b.age)));
  }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.age) return;
    const chakra = CHAKRAS.find(c => c.shadow === form.emotion)?.name || "Connexion";
    await base44.entities.TraumaticEvent.create({ ...form, age: Number(form.age), chakra });
    setForm({ age: "", title: "", description: "", emotion: "Peur" });
    setShowForm(false);
    base44.entities.TraumaticEvent.list().then(d => setEvents([...d].sort((a, b) => a.age - b.age)));
  };

  const handleDelete = async (id) => {
    await base44.entities.TraumaticEvent.delete(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <>
      <Button onClick={() => setShowForm(!showForm)} size="sm"
        className="mb-4 bg-amber-700/70 hover:bg-amber-600 text-white border border-amber-600/40">
        <Plus className="w-3 h-3 mr-1" /> Ajouter un événement
      </Button>

      {showForm && (
        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-4 border border-amber-700/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
              placeholder="Âge" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
            <Select value={form.emotion} onValueChange={v => setForm({ ...form, emotion: v })}>
              <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723]"><SelectValue /></SelectTrigger>
              <SelectContent>{CHAKRAS.map(c => <SelectItem key={c.shadow} value={c.shadow}>{c.shadow} — {c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <p className="text-xs text-[#8d6e63]">Chakra : {CHAKRAS.find(c => c.shadow === form.emotion)?.name || "—"}</p>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Titre de l'événement" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optionnel)" rows={2}
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 resize-none" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm" className="flex-1 bg-amber-700 hover:bg-amber-600">Ajouter</Button>
            <Button onClick={() => setShowForm(false)} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60">Annuler</Button>
          </div>
        </div>
      )}

      <div className="relative">
        {events.length > 0 && <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-amber-900/40" />}
        <div className="space-y-3">
          {events.map(ev => (
            <div key={ev.id} className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-amber-800 border border-amber-600 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-white text-xs font-bold text-center leading-tight">{ev.age}<br/><span style={{fontSize:8}} className="text-gray-300">ans</span></span>
              </div>
              <div className="flex-1 bg-white/40 rounded-xl p-3 border border-[#e0d6c8]/60">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#3e2723] text-sm font-semibold">{ev.title}</span>
                      <Badge className={`${EMOTION_COLORS[ev.emotion]} text-xs border`}>{ev.emotion}</Badge>
                    </div>
                    {ev.description && <p className="text-[#8d6e63] text-xs mt-1">{ev.description}</p>}
                  </div>
                  <button onClick={() => handleDelete(ev.id)} className="text-[#a1887f] hover:text-red-600 transition flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!events.length && <p className="text-[#8d6e63] text-sm text-center py-4">Aucun événement enregistré.</p>}
        </div>
      </div>
    </>
  );
}

// ─── RACINES SECTION ─────────────────────────────────────
function RacinesSection() {
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

  return (
    <>
      <Button onClick={() => setShowForm(!showForm)} size="sm"
        className="mb-4 bg-rose-800/70 hover:bg-rose-700 text-white border border-rose-700/40">
        <Plus className="w-3 h-3 mr-1" /> Ajouter une relation
      </Button>

      {showForm && (
        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-4 border border-rose-700/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Prénom / Nom" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
            <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
              <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723]"><SelectValue /></SelectTrigger>
              <SelectContent>{LINK_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Ce qui était douloureux dans cette relation..." rows={2}
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 resize-none" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm" className="flex-1 bg-rose-800 hover:bg-rose-700">Ajouter</Button>
            <Button onClick={() => setShowForm(false)} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60">Annuler</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {links.map(lk => (
          <div key={lk.id} className="flex items-start gap-3 bg-white/40 rounded-xl p-3 border border-[#e0d6c8]/60">
            <Badge className={`${LINK_COLORS[lk.type] || LINK_COLORS["Autre"]} border text-xs flex-shrink-0 mt-0.5`}>{lk.type}</Badge>
            <div className="flex-1 min-w-0">
              <span className="text-[#3e2723] text-sm font-semibold">{lk.name}</span>
              {lk.description && <p className="text-[#8d6e63] text-xs mt-0.5">{lk.description}</p>}
            </div>
            <button onClick={() => handleDelete(lk.id)} className="text-[#a1887f] hover:text-red-600 transition flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {!links.length && <p className="text-[#8d6e63] text-sm text-center py-4">Aucune relation enregistrée.</p>}
      </div>
    </>
  );
}

// ─── BRANCHES SECTION ────────────────────────────────────
function BranchesSection() {
  const [beliefs, setBeliefs] = useState([]);
  const [openAxis, setOpenAxis] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);
  const [form, setForm] = useState({ belief: "", origin: "", reframe: "" });

  useEffect(() => { base44.entities.LimitingBelief.list().then(setBeliefs); }, []);

  const handleCreate = async (branch) => {
    if (!form.belief.trim()) return;
    await base44.entities.LimitingBelief.create({ ...form, branch });
    setForm({ belief: "", origin: "", reframe: "" });
    setShowFormFor(null);
    base44.entities.LimitingBelief.list().then(setBeliefs);
  };

  const handleDelete = async (id) => {
    await base44.entities.LimitingBelief.delete(id);
    setBeliefs(beliefs.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-2">
      {BRANCH_AXES.map(axis => {
        const axisBelief = beliefs.filter(b => b.branch === axis.name);
        const isOpen = openAxis === axis.name;
        const isFormOpen = showFormFor === axis.name;

        return (
          <div key={axis.name} className={`rounded-xl border ${axis.bg} overflow-hidden`}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpenAxis(isOpen ? null : axis.name)}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{axis.icon}</span>
                <span className={`font-semibold ${axis.color}`}>{axis.name}</span>
                <span className="text-[#8d6e63] text-xs">({axisBelief.length} croyance{axisBelief.length !== 1 ? "s" : ""})</span>
              </div>
              {isOpen ? <ChevronUp className="w-4 h-4 text-[#8d6e63]" /> : <ChevronDown className="w-4 h-4 text-[#8d6e63]" />}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-2">
                {axisBelief.map(b => (
                  <div key={b.id} className="bg-[#f5f0e8] rounded-lg p-3 border border-[#e0d6c8]/60">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">"{b.belief}"</p>
                        {b.origin && <p className="text-[#8d6e63] text-xs mt-1">Origine : {b.origin}</p>}
                        {b.reframe && <p className="text-green-600 text-xs mt-1">✦ {b.reframe}</p>}
                      </div>
                      <button onClick={() => handleDelete(b.id)} className="text-[#a1887f] hover:text-red-600 transition flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {isFormOpen ? (
                  <div className="bg-[#f5f0e8] rounded-lg p-3 border border-[#e0d6c8]/60 space-y-2">
                    <Input value={form.belief} onChange={e => setForm({ ...form, belief: e.target.value })}
                      placeholder="La croyance limitante..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <Input value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}
                      placeholder="D'où vient-elle ? (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <Input value={form.reframe} onChange={e => setForm({ ...form, reframe: e.target.value })}
                      placeholder="Reformulation positive (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <div className="flex gap-2">
                      <Button onClick={() => handleCreate(axis.name)} size="sm" className="flex-1 bg-green-800 hover:bg-green-700 text-xs">Ajouter</Button>
                      <Button onClick={() => { setShowFormFor(null); setForm({ belief: "", origin: "", reframe: "" }); }}
                        size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60 text-xs">Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFormFor(axis.name)}
                    className={`flex items-center gap-1 text-xs ${axis.color} opacity-70 hover:opacity-100 transition`}
                  >
                    <Plus className="w-3 h-3" /> Ajouter une croyance
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PAGE PRINCIPALE ─────────────────────────────────────
export default function Garden() {
  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#faf6f0" }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3e2723" }}>🩸 Blessures</h1>
        <p className="text-sm mb-4" style={{ color: "#8d6e63" }}>Cliquez sur l'arbre ou les sections ci-dessous</p>

        <FullTree mode="wounds" />

        <Section emoji="🌲" title="Le Tronc" subtitle="Expériences de vie traumatiques, classées par âge et émotion"
          accentClass="bg-amber-50 border-amber-200">
          <TroncSection />
        </Section>

        <Section emoji="🌱" title="Les Racines" subtitle="Relations douloureuses qui ont façonné votre histoire"
          accentClass="bg-rose-50 border-rose-200">
          <RacinesSection />
        </Section>

        <Section emoji="🍃" title="Les Branches" subtitle="Croyances limitantes selon les 6 axes de vie"
          accentClass="bg-green-50 border-green-200">
          <BranchesSection />
        </Section>
      </div>
    </div>
  );
}