import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Play, ExternalLink } from "lucide-react";
import { getEmbedInfo, getVideoTagLabel } from "@/lib/videoCategories";

const SERIF = "'Playfair Display', Georgia, serif";

export default function VideoDisplay({ tags = [], dark = false, fallbackToAll = false }) {
  const [videos, setVideos] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    base44.entities.Video.list().then(setVideos).catch(() => setVideos([]));
  }, []);

  if (!videos) return null;

  const matching = videos
    .map(v => ({
      video: v,
      matchCount: (v.category_tags || []).filter(tag => tags.includes(tag)).length,
    }))
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(item => item.video);

  const display = matching.length > 0 ? matching : (fallbackToAll ? videos : []);

  if (display.length === 0) return null;

  const cardBg = dark ? "rgba(255,255,255,0.03)" : "#f5f0e8";
  const cardBorder = dark ? "rgba(255,255,255,0.08)" : "#e0d6c8";
  const titleColor = dark ? "#e8d5c4" : "#3e2723";
  const tagBg = dark ? "rgba(139,157,195,0.1)" : "#e0d6c860";
  const tagColor = dark ? "#8b9dc3" : "#5d4037";

  return (
    <div className="space-y-2">
      {display.map(video => {
        const embed = getEmbedInfo(video.url);
        const isActive = activeVideoId === video.id;
        return (
          <div key={video.id} className="rounded-xl border overflow-hidden" style={{ background: cardBg, borderColor: cardBorder }}>
            <button
              onClick={() => setActiveVideoId(isActive ? null : video.id)}
              className="w-full flex items-center gap-2 p-3 text-left"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: dark ? "rgba(125,211,252,0.15)" : "rgba(93,122,58,0.15)" }}>
                <Play className="w-4 h-4" style={{ color: dark ? "#7dd3fc" : "#5d7a3a" }} />
              </div>
              <span className="text-sm font-medium flex-1" style={{ color: titleColor, fontFamily: SERIF }}>{video.title}</span>
            </button>

            {isActive && (
              <div className="px-3 pb-3">
                {embed.type === "file" ? (
                  <video src={embed.embedUrl} controls className="w-full rounded-lg" />
                ) : (
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={embed.embedUrl}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>
                )}
                {video.category_tags && video.category_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {video.category_tags.map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: tagBg, color: tagColor }}>
                        {getVideoTagLabel(tag)}
                      </span>
                    ))}
                  </div>
                )}
                <a href={video.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] mt-2" style={{ color: tagColor }}>
                  <ExternalLink className="w-2.5 h-2.5" /> Ouvrir dans un nouvel onglet
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}