import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { ATTACHMENT_QUESTIONS, ATTACHMENT_SCALE, ATTACHMENT_STYLES, determineAttachmentStyle } from "@/lib/attachment-data";

export default function AttachmentQuiz({ onComplete, onClose }) {
  const [answers, setAnswers] = useState({}); // index -> value (1-5)
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const computeScores = () => {
    const anxietyItems = ATTACHMENT_QUESTIONS.map((q, i) => ({ ...q, idx: i })).filter(q => q.dim === "anxiety");
    const avoidanceItems = ATTACHMENT_QUESTIONS.map((q, i) => ({ ...q, idx: i })).filter(q => q.dim === "avoidance");

    const anxietySum = anxietyItems.reduce((acc, q) => acc + (answers[q.idx] || 3), 0);
    const avoidanceSum = avoidanceItems.reduce((acc, q) => acc + (answers[q.idx] || 3), 0);

    const anxietyMean = anxietySum / anxietyItems.length;
    const avoidanceMean = avoidanceSum / avoidanceItems.length;

    return { anxietyMean, avoidanceMean, style: determineAttachmentStyle(anxietyMean, avoidanceMean) };
  };

  if (showResult) {
    const { anxietyMean, avoidanceMean, style } = computeScores();
    const info = ATTACHMENT_STYLES[style];
    const pct = (mean) => Math.round(((mean - 1) / 4) * 100);

    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <div className="text-center mb-5">
          <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: info.color }} />
          <p className="text-gray-400 text-xs">Votre style d'attachement</p>
          <h2 className="text-xl font-bold text-white mt-1">{info.icon} {info.label}</h2>
        </div>

        {/* Score bars */}
        <div className="space-y-3 mb-5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Anxiété d'attachement</span>
              <span className="font-bold" style={{ color: anxietyMean >= 3 ? "#f59e0b" : "#22c55e" }}>
                {anxietyMean >= 3 ? "Élevée" : "Faible"} ({anxietyMean.toFixed(1)}/5)
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct(anxietyMean)}%`, backgroundColor: anxietyMean >= 3 ? "#f59e0b" : "#22c55e" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Évitement d'attachement</span>
              <span className="font-bold" style={{ color: avoidanceMean >= 3 ? "#3b82f6" : "#22c55e" }}>
                {avoidanceMean >= 3 ? "Élevé" : "Faible"} ({avoidanceMean.toFixed(1)}/5)
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct(avoidanceMean)}%`, backgroundColor: avoidanceMean >= 3 ? "#3b82f6" : "#22c55e" }} />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { setAnswers({}); setShowResult(false); }}
            variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <RotateCcw className="w-4 h-4 mr-1" /> Recommencer
          </Button>
          <Button onClick={() => onComplete({ style, anxiety: anxietyMean, avoidance: avoidanceMean })}
            className="flex-1 text-white"
            style={{ backgroundColor: info.color }}>
            <ChevronRight className="w-4 h-4 mr-1" /> Choisir ce style
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">💝 Test d'attachement</h3>
          <p className="text-gray-500 text-xs">{answeredCount} / {ATTACHMENT_QUESTIONS.length} questions</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">✕</button>
        )}
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
        <div className="h-1.5 rounded-full transition-all"
          style={{ width: `${(answeredCount / ATTACHMENT_QUESTIONS.length) * 100}%`, backgroundColor: "#ec4899" }} />
      </div>

      <div className="space-y-3 mb-4 max-h-[420px] overflow-y-auto pr-1">
        {ATTACHMENT_QUESTIONS.map((q, qIdx) => (
          <div key={qIdx} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-gray-300 text-xs font-medium mb-2">
              {qIdx + 1}. {q.text}
            </p>
            <div className="flex gap-1">
              {ATTACHMENT_SCALE.map(opt => {
                const sel = answers[qIdx] === opt.value;
                return (
                  <button key={opt.value} onClick={() => setAnswers({ ...answers, [qIdx]: opt.value })}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition border text-center leading-tight ${
                      sel ? "bg-pink-600 border-pink-400 text-white" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                    }`}>
                    {opt.value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={answeredCount < ATTACHMENT_QUESTIONS.length}
        className="w-full bg-pink-700 hover:bg-pink-600 text-white">
        Voir mon résultat
      </Button>
      {answeredCount < ATTACHMENT_QUESTIONS.length && (
        <p className="text-gray-500 text-xs text-center mt-2">Répondez aux {ATTACHMENT_QUESTIONS.length} questions</p>
      )}
    </div>
  );
}