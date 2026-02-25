import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Trash2, CheckCircle, Circle, Clock } from "lucide-react";

const BRANCHES = ["Corps", "Esprit", "Âme", "Social", "Professionnel", "Créativité"];
const BRANCH_COLORS = {
  Corps: "bg-red-500/20 text-red-300 border-red-500/30",
  Esprit: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Âme": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Social: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Professionnel: "bg-green-500/20 text-green-300 border-green-500/30",
  "Créativité": "bg-pink-500/20 text-pink-300 border-pink-500/30",
};
const ICONS = { Corps: "💪", Esprit: "🧠", "Âme": "✨", Social: "👥", Professionnel: "💼", "Créativité": "🎨" };

const STATUS_ICON = {
  "à faire": <Circle className="w-4 h-4 text-gray-400" />,
  "en cours": <Clock className="w-4 h-4 text-yellow-400" />,
  "terminé": <CheckCircle className="w-4 h-4 text-green-400" />,
};

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("Tous");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ branch: "Corps", title: "", description: "", status: "à faire", progress: 0, due_date: "" });

  useEffect(() => { loadGoals(); }, []);

  const loadGoals = async () => {
    const data = await base44.entities.Goal.list("-created_date");
    setGoals(data);
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    await base44.entities.Goal.create(form);
    setShowForm(false);
    setForm({ branch: "Corps", title: "", description: "", status: "à faire", progress: 0, due_date: "" });
    loadGoals();
  };

  const updateStatus = async (goal) => {
    const cycle = { "à faire": "en cours", "en cours": "terminé", "terminé": "à faire" };
    await base44.entities.Goal.update(goal.id, { status: cycle[goal.status] });
    loadGoals();
  };

  const updateProgress = async (goal, val) => {
    await base44.entities.Goal.update(goal.id, { progress: Number(val) });
    loadGoals();
  };

  const deleteGoal = async (id) => {
    await base44.entities.Goal.delete(id);
    loadGoals();
  };

  const filtered = selectedBranch === "Tous" ? goals : goals.filter(g => g.branch === selectedBranch);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">🎯 Mes Objectifs</h1>
            <p className="text-gray-400">Par branche de vie</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-500 text-white">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {["Tous", ...BRANCHES].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedBranch === b ? "bg-green-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {b !== "Tous" ? ICONS[b] : ""} {b}
            </button>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
            <h3 className="text-white font-semibold mb-4 text-lg">Nouvel objectif</h3>
            <div className="space-y-3">
              <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.map((b) => <SelectItem key={b} value={b}>{ICONS[b]} {b}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'objectif" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" rows={2} />
              <Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="bg-white/10 border-white/20 text-white" />
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 bg-green-600 hover:bg-green-500">Créer</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/20">Annuler</Button>
              </div>
            </div>
          </div>
        )}

        {/* Goals list */}
        <div className="space-y-3">
          {filtered.map((goal) => (
            <div key={goal.id} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-white/30 transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button onClick={() => updateStatus(goal)} className="mt-0.5 flex-shrink-0">
                    {STATUS_ICON[goal.status]}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${goal.status === "terminé" ? "line-through text-gray-400" : "text-white"}`}>{goal.title}</span>
                      <Badge className={`text-xs ${BRANCH_COLORS[goal.branch]} border`}>{ICONS[goal.branch]} {goal.branch}</Badge>
                    </div>
                    {goal.description && <p className="text-gray-400 text-sm mt-1">{goal.description}</p>}
                    {goal.due_date && <p className="text-gray-500 text-xs mt-1">📅 {goal.due_date}</p>}
                    {/* Progress */}
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="range" min="0" max="100" value={goal.progress || 0}
                        onChange={(e) => updateProgress(goal, e.target.value)}
                        className="w-full h-1 accent-green-400 cursor-pointer"
                      />
                      <span className="text-green-400 text-xs font-bold w-8 text-right">{goal.progress || 0}%</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-4xl mb-3">🌿</p>
              <p>Aucun objectif pour l'instant.<br />Ajoutez votre premier objectif !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}