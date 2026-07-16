import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save } from "lucide-react";
import EnneagramSection from "@/components/cognitive/EnneagramSection";
import EnneagramImprovements from "@/components/cognitive/EnneagramImprovements";
import MBTIQuiz from "@/components/cognitive/MBTIQuiz";
import EnneagramQuiz from "@/components/cognitive/EnneagramQuiz";
import MBTITypeInfo from "@/components/cognitive/MBTITypeInfo";
import MBTIImprovements from "@/components/cognitive/MBTIImprovements";
import AttachmentSection from "@/components/cognitive/AttachmentSection";
import AttachmentQuiz from "@/components/cognitive/AttachmentQuiz";
import { FUNCTION_DESCRIPTIONS } from "@/lib/mbti-data";
import { FUNCTION_SHORT } from "@/lib/mbti-data";
import { HelpCircle } from "lucide-react";

// MBTI cognitive function stacks
const MBTI_FUNCTIONS = {
  INTP: { ego: ["Ti", "Ne", "Si", "Fe"], shadow: ["Te", "Ni", "Se", "Fi"] },
  INTJ: { ego: ["Ni", "Te", "Fi", "Se"], shadow: ["Ne", "Ti", "Fe", "Si"] },
  INFP: { ego: ["Fi", "Ne", "Si", "Te"], shadow: ["Fe", "Ni", "Se", "Ti"] },
  INFJ: { ego: ["Ni", "Fe", "Ti", "Se"], shadow: ["Ne", "Fi", "Te", "Si"] },
  ENTP: { ego: ["Ne", "Ti", "Fe", "Si"], shadow: ["Ni", "Te", "Fi", "Se"] },
  ENTJ: { ego: ["Te", "Ni", "Se", "Fi"], shadow: ["Ti", "Ne", "Si", "Fe"] },
  ENFP: { ego: ["Ne", "Fi", "Te", "Si"], shadow: ["Ni", "Fe", "Ti", "Se"] },
  ENFJ: { ego: ["Fe", "Ni", "Se", "Ti"], shadow: ["Fi", "Ne", "Si", "Te"] },
  ISTP: { ego: ["Ti", "Se", "Ni", "Fe"], shadow: ["Te", "Si", "Ne", "Fi"] },
  ISTJ: { ego: ["Si", "Te", "Fi", "Ne"], shadow: ["Se", "Ti", "Fe", "Ni"] },
  ISFP: { ego: ["Fi", "Se", "Ni", "Te"], shadow: ["Fe", "Si", "Ne", "Ti"] },
  ISFJ: { ego: ["Si", "Fe", "Ti", "Ne"], shadow: ["Se", "Fi", "Te", "Ni"] },
  ESTP: { ego: ["Se", "Ti", "Fe", "Ni"], shadow: ["Si", "Te", "Fi", "Ne"] },
  ESTJ: { ego: ["Te", "Si", "Ne", "Fi"], shadow: ["Ti", "Se", "Ni", "Fe"] },
  ESFP: { ego: ["Se", "Fi", "Te", "Ni"], shadow: ["Si", "Fe", "Ti", "Ne"] },
  ESFJ: { ego: ["Fe", "Si", "Ne", "Ti"], shadow: ["Fi", "Se", "Ni", "Te"] },
};

const POSITION_LABELS = ["Dominante", "Auxiliaire", "Tertiaire", "Inférieure"];
const SHADOW_LABELS = ["Opposant", "Critique", "Filou", "Démon"];

const MBTI_TYPES = Object.keys(MBTI_FUNCTIONS);

