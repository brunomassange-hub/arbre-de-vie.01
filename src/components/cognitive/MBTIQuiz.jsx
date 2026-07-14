import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles, Check, X, ArrowLeft } from "lucide-react";

const SCALE = [1, 2, 3, 4, 5];

const DIM_LABELS = {
  EI: { left: "Extraversion (E)", right: "Introversion (I)" },
  SN: { left: "Sensation (S)", right: "Intuition (N)" },
  TF: { left: "Pensée (T)", right: "Sentiment (F)" },
  JP: { left: "Jugement (J)", right: "Perception (P)" },
};

const FUNCTION_STACKS = {
  INTJ: ["Ni","Te","Fi","Se"], INTP: ["Ti","Ne","Si","Fe"],
  ENTJ: ["Te","Ni","Se","Fi"], ENTP: ["Ne","Ti","Fe","Si"],
  INFJ: ["Ni","Fe","Ti","Se"], INFP: ["Fi","Ne","Si","Te"],
  ENFJ: ["Fe","Ni","Se","Ti"], ENFP: ["Ne","Fi","Te","Si"],
  ISTJ: ["Si","Te","Fi","Ne"], ISFJ: ["Si","Fe","Ti","Ne"],
  ESTJ: ["Te","Si","Ne","Fi"], ESFJ: ["Fe","Si","Ne","Ti"],
  ISTP: ["Ti","Se","Ni","Fe"], ISFP: ["Fi","Se","Ni","Te"],
  ESTP: ["Se","Ti","Fe","Ni"], ESFP: ["Se","Fi","Te","Ni"],
};

const FUNCTION_PAIRS = [["Ti","Te"], ["Ni","Ne"], ["Fi","Fe"], ["Si","Se"]];

const PART1_GROUPS = [
  { dim: "EI", label: "Extraversion / Introversion" },
  { dim: "SN", label: "Sensation / Intuition" },
  { dim: "TF", label: "Pensée / Sentiment" },
  { dim: "JP", label: "Jugement / Perception" },
];

const PART2_GROUPS = [
  { pair: "TiTe", label: "Ti vs Te — Logique interne vs externe" },
  { pair: "NiNe", label: "Ni vs Ne — Intuition convergente vs divergente" },
  { pair: "FiFe", label: "Fi vs Fe — Sentiment interne vs externe" },
  { pair: "SiSe", label: "Si vs Se — Sensation interne vs externe" },
];

