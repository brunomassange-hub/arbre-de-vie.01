import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, X } from "lucide-react";
import FullTree from "@/components/tree/FullTree";

// ─── SHARED ──────────────────────────────────────────────
const LINK_TYPES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];
const LINK_COLORS = {
  Famille: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Ami(e)": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Partenaire: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Mentor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Collègue: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Autre: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const BRANCH_AXES = [
  { name: "Social", icon: "👥", color: "text-sky-300", bg: "bg-sky-500/10 border-sky-500/20" },
  { name: "Physique", icon: "💪", color: "text-green-300", bg: "bg-green-500/10 border-green-500/20" },
  { name: "Intellectuel", icon: "🧠", color: "text-indigo-300", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { name: "Émotionnel", icon: "❤️", color: "text-rose-300", bg: "bg-rose-500/10 border-rose-500/20" },
  { name: "Artistique", icon: "🎨", color: "text-amber-300", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Spirituel", icon: "✨", color: "text-purple-300", bg: "bg-purple-500/10 border-purple-500/20" },
];

const BIG5 = [
  { key: "ouverture", label: "Ouverture", color: "#8b5cf6", desc: "Curiosité, imagination, créativité" },
  { key: "agreabilite", label: "Agréabilité", color: "#22c55e", desc: "Coopération, confiance, empathie" },
  { key: "conscience", label: "Conscience", color: "#3b82f6", desc: "Organisation, discipline, fiabilité" },
  { key: "nervosite", label: "Nervosité", color: "#ef4444", desc: "Anxiété, instabilité émotionnelle" },
  { key: "extraversion", label: "Extraversion", color: "#f59e0b", desc: "Sociabilité, assertivité, énergie" },
];

// ─── SECTION WRAPPER ─────────────────────────────────────
function Section({ emoji, title, subtitle, accentClass, children }) {
  return (
    <div className="mb-8">
      <div className={`rounded-2xl border ${accentClass} p-5`}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{emoji} {title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── BIG FIVE RADAR ──────────────────────────────────────
function BigFiveSection() {
  const [profile, setProfile] = useState(null);
  const [scores, setScores] = useState({ ouverture: 50, agreabilite: 50, conscience: 50, nervosite: 50, extraversion: 50 });
  const [qualites, setQualites] = useState([]);
  const [newQualite, setNewQualite] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.BigFiveProfile.list().then(d => {
      if (d[0]) {
        setProfile(d[0]);
        setScores({
          ouverture: d[0].ouverture ?? 50,
          agreabilite: d[0].agreabilite ?? 50,
          conscience: d[0].conscience ?? 50,
          nervosite: d[0].nervosite ?? 50,
          extraversion: d[0].extraversion ?? 50,
        });
        setQualites(d[0].qualites || []);
      }
    });
  }, []);

  const handleSave = async () => {
    const data = { ...scores, qualites };
    if (profile) await base44.entities.BigFiveProfile.update(profile.id, data);
    else { const c = await base44.entities.BigFiveProfile.create(data); setProfile(c); }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addQualite = () => {
    if (!newQualite.trim()) return;
    setQualites([...qualites, newQualite.trim()]);
    setNewQualite("");
  };

  const removeQualite = (i) => setQualites(qualites.filter((_, idx) => idx !== i));

  // Radar SVG
  const cx = 130, cy = 130, r = 100;
  const n = 5;
  const points = BIG5.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { ax: cx + r * Math.cos(angle), ay: cy + r * Math.sin(angle) };
  });
  const dataPoints = BIG5.map((d, i) => {
    const val = (scores[d.key] / 100) * r;
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + val * Math.cos(angle), y: cy + val * Math.sin(angle) };
  });
  const polygon = dataPoints.map(p => `${p.x},${p.y}`).join(" ");
  const outerPolygon = points.map(p => `${p.ax},${p.ay}`).join(" ");

  return (
    <div>
      <div className="flex gap-4 flex-col sm:flex-row items-start">
        {/* Radar */}
        <div className="flex-shrink-0 mx-auto">
          <svg width="260" height="260" viewBox="0 0 260 260">
            {/* Grid circles */}
            {[0.25, 0.5, 0.75, 1].map(f => (
              <polygon key={f} points={points.map(p => {
                const dx = p.ax - cx, dy = p.ay - cy;
                return `${cx + dx * f},${cy + dy * f}`;
              }).join(" ")} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            ))}
            {/* Axes */}
            {points.map((p, i) => (
              <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            ))}
            {/* Data polygon */}
            <polygon points={polygon} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" />
            {/* Data dots */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill={BIG5[i].color} />
            ))}
            {/* Labels */}
            {points.map((p, i) => {
              const dx = p.ax - cx, dy = p.ay - cy;
              const lx = cx + dx * 1.22, ly = cy + dy * 1.22;
              return (
                <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fontWeight="600" fill={BIG5[i].color}>{BIG5[i].label}</text>
              );
            })}
          </svg>
        </div>

        {/* Sliders */}
        <div className="flex-1 space-y-3 w-full">
          {BIG5.map(d => (
            <div key={d.key}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: d.color }} className="font-semibold">{d.label}</span>
                <span className="text-gray-400">{scores[d.key]}%</span>
              </div>
              <input type="range" min={0} max={100} value={scores[d.key]}
                onChange={e => setScores({ ...scores, [d.key]: Number(e.target.value) })}
                className="w-full accent-green-500 h-1.5 rounded-full cursor-pointer" />
              <p className="text-gray-600 text-xs mt-0.5">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualités */}
      <div className="mt-5">
        <p className="text-white text-sm font-semibold mb-2">✨ Mes qualités</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {qualites.map((q, i) => (
            <span key={i} className="bg-green-900/40 border border-green-600/30 text-green-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              {q}
              <button onClick={() => removeQualite(i)} className="hover:text-red-400 transition">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newQualite} onChange={e => setNewQualite(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addQualite()}
            placeholder="Ajouter une qualité..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm flex-1" />
          <Button onClick={addQualite} size="sm" className="bg-green-800 hover:bg-green-700">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Button onClick={handleSave} className="mt-4 w-full bg-green-800 hover:bg-green-700 text-white">
        <Save className="w-4 h-4 mr-2" />
        {saved ? "✓ Sauvegardé !" : "Sauvegarder mon profil"}
      </Button>
    </div>
  );
}

// ─── RACINES POSITIVES ───────────────────────────────────
function RacinesPositivesSection() {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Famille", description: "" });

  useEffect(() => { base44.entities.PositiveLink.list().then(setLinks); }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    await base44.entities.PositiveLink.create(form);
    setForm({ name: "", type: "Famille", description: "" });
    setShowForm(false);
    base44.entities.PositiveLink.list().then(setLinks);
  };

  const handleDelete = async (id) => {
    await base44.entities.PositiveLink.delete(id);
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <>
      <Button onClick={() => setShowForm(!showForm)} size="sm"
        className="mb-4 bg-emerald-800/70 hover:bg-emerald-700 text-white border border-emerald-700/40">
        <Plus className="w-3 h-3 mr-1" /> Ajouter une relation
      </Button>

      {showForm && (
        <div className="bg-black/20 rounded-xl p-4 mb-4 border border-emerald-700/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Prénom / Nom" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
            <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
              <SelectContent>{LINK_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Ce que cette relation vous apporte de positif..." rows={2}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm" className="flex-1 bg-emerald-800 hover:bg-emerald-700">Ajouter</Button>
            <Button onClick={() => setShowForm(false)} size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">Annuler</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {links.map(lk => (
          <div key={lk.id} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
            <Badge className={`${LINK_COLORS[lk.type] || LINK_COLORS["Autre"]} border text-xs flex-shrink-0 mt-0.5`}>{lk.type}</Badge>
            <div className="flex-1 min-w-0">
              <span className="text-white text-sm font-semibold">{lk.name}</span>
              {lk.description && <p className="text-emerald-400 text-xs mt-0.5">💚 {lk.description}</p>}
            </div>
            <button onClick={() => handleDelete(lk.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {!links.length && <p className="text-gray-500 text-sm text-center py-4">Aucune relation enregistrée.</p>}
      </div>
    </>
  );
}

// ─── PAGE PRINCIPALE ─────────────────────────────────────
export default function Growth() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2010] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-1">✨ Forces</h1>
        <p className="text-gray-400 text-sm mb-4">Cliquez sur l'arbre ou les sections ci-dessous</p>

        <FullTree mode="strengths" />

        <Section emoji="🌲" title="Le Tronc — Big Five" subtitle="Votre profil de personnalité et vos qualités"
          accentClass="bg-green-900/10 border-green-700/30">
          <BigFiveSection />
        </Section>

        <Section emoji="🌱" title="Les Racines" subtitle="Relations positives et nourrissantes"
          accentClass="bg-emerald-900/10 border-emerald-700/30">
          <RacinesPositivesSection />
        </Section>
      </div>
    </div>
  );
}