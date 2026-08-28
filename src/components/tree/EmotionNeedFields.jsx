import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAKRAS } from "@/lib/chakras";
import NeedSelector from "./NeedSelector";

const NONE = "__none__";

// Reusable emotion + need fields for relations (Racines) and beliefs (Branches).
// polarity "wound" → shadow emotions + "Besoin troublé" ; "strength" → light emotions + "Besoin comblé".
export default function EmotionNeedFields({ value = {}, onChange, polarity = "wound", compact = false }) {
  const isWound = polarity === "wound";
  const emotionKey = isWound ? "shadow" : "light";
  const needLabel = isWound ? "Besoin troublé" : "Besoin comblé";
  const current = value.emotion || NONE;

  const handleEmotion = (v) => onChange({ emotion: v === NONE ? "" : v });
  const handleNeeds = (need_tags) => onChange({ need_tags });

  const triggerCls = compact
    ? "bg-white/60 border-[#e0d6c8] text-[#3e2723] h-8 text-sm"
    : "bg-white/60 border-[#e0d6c8] text-[#3e2723]";

  return (
    <>
      <div>
        <p className="text-xs text-[#8d6e63] mb-1.5">Émotion associée (optionnel)</p>
        <Select value={current} onValueChange={handleEmotion}>
          <SelectTrigger className={triggerCls}>
            <SelectValue placeholder="Aucune émotion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>— Aucune —</SelectItem>
            {CHAKRAS.map(c => (
              <SelectItem key={c[emotionKey]} value={c[emotionKey]}>{c[emotionKey]} — {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <NeedSelector
        value={value.need_tags || []}
        onChange={handleNeeds}
        label={needLabel}
      />
    </>
  );
}