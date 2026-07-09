import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const EMOTIONS = ["Solitude", "Colère", "Anxiété", "Peur", "Culpabilité", "Honte", "Tristesse"];
const EMOTION_COLORS = {
  Solitude: "bg-purple-500/20 text-purple-300",
  Colère: "bg-indigo-500/20 text-indigo-300",
  Anxiété: "bg-cyan-500/20 text-cyan-300",
  Peur: "bg-green-500/20 text-green-300",
  Culpabilité: "bg-yellow-500/20 text-yellow-300",
  Honte: "bg-amber-500/20 text-amber-300",
  Tristesse: "bg-red-500/20 text-red-300",
};

export default function Trunk() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ age: "", title: "", description: "", emotion: "Peur" });

  useEffect(() => { base44.entities.TraumaticEvent.list().then(data => setEvents([...data].sort((a, b) => a.age - b.age))); }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.age) return;
    await base44.entities.TraumaticEvent.create({ ...form, age: Number(form.age) });
    setForm({ age: "", title: "", description: "", emotion: "Peur" });
    setShowForm(false);
    base44.entities.TraumaticEvent.list().then(data => setEvents([...data].sort((a, b) => a.age - b.age)));
  };

  const handleDelete = async (id) => {
    await base44.entities.TraumaticEvent.delete(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">🌲 Le Tronc</h1>
            <p className="text-gray-400">Événements marquants par âge & émotion</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-amber-700 hover:bg-amber-600 text-white">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>

        {showForm && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Nouvel événement</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                  placeholder="Âge" min={0} max={120}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                <Select value={form.emotion} onValueChange={v => setForm({ ...form, emotion: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMOTIONS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'événement" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Description (optionnel)" rows={3}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 bg-amber-700 hover:bg-amber-600">Ajouter</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/20">Annuler</Button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {events.length > 0 && (
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-900/50" />
          )}
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 items-start">
                {/* Age bubble */}
                <div className="w-12 h-12 rounded-full bg-amber-800 border-2 border-amber-600 flex items-center justify-center flex-shrink-0 z-10 relative">
                  <span className="text-white text-xs font-bold">{event.age}<br /><span className="text-gray-300" style={{ fontSize: 8 }}>ans</span></span>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-4 border border-white/10 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white font-semibold">{event.title}</span>
                        <Badge className={`${EMOTION_COLORS[event.emotion]} text-xs`}>{event.emotion}</Badge>
                      </div>
                      {event.description && <p className="text-gray-400 text-sm">{event.description}</p>}
                    </div>
                    <button onClick={() => handleDelete(event.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!events.length && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-4xl mb-3">🌲</p>
                <p>Aucun événement enregistré.<br />Le tronc représente votre parcours de vie.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}