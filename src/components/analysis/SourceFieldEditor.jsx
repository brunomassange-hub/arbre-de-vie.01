import React, { useState } from "react";
import EmotionNeedFields from "@/components/tree/EmotionNeedFields";
import { CHAKRAS } from "@/lib/chakras";

// Édition directe des 3 champs principaux (Émotion, Blessure de l'âme, Besoin)
// depuis la page Analyse, sans retourner sur Force/Blessure.
// Même style et mêmes options que les formulaires existants (EmotionNeedFields).
// `entityType` "event" utilise `wound_type` (TraumaticEvent) ; "link"/"belief"
// utilisent `soul_wound` (Link/LimitingBelief). Tous sont polarité "wound".
export default function SourceFieldEditor({ entityType, entity, onChange }) {
  const [open, setOpen] = useState(false);
  const isEvent = entityType === "event";

  const value = {
    emotion: entity.emotion || "",
    soul_wound: isEvent ? (entity.wound_type || "") : (entity.soul_wound || ""),
    need_tags: entity.need_tags || [],
  };

  // EmotionNeedFields émet un patch à champ unique ; on mappe vers les
  // bons noms de champ d'entité, et on dérive le chakra pour les événements.
  const handleChange = (patch) => {
    const mapped = {};
    if (patch.emotion !== undefined) {
      mapped.emotion = patch.emotion;
      if (isEvent) {
        mapped.chakra = CHAKRAS.find(c => c.shadow === patch.emotion)?.name || "Connexion";
      }
    }
    if (patch.soul_wound !== undefined) {
      if (isEvent) mapped.wound_type = patch.soul_wound;
      else mapped.soul_wound = patch.soul_wound;
    }
    if (patch.need_tags !== undefined) mapped.need_tags = patch.need_tags;
    onChange(mapped);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-[10px] text-gray-400 hover:text-amber-300 transition"
      >
        {open ? "− Masquer Émotion / Besoin / Blessure" : "+ Modifier Émotion / Besoin / Blessure"}
      </button>
      {open && (
        <div className="bg-[#f5f0e8] rounded-lg p-3 mt-2 border border-[#e0d6c8]/60 space-y-3">
          <EmotionNeedFields
            value={value}
            onChange={handleChange}
            polarity="wound"
            compact
          />
        </div>
      )}
    </div>
  );
}