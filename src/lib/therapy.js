import { CHAKRAS } from "@/lib/chakras";

export const MASLOW_LEVELS = [
  { name: "Physiologique", color: "#ef4444", icon: "🫁", desc: "Respiration, sommeil, nourriture, survie" },
  { name: "Sécurité", color: "#eab308", icon: "🛡️", desc: "Stabilité, protection, ancrage matériel" },
  { name: "Appartenance", color: "#22c55e", icon: "🤝", desc: "Connexion, amour, lien social" },
  { name: "Estime", color: "#06b6d4", icon: "💎", desc: "Valeur personnelle, confiance, reconnaissance" },
  { name: "Accomplissement", color: "#9333ea", icon: "🌟", desc: "Sens, créativité, réalisation de soi" },
];

// Map chakra → Maslow need
const CHAKRA_TO_MASLOW = {
  Spiritualité: "Accomplissement",
  Intuition: "Estime",
  Communication: "Appartenance",
  Connexion: "Appartenance",
  Volonté: "Estime",
  Créativité: "Accomplissement",
  Stabilité: "Sécurité",
};

export function getMaslowByChakra(chakraName) {
  return CHAKRA_TO_MASLOW[chakraName] || "Sécurité";
}

export function getMaslowInfo(name) {
  return MASLOW_LEVELS.find(m => m.name === name) || MASLOW_LEVELS[1];
}

export function getChakraInfo(name) {
  return CHAKRAS.find(c => c.name === name);
}