import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import { CHAKRAS } from "@/lib/chakras";
import NeedSelector from "@/components/tree/NeedSelector";

export default function PositiveEventsSection() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ age: "", title: "", description: "", emotion: "Joie", need_tags: [] });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    base44.entities.PositiveEvent.list().then(d =>
      setEvents([...d].sort((a, b) => a.age - b.age))
    );
  }, []);

  const reload = () => {
    base44.entities.PositiveEvent.list().then(d =>
      setEvents([...d].sort((a, b) => a.age - b.age))
    );
  };

  const handleCreate = async () => {
    if (!form.title.trim() || !form.age) return;
    const chakra = CHAKRAS.find(c => c.light === form.emotion)?.name || "Stabilité";
    await base44.entities.PositiveEvent.create({ ...form, age: Number(form.age), chakra });
    setForm({ age: "", title: "", description: "", emotion: "Joie", need_tags: [] });
    setShowForm(false);
    reload();
  };

  const handleUpdate = async () => {
    const chakra = CHAKRAS.find(c => c.light === editForm.emotion)?.name || "Stabilité";
    await base44.entities.PositiveEvent.update(editingId, { ...editForm, age: Number(editForm.age), chakra });
    setEditingId(null); setEditForm(null);
    reload();
  };

  const handleDelete = async (id) => {
    await base44.entities.PositiveEvent.delete(id);
    reload();
  };

  return (
    <>
      <Button onClick={() => setShowForm(!showForm)} size="sm"
        className="mb-4 bg-green-800/80 hover:bg-green-700 text-white border border-green-700/40">
        <Plus className="w-3 h-3 mr-1" /> Ajouter un événement
      </Button>

      {showForm && (
        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-4 border border-green-700/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
              placeholder="Âge" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
            <Select value={form.emotion} onValueChange={v => setForm({ ...form, emotion: v })}>
              <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CHAKRAS.map(c => (
                  <SelectItem key={c.light} value={c.light}>{c.light} — {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-[#8d6e63]">
            Chakra : {CHAKRAS.find(c => c.light === form.emotion)?.name || "—"}
          </p>
          <NeedSelector
            value={form.need_tags || []}
            onChange={(tags) => setForm({ ...form, need_tags: tags })}
            label="Besoin comblé"
          />
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Titre de l'événement" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optionnel)" rows={2}
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50 resize-none" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm" className="flex-1 bg-green-800 hover:bg-green-700">Ajouter</Button>
            <Button onClick={() => setShowForm(false)} size="sm" variant="outline"
              className="border-[#e0d6c8] text-[#3e2723] hover:bg-white/60">Annuler</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {events.map(ev => {
          const ch = CHAKRAS.find(c => c.name === ev.chakra);
          const col = ch?.color || "#7fae7e";
          return (
            <div key={ev.id} className="bg-white/40 rounded-xl p-3 border border-[#e0d6c8]/60">
              {editingId === ev.id ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" value={editForm.age} onChange={e => setEditForm({ ...editForm, age: e.target.value })}
                      placeholder="Âge" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-8" />
                    <Select value={editForm.emotion} onValueChange={v => setEditForm({ ...editForm, emotion: v })}>
                      <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{CHAKRAS.map(c => <SelectItem key={c.light} value={c.light}>{c.light}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <NeedSelector
                    value={editForm.need_tags || []}
                    onChange={(tags) => setEditForm({ ...editForm, need_tags: tags })}
                    label="Besoin comblé"
                  />
                  <Input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Titre" className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm h-8" />
                  <Textarea value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description" rows={2} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-sm resize-none" />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdate} size="sm" className="flex-1 bg-green-800 hover:bg-green-700 h-8"><Save className="w-3 h-3 mr-1" />Enregistrer</Button>
                    <Button onClick={() => { setEditingId(null); setEditForm(null); }} size="sm" variant="outline" className="border-[#e0d6c8] text-[#3e2723] h-8">Annuler</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: col }}>
                    {ev.age} ans
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[#3e2723] text-sm font-semibold">{ev.title}</span>
                    {ev.description && <p className="text-[#5d4037] text-xs mt-0.5">{ev.description}</p>}
                    {ev.emotion && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: col + "20", color: col }}>
                        {ev.emotion} — {ev.chakra}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => { setEditingId(ev.id);                      setEditForm({ ...ev, need_tags: ev.need_tags || [] }); }} className="text-[#a1887f] hover:text-green-600 transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="text-[#a1887f] hover:text-red-600 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!events.length && <p className="text-[#8d6e63] text-sm text-center py-4">Aucun événement positif enregistré.</p>}
      </div>
    </>
  );
}