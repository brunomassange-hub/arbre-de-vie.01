import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { CLINICAL_LISTS, getTagLabel } from "@/lib/clinicalCategories";

const THEMES = [
  { listId: "rel", label: "Difficulté relationnelle" },
  { listId: "trauma", label: "Traumatisme" },
  { listId: "conflict", label: "Conflit psychique" },
  { listId: "behavior", label: "Troubles du comportement" },
  { listId: "need", label: "Défaillance d'un besoin essentiel" },
];

const THEME_COLORS = {
  rel: "bg-rose-600",
  trauma: "bg-red-600",
  conflict: "bg-purple-600",
  behavior: "bg-amber-600",
  need: "bg-cyan-600",
  wound: "bg-pink-600",
};

export default function ClinicalCategorizationEditor({ value = [], onChange }) {
  const [expandedThemes, setExpandedThemes] = useState({});

  const activeThemes = new Set();
  value.forEach(tag => {
    const [listId] = tag.split(":");
    if (THEMES.some(t => t.listId === listId)) activeThemes.add(listId);
  });

  const toggleTheme = (listId) => {
    setExpandedThemes(prev => ({ ...prev, [listId]: !prev[listId] }));
  };

  const toggleTag = (fullId) => {
    if (value.includes(fullId)) onChange(value.filter(v => v !== fullId));
    else onChange([...value, fullId]);
  };

  const getSelectedCount = (listId) => value.filter(tag => tag.startsWith(`${listId}:`)).length;

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map(tag => {
            const [listId] = tag.split(":");
            return (
              <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded-full text-white flex items-center gap-0.5 ${THEME_COLORS[listId] || "bg-gray-600"}`}>
                {getTagLabel(tag)}
                <button type="button" onClick={() => toggleTag(tag)} className="hover:opacity-70">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {THEMES.map(theme => {
          const isActive = activeThemes.has(theme.listId);
          const isExpanded = expandedThemes[theme.listId];
          const count = getSelectedCount(theme.listId);
          return (
            <button
              key={theme.listId}
              type="button"
              onClick={() => toggleTheme(theme.listId)}
              className={`px-2 py-0.5 rounded-full text-[9px] border transition flex items-center gap-1 ${
                isActive
                  ? `${THEME_COLORS[theme.listId]} text-white border-transparent`
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
              }`}
            >
              {theme.label}
              {count > 0 && <span className="text-[8px] opacity-80">({count})</span>}
              {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          );
        })}
      </div>

      {THEMES.map(theme => {
        if (!expandedThemes[theme.listId]) return null;
        const list = CLINICAL_LISTS.find(l => l.id === theme.listId);
        if (!list) return null;
        return (
          <div key={theme.listId} className="border-l-2 border-white/10 pl-2 ml-1">
            <div className="flex flex-wrap gap-1">
              {list.items.map(item => {
                const fullId = `${theme.listId}:${item.id}`;
                const sel = value.includes(fullId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.description}
                    onClick={() => toggleTag(fullId)}
                    className={`px-1.5 py-0.5 rounded-full text-[9px] border transition ${
                      sel
                        ? `${THEME_COLORS[theme.listId]} text-white border-transparent`
                        : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}