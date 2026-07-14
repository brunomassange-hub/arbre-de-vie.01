import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles } from "lucide-react";

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

const SCALE = [1, 2, 3, 4, 5];

const DIMENSIONS = [
  { label: "Peur fondamentale", icon: "😱" },
  { label: "Besoin central", icon: "🫀" },
  { label: "Motivation profonde", icon: "🔥" },
  { label: "Réaction automatique", icon: "⚡" },
];

// dim: 0=peur, 1=besoin, 2=motivation, 3=réaction
// 54 questions: 18 peur + 18 besoin + 9 motivation + 9 réaction
const QUESTIONS = [
  // === PEUR FONDAMENTALE (18) ===
  { dim: 0, type: 1, text: "Je redoute profondément d'être mauvais, corrompu ou moralement défectueux." },
  { dim: 0, type: 1, text: "L'idée de commettre une erreur impardonnable me hante." },
  { dim: 0, type: 2, text: "Je redoute profondément de ne pas être aimé ou d'être inutile aux autres." },
  { dim: 0, type: 2, text: "L'idée que personne n'aurait besoin de moi me terrifie." },
  { dim: 0, type: 3, text: "Je redoute profondément d'être un échec ou de n'avoir aucune valeur." },
  { dim: 0, type: 3, text: "L'idée d'être exposé comme incompétent devant les autres me terrifie." },
  { dim: 0, type: 4, text: "Je redoute profondément d'être ordinaire, sans identité propre." },
  { dim: 0, type: 4, text: "L'idée de n'avoir rien de unique ou de spécial me terrifie." },
  { dim: 0, type: 5, text: "Je redoute profondément d'être envahi par les demandes des autres ou de ne pas savoir." },
  { dim: 0, type: 5, text: "L'idée d'être exposé comme incompétent ou ignorant me terrifie." },
  { dim: 0, type: 6, text: "Je redoute profondément d'être sans soutien ni guidance." },
  { dim: 0, type: 6, text: "L'idée d'être trahi ou abandonné par ceux en qui j'ai confiance me terrifie." },
  { dim: 0, type: 7, text: "Je redoute profondément d'être piégé dans la douleur ou privé de liberté." },
  { dim: 0, type: 7, text: "L'idée de m'ennuyer ou d'être limité dans mes options me terrifie." },
  { dim: 0, type: 8, text: "Je redoute profondément d'être contrôlé ou manipulé par quelqu'un." },
  { dim: 0, type: 8, text: "L'idée de me montrer vulnérable ou faible me terrifie." },
  { dim: 0, type: 9, text: "Je redoute profondément les conflits et la séparation d'avec les autres." },
  { dim: 0, type: 9, text: "L'idée de perdre la connexion ou l'harmonie avec mes proches me terrifie." },

  // === BESOIN CENTRAL (18) ===
  { dim: 1, type: 1, text: "J'ai un besoin viscéral de faire ce qui est juste et moralement correct." },
  { dim: 1, type: 1, text: "J'ai un besoin viscéral d'être irréprochable et de corriger ce qui ne va pas." },
  { dim: 1, type: 2, text: "J'ai un besoin viscéral de me sentir aimé et indispensable pour les autres." },
  { dim: 1, type: 2, text: "J'ai un besoin viscéral d'être reconnu pour ma générosité et mon dévouement." },
  { dim: 1, type: 3, text: "J'ai un besoin viscéral de réussir et de prouver ma valeur." },
  { dim: 1, type: 3, text: "J'ai un besoin viscéral d'être admiré et reconnu pour mes accomplissements." },
  { dim: 1, type: 4, text: "J'ai un besoin viscéral d'être authentique et fidèle à mon identité profonde." },
  { dim: 1, type: 4, text: "J'ai un besoin viscéral d'exprimer ma singularité et d'être vu dans mon unicité." },
  { dim: 1, type: 5, text: "J'ai un besoin viscéral de comprendre le monde et de préserver mon autonomie." },
  { dim: 1, type: 5, text: "J'ai un besoin viscéral de préserver mon énergie et mon espace privé." },
  { dim: 1, type: 6, text: "J'ai un besoin viscéral de sécurité et de certitude dans ma vie." },
  { dim: 1, type: 6, text: "J'ai un besoin viscéral de savoir sur qui je peux compter." },
  { dim: 1, type: 7, text: "J'ai un besoin viscéral de liberté, de variété et de stimulation." },
  { dim: 1, type: 7, text: "J'ai un besoin viscéral d'éviter la souffrance et de maintenir l'enthousiasme." },
  { dim: 1, type: 8, text: "J'ai un besoin viscéral de contrôler mon environnement et de me protéger." },
  { dim: 1, type: 8, text: "J'ai un besoin viscéral d'être fort et de protéger ceux qui me sont chers." },
  { dim: 1, type: 9, text: "J'ai un besoin viscéral de paix intérieure et d'harmonie autour de moi." },
  { dim: 1, type: 9, text: "J'ai un besoin viscéral de me sentir connecté et en accord avec les autres." },

  // === MOTIVATION PROFONDE (9) ===
  { dim: 2, type: 1, text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'améliorer le monde et de vivre selon mes principes." },
  { dim: 2, type: 2, text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'aider les autres et d'être proche d'eux." },
  { dim: 2, type: 3, text: "Ce qui me pousse fondamentalement à agir, c'est l'envie de réussir et d'atteindre mes objectifs." },
  { dim: 2, type: 4, text: "Ce qui me pousse fondamentalement à agir, c'est la quête d'authenticité et de profondeur émotionnelle." },
  { dim: 2, type: 5, text: "Ce qui me pousse fondamentalement à agir, c'est la soif de comprendre et de maîtriser le savoir." },
  { dim: 2, type: 6, text: "Ce qui me pousse fondamentalement à agir, c'est la recherche de sécurité et de loyauté." },
  { dim: 2, type: 7, text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'explorer et de profiter de la vie." },
  { dim: 2, type: 8, text: "Ce qui me pousse fondamentalement à agir, c'est l'envie de protéger et de garder le contrôle." },
  { dim: 2, type: 9, text: "Ce qui me pousse fondamentalement à agir, c'est le maintien de la paix et de l'harmonie." },

  // === RÉACTION AUTOMATIQUE (9) ===
  { dim: 3, type: 1, text: "Quand je suis sous pression, ma première réaction est de devenir critique et rigide." },
  { dim: 3, type: 2, text: "Quand je suis sous pression, ma première réaction est de devenir possessif et exigeant envers les autres." },
  { dim: 3, type: 3, text: "Quand je suis sous pression, ma première réaction est de travailler encore plus dur et de masquer mes émotions." },
  { dim: 3, type: 4, text: "Quand je suis sous pression, ma première réaction est de me retirer et de ruminer mes émotions." },
  { dim: 3, type: 5, text: "Quand je suis sous pression, ma première réaction est de me replier et de devenir distant." },
  { dim: 3, type: 6, text: "Quand je suis sous pression, ma première réaction est de devenir anxieux et méfiant." },
  { dim: 3, type: 7, text: "Quand je suis sous pression, ma première réaction est de fuir dans la distraction et l'excès." },
  { dim: 3, type: 8, text: "Quand je suis sous pression, ma première réaction est de devenir agressif et dominateur." },
  { dim: 3, type: 9, text: "Quand je suis sous pression, ma première réaction est de m'éteindre et de devenir passif." },
];

export default function EnneagramQuiz({ onComplete, onClose }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const tally = () => {
    const scores = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    QUESTIONS.forEach((q, idx) => {
      scores[q.type] += (answers[idx] || 3);
    });
    let bestType = 1, bestScore = -1;
    for (let i = 1; i <= 9; i++) {
      if (scores[i] > bestScore) { bestScore = scores[i]; bestType = i; }
    }
    return { bestType, scores };
  };

  if (showResult) {
    const { bestType, scores } = tally();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sortedScores[0][1] || 1;
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
          <Button onClick={() => { setAnswers({}); setShowResult(false); }}
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

  const groupedQuestions = DIMENSIONS.map((dim, dimIdx) => ({
    ...dim,
    questions: QUESTIONS.map((q, idx) => ({ ...q, idx })).filter(q => q.dim === dimIdx),
  }));

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">🔮 Test Ennéagramme</h3>
          <p className="text-gray-500 text-xs">{answeredCount} / {QUESTIONS.length} questions</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>
        )}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
      </div>
      <p className="text-gray-500 text-[10px] text-center mb-4">
        1 = Pas du tout d'accord · 3 = Neutre · 5 = Tout à fait d'accord
      </p>

      <div className="space-y-4 mb-4 max-h-[480px] overflow-y-auto pr-1">
        {groupedQuestions.map((group, gIdx) => (
          <div key={gIdx}>
            <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1.5">
              <span>{group.icon}</span> {group.label}
            </p>
            <div className="space-y-2">
              {group.questions.map(q => (
                <div key={q.idx} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-gray-300 text-xs mb-2">{q.text}</p>
                  <div className="flex gap-1">
                    {SCALE.map(val => {
                      const sel = answers[q.idx] === val;
                      return (
                        <button key={val} onClick={() => setAnswers({ ...answers, [q.idx]: val })}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                            sel ? "bg-amber-600 border-amber-400 text-white" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                          }`}>
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={answeredCount < 40}
        className="w-full bg-amber-700 hover:bg-amber-600 text-white">
        Voir mon résultat
      </Button>
      {answeredCount < 40 && (
        <p className="text-gray-500 text-xs text-center mt-2">Répondez au moins à 40 questions sur {QUESTIONS.length}</p>
      )}
    </div>
  );
}