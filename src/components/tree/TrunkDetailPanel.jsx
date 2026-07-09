import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink } from "lucide-react";

const EMOTION_COLORS = {
  Peur: "bg-indigo-500/20 text-indigo-300", Colère: "bg-red-500/20 text-red-300",
  Tristesse: "bg-blue-500/20 text-blue-300", Honte: "bg-yellow-500/20 text-yellow-300",
  Dégoût: "bg-lime-500/20 text-lime-300", Abandon: "bg-pink-500/20 text-pink-300",
  Trahison: "bg-orange-500/20 text-orange-300", Impuissance: "bg-purple-500/20 text-purple-300",
};

export default function TrunkDetailPanel({ events, selectedEvent, onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-[#0d1f0d]/95 backdrop-blur border-t border-white/20 rounded-t-2xl w-full max-w-lg p-5 pb-8"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">🌲 Le Tronc</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-gray-400 text-sm mb-3">{events.length} événement(s) marquant(s), chronologiquement :</p>

        <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
          {events.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Aucun événement enregistré.</p>}
          {events.map(e => (
            <div key={e.id} className={`bg-white/10 rounded-lg p-3 flex items-start gap-3 ${selectedEvent?.id === e.id ? "border border-amber-500/50" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">
                {e.age}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-medium">{e.title}</span>
                  <Badge className={`${EMOTION_COLORS[e.emotion]} text-xs`}>{e.emotion}</Badge>
                  {e.wound_type && <Badge className="bg-red-500/20 text-red-300 text-xs">{e.wound_type}</Badge>}
                </div>
                {e.description && <p className="text-gray-400 text-xs mt-0.5">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onNavigate} className="w-full bg-amber-800 hover:bg-amber-700">
          <ExternalLink className="w-4 h-4 mr-2" /> Gérer les événements du tronc
        </Button>
      </div>
    </div>
  );
}