import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles } from "lucide-react";

// Enneagram questionnaire based on 9 types across 3 triads
// Gut/Body (8,9,1), Heart (2,3,4), Head (5,6,7)

const TYPE_INFO = [
  { n: 1, name: "Le Réformateur", center: "Instinct", desc: "Principié, idéaliste, perfectionniste", color: "#ef4444" },
  { n: 2, name: "L'Altruiste", center: "Émotion", desc: "Généreux, attentionné, aime aider", color: "#f59e0b" },
  { n: 3, name: "Le Battant", center: "Émotion", desc: "Ambitieux, adapté, orienté succès", color: "#eab308" },
  { n: 4, name: "L'Individualiste", center: "Émotion", desc: "Sensible, créatif, cherche l'authenticité", color: "#8b5cf6" },
  { n: 5, name: "L'Observateur", center: "Mental", desc: "Analytique, curieux, intérieur", color: "#3b82f6" },
  { n: 6, name: "Le Loyaliste", center: "Mental", desc: "Fiable, prudent, cherche sécurité", color: "#06b6d4" },
  { n: 7, name: "L'Enthousiaste", center: "Mental", desc: "Spontané, optimiste, polyvalent", color: "#22c55e" },
  { n: 8, name: "Le Défi", center: "Instinct", desc: "Direct, protecteur, décidé", color: "#dc2626" },
  { n: 9, name: "Le Médiateur", center: "Instinct", desc: "Paisible, accommodant, réconfortant", color: "#14b8a6" },
];

// Questions: each has 9 statements, user picks the ones that resonate (1-3 max)
const QUESTIONS = [
  {
    prompt: "Face aux situations de la vie, je tends à réagir par…",
    options: [
      { type: 1, text: "Un sens de ce qui est juste et ce qui ne l'est pas" },
      { type: 2, text: "L'envie d'aider et d'être utile aux autres" },
      { type: 3, text: "L'envie de réussir et de montrer ma valeur" },
      { type: 4, text: "Une profonde sensibilité et besoin d'authenticité" },
      { type: 5, text: "Le besoin de comprendre et d'analyser" },
      { type: 6, text: "La prudence et la recherche de sécurité" },
      { type: 7, text: "L'enthousiasme et l'envie d'explorer" },
      { type: 8, text: "L'intensité et le besoin de contrôle" },
      { type: 9, text: "La recherche de paix et d'harmonie" },
    ],
  },
  {
    prompt: "Ma plus grande peur intérieure est…",
    options: [
      { type: 1, text: "D'être mauvais, corrompu ou défectueux" },
      { type: 2, text: "De ne pas être aimé, d'être inutile" },
      { type: 3, text: "D'être un échec, sans valeur" },
      { type: 4, text: "D'être ordinaire, sans identité propre" },
      { type: 5, text: "D'être envahi, incapable, incompétent" },
      { type: 6, text: "D'être sans soutien, abandonné" },
      { type: 7, text: "D'être piégé, privé de liberté" },
      { type: 8, text: "D'être contrôlé, vulnérable, trahi" },
      { type: 9, text: "De conflit, de séparation, de perdre la connexion" },
    ],
  },
  {
    prompt: "Dans mes relations, je suis surtout…",
    options: [
      { type: 1, text: "Exigeant mais fiable, j'ai des principes" },
      { type: 2, text: "Dévoué, je donne beaucoup aux autres" },
      { type: 3, text: "Charmant et orienté image" },
      { type: 4, text: "Profond et émotionnellement intense" },
      { type: 5, text: "Réservé, j'ai besoin d'espace" },
      { type: 6, text: "Loyal mais je doute souvent" },
      { type: 7, text: "Amusant et toujours partant" },
      { type: 8, text: "Protecteur et direct, je prends les choses en main" },
      { type: 9, text: "Doux, conciliant, je fuis les tensions" },
    ],
  },
  {
    prompt: "Sous stress, je tends à…",
    options: [
      { type: 1, text: "Devenir critique et rigide" },
      { type: 2, text: "Devenir possessif et exigeant" },
      { type: 3, text: "Devenir workaholic et superficiel" },
      { type: 4, text: "Me retirer et ruminer mes émotions" },
      { type: 5, text: "Me replier et devenir distant" },
      { type: 6, text: "Devenir anxieux et méfiant" },
      { type: 7, text: "Fuir dans la distraction et l'excès" },
      { type: 8, text: "Devenir agressif et dominateur" },
      { type: 9, text: "M'éteindre et devenir passif" },
    ],
  },
  {
    prompt: "Quand je vais bien, je deviens…",
    options: [
      { type: 1, text: "Serein, sage, acceptant" },
      { type: 2, text: "Désintéressé, aimant sans condition" },
      { type: 3, text: "Authentique, coopératif" },
      { type: 4, text: "Créatif, transformé, inspirant" },
      { type: 5, text: "Visionnaire, confiant, engagé" },
      { type: 6, text: "Courageux, engagé, confiant" },
      { type: 7, text: "Focalisé, mature, profond" },
      { type: 8, text: "Vulnérable, doux, généreux" },
      { type: 9, text: "Dynamique, autonome, vivant" },
    ],
  },
];