const PART1 = [
  // E / I
  { dim: "EI", a: { val: "E", text: "Je préfère être entouré de gens et échanger" }, b: { val: "I", text: "Je préfère être seul et réfléchir" } },
  { dim: "EI", a: { val: "E", text: "Revoir des gens me donne de l'énergie" }, b: { val: "I", text: "Revoir des gens m'épuise après un moment" } },
  { dim: "EI", a: { val: "E", text: "Je parle souvent avant de penser, je pense à voix haute" }, b: { val: "I", text: "Je réfléchis avant de parler, je formule intérieurement" } },
  { dim: "EI", a: { val: "E", text: "J'ai beaucoup d'amis avec des liens variés" }, b: { val: "I", text: "J'ai peu d'amis mais des liens profonds" } },
  { dim: "EI", a: { val: "E", text: "Après une journée sociale, je me sens vivifié" }, b: { val: "I", text: "Après une journée sociale, j'ai besoin de me reposer seul" } },
  { dim: "EI", a: { val: "E", text: "Je découvre mes idées en en parlant avec les autres" }, b: { val: "I", text: "Je découvre mes idées en écrivant ou réfléchissant seul" } },
  // S / N
  { dim: "SN", a: { val: "S", text: "Je retiens les faits concrets et les détails" }, b: { val: "N", text: "Je retiens les idées et les impressions globales" } },
  { dim: "SN", a: { val: "S", text: "Je fais confiance à mon expérience passée" }, b: { val: "N", text: "Je fais confiance à mon intuition et mes pressentiments" } },
  { dim: "SN", a: { val: "S", text: "J'aime ce qui est pratique et réaliste" }, b: { val: "N", text: "J'aime ce qui est nouveau et théorique" } },
  { dim: "SN", a: { val: "S", text: "Je vois les choses telles qu'elles sont" }, b: { val: "N", text: "Je vois les choses telles qu'elles pourraient être" } },
  { dim: "SN", a: { val: "S", text: "Je préfère des instructions étape par étape" }, b: { val: "N", text: "Je préfère comprendre la vision d'ensemble" } },
  { dim: "SN", a: { val: "S", text: "J'apprends mieux avec des exemples concrets" }, b: { val: "N", text: "J'apprends mieux avec des métaphores et des concepts" } },
  // T / F
  { dim: "TF", a: { val: "T", text: "Je décide avec la logique et l'objectivité" }, b: { val: "F", text: "Je décide avec mes valeurs et l'impact sur autrui" } },
  { dim: "TF", a: { val: "T", text: "L'honnêteté prime sur la diplomatie" }, b: { val: "F", text: "La diplomatie prime sur la franchise brute" } },
  { dim: "TF", a: { val: "T", text: "Quand quelqu'un a un problème, je cherche des solutions" }, b: { val: "F", text: "Quand quelqu'un a un problème, je l'écoute et le soutiens d'abord" } },
  { dim: "TF", a: { val: "T", text: "Je cherche la justice et la cohérence" }, b: { val: "F", text: "Je cherche l'harmonie et le bien-être de chacun" } },
  { dim: "TF", a: { val: "T", text: "Je juge sur des critères mesurables" }, b: { val: "F", text: "Je juge selon mes convictions personnelles" } },
  { dim: "TF", a: { val: "T", text: "Je suis motivé par l'efficacité et les résultats" }, b: { val: "F", text: "Je suis motivé par le sens et les relations" } },
  // J / P
  { dim: "JP", a: { val: "J", text: "Je planifie et structure mes journées" }, b: { val: "P", text: "Je reste flexible et spontané" } },
  { dim: "JP", a: { val: "J", text: "Je préfère décider et avancer" }, b: { val: "P", text: "Je préfère garder mes options ouvertes" } },
  { dim: "JP", a: { val: "J", text: "Les listes et les échéances me motivent" }, b: { val: "P", text: "Les listes et les échéances me stressent" } },
  { dim: "JP", a: { val: "J", text: "Je travaille mieux avec un plan clair" }, b: { val: "P", text: "Je travaille mieux dans l'urgence" } },
  { dim: "JP", a: { val: "J", text: "Je commence les projets bien avant la deadline" }, b: { val: "P", text: "Je suis plus productif quand la deadline approche" } },
  { dim: "JP", a: { val: "J", text: "Je veux que les choses soient tranchées et décidées" }, b: { val: "P", text: "Je veux garder la liberté de changer d'avis" } },
];

