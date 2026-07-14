import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit3 } from "lucide-react";
import { CATEGORIES, JOURNAL_TOOLS } from "@/lib/analysisEngine";

export default function SuggestionCard({ suggestion, onValidate, onReject }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(suggestion.description);
  const cat = CATEGORIES[suggestion.category];
  const tool = JOURNAL_TOOLS[suggestion.journal_tool];

  return (
    <div className="rounded-xl border p-3" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-start gap-2 mb-2">
        <span className="text-base">{cat.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: cat.color }}>{cat.label}</span>
          <h3 className="text-sm font-semibold text-white">{suggestion.title}</h3>
        </div>
      </div>

      {editing ? (
        <div className="mb-2">
          <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3}
            className="bg-white/5 border-white/10 text-gray-300 text-xs resize-none mb-1" />
          <button onClick={() => { setEditing(false); setEditText(suggestion.description); }}
            className="text-xs text-gray-500 hover:text-white">Annuler la modification</button>
        </div>
      ) : (
        <p className="text-xs text-gray-400 mb-2 leading-relaxed">{suggestion.description}</p>
      )}

      <div className="flex items-center gap-1.5 mb-2.5 text-[10px]" style={{ color: "#8b9dc3" }}>
        <span>{tool.icon}</span>
        <span>Recommandation : <strong>{tool.label}</strong></span>
      </div>

      <div className="flex gap-1.5">
        <Button onClick={() => onValidate({ ...suggestion, description: editText })}
          size="sm" className="flex-1 bg-green-700 hover:bg-green-600 text-white h-7 text-xs">
          <Check className="w-3 h-3 mr-1" /> Valider
        </Button>
        <Button onClick={() => setEditing(!editing)} size="sm" variant="outline"
          className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 h-7 px-2">
          <Edit3 className="w-3 h-3" />
        </Button>
        <Button onClick={() => onReject(suggestion)} size="sm" variant="outline"
          className="bg-white/5 border-white/10 text-red-400 hover:bg-red-900/20 h-7 px-2">
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}