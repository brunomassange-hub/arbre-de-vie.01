import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import VideoDisplay from "./VideoDisplay";
import { THEME_TO_LIST } from "@/lib/videoCategories";

export default function ThemeVideoDisplay({ themeId, dark = false }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const listId = THEME_TO_LIST[themeId];
    if (!listId) { setTags([]); return; }

    let cancelled = false;
    (async () => {
      try {
        const [events, links, beliefs] = await Promise.all([
          base44.entities.TraumaticEvent.list(),
          base44.entities.Link.list(),
          base44.entities.LimitingBelief.list(),
        ]);

        if (cancelled) return;
        const collected = new Set();

        [...events, ...links, ...beliefs].forEach(item => {
          (item.clinical_tags || []).forEach(tag => {
            if (tag.startsWith(`${listId}:`)) collected.add(tag);
          });
        });

        if (themeId === "emotions") {
          events.forEach(ev => {
            if (ev.emotion) collected.add(`emotion:${ev.emotion}`);
          });
        }

        if (themeId === "wound") {
          events.forEach(ev => {
            if (ev.wound_type) collected.add(`wound_type:${ev.wound_type}`);
          });
        }

        setTags([...collected]);
      } catch {
        if (!cancelled) setTags([]);
      }
    })();

    return () => { cancelled = true; };
  }, [themeId]);

  return <VideoDisplay tags={tags} dark={dark} />;
}