export default function EnneagramQuiz({ onComplete, onClose }) {
  const [selections, setSelections] = useState({}); // questionIdx -> [types]
  const [showResult, setShowResult] = useState(false);

  const toggleSelection = (qIdx, typeN) => {
    const current = selections[qIdx] || [];
    let updated;
    if (current.includes(typeN)) {
      updated = current.filter(t => t !== typeN);
    } else {
      updated = [...current, typeN].slice(-3); // max 3 per question
    }
    setSelections({ ...selections, [qIdx]: updated });
  };

  const tally = () => {
    const scores = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    Object.values(selections).forEach(types => {
      types.forEach(t => { scores[t] = (scores[t] || 0) + 1; });
    });
    let bestType = 1, bestScore = -1;
    for (let i = 1; i <= 9; i++) {
      if (scores[i] > bestScore) { bestScore = scores[i]; bestType = i; }
    }
    return { bestType, scores };
  };

  const answeredCount = Object.values(selections).filter(v => v && v.length > 0).length;

  if (showResult) {
    const { bestType, scores } = tally();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="text-center mb-5">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Votre type Ennéagramme estimé</p>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="text-4xl font-black" style={{ color: TYPE_INFO[bestType - 1].color }}>
              {bestType}
            </span>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">{TYPE_INFO[bestType - 1].name}</h2>
              <p className="text-xs text-gray-400">Centre : {TYPE_INFO[bestType - 1].center}</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">{TYPE_INFO[bestType - 1].desc}</p>
        </div>

        <div className="space-y-1.5 mb-5">
          {sortedScores.map(([typeN, score]) => {
            const info = TYPE_INFO[typeN - 1];
            const maxScore = sortedScores[0][1] || 1;
            return (
              <div key={typeN} className="flex items-center gap-2">
                <span className="text-xs font-bold w-6 text-center" style={{ color: info.color }}>{typeN}</span>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="h-full rounded-full" style={{ width: `${(score / maxScore) * 100}%`, backgroundColor: info.color }} />
                </div>
                <span className="text-xs text-gray-500 w-6 text-center">{score}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { setSelections({}); setShowResult(false); }}
            variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <RotateCcw className="w-4 h-4 mr-1" /> Recommencer
          </Button>
          <Button onClick={() => onComplete(bestType)}
            className="flex-1 bg-amber-700 hover:bg-amber-600 text-white">
            <ChevronRight className="w-4 h-4 mr-1" /> Type {bestType}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">🔮 Test Ennéagramme</h3>
          <p className="text-gray-500 text-xs">{answeredCount} / {QUESTIONS.length} thèmes — cochez ce qui résonne</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>
        )}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="space-y-3 mb-4">
        {QUESTIONS.map((q, qIdx) => (
          <div key={qIdx} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-gray-300 text-xs font-medium mb-2">{qIdx + 1}. {q.prompt}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, oIdx) => {
                const sel = (selections[qIdx] || []).includes(opt.type);
                return (
                  <button key={oIdx} onClick={() => toggleSelection(qIdx, opt.type)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-lg border transition flex items-center gap-2 ${sel ? "bg-amber-600/30 border-amber-500/50 text-white" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}>
                    <span className="font-bold w-4 shrink-0" style={{ color: TYPE_INFO[opt.type - 1].color }}>{opt.type}</span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={answeredCount < 3}
        className="w-full bg-amber-700 hover:bg-amber-600 text-white">
        Voir mon résultat
      </Button>
      {answeredCount < 3 && <p className="text-gray-500 text-xs text-center mt-2">Répondez au moins à 3 thèmes</p>}
    </div>
  );
}