const PART2 = [
  // Ti vs Te (7)
  { pair: "TiTe", prompt: "Face à un problème complexe, je préfère…", a: { val: "Ti", text: "Le résoudre selon ma propre logique interne cohérente, même si ça prend du temps" }, b: { val: "Te", text: "Appliquer une méthode efficace et éprouvée pour aller vite" } },
  { pair: "TiTe", prompt: "Quand j'analyse une situation…", a: { val: "Ti", text: "Je cherche d'abord à comprendre le « pourquoi » profond selon mon propre raisonnement" }, b: { val: "Te", text: "Je cherche d'abord des critères objectifs et mesurables" } },
  { pair: "TiTe", prompt: "Pour prendre une décision logique…", a: { val: "Ti", text: "Je dois d'abord que ça soit cohérent dans ma tête" }, b: { val: "Te", text: "Je m'appuie sur des faits externes et des procédures éprouvées" } },
  { pair: "TiTe", prompt: "Quand quelqu'un me présente son raisonnement…", a: { val: "Ti", text: "Je vérifie s'il est logiquement cohérent en interne" }, b: { val: "Te", text: "Je vérifie s'il est applicable et efficace en pratique" } },
  { pair: "TiTe", prompt: "Je préfère…", a: { val: "Ti", text: "Théoriser et construire des systèmes de pensée personnels" }, b: { val: "Te", text: "Organiser et structurer le monde extérieur" } },
  { pair: "TiTe", prompt: "Face à une règle établie…", a: { val: "Ti", text: "Je la questionne et la comprends avant de l'appliquer" }, b: { val: "Te", text: "Je l'applique si elle est efficace, même sans la comprendre entièrement" } },
  { pair: "TiTe", prompt: "Quand je dois expliquer quelque chose…", a: { val: "Ti", text: "Je le déduis selon ma propre logique" }, b: { val: "Te", text: "Je m'appuie sur des sources reconnues et des méthodes standard" } },
  // Ni vs Ne (6)
  { pair: "NiNe", prompt: "Face à une nouvelle situation…", a: { val: "Ni", text: "Je vois souvent où elle va mener sur le long terme, presque intuitivement" }, b: { val: "Ne", text: "Je génère plein de possibilités et connexions différentes" } },
  { pair: "NiNe", prompt: "Quand je réfléchis à l'avenir…", a: { val: "Ni", text: "J'ai une vision claire de ce qui va se passer" }, b: { val: "Ne", text: "J'explore de nombreuses directions possibles" } },
  { pair: "NiNe", prompt: "Mon intuition fonctionne…", a: { val: "Ni", text: "En convergent vers une seule conclusion profonde" }, b: { val: "Ne", text: "En divergeant vers de multiples idées" } },
  { pair: "NiNe", prompt: "Quand je lis un symbole ou une métaphore…", a: { val: "Ni", text: "J'en extrais un sens profond et unique" }, b: { val: "Ne", text: "J'y vois plein d'interprétations différentes" } },
  { pair: "NiNe", prompt: "Face à un nouveau projet…", a: { val: "Ni", text: "Je préfère avoir une vision à long terme claire avant de commencer" }, b: { val: "Ne", text: "Je préfère brainstormer et explorer les options" } },
  { pair: "NiNe", prompt: "On me dit souvent…", a: { val: "Ni", text: "« Tu vois trop loin » ou « tu anticipes bien »" }, b: { val: "Ne", text: "« Tu as toujours plein d'idées » ou « tu sautes de sujet en sujet »" } },
  // Fi vs Fe (7)
  { pair: "FiFe", prompt: "Pour juger ce qui est juste…", a: { val: "Fi", text: "Je me fie d'abord à mes valeurs personnelles profondes" }, b: { val: "Fe", text: "Je suis attentif à l'harmonie du groupe et aux émotions des autres" } },
  { pair: "FiFe", prompt: "Quand quelqu'un est triste…", a: { val: "Fi", text: "Je ressens personnellement et profondément avec lui" }, b: { val: "Fe", text: "Je m'adapte à l'ambiance et cherche à apaiser le groupe" } },
  { pair: "FiFe", prompt: "Mes émotions…", a: { val: "Fi", text: "Sont intenses et privées, je les traite en moi-même" }, b: { val: "Fe", text: "Sont influencées par l'ambiance et les émotions des autres" } },
  { pair: "FiFe", prompt: "Quand je prends une décision qui touche les autres…", a: { val: "Fi", text: "Je vérifie d'abord qu'elle est alignée avec mes valeurs" }, b: { val: "Fe", text: "Je vérifie d'abord qu'elle ne blesse personne" } },
  { pair: "FiFe", prompt: "Face à un conflit de valeurs…", a: { val: "Fi", text: "Je reste fidèle à mes principes, même si ça dérange" }, b: { val: "Fe", text: "Je cherche un compromis qui préserve l'harmonie" } },
  { pair: "FiFe", prompt: "Dans un groupe…", a: { val: "Fi", text: "Je reste authentique à moi-même même si je suis différent" }, b: { val: "Fe", text: "Je m'adapte pour maintenir la cohésion" } },
  { pair: "FiFe", prompt: "On me dit souvent…", a: { val: "Fi", text: "« Tu es trop dans ta bulle » ou « tu es intense émotionnellement »" }, b: { val: "Fe", text: "« Tu te soucies trop de ce que pensent les autres »" } },
  // Si vs Se (6)
  { pair: "SiSe", prompt: "Pour évaluer une situation…", a: { val: "Si", text: "Je me réfère à mes souvenirs et expériences passées" }, b: { val: "Se", text: "Je me concentre sur ce qui se passe concrètement ici et maintenant" } },
  { pair: "SiSe", prompt: "Mon rapport au monde physique…", a: { val: "Si", text: "Je compare avec ce que je connais déjà" }, b: { val: "Se", text: "Je vis pleinement l'instant présent" } },
  { pair: "SiSe", prompt: "Face à un nouvel environnement…", a: { val: "Si", text: "Je le compare à des lieux que j'ai déjà fréquentés" }, b: { val: "Se", text: "Je l'explore avec mes sens en temps réel" } },
  { pair: "SiSe", prompt: "Quand je cuisine ou bricole…", a: { val: "Si", text: "Je refais comme d'habitude, avec mes repères" }, b: { val: "Se", text: "J'improvise selon ce que j'ai sous la main" } },
  { pair: "SiSe", prompt: "Ma mémoire fonctionne…", a: { val: "Si", text: "En me rappelant des détails précis du passé" }, b: { val: "Se", text: "En vivant l'instant, le passé reste flou" } },
  { pair: "SiSe", prompt: "Face à un danger…", a: { val: "Si", text: "Je réagis selon ce que j'ai appris qui fonctionne" }, b: { val: "Se", text: "Je réagis instinctivement à ce que je perçois maintenant" } },
];

