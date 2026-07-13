import React from "react";
import { Sparkles, Crown, Eye, Shield, Compass, Flame, Moon, Sun } from "lucide-react";
import SilhouetteMBTI from "@/components/archetype/SilhouetteMBTI";

const ARCHETYPES = [
  {
    name: "Le Sage",
    icon: Eye,
    desc: "Cherche la vérité, la compréhension et la sagesse. Guide par la connaissance.",
    color: "#6366f1",
  },
  {
    name: "Le Souverain",
    icon: Crown,
    desc: "Prend le contrôle, crée l'ordre et exerce le leadership avec responsabilité.",
    color: "#eab308",
  },
  {
    name: "Le Guerrier",
    icon: Shield,
    desc: "Défend ses valeurs, affronte les défis avec courage et détermination.",
    color: "#ef4444",
  },
  {
    name: "L'Explorateur",
    icon: Compass,
    desc: "Cherche la liberté, l'aventure et la découverte de soi à travers l'inconnu.",
    color: "#22c55e",
  },
  {
    name: "Le Créateur",
    icon: Flame,
    desc: "Innovateur, exprime sa vision et transforme l'imagination en réalité.",
    color: "#f97316",
  },
  {
    name: "Le Magicien",
    icon: Sparkles,
    desc: "Catalyseur de changement, transforme et aligne vision et action.",
    color: "#9333ea",
  },
  {
    name: "L'Innocent",
    icon: Sun,
    desc: "Optimiste et pur, recherche le bonheur, l'harmonie et la simplicité.",
    color: "#fbbf24",
  },
  {
    name: "Le Sage Intérieur",
    icon: Moon,
    desc: "Écoute son intuition, embrasse l'ombre et intègre ses parts cachées.",
    color: "#818cf8",
  },
];

export default function Archetype() {
  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0a1628" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
          >
            ✦ Archétypes
          </h1>
          <p className="text-sm" style={{ color: "#8b9dc3" }}>
            Explorez les modèles universels qui habitent votre psyché
          </p>
        </div>

        <SilhouetteMBTI />

        <div className="grid grid-cols-2 gap-4">
          {ARCHETYPES.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.name}
                className="rounded-2xl p-5 border transition-all hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: a.color + "30",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ background: a.color + "20", border: `1px solid ${a.color}40` }}
                >
                  <Icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
                >
                  {a.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8b9dc3" }}>
                  {a.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="mt-8 rounded-2xl p-5 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs italic" style={{ color: "#6b7b94" }}>
            « Connais-toi toi-même et tu connaîtras l'univers et les dieux. »
          </p>
        </div>
      </div>
    </div>
  );
}