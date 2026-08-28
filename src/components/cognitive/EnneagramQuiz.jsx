import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles, Check } from "lucide-react";
import { TYPE_META, ENNEAGRAM_QUIZ, GROUP_LABELS } from "@/lib/enneagram-quiz-data";

const MIN_CHECKED = 15;

export default function EnneagramQuiz({ onComplete, onClose }) {
  const [checked, setChecked] = useState(() => ({})); // { [questionIndex]: true }
  const [showResult, setShowResult] = useState(false);

  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (idx) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[idx]) delete next[idx];
      else next[idx] = true;
      return next;
    });
  };

  const computeScores = () => {
    const scores = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    ENNEAGRAM_QUIZ.forEach((q, idx) => {
      if (checked[idx]) scores[q.type] += 1;
    });
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const byType = {};
    for (let i = 1; i <= 9; i++) {
      byType[i] = { score: scores[i], pct: total > 0 ? (scores[i] / total) * 100 : 0 };
    }
    let bestType = 1, bestPct = -1;
    for (let i = 1; i <= 9; i++) {
      if (byType[i].pct > bestPct) { bestPct = byType[i].pct; bestType = i; }
    }
    return { byType, total, bestType };
  };

  if (showResult) {
    const { byType, total, bestType } = computeScores();
    const sorted = Object.entries(byType).sort((a, b) => b[1].pct - a[1].pct);
    const best = TYPE_META.find(t => t.n === bestType);
    const scoresArr = Array.from({ length: 9 }, (_, i) => Number((byType[i + 1].pct).toFixed(1)));
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="text-center mb-5">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Votre type Ennéagramme dominant</p>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="text-4xl font-black" style={{ color: best.color }}>{bestType}</span>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">{best.name}</h2>
              <p className="text-xs text-gray-400">Centre : {best.center} · {best.mechanism}</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">{best.desc}</p>
        </div>

        <div className="space-y-1.5 mb-5">
          {sorted.map(([typeN, { score, pct }]) => {
            const info = TYPE_META.find(t => t.n === Number(typeN));
            return (
              <div key={typeN} className="flex items-center gap-2">
                <span className="text-xs font-bold w-6 text-center" style={{ color: info.color }}>{typeN}</span>
                <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: info.color }} />
                </div>
                <span className="text-xs text-gray-300 w-12 text-right">{pct.toFixed(0)}% · {score}/10</span>
              </div>
            );
          })}
        </div>

        <p className="text-gray-500 text-[10px] text-center mb-4">
          Total : {total} case(s) cochée(s) · pourcentage de chaque type par rapport au total
        </p>

        <div className="flex gap-2">
          <Button onClick={() => { setChecked({}); setShowResult(false); }}
            variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <RotateCcw className="w-4 h-4 mr-1" /> Recommencer
          </Button>
          <Button onClick={() => onComplete(bestType, scoresArr)}
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
          <p className="text-gray-500 text-xs">{checkedCount} / {ENNEAGRAM_QUIZ.length} cases cochées</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>
        )}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(checkedCount / ENNEAGRAM_QUIZ.length) * 100}%` }} />
      </div>
      <p className="text-gray-500 text-[10px] text-center mb-4">
        Cochez les affirmations qui vous correspondent — score par type (sur 10), puis pourcentage du total.
      </p>

      <div className="space-y-5 mb-4 max-h-[520px] overflow-y-auto pr-1">
        {TYPE_META.map((meta) => {
          const typeQuestions = ENNEAGRAM_QUIZ.map((q, idx) => ({ ...q, idx })).filter(q => q.type === meta.n);
          const behaviorQ = typeQuestions.filter(q => q.group === "behavior");
          const deepQ = typeQuestions.filter(q => q.group === "deep");
          const typeScore = typeQuestions.filter(q => checked[q.idx]).length;
          return (
            <div key={meta.n} className="rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2" style={{ background: `${meta.color}22` }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black" style={{ color: meta.color }}>{meta.n}</span>
                  <span className="text-xs font-bold text-white">{meta.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: meta.color }}>{typeScore}/10</span>
              </div>

              {["behavior", "deep"].map((groupKey) => {
                const groupQs = groupKey === "behavior" ? behaviorQ : deepQ;
                const g = GROUP_LABELS[groupKey];
                return (
                  <div key={groupKey} className="px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1.5" style={{ color: meta.color }}>
                      <span>{g.icon}</span> {g.label}
                    </p>
                    <div className="space-y-1">
                      {groupQs.map(q => {
                        const isChecked = !!checked[q.idx];
                        return (
                          <button key={q.idx} type="button" onClick={() => toggle(q.idx)}
                            className={`w-full flex items-start gap-2 rounded-lg p-2 text-left transition border ${
                              isChecked ? "bg-white/15 border-white/30" : "bg-white/5 border-white/5 hover:bg-white/10"
                            }`}>
                            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition"
                              style={isChecked ? { backgroundColor: meta.color, borderColor: meta.color } : { borderColor: "rgba(255,255,255,0.25)" }}>
                              {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </span>
                            <span className={`text-xs leading-snug ${isChecked ? "text-white" : "text-gray-300"}`}>{q.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={checkedCount < MIN_CHECKED}
        className="w-full bg-amber-700 hover:bg-amber-600 text-white">
        Voir mon résultat
      </Button>
      {checkedCount < MIN_CHECKED && (
        <p className="text-gray-500 text-xs text-center mt-2">Cochez au moins {MIN_CHECKED} affirmations pour voir votre profil.</p>
      )}
    </div>
  );
}