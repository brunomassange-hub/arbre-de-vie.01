import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { TreeVisual, ArchetypeVisual, AnalyseVisual, JournalVisual } from "@/components/onboarding/OnboardingVisuals";

const SERIF = "'Playfair Display', Georgia, serif";

const SCREENS = [
  {
    title: "L'Arbre de Vie",
    text: "L'arbre de vie est un modèle de cartographie psychologique basé sur la culture judéo-chrétienne de la Kabbale, qui représente les différentes parties de la nature humaine. Il s'inspire aussi d'une lecture moderne des chakras, associés aux grands champs de l'existence — spiritualité, intuition, communication, connexion, pouvoir, créativité, stabilité — et aux émotions positives et négatives qui leur sont liées. Cette cartographie intègre également la psychologie occidentale, notamment la pyramide des besoins de Maslow, qui éclaire les besoins essentiels de l'être humain.",
    bg: "linear-gradient(to bottom, #0a1628, #0a2818)",
    accent: "#4a9d5f",
    visual: <TreeVisual variant="arbre" />,
  },
  {
    title: "L'Arbre des Blessures",
    text: "Le tronc représente votre vie : inscrivez-y les événements blessants ou traumatisants que vous avez vécus (cliquez sur le + du tronc), en précisant l'âge, l'émotion associée et le sentiment que cela a procuré (abandon, rejet, trahison, humiliation, injustice). Les racines représentent les relations douloureuses et les séparations (cliquez sur une racine), réparties par catégorie : famille, ami, partenaire, etc. Les branches vous permettent d'extérioriser vos croyances limitantes.",
    bg: "linear-gradient(to bottom, #1a0a14, #2a1020)",
    accent: "#c4645a",
    visual: <TreeVisual variant="blessure" />,
  },
  {
    title: "L'Arbre des Forces",
    text: "Cette page fonctionne comme la précédente, mais avec les relations nourrissantes, les événements positifs et les croyances positives. Sur les feuilles des branches, inscrivez des activités ressources : celles où vous vous sentez épanoui, apaisé, joyeux, ou qui vous font simplement du bien. Vous y trouverez aussi un premier test de personnalité simple, le Big Five, pour évaluer votre taux d'agréabilité, d'extraversion, d'ouverture, de nervosité et de conscience de vous-même et du monde.",
    bg: "linear-gradient(to bottom, #142810, #1e3a18)",
    accent: "#7dba5a",
    visual: <TreeVisual variant="force" />,
  },
  {
    title: "Vos Archétypes de Personnalité",
    text: "Vous y trouverez différents modèles de personnalité : le MBTI, l'Ennéagramme et le style d'attachement. Répondez aux questionnaires (page Personnalité) pour découvrir votre type MBTI, qui révèle le fonctionnement de votre personnalité bio-socio-cognitive ; votre type d'Ennéagramme, qui dévoile l'expression de votre personnalité selon vos peurs et motivations profondes ; et votre style d'attachement, qui éclaire votre capacité à entrer en relation.",
    bg: "linear-gradient(to bottom, #1a1033, #251a45)",
    accent: "#818cf8",
    visual: <ArchetypeVisual />,
  },
  {
    title: "Votre Analyse Personnalisée",
    text: "Cette page vous permet d'aller plus en profondeur en précisant, pour chaque événement, croyance et relation, ce qu'il a engendré en termes de troubles du comportement, de difficultés relationnelles, de traumatisme ou de conflit psychique.",
    bg: "linear-gradient(to bottom, #0a1a2e, #102540)",
    accent: "#60a5fa",
    visual: <AnalyseVisual />,
  },
  {
    title: "Votre Journal Thérapeutique",
    text: "Cette page vous permettra de trouver du contenu pour vous ressourcer et apaiser vos douleurs.",
    bg: "linear-gradient(to bottom, #2a1f14, #3a2a1c)",
    accent: "#f0a040",
    visual: <JournalVisual />,
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const isLast = current === SCREENS.length - 1;
  const screen = SCREENS[current];

  const handleFinish = async () => {
    setFinishing(true);
    try {
      await base44.auth.updateMe({ onboarding_completed: true });
      if (refreshUser) await refreshUser();
    } catch { /* ignore */ }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: screen.bg }}>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-6">
        {SCREENS.map((_, i) => (
          <div key={i} className="h-2 rounded-full transition-all duration-300"
            style={{
              background: i === current ? screen.accent : "rgba(255,255,255,0.2)",
              width: i === current ? 24 : 8,
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center">
            <div className="mb-6">{screen.visual}</div>
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: SERIF, color: screen.accent }}>
              {screen.title}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {screen.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-8 max-w-md mx-auto w-full">
        {current > 0 ? (
          <button onClick={() => setCurrent(current - 1)}
            className="flex items-center text-sm transition hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
          </button>
        ) : <div />}

        {isLast ? (
          <button onClick={handleFinish} disabled={finishing}
            className="px-8 py-3 rounded-full text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: screen.accent, boxShadow: `0 4px 16px ${screen.accent}40` }}>
            Commencer
          </button>
        ) : (
          <button onClick={() => setCurrent(current + 1)}
            className="flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: screen.accent }}>
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}