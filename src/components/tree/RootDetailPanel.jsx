import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink } from "lucide-react";

const TYPE_COLORS = {
  Famille: "bg-red-500/20 text-red-300", "Ami(e)": "bg-yellow-500/20 text-yellow-300",
  Partenaire: "bg-pink-500/20 text-pink-300", Mentor: "bg-purple-500/20 text-purple-300",
  Collègue: "bg-blue-500/20 text-blue-300", Autre: "bg-gray-500/20 text-gray-300",
};
const TYPE_ICONS = { Famille: "👨‍👩‍👧", "Ami(e)": "🤝", Partenaire: "💑", Mentor: "🎓", Collègue: "💼", Autre: "🌐" };

export default function RootDetailPanel({ links, selectedLink, onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-[#0d1f0d]/95 backdrop-blur border-t border-white/20 rounded-t-2xl w-full max-w-lg p-5 pb-8"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">🌱 Les Racines</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-gray-400 text-sm mb-3">{links.length} lien(s) enregistré(s) :</p>

        <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
          {links.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Aucun lien enregistré.</p>}
          {links.map(l => (
            <div key={l.id} className={`bg-white/10 rounded-lg p-3 flex items-start gap-3 ${selectedLink?.id === l.id ? "border border-green-500/50" : ""}`}>
              <span className="text-xl">{TYPE_ICONS[l.type]}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-medium">{l.name}</span>
                  <Badge className={`${TYPE_COLORS[l.type]} text-xs`}>{l.type}</Badge>
                </div>
                {l.description && <p className="text-gray-400 text-xs mt-0.5">{l.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onNavigate} className="w-full bg-green-800 hover:bg-green-700">
          <ExternalLink className="w-4 h-4 mr-2" /> Gérer mes liens & relations
        </Button>
      </div>
    </div>
  );
}