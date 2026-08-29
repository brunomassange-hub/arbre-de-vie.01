import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CLINICAL_LISTS, generalTagFor, isGeneralTag } from "@/lib/clinicalCategories";

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

  const toggleGeneral = (listId) => {
    const generalTag = generalTagFor(listId);
    if (value.includes(generalTag)) onChange(value.filter(v => v !== generalTag));
    else onChange([...value, generalTag]);
    // Toujours déplier la liste des sous-catégories lors d'un clic sur la grande catégorie
    setExpandedThemes(prev => ({ ...prev, [listId]: true }));
  };

  const toggleTag = (fullId) => {
    if (value.includes(fullId)) onChange(value.filter(v => v !== fullId));
    else onChange([...value, fullId]);
  };

  const getSelectedCount = (listId) => value.filter(tag => tag.startsWith(`${listId}:`) && !isGeneralTag(tag)).length;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {THEMES.map(theme => {
          const isActive = activeThemes.has(theme.listId);
          const isExpanded = expandedThemes[theme.listId];
          const count = getSelectedCount(theme.listId);
          return (
            <div
              key={theme.listId}
              className={`inline-flex items-stretch rounded-full border overflow-hidden ${
                isActive
                  ? `${THEME_COLORS[theme.listId]} text-white border-transparent`
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleGeneral(theme.listId)}
                className="px-2 py-0.5 text-[9px] flex items-center gap-1 transition"
              >
                {theme.label}
                {count > 0 && <span className="text-[8px] opacity-80">({count})</span>}
              </button>
              <button
                type="button"
                onClick={() => toggleTheme(theme.listId)}
                className="px-1 flex items-center transition hover:bg-white/10"
                aria-label={isExpanded ? "Replier" : "Déplier"}
              >
                {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
              </button>
            </div>
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