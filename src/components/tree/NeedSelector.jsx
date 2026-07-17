import React from "react";
import { CLINICAL_LISTS, migrateNeedTags } from "@/lib/clinicalCategories";

const NEED_LIST = CLINICAL_LISTS.find(l => l.id === "need");

export default function NeedSelector({ value = [], onChange, label = "Besoin" }) {
  const migrated = migrateNeedTags(value);
  const toggle = (fullId) => {
    if (migrated.includes(fullId)) {
      onChange(migrated.filter(v => v !== fullId));
    } else {
      onChange([...migrated, fullId]);
    }
  };

  return (
    <div>
      <p className="text-xs text-[#8d6e63] mb-1.5">{label} (optionnel)</p>
      <div className="flex flex-wrap gap-1">
        {NEED_LIST.items.map(item => {
          const fullId = `${NEED_LIST.id}:${item.id}`;
          const sel = migrated.includes(fullId);
          return (
            <button key={item.id} type="button" title={item.description}
              onClick={() => toggle(fullId)}
              className={`px-2 py-1 rounded-full text-[10px] border transition ${
                sel
                  ? "bg-[#5d7a3a] text-white border-[#5d7a3a]"
                  : "bg-white/60 text-[#8d6e63] border-[#e0d6c8] hover:bg-white"
              }`}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}