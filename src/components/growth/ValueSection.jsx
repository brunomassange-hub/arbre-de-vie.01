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

const VALUE_COLOR = "#c9a430";

export default function ValueSection({ refreshKey = 0, onRefresh }) {
  const [values, setValues] = useState([]);
  const [openAxis, setOpenAxis] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);
  const [form, setForm] = useState({ value: "", note: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    base44.entities.Value.list().then(setValues);
  }, [refreshKey]);

  const handleCreate = async (branch) => {
    if (!form.value.trim()) return;
    await base44.entities.Value.create({ value: form.value.trim(), branch, note: form.note.trim() || undefined });
    setForm({ value: "", note: "" });
    setShowFormFor(null);
    onRefresh?.();
    base44.entities.Value.list().then(setValues);
  };

  const handleUpdate = async () => {
    await base44.entities.Value.update(editingId, { value: editForm.value.trim(), note: editForm.note?.trim() || undefined });
    setEditingId(null); setEditForm(null);
    onRefresh?.();
    base44.entities.Value.list().then(setValues);
  };

  const handleDelete = async (id) => {
    await base44.entities.Value.delete(id);
    onRefresh?.();
    setValues(values.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-2">
      {BRANCH_AXES.map(axis => {
        const axisValues = values.filter(v => v.branch === axis.name);
        const isOpen = openAxis === axis.name;
        const isFormOpen = showFormFor === axis.name;

        return (
          <div key={axis.name} className={`rounded-xl border ${axis.bg} overflow-hidden`}>
            <button className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpenAxis(isOpen ? null : axis.name)}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{axis.icon}</span>
                <span className={`font-semibold ${axis.color}`}>{axis.name}</span>
                <span className="text-[#8d6e63] text-xs">({axisValues.length} valeur{axisValues.length !== 1 ? "s" : ""})</span>
              </div>
              {isOpen ? <ChevronUp className="w-4 h-4 text-[#8d6e63]" /> : <ChevronDown className="w-4 h-4 text-[#8d6e63]" />}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-2">
                {axisValues.map(v => (
                  <div key={v.id} className="bg-[#f5f0e8] rounded-lg p-3 border border-[#e0d6c8]/60">
                    {editingId === v.id ? (
                      <div className="space-y-2">
                        <Input value={editForm.value} onChange={e => setEditForm({ ...editForm, value: e.target.value })}
                          placeholder="La valeur..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-8" />
                        <Textarea value={editForm.note || ""} onChange={e => setEditForm({ ...editForm, note: e.target.value })}
                          placeholder="Note (optionnel)" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdate} size="sm" className="flex-1 h-8 text-white" style={{ background: VALUE_COLOR }}>
                            <Save className="w-3 h-3 mr-1" />Enregistrer
                          </Button>
                          <Button onClick={() => { setEditingId(null); setEditForm(null); }} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] h-8">Annuler</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium" style={{ color: "#3e2723" }}>★ {v.value}</p>
                          {v.note && <p className="text-[#5d4037] text-xs mt-1">{v.note}</p>}
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => { setEditingId(v.id); setEditForm({ ...v }); }} className="text-[#a1887f] hover:text-amber-600 transition">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(v.id)} className="text-[#a1887f] hover:text-red-600 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isFormOpen ? (
                  <div className="bg-[#f5f0e8] rounded-lg p-3 border border-[#e0d6c8]/60 space-y-2">
                    <Input value={form.value} onChange={e => setForm({ ...form, value: e.target.value })}
                      placeholder="Ex: authenticité, liberté, respect, courage..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm" />
                    <Textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                      placeholder="Note (optionnel)" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 text-sm resize-none" />
                    <div className="flex gap-2">
                      <Button onClick={() => handleCreate(axis.name)} size="sm" className="flex-1 text-white text-xs" style={{ background: VALUE_COLOR }}>Ajouter</Button>
                      <Button onClick={() => { setShowFormFor(null); setForm({ value: "", note: "" }); }}
                        size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60 text-xs">Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowFormFor(axis.name)}
                    className={`flex items-center gap-1 text-xs ${axis.color} opacity-70 hover:opacity-100 transition`}>
                    <Plus className="w-3 h-3" /> Ajouter une valeur
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