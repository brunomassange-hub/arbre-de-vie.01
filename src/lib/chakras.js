export const CHAKRAS = [
  { name: "Spiritualité", light: "Paix", shadow: "Solitude", color: "#9333ea" },
  { name: "Intuition", light: "Clarté", shadow: "Colère", color: "#6366f1" },
  { name: "Communication", light: "Assertivité", shadow: "Anxiété", color: "#06b6d4" },
  { name: "Connexion", light: "Amour", shadow: "Peur", color: "#22c55e" },
  { name: "Volonté", light: "Pouvoir", shadow: "Culpabilité", color: "#eab308" },
  { name: "Créativité", light: "Plaisir", shadow: "Honte", color: "#f59e0b" },
  { name: "Stabilité", light: "Joie", shadow: "Tristesse", color: "#ef4444" },
];

export const SHADOW_EMOTIONS = CHAKRAS.map(c => c.shadow);
export const LIGHT_EMOTIONS = CHAKRAS.map(c => c.light);

export function getChakra(name) {
  return CHAKRAS.find(c => c.name === name);
}

export function getChakraByShadow(emotion) {
  return CHAKRAS.find(c => c.shadow === emotion);
}

export function getChakraByLight(emotion) {
  return CHAKRAS.find(c => c.light === emotion);
}

export const CHAKRA_DESCRIPTIONS = {
  "Spiritualité": "Chakra couronne (Sahasrara) — sommet du crâne. Connexion au divin, conscience pure, sens de l'unité et ouverture à la transcendance.",
  "Intuition": "Troisième œil (Ajna) — entre les sourcils. Intuition, sagesse intérieure, perception au-delà du visible, vision d'ensemble.",
  "Communication": "Gorge (Vishuddha). Expression authentique, créativité verbale, capacité à communiquer sa vérité avec clarté.",
  "Connexion": "Cœur (Anahata). Amour inconditionnel, compassion, guérison émotionnelle, ouverture aux autres et à soi-même.",
  "Volonté": "Plexus solaire (Manipura). Pouvoir personnel, confiance en soi, volonté d'agir et de transformer ses intentions en actes.",
  "Créativité": "Sacré (Svadhisthana). Plaisir, créativité, fluidité émotionnelle, sensualité et capacité à ressentir la joie.",
  "Stabilité": "Racine (Muladhara) — base de la colonne. Survie, sécurité matérielle, ancrage, stabilité et besoins primaires.",
};