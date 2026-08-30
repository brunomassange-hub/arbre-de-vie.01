import React from "react";
import ClinicalCategorizationEditor from "./ClinicalCategorizationEditor";
import SourceFieldEditor from "./SourceFieldEditor";
import RelationTags from "@/components/relations/RelationTags";
import { extractWoundLabels } from "@/lib/clinicalCategories";

export default function SourceElementList({ events = [], links = [], beliefs = [], onTagsChange, onFieldsChange }) {
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
                <RelationTags emotion={lk.emotion} wound={extractWoundLabels(lk)} need_tags={lk.need_tags} polarity="wound" />
                {lk.description && <p className="text-xs text-gray-400 mb-2">{lk.description}</p>}
                <ClinicalCategorizationEditor
                  value={lk.clinical_tags || []}
                  onChange={(tags) => onTagsChange("link", lk.id, tags)}
                />
                <SourceFieldEditor
                  entityType="link"
                  entity={lk}
                  onChange={(patch) => onFieldsChange("link", lk.id, patch)}
                />
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
                </div>
                <RelationTags emotion={ev.emotion} wound={extractWoundLabels(ev)} need_tags={ev.need_tags} polarity="wound" />
                {ev.description && <p className="text-xs text-gray-400 mb-2">{ev.description}</p>}
                <ClinicalCategorizationEditor
                  value={ev.clinical_tags || []}
                  onChange={(tags) => onTagsChange("event", ev.id, tags)}
                />
                <SourceFieldEditor
                  entityType="event"
                  entity={ev}
                  onChange={(patch) => onFieldsChange("event", ev.id, patch)}
                />
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
                <RelationTags emotion={b.emotion} wound={extractWoundLabels(b)} need_tags={b.need_tags} polarity="wound" />
                {b.origin && <p className="text-xs text-gray-400 mb-2">Origine : {b.origin}</p>}
                <ClinicalCategorizationEditor
                  value={b.clinical_tags || []}
                  onChange={(tags) => onTagsChange("belief", b.id, tags)}
                />
                <SourceFieldEditor
                  entityType="belief"
                  entity={b}
                  onChange={(patch) => onFieldsChange("belief", b.id, patch)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}