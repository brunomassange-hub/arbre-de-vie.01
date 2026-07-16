import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, Brain, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { getTagLabel } from "@/lib/clinicalCategories";

export default function PersonalityPerspective({
  bigFive = null,
  cognitiveProfile = null,
  events = [],
  links = [],
  beliefs = [],
}) {
  const [report, setReport] = useState(null);
  const [reportDate, setReportDate] = useState(null);
  const [savedFingerprint, setSavedFingerprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const systems = {
    bigFive: bigFive != null,
    mbti: !!cognitiveProfile?.mbti_type,
    enneagram: cognitiveProfile?.enneagram_type != null,
    attachment: !!cognitiveProfile?.attachment_style,
  };
  const completedCount = Object.values(systems).filter(Boolean).length;

  const computeFingerprint = () => {
    const items = [...events, ...links, ...beliefs];
    if (bigFive) items.push(bigFive);
    if (cognitiveProfile) items.push(cognitiveProfile);
    const maxDate = items.reduce((max, item) => {
      const d = item.updated_date || item.created_date || "";
      return d > max ? d : max;
    }, "");
    return `${items.length}|${maxDate}|${systems.bigFive ? "bf1" : "bf0"}|${systems.mbti ? "mb1" : "mb0"}|${systems.enneagram ? "en1" : "en0"}|${systems.attachment ? "at1" : "at0"}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        if (me?.perspective_report) {
          setReport(me.perspective_report);
          setReportDate(me.perspective_date || null);
          setSavedFingerprint(me.perspective_fingerprint || null);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  const buildPrompt = () => {
    const sections = [];
    sections.push("=== DONNÉES DE PERSONNALITÉ ===\n");

    if (systems.bigFive) {
      sections.push("--- BIG FIVE ---");
      sections.push(`Ouverture: ${bigFive.ouverture ?? "?"}/100`);
      sections.push(`Conscience: ${bigFive.conscience ?? "?"}/100`);
      sections.push(`Extraversion: ${bigFive.extraversion ?? "?"}/100`);
      sections.push(`Agréabilité: ${bigFive.agreabilite ?? "?"}/100`);
      sections.push(`Nervosité: ${bigFive.nervosite ?? "?"}/100`);
      if (bigFive.qualites?.length > 0) {
        sections.push(`Qualités: ${bigFive.qualites.map(q => `${q.text} (${q.trait})`).join(", ")}`);
      }
      sections.push("");
    }

    if (systems.mbti) {
      sections.push("--- MBTI ---");
      sections.push(`Type: ${cognitiveProfile.mbti_type}`);
      sections.push("");
    }

    if (systems.enneagram) {
      sections.push("--- ENNÉAGRAMME ---");
      sections.push(`Type: ${cognitiveProfile.enneagram_type}`);
      sections.push("");
    }

    if (systems.attachment) {
      sections.push("--- STYLE D'ATTACHEMENT ---");
      sections.push(`Style: ${cognitiveProfile.attachment_style}`);
      if (cognitiveProfile.attachment_anxiety != null) sections.push(`Score d'anxiété: ${cognitiveProfile.attachment_anxiety.toFixed(1)}/5`);
      if (cognitiveProfile.attachment_avoidance != null) sections.push(`Score d'évitement: ${cognitiveProfile.attachment_avoidance.toFixed(1)}/5`);
      sections.push("");
    }

    if (events.length > 0) {
      sections.push("--- ÉVÉNEMENTS AVEC CATÉGORIES CLINIQUES ---");
      events.forEach(ev => {
        const tags = (ev.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• "${ev.title}" — émotion: ${ev.emotion || "?"}, blessure: ${ev.wound_type || "?"}`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    if (links.length > 0) {
      sections.push("--- RELATIONS AVEC CATÉGORIES CLINIQUES ---");
      links.forEach(lk => {
        const tags = (lk.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• ${lk.name} (${lk.type})`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    if (beliefs.length > 0) {
      sections.push("--- CROYANCES LIMITANTES AVEC CATÉGORIES CLINIQUES ---");
      beliefs.forEach(b => {
        const tags = (b.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• [${b.branch}] "${b.belief}"`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    sections.push("=== FIN DES DONNÉES ===\n");

    const completedList = [];
    if (systems.bigFive) completedList.push("Big Five");
    if (systems.mbti) completedList.push("MBTI");
    if (systems.enneagram) completedList.push("Ennéagramme");
    if (systems.attachment) completedList.push("Style d'attachement");

    sections.push(`Tu es un accompagnant en développement personnel bienveillant. L'utilisateur a complété ${completedCount} des 4 systèmes de personnalité: ${completedList.join(", ")}.

En te basant UNIQUEMENT sur les données ci-dessus, rédige une analyse croisée des systèmes de personnalité en français, en markdown (## ...), structurée ainsi:

## Convergences
Identifie les points de convergence entre les systèmes de personnalité disponibles. Exemples: un MBTI introverti (I) qui converge avec une faible Extraversion au Big Five ; un type Ennéagramme 5 qui converge avec un attachement évitant. Montre comment ces combinaisons cohérentes se renforcent mutuellement et offrent une image claire du fonctionnement de la personne.

## Tensions et nuances
Identifie les tensions ou nuances entre les systèmes si elles existent. Exemple: un MBTI "E" (extraverti) mais une Extraversion Big Five faible — souligne cette nuance plutôt que de l'ignorer. Si aucune tension n'est apparente, note que les systèmes sont globalement cohérents.

## Liens avec les données cliniques
Mets en lien les résultats croisés de personnalité avec les catégories cliniques identifiées chez l'utilisateur (traumatismes, difficultés relationnelles, conflits psychiques, blessures de l'âme). Exemple: un attachement anxieux combiné à des difficultés relationnelles identifiées, ou une nervosité élevée en lien avec des blessures de l'âme spécifiques. Référence les événements, relations ou croyances précises de l'utilisateur.

Règles:
- Reste nuancé: présente les résultats comme une lecture parmi d'autres de la personnalité, jamais comme une vérité absolue.
- Sois précis et référence les vraies données de l'utilisateur.
- Sois chaleureux, respectueux, non jugeant.
- Ne pose aucun diagnostic médical ou psychologique.
- Écris en français, 400-600 mots.`);

    return sections.join("\n");
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: buildPrompt(),
        model: "claude_sonnet_4_6",
      });
      const text = typeof result === "string" ? result : JSON.stringify(result);
      const now = new Date().toISOString();
      const fp = computeFingerprint();
      setReport(text);
      setReportDate(now);
      setSavedFingerprint(fp);
      await base44.auth.updateMe({
        perspective_report: text,
        perspective_date: now,
        perspective_fingerprint: fp,
      });
    } catch (e) {
      setError(e.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  // Fewer than 2 systems completed — show invitation
  if (completedCount < 2) {
    const testList = [
      { name: "Big Five", done: systems.bigFive, page: "Growth" },
      { name: "MBTI", done: systems.mbti, page: "Cognitive" },
      { name: "Ennéagramme", done: systems.enneagram, page: "Cognitive" },
      { name: "Style d'attachement", done: systems.attachment, page: "Cognitive" },
    ];
    return (
      <div className="mb-8">
        <h2 className="text-sm font-bold mb-3 flex items-center gap-1.5" style={{ color: "#e8d5c4" }}>
          <Brain className="w-4 h-4" /> Perspective de personnalité
        </h2>
        <div className="rounded-xl border p-4" style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.15)" }}>
          <p className="text-xs text-gray-400 mb-3">
            Croisez vos 4 systèmes de personnalité (Big Five, MBTI, Ennéagramme, Style d'attachement) pour révéler les convergences et nuances de votre fonctionnement.
          </p>
          <p className="text-xs mb-3" style={{ color: "#8b9dc3" }}>
            Complétez au moins <strong>deux</strong> des quatre tests pour débloquer cette perspective croisée :
          </p>
          <div className="space-y-1.5">
            {testList.map(t => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <span style={{ color: t.done ? "#4ade80" : "#6b7b94" }}>{t.done ? "✓" : "○"}</span>
                <span style={{ color: t.done ? "#c4d0e0" : "#6b7b94" }}>{t.name}</span>
                {!t.done && (
                  <Link to={createPageUrl(t.page)} className="ml-auto text-[10px] underline" style={{ color: "#8b9dc3" }}>
                    Compléter →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const newDataAvailable = report && savedFingerprint !== computeFingerprint();

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch { return ""; }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "#e8d5c4" }}>
          <Brain className="w-4 h-4" /> Perspective de personnalité
        </h2>
        <button
          onClick={generateReport}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition"
          style={{ background: "rgba(139,157,195,0.12)", color: "#8b9dc3" }}
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Génération…" : report ? "Actualiser" : "Générer"}
        </button>
      </div>

      {newDataAvailable && (
        <div className="flex items-center gap-1.5 mb-2 text-[10px]" style={{ color: "#e0a868" }}>
          <AlertCircle className="w-3 h-3" />
          De nouvelles données sont disponibles — pensez à actualiser
        </div>
      )}

      {error && (
        <div className="rounded-xl border p-3 text-xs text-red-300" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
          Erreur: {error}
        </div>
      )}

      {report && (
        <div className="rounded-xl border p-4" style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.15)" }}>
          {reportDate && (
            <p className="text-[10px] mb-3" style={{ color: "#6b7b94" }}>
              Perspective générée le {formatDate(reportDate)}
            </p>
          )}
          <div className="prose prose-sm prose-invert max-w-none text-sm" style={{ color: "#c4d0e0" }}>
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}