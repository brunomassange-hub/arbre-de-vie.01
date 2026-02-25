import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const BRANCHES = [
  { name: "Physique",     icon: "💪", color: "#e74c3c", colorClass: "bg-red-500/20 text-red-300",     side: "Gauche (bas)" },
  { name: "Social",       icon: "👥", color: "#f39c12", colorClass: "bg-yellow-500/20 text-yellow-300", side: "Gauche (milieu)" },
  { name: "Intellectuel", icon: "🧠", color: "#3498db", colorClass: "bg-blue-500/20 text-blue-300",   side: "Gauche (haut)" },
  { name: "Émotionnel",   icon: "💗", color: "#e91e63", colorClass: "bg-pink-500/20 text-pink-300",   side: "Droite (bas)" },
  { name: "Artistique",   icon: "🎨", color: "#9b59b6", colorClass: "bg-purple-500/20 text-purple-300", side: "Droite (milieu)" },
  { name: "Spirituel",    icon: "✨", color: "#27ae60", colorClass: "bg-green-500/20 text-green-300", side: "Droite (haut)" },
];

export default function Beliefs() {
  const [searchParams] = useSearchParams();
  const preselectedBranch = searchParams.get("branch");

  const [beliefs, setBeliefs] = useState([]);
  const [showForm, setShowForm] = useState(!!preselectedBranch);
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState({ branch: preselectedBranch || "Physique", belief: "", origin: "", reframe: "" });

  useEffect(() => { base44.entities.LimitingBelief.list().then(setBeliefs); }, []);

  const handleCreate = async () => {
    if (!form.belief.trim()) return;
    await base44.entities.LimitingBelief.create(form);
    setForm({ branch: form.branch, belief: "", origin: "", reframe: "" });
    setShowForm(false);
    base44.entities.LimitingBelief.list().then(setBeliefs);
  };

  const handleDelete = async (id) => {
    await base44.entities.LimitingBelief.delete(id);
    setBeliefs(beliefs.filter(b => b.id !== id));
  };

  const toggle = (name) => setExpanded(e => ({ ...e, [name]: !e[name] }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">🌿 Croyances Limitantes</h1>
            <p className="text-gray-400">Par branche de l'arbre</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-700 hover:bg-indigo-600 text-white">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>

        {showForm && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Nouvelle croyance limitante</h3>
            <div className="space-y-3">
              <Select value={form.branch} onValueChange={v => setForm({ ...form, branch: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.map(b => <SelectItem key={b.name} value={b.name}>{b.icon} {b.name} — {b.side}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input value={form.belief} onChange={e => setForm({ ...form, belief: e.target.value })}
                placeholder="La croyance limitante (ex: Je ne suis pas capable...)"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Input value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}
                placeholder="Origine (optionnel : d'où vient cette croyance ?)"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Input value={form.reframe} onChange={e => setForm({ ...form, reframe: e.target.value })}
                placeholder="Reformulation positive (optionnel)"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 bg-indigo-700 hover:bg-indigo-600">Ajouter</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/20">Annuler</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {BRANCHES.map(branch => {
            const branchBeliefs = beliefs.filter(b => b.branch === branch.name);
            const isExpanded = expanded[branch.name];
            return (
              <div key={branch.name} className="bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition"
                  onClick={() => toggle(branch.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{branch.icon}</span>
                    <div className="text-left">
                      <span className="text-white font-medium">{branch.name}</span>
                      <span className="text-gray-500 text-xs ml-2">{branch.side}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {branchBeliefs.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: branch.color + "33", color: branch.color }}>
                        {branchBeliefs.length}
                      </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-white/10 p-3 space-y-2">
                    {branchBeliefs.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-2">Aucune croyance enregistrée</p>
                    )}
                    {branchBeliefs.map(b => (
                      <div key={b.id} className="bg-white/5 rounded-lg p-3 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">"{b.belief}"</p>
                          {b.origin && <p className="text-gray-400 text-xs mt-1">↳ Origine : {b.origin}</p>}
                          {b.reframe && <p className="text-green-400 text-xs mt-1">✦ {b.reframe}</p>}
                        </div>
                        <button onClick={() => handleDelete(b.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-xs mt-1"
                      onClick={() => { setForm({ ...form, branch: branch.name }); setShowForm(true); }}>
                      <Plus className="w-3 h-3 mr-1" /> Ajouter une croyance
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}