export default function MBTIQuiz({ onComplete, onClose }) {
  const [part1Answers, setPart1Answers] = useState({});
  const [part2Answers, setPart2Answers] = useState({});
  const [step, setStep] = useState("part1");

  const part1Answered = Object.keys(part1Answers).length;
  const part2Answered = Object.keys(part2Answers).length;

  const tally = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    PART1.forEach((q, idx) => {
      const ans = part1Answers[idx];
      if (ans === undefined) return;
      if (ans <= 2) scores[q.a.val] += (3 - ans);
      else if (ans >= 4) scores[q.b.val] += (ans - 3);
    });
    const type =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");
    return { type, scores };
  };

  const tallyFunctions = () => {
    const fnScores = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
    PART2.forEach((q, idx) => {
      const ans = part2Answers[idx];
      if (ans) fnScores[ans] += 1;
    });
    return fnScores;
  };

  const getConfirmation = (type, fnScores) => {
    const stack = FUNCTION_STACKS[type];
    return FUNCTION_PAIRS.map(([a, b]) => {
      const expected = stack.includes(a) ? a : b;
      const actual = fnScores[a] >= fnScores[b] ? a : b;
      return { pair: `${a}/${b}`, a, b, expected, actual, match: expected === actual, aCount: fnScores[a], bCount: fnScores[b] };
    });
  };

  if (step === "result") {
    const { type, scores } = tally();
    const fnScores = tallyFunctions();
    const confirmation = getConfirmation(type, fnScores);
    const matchCount = confirmation.filter(c => c.match).length;
    const dims = ["EI", "SN", "TF", "JP"];

    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="text-center mb-5">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Votre type MBTI estimé</p>
          <h2 className="text-4xl font-black text-white mt-1">{type}</h2>
        </div>

        {/* Dichotomy bars (Part 1 results) */}
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

        {/* Function confirmation (Part 2 results) */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-5">
          <p className="text-indigo-400 text-xs font-bold mb-1">🧩 Confirmation des fonctions cognitives</p>
          <p className="text-gray-500 text-[10px] mb-3">
            {matchCount}/4 fonctions alignées avec votre type {type}
          </p>
          <div className="space-y-2">
            {confirmation.map(c => (
              <div key={c.pair} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-gray-400 font-mono">{c.pair}</span>
                <div className="flex-1 flex items-center gap-1">
                  <span className={`w-7 text-center font-bold ${c.aCount >= c.bCount ? "text-white" : "text-gray-600"}`}>{c.aCount}</span>
                  <div className="flex-1 flex rounded-full h-1.5 overflow-hidden bg-white/10">
                    <div className="h-full bg-indigo-500" style={{ width: `${(c.aCount / (c.aCount + c.bCount || 1)) * 100}%` }} />
                    <div className="h-full bg-amber-500" style={{ width: `${(c.bCount / (c.aCount + c.bCount || 1)) * 100}%` }} />
                  </div>
                  <span className={`w-7 text-center font-bold ${c.bCount > c.aCount ? "text-white" : "text-gray-600"}`}>{c.bCount}</span>
                </div>
                {c.match ? (
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                )}
              </div>
            ))}
          </div>
          {matchCount < 4 && (
            <p className="text-gray-500 text-[10px] mt-2 italic">
              {matchCount <= 1
                ? "Forte divergence : votre type mérite peut-être d'être revisité."
                : `${4 - matchCount} fonction(s) diverge(nt) — votre type reste probable mais mérite attention.`}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { setPart1Answers({}); setPart2Answers({}); setStep("part1"); }}
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

  // ============ PART 1 ============
  if (step === "part1") {
    const grouped = PART1_GROUPS.map(g => ({
      ...g,
      questions: PART1.map((q, idx) => ({ ...q, idx })).filter(q => q.dim === g.dim),
    }));
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-white font-semibold text-sm">📝 Test MBTI</h3>
            <p className="text-gray-500 text-xs">Partie 1/2 — Dichotomies · {part1Answered}/{PART1.length}</p>
          </div>
          {onClose && <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>}
        </div>

        <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(part1Answered / PART1.length) * 100}%` }} />
        </div>
        <p className="text-gray-500 text-[10px] text-center mb-4">
          1 = tout à fait l'option de gauche · 3 = neutre · 5 = tout à fait l'option de droite
        </p>

        <div className="space-y-4 mb-4 max-h-[480px] overflow-y-auto pr-1">
          {grouped.map((group, gIdx) => (
            <div key={gIdx}>
              <p className="text-indigo-400 text-xs font-bold mb-2">{group.label}</p>
              <div className="space-y-2">
                {group.questions.map(q => (
                  <div key={q.idx} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="space-y-0.5 mb-2">
                      <p className="text-xs" style={{ color: "#818cf8" }}>◀ {q.a.text}</p>
                      <p className="text-xs" style={{ color: "#fbbf24" }}>{q.b.text} ▶</p>
                    </div>
                    <div className="flex gap-1">
                      {SCALE.map(val => {
                        const sel = part1Answers[q.idx] === val;
                        return (
                          <button key={val} onClick={() => setPart1Answers({ ...part1Answers, [q.idx]: val })}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition border ${
                              sel ? "bg-indigo-600 border-indigo-400 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
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

        <Button onClick={() => setStep("part2")} disabled={part1Answered < 18}
          className="w-full bg-indigo-700 hover:bg-indigo-600 text-white">
          Continuer vers la Partie 2 <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {part1Answered < 18 && <p className="text-gray-500 text-xs text-center mt-2">Répondez au moins à 18 questions sur {PART1.length}</p>}
      </div>
    );
  }

  // ============ PART 2 ============
  const grouped2 = PART2_GROUPS.map(g => ({
    ...g,
    questions: PART2.map((q, idx) => ({ ...q, idx })).filter(q => q.pair === g.pair),
  }));
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">📝 Test MBTI</h3>
          <p className="text-gray-500 text-xs">Partie 2/2 — Fonctions cognitives · {part2Answered}/{PART2.length}</p>
        </div>
        {onClose && <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(part2Answered / PART2.length) * 100}%` }} />
      </div>
      <p className="text-gray-500 text-[10px] text-center mb-4">Choisissez l'option qui vous correspond le mieux</p>

      <div className="space-y-4 mb-4 max-h-[480px] overflow-y-auto pr-1">
        {grouped2.map((group, gIdx) => (
          <div key={gIdx}>
            <p className="text-indigo-400 text-xs font-bold mb-2">{group.label}</p>
            <div className="space-y-2">
              {group.questions.map(q => (
                <div key={q.idx} className={`rounded-xl border p-3 transition ${part2Answers[q.idx] ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"}`}>
                  <p className="text-gray-400 text-xs mb-2">{q.prompt}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPart2Answers({ ...part2Answers, [q.idx]: q.a.val })}
                      className={`flex-1 text-xs py-2 px-2 rounded-lg border transition ${part2Answers[q.idx] === q.a.val ? "bg-indigo-600 text-white border-indigo-400" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/15"}`}>
                      {q.a.text}
                    </button>
                    <button onClick={() => setPart2Answers({ ...part2Answers, [q.idx]: q.b.val })}
                      className={`flex-1 text-xs py-2 px-2 rounded-lg border transition ${part2Answers[q.idx] === q.b.val ? "bg-amber-600 text-white border-amber-400" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/15"}`}>
                      {q.b.text}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setStep("part1")} variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour
        </Button>
        <Button onClick={() => setStep("result")} disabled={part2Answered < 20}
          className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white">
          Voir mon résultat
        </Button>
      </div>
      {part2Answered < 20 && <p className="text-gray-500 text-xs text-center mt-2">Répondez au moins à 20 questions sur {PART2.length}</p>}
    </div>
  );
}