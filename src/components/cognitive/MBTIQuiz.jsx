import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles } from "lucide-react";

// MBTI questionnaire based on the 4 dichotomies (E/I, S/N, T/F, J/P)
// Each question is a forced choice between two options

const QUESTIONS = [
  // E / I
  { dim: "EI", a: { val: "E", text: "Je préfère être entouré de gens et échanger" }, b: { val: "I", text: "Je préfère être seul et réfléchir" } },
  { dim: "EI", a: { val: "E", text: "Je parle souvent avant de penser, je pense à voix haute" }, b: { val: "I", text: "Je réfléchis avant de parler, je formule intérieurement" } },
  { dim: "EI", a: { val: "E", text: "Revoir des gens me donne de l'énergie" }, b: { val: "I", text: "Revoir des gens m'épuise après un moment" } },
  { dim: "EI", a: { val: "E", text: "Je suis plutôt actif et expressif" }, b: { val: "I", text: "Je suis plutôt réservé et contenu" } },
  { dim: "EI", a: { val: "E", text: "J'ai beaucoup d'amis avec des liens variés" }, b: { val: "I", text: "J'ai peu d'amis mais des liens profonds" } },
  { dim: "EI", a: { val: "E", text: "Je relance la conversation quand il y a un silence" }, b: { val: "I", text: "Les silences ne me dérangent pas, j'en profite pour réfléchir" } },
  { dim: "EI", a: { val: "E", text: "Je découvre mes idées en en parlant avec les autres" }, b: { val: "I", text: "Je découvre mes idées en écrivant ou réfléchissant seul" } },
  { dim: "EI", a: { val: "E", text: "Dans un groupe, je suis celui qui lance les activités" }, b: { val: "I", text: "Dans un groupe, j'observe avant de participer" } },
  { dim: "EI", a: { val: "E", text: "Après une journée sociale, je me sens vivifié" }, b: { val: "I", text: "Après une journée sociale, j'ai besoin de me reposer seul" } },
  { dim: "EI", a: { val: "E", text: "Je préfère les activités en groupe" }, b: { val: "I", text: "Je préfère les activités en solo ou à deux" } },

  // S / N
  { dim: "SN", a: { val: "S", text: "Je retiens les faits concrets et les détails" }, b: { val: "N", text: "Je retiens les idées et les impressions globales" } },
  { dim: "SN", a: { val: "S", text: "Je fais confiance à mon expérience passée" }, b: { val: "N", text: "Je fais confiance à mon intuition et mes pressentiments" } },
  { dim: "SN", a: { val: "S", text: "J'aime ce qui est pratique et réaliste" }, b: { val: "N", text: "J'aime ce qui est nouveau et théorique" } },
  { dim: "SN", a: { val: "S", text: "Je vois les choses telles qu'elles sont" }, b: { val: "N", text: "Je vois les choses telles qu'elles pourraient être" } },
  { dim: "SN", a: { val: "S", text: "Je préfère des instructions étape par étape" }, b: { val: "N", text: "Je préfère comprendre la vision d'ensemble" } },
  { dim: "SN", a: { val: "S", text: "Je me souviens des détails précis des événements" }, b: { val: "N", text: "Je me souviens de l'ambiance et des impressions" } },
  { dim: "SN", a: { val: "S", text: "Je préfère lire des biographies ou des récits concrets" }, b: { val: "N", text: "Je préfère la science-fiction, la fantaisie ou les concepts" } },
  { dim: "SN", a: { val: "S", text: "Si ça marche en pratique, je ne cherche pas plus loin" }, b: { val: "N", text: "Je veux comprendre pourquoi ça marche, même si ça ne sert pas immédiatement" } },
  { dim: "SN", a: { val: "S", text: "Je remarque les changements physiques dans mon environnement" }, b: { val: "N", text: "Je remarque les patterns et les tendances cachées" } },
  { dim: "SN", a: { val: "S", text: "J'apprends mieux avec des exemples concrets" }, b: { val: "N", text: "J'apprends mieux avec des métaphores et des concepts" } },

  // T / F
  { dim: "TF", a: { val: "T", text: "Je décide avec la logique et l'objectivité" }, b: { val: "F", text: "Je décide avec mes valeurs et l'impact sur autrui" } },
  { dim: "TF", a: { val: "T", text: "Je cherche la justice et la cohérence" }, b: { val: "F", text: "Je cherche l'harmonie et le bien-être de chacun" } },
  { dim: "TF", a: { val: "T", text: "Je peux être critique si c'est nécessaire" }, b: { val: "F", text: "Je cherche à ne pas blesser, même en critiquant" } },
  { dim: "TF", a: { val: "T", text: "Je juge sur des critères mesurables" }, b: { val: "F", text: "Je juge selon mes convictions personnelles" } },
  { dim: "TF", a: { val: "T", text: "L'honnêteté prime sur la diplomatie" }, b: { val: "F", text: "La diplomatie prime sur la franchise brute" } },
  { dim: "TF", a: { val: "T", text: "Quand quelqu'un a un problème, je cherche des solutions" }, b: { val: "F", text: "Quand quelqu'un a un problème, je l'écoute et je le soutiens d'abord" } },
  { dim: "TF", a: { val: "T", text: "Je me dispute sur des principes même si ça crée des tensions" }, b: { val: "F", text: "J'évite les disputes pour préserver la relation" } },
  { dim: "TF", a: { val: "T", text: "On me dit que je suis froid ou détaché" }, b: { val: "F", text: "On me dit que je suis trop émotif ou sensible" } },
  { dim: "TF", a: { val: "T", text: "Je donne un retour franc même s'il est difficile à entendre" }, b: { val: "F", text: "Je tempère mes retours pour ne pas heurter" } },
  { dim: "TF", a: { val: "T", text: "Je suis motivé par l'efficacité et les résultats" }, b: { val: "F", text: "Je suis motivé par le sens et les relations" } },

  // J / P
  { dim: "JP", a: { val: "J", text: "Je planifie et structure mes journées" }, b: { val: "P", text: "Je reste flexible et spontané" } },
  { dim: "JP", a: { val: "J", text: "Je préfère décider et avancer" }, b: { val: "P", text: "Je préfère garder mes options ouvertes" } },
  { dim: "JP", a: { val: "J", text: "Les listes et les échéances me motivent" }, b: { val: "P", text: "Les listes et les échéances me stressent" } },
  { dim: "JP", a: { val: "J", text: "J'aime avoir le contrôle et terminer" }, b: { val: "P", text: "J'aime explorer et m'adapter" } },
  { dim: "JP", a: { val: "J", text: "Je travaille mieux avec un plan clair" }, b: { val: "P", text: "Je travaille mieux dans l'urgence" } },
  { dim: "JP", a: { val: "J", text: "Je prépare mes vacances à l'avance en détail" }, b: { val: "P", text: "Je décide sur le moment selon mon envie" } },
  { dim: "JP", a: { val: "J", text: "Un bureau rangé m'aide à me concentrer" }, b: { val: "P", text: "Un bureau en désordre ne me dérange pas" } },
  { dim: "JP", a: { val: "J", text: "Je commence les projets bien avant la deadline" }, b: { val: "P", text: "Je suis plus productif quand la deadline approche" } },
  { dim: "JP", a: { val: "J", text: "Je n'aime pas changer de plan en cours de route" }, b: { val: "P", text: "Je m'ennuie si tout est trop prévisible" } },
  { dim: "JP", a: { val: "J", text: "Je veux que les choses soient tranchées et décidées" }, b: { val: "P", text: "Je veux garder la liberté de changer d'avis" } },
];

