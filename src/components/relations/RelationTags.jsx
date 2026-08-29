import React from "react";
import { Badge } from "@/components/ui/badge";
import { getTagLabel, migrateNeedTags } from "@/lib/clinicalCategories";

const SHADOW_EMOTION_COLORS = {
  Solitude: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Colère: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Anxiété: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Peur: "bg-green-500/20 text-green-300 border-green-500/30",
  Culpabilité: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Honte: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Tristesse: "bg-red-500/20 text-red-300 border-red-500/30",
};

const LIGHT_EMOTION_COLORS = {
  Paix: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Clarté: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Assertivité: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Amour: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Pouvoir: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Plaisir: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Joie: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const WOUND_COLOR = "bg-red-900/20 text-red-700 border-red-900/30";

const NEED_COLORS = {
  wound: "bg-rose-100 text-rose-700 border-rose-200",
  strength: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

// Affiche les trois tags principaux de façon cohérente : émotion, blessure de
// l'âme (polarité "wound" uniquement) et besoin (troublé/comblé selon polarity).
export default function RelationTags({ emotion, wound, need_tags = [], polarity = "wound" }) {
  const isWound = polarity === "wound";
  const emotionColors = isWound ? SHADOW_EMOTION_COLORS : LIGHT_EMOTION_COLORS;
  const needs = migrateNeedTags(need_tags);
  const wounds = Array.isArray(wound) ? wound : (wound ? [wound] : []);
  const hasEmotion = emotion && emotion !== "__none__";
  if (!hasEmotion && wounds.length === 0 && needs.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {hasEmotion && (
        <Badge className={`${emotionColors[emotion] || "bg-gray-500/20 text-gray-300 border-gray-500/30"} text-xs border`}>
          {emotion}
        </Badge>
      )}
      {isWound && wounds.map(w => (
        <Badge key={w} className={`${WOUND_COLOR} text-xs border`}>{w}</Badge>
      ))}
      {needs.map(tag => (
        <Badge key={tag} className={`${NEED_COLORS[polarity] || NEED_COLORS.wound} text-xs border`}>
          {getTagLabel(tag)}
        </Badge>
      ))}
    </div>
  );
}