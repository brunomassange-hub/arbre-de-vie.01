import { CLINICAL_LISTS } from "@/lib/clinicalCategories";

export const EMOTION_ITEMS = [
  { id: "Solitude", label: "Solitude", description: "Sentiment d'isolement, d'être seul au monde." },
  { id: "Colère", label: "Colère", description: "Fureur, irritation, frustration intense." },
  { id: "Anxiété", label: "Anxiété", description: "Inquiétude, angoisse, tension nerveuse." },
  { id: "Peur", label: "Peur", description: "Effroi, crainte, sentiment de danger." },
  { id: "Culpabilité", label: "Culpabilité", description: "Sentiment de faute, de responsabilité." },
  { id: "Honte", label: "Honte", description: "Gêne profonde, sentiment d'indignité." },
  { id: "Tristesse", label: "Tristesse", description: "Chagrin, deuil, mélancolie." },
];

export const WOUND_TYPE_ITEMS = [
  { id: "Trahison", label: "Trahison", description: "Confiance brisée, engagement non respecté." },
  { id: "Rejet", label: "Rejet", description: "Ne pas être accepté pour soi-même." },
  { id: "Abandon", label: "Abandon", description: "Être laissé seul, abandonné." },
  { id: "Humiliation", label: "Humiliation", description: "Être jugé, ridiculisé, rabaissé." },
  { id: "Injustice", label: "Injustice", description: "Être traité de façon inéquitable." },
];

export const VIDEO_CATEGORY_LISTS = [
  ...CLINICAL_LISTS,
  { id: "emotion", label: "Émotions", items: EMOTION_ITEMS },
  { id: "wound_type", label: "Blessures (type d'événement)", items: WOUND_TYPE_ITEMS },
];

const ALL_VIDEO_ITEMS = VIDEO_CATEGORY_LISTS.flatMap(list =>
  list.items.map(item => ({ ...item, listId: list.id, fullId: `${list.id}:${item.id}` }))
);

export function getVideoTagLabel(fullId) {
  const item = ALL_VIDEO_ITEMS.find(i => i.fullId === fullId);
  return item?.label || fullId;
}

export function getVideoTagDescription(fullId) {
  const item = ALL_VIDEO_ITEMS.find(i => i.fullId === fullId);
  return item?.description || "";
}

export const THEME_TO_LIST = {
  trauma: "trauma",
  emotions: "emotion",
  wound: "wound",
  conflits: "conflict",
  relations: "rel",
  comportement: "behavior",
  sens: "need",
};

export function getEmbedInfo(url) {
  if (!url) return { type: "none", embedUrl: "" };
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  if (ytMatch) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}` };
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  return { type: "file", embedUrl: url };
}