const DIM_LABELS = {
  EI: { left: "Extraversion (E)", right: "Introversion (I)" },
  SN: { left: "Sensation (S)", right: "Intuition (N)" },
  TF: { left: "Pensée (T)", right: "Sentiment (F)" },
  JP: { left: "Jugement (J)", right: "Perception (P)" },
};

export default function MBTIQuiz({ onComplete, onClose }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qIdx, val) => {
    setAnswers({ ...answers, [qIdx]: val });
  };

  const tally = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    Object.entries(answers).forEach(([idx, val]) => { scores[val] = (scores[val] || 0) + 1; });
    const type =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");
    return { type, scores };
  };

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;

  if (showResult) {
    const { type, scores } = tally();
    const dims = ["EI", "SN", "TF", "JP"];
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="text-center mb-5">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Votre type MBTI estimé</p>
          <h2 className="text-4xl font-black text-white mt-1">{type}</h2>
        </div>

        <div className="space-y-3 mb-5">
          {dims.map(dim => {
            const leftVal = DIM_LABELS[dim].left.match(/\((.)\)/)?.[1];
            const rightVal = DIM_LABELS[dim].right.match(/\((.)\)/)?.[1];
            const leftCount = scores[leftVal];
            const rightCount = scores[rightVal];
            const total_dim = leftCount + rightCount;
            const leftPct = total_dim ? (leftCount / total_dim) * 100 : 50;
            return (
              <div key={dim}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{DIM_LABELS[dim].left}</span>
                  <span className="text-gray-300">{DIM_LABELS[dim].right}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-full h-2 overflow-hidden flex">
                    <div className="h-full bg-indigo-500 rounded-l-full" style={{ width: `${leftPct}%` }} />
                    <div className="h-full bg-amber-500 rounded-r-full" style={{ width: `${100 - leftPct}%` }} />
                  </div>
                  <span className="text-xs text-white font-bold w-12 text-center">{leftCount} – {rightCount}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { setAnswers({}); setShowResult(false); }}
            variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <RotateCcw className="w-4 h-4 mr-1" /> Recommencer
          </Button>
          <Button onClick={() => onComplete(type)}
            className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white">
            <ChevronRight className="w-4 h-4 mr-1" /> Sélectionner {type}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">📝 Test MBTI</h3>
          <p className="text-gray-500 text-xs">{answered} / {total} questions</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>
        )}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(answered / total) * 100}%` }} />
      </div>

      <div className="space-y-2 mb-4">
        {QUESTIONS.map((q, i) => (
          <div key={i} className={`rounded-xl border p-3 transition ${answers[i] ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"}`}>
            <p className="text-gray-400 text-xs mb-2">{i + 1}. {q.a.text} <span className="text-gray-600">ou</span> {q.b.text} ?</p>
            <div className="flex gap-2">
              <button onClick={() => handleAnswer(i, q.a.val)}
                className={`flex-1 text-xs py-2 px-2 rounded-lg border transition ${answers[i] === q.a.val ? "bg-indigo-600 text-white border-indigo-400" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/15"}`}>
                {q.a.text}
              </button>
              <button onClick={() => handleAnswer(i, q.b.val)}
                className={`flex-1 text-xs py-2 px-2 rounded-lg border transition ${answers[i] === q.b.val ? "bg-indigo-600 text-white border-indigo-400" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/15"}`}>
                {q.b.text}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={answered < 20}
        className="w-full bg-indigo-700 hover:bg-indigo-600 text-white">
        Voir mon résultat {answered < total ? `(${answered}/${total})` : "✓"}
      </Button>
      {answered < 20 && <p className="text-gray-500 text-xs text-center mt-2">Répondez au moins à 20 questions</p>}
    </div>
  );
}