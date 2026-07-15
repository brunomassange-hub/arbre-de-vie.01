import React from "react";
import { getTagLabel, getTagDescription } from "@/lib/clinicalCategories";

const LIST_BADGE_COLORS = {
  trauma: "bg-red-100 text-red-700 border-red-200",
  rel: "bg-rose-100 text-rose-700 border-rose-200",
  conflict: "bg-purple-100 text-purple-700 border-purple-200",
  behavior: "bg-amber-100 text-amber-700 border-amber-200",
  wound: "bg-pink-100 text-pink-700 border-pink-200",
  need: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export default function ClinicalTagBadges({ tags = [] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(tag => {
        const [listId] = tag.split(":");
        const colorClass = LIST_BADGE_COLORS[listId] || "bg-gray-100 text-gray-700 border-gray-200";
        return (
          <span key={tag} title={getTagDescription(tag)}
            className={`text-[9px] px-1.5 py-0.5 rounded-full border ${colorClass}`}>
            {getTagLabel(tag)}
          </span>
        );
      })}
    </div>
  );
}