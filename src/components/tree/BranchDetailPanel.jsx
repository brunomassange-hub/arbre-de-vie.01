import React from "react";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

export default function BranchDetailPanel({ branch, beliefs, onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-[#0d1f0d]/95 backdrop-blur border-t border-white/20 rounded-t-2xl w-full max-w-lg p-5 pb-8"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">{branch.icon} {branch.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-gray-400 text-sm mb-3">
          {beliefs.length === 0 ? "Aucune croyance limitante enregistrée pour cette branche." : `${beliefs.length} croyance(s) limitante(s) :`}
        </p>

        <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
          {beliefs.map(b => (
            <div key={b.id} className="bg-white/10 rounded-lg p-3">
              <p className="text-white text-sm">"{b.belief}"</p>
              {b.reframe && <p className="text-green-400 text-xs mt-1">✦ {b.reframe}</p>}
            </div>
          ))}
        </div>

        <Button onClick={onNavigate} className="w-full bg-indigo-700 hover:bg-indigo-600">
          <ExternalLink className="w-4 h-4 mr-2" /> Gérer les croyances de cette branche
        </Button>
      </div>
    </div>
  );
}