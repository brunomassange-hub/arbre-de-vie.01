import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { CHAKRAS } from "@/lib/chakras";

const LINK_TYPES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];
const EMOTIONS = ["Peur", "Colère", "Tristesse", "Honte", "Dégoût", "Abandon", "Trahison", "Impuissance"];

const ZONE_META = {
  trunk:   { label: "Le Tronc",   emoji: "🌲", sub: "Événements de vie & personnalité" },
  branch:  { label: "La Branche", emoji: "🍃", sub: "Croyances" },
  root:    { label: "Les Racines", emoji: "🌱", sub: "Relations" },
};

export default function TreeAddPanel({ zone, onClose, onSaved, polarityLock }) {
  const [polarity, setPolarity] = useState(polarityLock || "wound");
  const [saving, setSaving] = useState(false);
  const [branchSubType, setBranchSubType] = useState("belief");
  const [activityForm, setActivityForm] = useState({ name: "", description: "" });

  // Trunk wound form
  const [eventForm, setEventForm] = useState({ age: "", title: "", description: "", emotion: "Peur", chakra: "Connexion" });
  // Link form (root)
  const [linkForm, setLinkForm] = useState({ name: "", type: "Famille", description: "" });
  // Belief form (branch)
  const [beliefForm, setBeliefForm] = useState({ belief: "", origin: "", reframe: "", note: "" });
  // Quality form (trunk strength)
  const [quality, setQuality] = useState("");
  const [posEventForm, setPosEventForm] = useState({ age: "", title: "", description: "", chakra: "Connexion" });
  const [trunkSubType, setTrunkSubType] = useState("quality");

  const meta = ZONE_META[zone?.type] || ZONE_META.trunk;
  const branchName = zone?.name || "";

  const handleSave = async () => {
    setSaving(true);
    try {
      if (zone.type === "trunk") {
        if (polarity === "wound") {
          if (!eventForm.title.trim() || !eventForm.age) return;
          await base44.entities.TraumaticEvent.create({ ...eventForm, age: Number(eventForm.age) });
          setEventForm({ age: "", title: "", description: "", emotion: "Peur", chakra: "Connexion" });
        } else {
          if (trunkSubType === "quality") {
            if (!quality.trim()) return;
            const existing = await base44.entities.BigFiveProfile.list();
            if (existing[0]) {
              const q = [...(existing[0].qualites || []), quality.trim()];
              await base44.entities.BigFiveProfile.update(existing[0].id, { qualites: q });
            } else {
              await base44.entities.BigFiveProfile.create({ qualites: [quality.trim()] });
            }
            setQuality("");
          } else {
            if (!posEventForm.title.trim() || !posEventForm.age) return;
            await base44.entities.PositiveEvent.create({ ...posEventForm, age: Number(posEventForm.age) });
            setPosEventForm({ age: "", title: "", description: "", chakra: "Connexion" });
          }
        }
      } else if (zone.type === "root") {
        if (!linkForm.name.trim()) return;
        if (polarity === "wound") {
          await base44.entities.Link.create(linkForm);
        } else {
          await base44.entities.PositiveLink.create(linkForm);
        }
        setLinkForm({ name: "", type: "Famille", description: "" });
      } else if (zone.type === "branch") {
        if (polarity === "strength" && branchSubType === "activity") {
          if (!activityForm.name.trim()) return;
          await base44.entities.Activity.create({ ...activityForm, branch: branchName });
          setActivityForm({ name: "", description: "" });
        } else {
          if (!beliefForm.belief.trim()) return;
          if (polarity === "wound") {
            await base44.entities.LimitingBelief.create({ belief: beliefForm.belief, origin: beliefForm.origin, reframe: beliefForm.reframe, branch: branchName });
          } else {
            await base44.entities.PositiveBelief.create({ belief: beliefForm.belief, note: beliefForm.note, branch: branchName });
          }
          setBeliefForm({ belief: "", origin: "", reframe: "", note: "" });
        }
      }
      onSaved?.();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const canSave = () => {
    if (zone.type === "trunk") {
      if (polarity === "wound") return eventForm.title.trim() && eventForm.age;
      return trunkSubType === "quality" ? quality.trim() : (posEventForm.title.trim() && posEventForm.age);
    }
    if (zone.type === "root") return linkForm.name.trim();
    if (zone.type === "branch") {
      if (polarity === "strength" && branchSubType === "activity") return activityForm.name.trim();
      return beliefForm.belief.trim();
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-[#0d1a0d] rounded-t-2xl w-full max-w-lg border-t-2 shadow-2xl max-h-[85vh] overflow-y-auto"
        style={{ borderColor: polarity === "wound" ? "#ef4444" : "#22c55e" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div>
            <p className="text-xs text-gray-400">{meta.emoji} {meta.label}{branchName ? ` — ${branchName}` : ""}</p>
            <p className="text-gray-500 text-xs">{meta.sub}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Polarity toggle */}
        {!polarityLock && (
        <div className="flex gap-2 px-5 mb-4">
          <button
            onClick={() => setPolarity("wound")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${
              polarity === "wound" ? "bg-red-900/60 text-red-200 border-red-700" : "bg-white/5 text-gray-400 border-white/10"
            }`}
          >🩸 Blessure</button>
          <button
            onClick={() => setPolarity("strength")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${
              polarity === "strength" ? "bg-green-900/60 text-green-200 border-green-700" : "bg-white/5 text-gray-400 border-white/10"
            }`}
          >✨ Force</button>
        </div>
        )}

        {/* Form body */}
        <div className="px-5 pb-5 space-y-3">
          {zone.type === "trunk" && polarity === "wound" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input type="number" value={eventForm.age} onChange={e => setEventForm({ ...eventForm, age: e.target.value })}
                  placeholder="Âge" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                <Select value={eventForm.emotion} onValueChange={v => setEventForm({ ...eventForm, emotion: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>{EMOTIONS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Select value={eventForm.chakra} onValueChange={v => setEventForm({ ...eventForm, chakra: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>{CHAKRAS.map(c => <SelectItem key={c.name} value={c.name}>{c.name} — {c.shadow}</SelectItem>)}</SelectContent>
              </Select>
              <Input value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Titre de l'événement" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Textarea value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Description (optionnel)" rows={2}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
            </>
          )}

          {zone.type === "trunk" && polarity === "strength" && (
            <>
              <div className="flex gap-2">
                <button onClick={() => setTrunkSubType("quality")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${trunkSubType === "quality" ? "bg-green-900/60 text-green-200 border-green-700" : "bg-white/5 text-gray-400 border-white/10"}`}>
                  ✨ Qualité
                </button>
                <button onClick={() => setTrunkSubType("event")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${trunkSubType === "event" ? "bg-green-900/60 text-green-200 border-green-700" : "bg-white/5 text-gray-400 border-white/10"}`}>
                  🌳 Événement positif
                </button>
              </div>
              {trunkSubType === "quality" ? (
                <>
                  <p className="text-gray-400 text-xs">Ajoutez une qualité personnelle à votre tronc.</p>
                  <Input value={quality} onChange={e => setQuality(e.target.value)}
                    placeholder="Ex: Résilient, Créatif, Empathique..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="number" value={posEventForm.age} onChange={e => setPosEventForm({ ...posEventForm, age: e.target.value })}
                      placeholder="Âge" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                    <Select value={posEventForm.chakra} onValueChange={v => setPosEventForm({ ...posEventForm, chakra: v })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
                      <SelectContent>{CHAKRAS.map(c => <SelectItem key={c.name} value={c.name}>{c.name} — {c.light}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Input value={posEventForm.title} onChange={e => setPosEventForm({ ...posEventForm, title: e.target.value })}
                    placeholder="Titre de l'événement" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Textarea value={posEventForm.description} onChange={e => setPosEventForm({ ...posEventForm, description: e.target.value })}
                    placeholder="Description (optionnel)" rows={2}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
                </>
              )}
            </>
          )}

          {zone.type === "root" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input value={linkForm.name} onChange={e => setLinkForm({ ...linkForm, name: e.target.value })}
                  placeholder="Prénom / Nom" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                <Select value={linkForm.type} onValueChange={v => setLinkForm({ ...linkForm, type: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>{LINK_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Textarea value={linkForm.description} onChange={e => setLinkForm({ ...linkForm, description: e.target.value })}
                placeholder={polarity === "wound" ? "Ce qui était douloureux..." : "Ce que cette relation vous apporte de positif..."}
                rows={2} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
            </>
          )}

          {zone.type === "branch" && polarity === "wound" && (
            <>
              <Input value={beliefForm.belief} onChange={e => setBeliefForm({ ...beliefForm, belief: e.target.value })}
                placeholder="La croyance limitante..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Input value={beliefForm.origin} onChange={e => setBeliefForm({ ...beliefForm, origin: e.target.value })}
                placeholder="D'où vient-elle ? (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Input value={beliefForm.reframe} onChange={e => setBeliefForm({ ...beliefForm, reframe: e.target.value })}
                placeholder="Reformulation positive (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
            </>
          )}

          {zone.type === "branch" && polarity === "strength" && (
            <>
              <div className="flex gap-2">
                <button onClick={() => setBranchSubType("belief")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${branchSubType === "belief" ? "bg-green-900/60 text-green-200 border-green-700" : "bg-white/5 text-gray-400 border-white/10"}`}>
                  ✦ Croyance
                </button>
                <button onClick={() => setBranchSubType("activity")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${branchSubType === "activity" ? "bg-green-900/60 text-green-200 border-green-700" : "bg-white/5 text-gray-400 border-white/10"}`}>
                  🍃 Activité
                </button>
              </div>
              {branchSubType === "belief" ? (
                <>
                  <Input value={beliefForm.belief} onChange={e => setBeliefForm({ ...beliefForm, belief: e.target.value })}
                    placeholder="La croyance positive..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input value={beliefForm.note} onChange={e => setBeliefForm({ ...beliefForm, note: e.target.value })}
                    placeholder="Note (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </>
              ) : (
                <>
                  <Input value={activityForm.name} onChange={e => setActivityForm({ ...activityForm, name: e.target.value })}
                    placeholder="Nom de l'activité..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input value={activityForm.description} onChange={e => setActivityForm({ ...activityForm, description: e.target.value })}
                    placeholder="Pourquoi elle me fait du bien (optionnel)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </>
              )}
            </>
          )}

          <Button
            onClick={handleSave}
            disabled={!canSave() || saving}
            className={`w-full ${polarity === "wound" ? "bg-red-800 hover:bg-red-700" : "bg-green-800 hover:bg-green-700"} text-white`}
          >
            {saving ? "..." : polarity === "wound" ? "Ajouter la blessure" : zone.type === "trunk" && trunkSubType === "event" ? "Ajouter l'événement" : branchSubType === "activity" ? "Ajouter l'activité" : "Ajouter la force"}
          </Button>
        </div>
      </div>
    </div>
  );
}