import React from "react";
import { Input } from "@/components/ui/input";

export const REL_DIFFICULTY_LABELS = {
  peur_engagement: "Peur de l'engagement",
  isolement: "Isolement",
  agressivite: "Agressivité",
  difficulte_confiance: "Difficulté à faire confiance",
  dependance_affective: "Dépendance affective",
  evitement: "Évitement",
  autre: "Autre",
};

export const TRAUMA_TYPE_LABELS = {
  agression: "Agression",
  viol: "Viol",
  vol: "Vol",
  traumatisme_precoce: "Traumatisme précoce",
  separation: "Séparation",
  negligence: "Négligence",
  violence: "Violence",
  autre: "Autre",
};

const REL_OPTS = Object.entries(REL_DIFFICULTY_LABELS).map(([val, label]) => ({ val, label }));
const TRAUMA_OPTS = Object.entries(TRAUMA_TYPE_LABELS).map(([val, label]) => ({ val, label }));

function ChipMulti({ field, options, value, onChange, activeColor }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(({ val, label }) => {
        const sel = (value[field] || []).includes(val);
        return (
          <button key={val} type="button" onClick={() => {
            const arr = value[field] || [];
            onChange({ [field]: arr.includes(val) ? arr.filter(i => i !== val) : [...arr, val] });
          }}
            className={`px-2 py-0.5 rounded-full text-[9px] border transition ${sel ? `${activeColor} text-white` : "bg-white/60 text-[#8d6e63] border-[#e0d6c8] hover:bg-white"}`}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

function YesNo({ field, value, onChange, activeColor, detailField, detailPlaceholder }) {
  const active = value[field];
  return (
    <>
      <button type="button" onClick={() => onChange({ [field]: !active })}
        className={`px-3 py-0.5 rounded-full text-[9px] border ${active ? `${activeColor} text-white` : "bg-white/60 text-[#8d6e63] border-[#e0d6c8]"}`}>
        {active ? "Oui" : "Non"}
      </button>
      {active && (
        <Input value={value[detailField] || ""} onChange={e => onChange({ [detailField]: e.target.value })}
          placeholder={detailPlaceholder} className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-[10px] h-6 mt-1" />
      )}
    </>
  );
}

export default function LinkQualification({ value, onChange }) {
  return (
    <div className="space-y-2.5">
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Cela a-t-il engendré des difficultés relationnelles ?</p>
        <ChipMulti field="relational_difficulties" options={REL_OPTS} value={value} onChange={onChange} activeColor="bg-rose-600 border-rose-500" />
        {(value.relational_difficulties || []).includes("autre") && (
          <Input value={value.relational_difficulties_other || ""} onChange={e => onChange({ relational_difficulties_other: e.target.value })}
            placeholder="Précisez..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-[10px] h-6 mt-1" />
        )}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Cela a-t-il engendré des conflits psychiques ?</p>
        <YesNo field="psychic_conflicts" value={value} onChange={onChange} activeColor="bg-purple-600 border-purple-500"
          detailField="psychic_conflicts_detail" detailPlaceholder="Précisez..." />
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Cela a-t-il engendré des comportements problématiques ?</p>
        <YesNo field="problematic_behaviors" value={value} onChange={onChange} activeColor="bg-amber-600 border-amber-500"
          detailField="problematic_behaviors_detail" detailPlaceholder="Précisez..." />
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[#5d4037] mb-1">Cela a-t-il constitué un traumatisme ?</p>
        <ChipMulti field="trauma_types" options={TRAUMA_OPTS} value={value} onChange={onChange} activeColor="bg-red-700 border-red-600" />
        {(value.trauma_types || []).includes("autre") && (
          <Input value={value.trauma_types_other || ""} onChange={e => onChange({ trauma_types_other: e.target.value })}
            placeholder="Précisez..." className="bg-white/60 border-[#e0d6c8] text-[#3e2723] text-[10px] h-6 mt-1" />
        )}
      </div>
    </div>
  );
}