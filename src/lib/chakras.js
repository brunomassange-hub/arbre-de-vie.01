export const CHAKRAS = [
  { name: "Spiritualité", light: "Paix", shadow: "Solitude", color: "#9333ea" },
  { name: "Intuition", light: "Clarté", shadow: "Colère", color: "#6366f1" },
  { name: "Communication", light: "Assertivité", shadow: "Anxiété", color: "#06b6d4" },
  { name: "Connexion", light: "Amour", shadow: "Peur", color: "#22c55e" },
  { name: "Volonté", light: "Pouvoir", shadow: "Culpabilité", color: "#eab308" },
  { name: "Créativité", light: "Plaisir", shadow: "Honte", color: "#f59e0b" },
  { name: "Stabilité", light: "Joie", shadow: "Tristesse", color: "#ef4444" },
];

export function getChakra(name) {
  return CHAKRAS.find(c => c.name === name);
}