export default function Cognitive() {
  const [profile, setProfile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [notes, setNotes] = useState("");
  const [enneagramType, setEnneagramType] = useState(null);
  const [attachmentStyle, setAttachmentStyle] = useState(null);
  const [attachmentAnxiety, setAttachmentAnxiety] = useState(null);
  const [attachmentAvoidance, setAttachmentAvoidance] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMBTIQuiz, setShowMBTIQuiz] = useState(false);
  const [showEnneagramQuiz, setShowEnneagramQuiz] = useState(false);
  const [showAttachmentQuiz, setShowAttachmentQuiz] = useState(false);
  const [fnDetail, setFnDetail] = useState(null);

  useEffect(() => {
    base44.entities.CognitiveProfile.list().then(data => {
      if (data[0]) {
        setProfile(data[0]);
        setSelectedType(data[0].mbti_type || null);
        setNotes(data[0].notes || "");
        setEnneagramType(data[0].enneagram_type || null);
        setAttachmentStyle(data[0].attachment_style || null);
        setAttachmentAnxiety(data[0].attachment_anxiety ?? null);
        setAttachmentAvoidance(data[0].attachment_avoidance ?? null);
      }
    });
  }, []);

  const functions = selectedType ? MBTI_FUNCTIONS[selectedType] : null;

  const handleSave = async () => {
    setSaving(true);
    const data = { mbti_type: selectedType, enneagram_type: enneagramType, attachment_style: attachmentStyle, attachment_anxiety: attachmentAnxiety, attachment_avoidance: attachmentAvoidance, notes };
    if (profile) {
      await base44.entities.CognitiveProfile.update(profile.id, data);
    } else {
      const created = await base44.entities.CognitiveProfile.create(data);
      setProfile(created);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Auto-persist a partial profile update (used for MBTI/Enneagram selections)
  const persistProfile = async (data) => {
    if (profile) {
      await base44.entities.CognitiveProfile.update(profile.id, data);
    } else {
      const created = await base44.entities.CognitiveProfile.create(data);
      setProfile(created);
    }
  };

  const selectMBTIType = (type) => {
    setSelectedType(type);
    persistProfile({ mbti_type: type, enneagram_type: enneagramType, attachment_style: attachmentStyle, attachment_anxiety: attachmentAnxiety, attachment_avoidance: attachmentAvoidance, notes });
  };

  const selectEnneagramType = (typeN) => {
    setEnneagramType(typeN);
    persistProfile({ mbti_type: selectedType, enneagram_type: typeN, attachment_style: attachmentStyle, attachment_anxiety: attachmentAnxiety, attachment_avoidance: attachmentAvoidance, notes });
  };

  const selectAttachmentResult = ({ style, anxiety, avoidance }) => {
    setAttachmentStyle(style);
    setAttachmentAnxiety(anxiety);
    setAttachmentAvoidance(avoidance);
    persistProfile({ mbti_type: selectedType, enneagram_type: enneagramType, attachment_style: style, attachment_anxiety: anxiety, attachment_avoidance: avoidance, notes });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <h1 className="text-3xl font-bold text-white mb-1">🧠 Personnalité</h1>
        <p className="text-gray-400 mb-6">Modèle jungien — Ego & Ombre</p>

        {/* Type selector */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">Mon type MBTI</h2>
            <button onClick={() => setShowMBTIQuiz(!showMBTIQuiz)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${showMBTIQuiz ? "bg-indigo-600 text-white border-indigo-400" : "bg-white/10 text-indigo-300 border-white/20 hover:bg-white/20"}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              {showMBTIQuiz ? "Fermer le test" : "Faire le test"}
            </button>
          </div>
          {!showMBTIQuiz && (
            <>
              {!selectedType && (
                <p className="text-indigo-300/70 text-xs mb-3 text-center">
                  Choisissez votre type ci-dessous ou faites le test pour le déterminer automatiquement.
                </p>
              )}
              <div className="grid grid-cols-4 gap-2">
              {MBTI_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => selectMBTIType(type)}
                  className={`py-2 rounded-lg text-sm font-bold transition-all ${
                    selectedType === type
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {type}
                </button>
              ))}
              </div>
            </>
          )}
          {showMBTIQuiz && (
            <MBTIQuiz
              onComplete={(type) => { selectMBTIType(type); setShowMBTIQuiz(false); }}
              onClose={() => setShowMBTIQuiz(false)}
            />
          )}
        </div>

        {/* Type description: strengths, weaknesses, functioning */}
        <MBTITypeInfo selectedType={selectedType} />

        {/* Personalized improvement axes based on MBTI type */}
        <MBTIImprovements selectedType={selectedType} />

        {selectedType && functions ? (
        <>
        {/* Ego / Ombre split */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* EGO */}
          <div>
            <div className="text-center mb-3">
              <span className="bg-indigo-600/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
                ☀️ EGO
              </span>
            </div>
            <div className="space-y-2">
              {functions.ego.map((fn, i) => {
                const info = FUNCTION_DESCRIPTIONS[fn];
                return (
                  <div key={fn} className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => setFnDetail(fn)}
                        className="text-lg font-black cursor-pointer hover:underline"
                        style={{ color: info.color }}
                      >
                        {fn}
                      </button>
                      <span className="text-xs font-semibold" style={{ color: info.color + "cc" }}>{FUNCTION_SHORT[fn]}</span>
                      <span className="text-xs text-gray-500 ml-auto">{POSITION_LABELS[i]}</span>
                    </div>
                    <p className="text-white text-xs font-medium">{info.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                    <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed border-t border-white/10 pt-1.5">{info.fonctionnement}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OMBRE */}
          <div>
            <div className="text-center mb-3">
              <span className="bg-gray-700/50 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-600/30">
                🌑 OMBRE
              </span>
            </div>
            <div className="space-y-2">
              {functions.shadow.map((fn, i) => {
                const info = FUNCTION_DESCRIPTIONS[fn];
                return (
                  <div key={fn} className="bg-white/5 rounded-xl p-3 border border-white/5 opacity-80">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => setFnDetail(fn)}
                        className="text-lg font-black cursor-pointer hover:underline"
                        style={{ color: info.color + "99" }}
                      >
                        {fn}
                      </button>
                      <span className="text-xs font-semibold" style={{ color: info.color + "aa" }}>{FUNCTION_SHORT[fn]}</span>
                      <span className="text-xs text-gray-600 ml-auto">{SHADOW_LABELS[i]}</span>
                    </div>
                    <p className="text-gray-300 text-xs font-medium">{info.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                    <p className="text-gray-600 text-[11px] mt-1.5 leading-relaxed border-t border-white/5 pt-1.5">{info.fonctionnement}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual hierarchy bar */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-5 border border-white/20">
          <h3 className="text-white font-semibold text-sm mb-3">Hiérarchie des fonctions — {selectedType}</h3>
          <div className="space-y-2">
            {functions.ego.map((fn, i) => {
              const info = FUNCTION_DESCRIPTIONS[fn];
              const widths = [100, 75, 55, 35];
              return (
                <div key={fn} className="flex items-center gap-3">
                  <span className="text-xs w-20 text-gray-400">{POSITION_LABELS[i]}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${widths[i]}%`, backgroundColor: info.color }} />
                  </div>
                  <button
                    onClick={() => setFnDetail(fn)}
                    className="text-xs font-bold w-6 cursor-pointer hover:underline"
                    style={{ color: info.color }}
                  >
                    {fn}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        </>
        ) : (
          <div className="bg-white/5 rounded-2xl p-6 mb-5 border border-white/10 text-center">
            <p className="text-gray-400 text-sm">Complétez le test MBTI ou choisissez votre type pour explorer vos fonctions cognitives (Ego & Ombre).</p>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">🔮 Ennéagramme</h2>
            <button onClick={() => setShowEnneagramQuiz(!showEnneagramQuiz)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${showEnneagramQuiz ? "bg-amber-600 text-white border-amber-400" : "bg-white/10 text-amber-300 border-white/20 hover:bg-white/20"}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              {showEnneagramQuiz ? "Fermer le test" : "Faire le test"}
            </button>
          </div>
          {showEnneagramQuiz ? (
            <EnneagramQuiz
              onComplete={(typeN) => { selectEnneagramType(typeN); setShowEnneagramQuiz(false); }}
              onClose={() => setShowEnneagramQuiz(false)}
            />
          ) : (
            <EnneagramSection selected={enneagramType} onSelect={selectEnneagramType} />
          )}
        </div>

        {/* Personalized improvement axes based on Enneagram type */}
        {enneagramType && <EnneagramImprovements selectedType={enneagramType} />}

        {/* Attachment style */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">💝 Style d'attachement</h2>
            <button onClick={() => setShowAttachmentQuiz(!showAttachmentQuiz)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${showAttachmentQuiz ? "bg-pink-600 text-white border-pink-400" : "bg-white/10 text-pink-300 border-white/20 hover:bg-white/20"}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              {showAttachmentQuiz ? "Fermer le test" : "Faire le test"}
            </button>
          </div>
          {showAttachmentQuiz ? (
            <AttachmentQuiz
              onComplete={(result) => { selectAttachmentResult(result); setShowAttachmentQuiz(false); }}
              onClose={() => setShowAttachmentQuiz(false)}
            />
          ) : (
            <AttachmentSection style={attachmentStyle} />
          )}
        </div>

        {/* Notes */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
          <h3 className="text-white font-semibold mb-2">Notes personnelles</h3>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Mes observations sur mon profil cognitif..."
            rows={3} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none" />
        </div>

        <Button onClick={handleSave} disabled={saving}
          className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-5 rounded-xl font-semibold">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "✓ Sauvegardé !" : saving ? "Sauvegarde..." : "Sauvegarder mon profil"}
        </Button>
      </div>

      {/* Function detail modal */}
      {fnDetail && (() => {
        const info = FUNCTION_DESCRIPTIONS[fnDetail];
        return (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
            onClick={() => setFnDetail(null)}
          >
            <div
              className="bg-[#0d1f2d] rounded-t-2xl p-6 w-full max-w-lg shadow-2xl border-t border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black" style={{ color: info.color }}>{fnDetail}</span>
                  <span className="text-sm font-semibold" style={{ color: info.color + "cc" }}>{FUNCTION_SHORT[fnDetail]}</span>
                </div>
                <button onClick={() => setFnDetail(null)} className="text-gray-400 text-2xl leading-none">×</button>
              </div>
              <h3 className="text-white font-semibold mb-1">{info.label}</h3>
              <p className="text-gray-400 text-sm mb-3">{info.desc}</p>
              <p className="text-gray-500 text-xs leading-relaxed border-t border-white/10 pt-3">{info.fonctionnement}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}