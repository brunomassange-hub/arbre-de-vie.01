import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const THEME_TAGS = [
  { val: "valeur_personnelle", label: "Valeur personnelle" },
  { val: "securite", label: "Sécurité" },
  { val: "amour", label: "Amour" },
  { val: "controle", label: "Contrôle" },
  { val: "confiance", label: "Confiance" },
  { val: "autre", label: "Autre" },
];

export const THEME_TAG_LABELS = Object.fromEntries(THEME_TAGS.map(t => [t.val, t.label]));

export default function BeliefQualification({ value, onChange, events = [], links = [] }) {
  const sourceRef = value.source_event_id ? `event:${value.source_event_id}` : value.source_link_id ? `link:${value.source_link_id}` : "none";

  const handleSourceChange = (ref) => {
    if (ref === "none") onChange({ source_event_id: null, source_link_id: null });
    else if (ref.startsWith("event:")) onChange({ source_event_id: ref.substring(6), source_link_id: null });
    else if (ref.startsWith("link:")) onChange({ source_link_id: ref.substring(5), source_event_id: null });
  };

  return (
    <div className="space-y-2">
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Thème</p>
        <div className="flex flex-wrap gap-1">
          {THEME_TAGS.map(({ val, label }) => {
            const sel = value.theme_tag === val;
            return (
              <button key={val} type="button" onClick={() => onChange({ theme_tag: sel ? null : val })}
                className={`px-2 py-0.5 rounded-full text-[9px] border transition ${sel ? "bg-green-700 text-white border-green-600" : "bg-white/60 text-[#8d6e63] border-[#e0d6c8] hover:bg-white"}`}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Issue de (optionnel)</p>
        <Select value={sourceRef} onValueChange={handleSourceChange}>
          <SelectTrigger className="bg-white/60 border-[#e0d6c8] text-[#3e2723] h-7 text-xs">
            <SelectValue placeholder="Aucune source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Aucune source</SelectItem>
            {events.map(ev => (
              <SelectItem key={ev.id} value={`event:${ev.id}`}>📅 {ev.title} ({ev.age} ans)</SelectItem>
            ))}
            {links.map(lk => (
              <SelectItem key={lk.id} value={`link:${lk.id}`}>🔗 {lk.name} ({lk.type})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}