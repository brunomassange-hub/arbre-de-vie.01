import React, { useState, useMemo } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { VIDEO_CATEGORY_LISTS, getVideoTagLabel } from "@/lib/videoCategories";

const LIST_COLORS = {
  trauma: "bg-red-600 border-red-500",
  rel: "bg-rose-500 border-rose-400",
  conflict: "bg-purple-600 border-purple-500",
  behavior: "bg-amber-600 border-amber-500",
  wound: "bg-pink-600 border-pink-500",
  need: "bg-cyan-600 border-cyan-500",
  emotion: "bg-indigo-600 border-indigo-500",
  wound_type: "bg-fuchsia-600 border-fuchsia-500",
};

export default function VideoCategorySelector({ value = [], onChange }) {
  const [search, setSearch] = useState("");
  const [expandedLists, setExpandedLists] = useState({});

  const filteredLists = useMemo(() => {
    return VIDEO_CATEGORY_LISTS.map(list => ({
      ...list,
      items: list.items.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(list => list.items.length > 0);
  }, [search]);

  const toggle = (fullId) => {
    if (value.includes(fullId)) {
      onChange(value.filter(v => v !== fullId));
    } else {
      onChange([...value, fullId]);
    }
  };

  const toggleList = (listId) => {
    setExpandedLists(prev => ({ ...prev, [listId]: !prev[listId] }));
  };

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map(tag => {
            const [listId] = tag.split(":");
            return (
              <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded-full text-white border flex items-center gap-0.5 ${LIST_COLORS[listId] || "bg-gray-600 border-gray-500"}`}>
                {getVideoTagLabel(tag)}
                <button type="button" onClick={() => toggle(tag)} className="hover:opacity-70">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8d6e63]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une catégorie..."
          className="w-full bg-white/60 border border-[#e0d6c8] text-[#3e2723] text-xs h-7 pl-7 pr-2 rounded-md"
        />
      </div>

      <div className="max-h-60 overflow-y-auto space-y-1.5">
        {filteredLists.map(list => {
          const isExpanded = expandedLists[list.id] || search.length > 0;
          return (
            <div key={list.id}>
              <button type="button" onClick={() => toggleList(list.id)} className="flex items-center gap-1 w-full text-left">
                {isExpanded ? <ChevronUp className="w-3 h-3 text-[#8d6e63]" /> : <ChevronDown className="w-3 h-3 text-[#8d6e63]" />}
                <span className="text-[10px] font-bold text-[#5d4037]">{list.label}</span>
              </button>
              {isExpanded && (
                <div className="flex flex-wrap gap-1 ml-3 mt-1">
                  {list.items.map(item => {
                    const fullId = `${list.id}:${item.id}`;
                    const sel = value.includes(fullId);
                    return (
                      <button key={item.id} type="button" title={item.description}
                        onClick={() => toggle(fullId)}
                        className={`px-1.5 py-0.5 rounded-full text-[9px] border transition ${sel ? `${LIST_COLORS[list.id] || "bg-gray-600 border-gray-500"} text-white border-transparent` : "bg-white/60 text-[#8d6e63] border-[#e0d6c8] hover:bg-white"}`}>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {filteredLists.length === 0 && (
          <p className="text-[10px] text-[#8d6e63] text-center py-2">Aucun résultat</p>
        )}
      </div>
    </div>
  );
}