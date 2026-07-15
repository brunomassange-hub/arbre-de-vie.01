import React from "react";
import ClinicalCategorizationEditor from "./ClinicalCategorizationEditor";
import VideoDisplay from "@/components/video/VideoDisplay";

function buildEventTags(ev) {
  const tags = [...(ev.clinical_tags || [])];
  if (ev.emotion) tags.push(`emotion:${ev.emotion}`);
  if (ev.wound_type) tags.push(`wound_type:${ev.wound_type}`);
  return tags;
}

export default function SourceElementList({ events = [], links = [], beliefs = [], onTagsChange }) {
  if (events.length === 0 && links.length === 0 && beliefs.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold mb-3" style={{ color: "#e8d5c4" }}>📋 Éléments sources</h2>

      {links.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-2" style={{ color: "#f43f5e" }}>🔗 Relations douloureuses</h3>
          <div className="space-y-2">
            {links.map(lk => (
              <div key={lk.id} className="rounded-xl border p-3" style={{ background: "rgba(244,63,94,0.03)", borderColor: "rgba(244,63,94,0.1)" }}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-white">{lk.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">{lk.type}</span>
                </div>
                {lk.description && <p className="text-xs text-gray-400 mb-2">{lk.description}</p>}
                <ClinicalCategorizationEditor
                  value={lk.clinical_tags || []}
                  onChange={(tags) => onTagsChange("link", lk.id, tags)}
                />
                <VideoDisplay tags={lk.clinical_tags || []} dark />
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-2" style={{ color: "#f59e0b" }}>📅 Événements</h3>
          <div className="space-y-2">
            {events.map(ev => (
              <div key={ev.id} className="rounded-xl border p-3" style={{ background: "rgba(245,158,11,0.03)", borderColor: "rgba(245,158,11,0.1)" }}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-white">{ev.title}</span>
                  {ev.age != null && <span className="text-[10px] text-gray-500">{ev.age} ans</span>}
                  {ev.emotion && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">{ev.emotion}</span>}
                  {ev.wound_type && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">{ev.wound_type}</span>}
                </div>
                {ev.description && <p className="text-xs text-gray-400 mb-2">{ev.description}</p>}
                <ClinicalCategorizationEditor
                  value={ev.clinical_tags || []}
                  onChange={(tags) => onTagsChange("event", ev.id, tags)}
                />
                <VideoDisplay tags={buildEventTags(ev)} dark />
              </div>
            ))}
          </div>
        </div>
      )}

      {beliefs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-2" style={{ color: "#06b6d4" }}>🔒 Croyances limitantes</h3>
          <div className="space-y-2">
            {beliefs.map(b => (
              <div key={b.id} className="rounded-xl border p-3" style={{ background: "rgba(6,182,212,0.03)", borderColor: "rgba(6,182,212,0.1)" }}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-white">"{b.belief}"</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">{b.branch}</span>
                </div>
                {b.origin && <p className="text-xs text-gray-400 mb-2">Origine : {b.origin}</p>}
                <ClinicalCategorizationEditor
                  value={b.clinical_tags || []}
                  onChange={(tags) => onTagsChange("belief", b.id, tags)}
                />
                <VideoDisplay tags={b.clinical_tags || []} dark />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}