import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Pencil, ChevronDown, ChevronUp } from "lucide-react";

const BRANCH_AXES = [
  { name: "Émotionnel", icon: "❤️", color: "text-rose-300", bg: "bg-rose-500/10 border-rose-500/20" },
  { name: "Physique", icon: "💪", color: "text-green-300", bg: "bg-green-500/10 border-green-500/20" },
  { name: "Social", icon: "👥", color: "text-sky-300", bg: "bg-sky-500/10 border-sky-500/20" },
  { name: "Artistique", icon: "🎨", color: "text-amber-300", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Intellectuel", icon: "🧠", color: "text-indigo-300", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { name: "Spirituel", icon: "✨", color: "text-purple-300", bg: "bg-purple-500/10 border-purple-500/20" },
];

export default function PositiveBeliefSection({ refreshKey = 0, onRefresh }) {
  const [beliefs, setBeliefs] = useState([]);
  const [openAxis, setOpenAxis] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);
  const [form, setForm] = useState({ belief: "", age: "", note: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    base44.entities.PositiveBelief.list().then(setBeliefs);
  }, [refreshKey]);

  const handleCreate = async (branch) => {
    if (!form.belief.trim()) return;
    const data = { ...form, branch };
    if (data.age) data.age = Number(data.age); else delete data.age;
    await base44.entities.PositiveBelief.create(data);
    setForm({ belief: "", age: "", note: "" });
    setShowFormFor(null);
    onRefresh?.();
    base44.entities.PositiveBelief.list().then(setBeliefs);
  };

  const handleUpdate = async () => {
    const data = { ...editForm };
    if (data.age) data.age = Number(data.age); else delete data.age;
    await base44.entities.PositiveBelief.update(editingId, data);
    setEditingId(null); setEditForm(null);
    onRefresh?.();
    base44.entities.PositiveBelief.list().then(setBeliefs);
  };

  const handleDelete = async (id) => {
    await base44.entities.PositiveBelief.delete(id);
    onRefresh?.();
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
            <button className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpenAxis(isOpen ? null : axis.name)}>
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
                    {editingId === b.id ? (
                      <div className="space-y-2">
                        <Input value={editForm.belief} onChange={e => setEditForm({ ...editForm, belief: e.target.value })}
                          placeholder="Croyance positive" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-8" />
                        <Input type="number" value={editForm.age ?? ""} onChange={e => setEditForm({ ...editForm, age: e.target.value })}
                          placeholder="Âge (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-8" />
                        <Textarea value={editForm.note || ""} onChange={e => setEditForm({ ...editForm, note: e.target.value })}
                          placeholder="Note (optionnel)" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdate} size="sm" className="flex-1 bg-emerald-700 hover:bg-emerald-600 h-8"><Save className="w-3 h-3 mr-1" />Enregistrer</Button>
                          <Button onClick={() => { setEditingId(null); setEditForm(null); }} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] h-8">Annuler</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#3e2723] text-sm font-medium">✦ {b.belief}</p>
                          {b.age != null && <p className="text-[#8d6e63] text-xs mt-0.5">Âge : {b.age} ans</p>}
                          {b.note && <p className="text-[#5d4037] text-xs mt-1">{b.note}</p>}
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => { setEditingId(b.id); setEditForm({ ...b }); }} className="text-[#a1887f] hover:text-emerald-600 transition">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(b.id)} className="text-[#a1887f] hover:text-red-600 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isFormOpen ? (
                  <div className="bg-[#f5f0e8] rounded-lg p-3 border border-[#e0d6c8]/60 space-y-2">
                    <Input value={form.belief} onChange={e => setForm({ ...form, belief: e.target.value })}
                      placeholder="La croyance positive..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                      placeholder="Âge (optionnel)" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <Textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                      placeholder="Note (optionnel)" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm resize-none" />
                    <div className="flex gap-2">
                      <Button onClick={() => handleCreate(axis.name)} size="sm" className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-xs">Ajouter</Button>
                      <Button onClick={() => { setShowFormFor(null); setForm({ belief: "", age: "", note: "" }); }}
                        size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60 text-xs">Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowFormFor(axis.name)}
                    className={`flex items-center gap-1 text-xs ${axis.color} opacity-70 hover:opacity-100 transition`}>
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