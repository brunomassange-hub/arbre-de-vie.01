import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import VideoDisplay from "./VideoDisplay";
import { createPageUrl } from "@/utils";

export default function PersonalizedVideoDisplay({ dark = false }) {
  const [tags, setTags] = useState(null);
  const [videoCount, setVideoCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [events, links, beliefs, videos] = await Promise.all([
          base44.entities.TraumaticEvent.list(),
          base44.entities.Link.list(),
          base44.entities.LimitingBelief.list(),
          base44.entities.Video.list(),
        ]);

        if (cancelled) return;
        setVideoCount(videos.length);

        const collected = new Set();

        [...events, ...links, ...beliefs].forEach(item => {
          (item.clinical_tags || []).forEach(tag => collected.add(tag));
          (item.need_tags || []).forEach(tag => collected.add(tag));
        });

        events.forEach(ev => {
          if (ev.emotion) collected.add(`emotion:${ev.emotion}`);
          if (ev.wound_type) collected.add(`wound_type:${ev.wound_type}`);
        });

        setTags([...collected]);
      } catch {
        if (!cancelled) {
          setTags([]);
          setVideoCount(0);
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (tags === null || videoCount === null) return null;

  const hasUserTags = tags.length > 0;
  const hasVideos = videoCount > 0;

  if (!hasVideos) return null;

  return (
    <div className="mb-4">
      {!hasUserTags && (
        <div className="rounded-xl border p-3 mb-2 text-xs" style={{
          background: dark ? "rgba(139,157,195,0.05)" : "#f5f0e8",
          borderColor: dark ? "rgba(139,157,195,0.15)" : "#e0d6c8",
          color: dark ? "#8b9dc3" : "#8d6e63",
        }}>
          <p className="mb-0.5 font-medium">📋 Vos recommandations vidéo ne sont pas encore personnalisées.</p>
          <p>Catégorisez vos données sur la <Link to={createPageUrl("Analysis")} className="underline">page Analyse</Link> pour obtenir des vidéos ciblées sur votre profil. Voici les vidéos générales disponibles.</p>
        </div>
      )}
      <VideoDisplay tags={tags} dark={dark} fallbackToAll={!hasUserTags} />
    </div>
  );
}