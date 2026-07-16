import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, FileText, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { base44 } from "@/api/base44Client";
import { getTagLabel } from "@/lib/clinicalCategories";

export default function PersonalizedReport({
  events = [],
  links = [],
  beliefs = [],
  bigFive = null,
  cognitiveProfile = null,
  positiveLinks = [],
  positiveBeliefs = [],
}) {
  const [report, setReport] = useState(null);
  const [reportDate, setReportDate] = useState(null);
  const [savedFingerprint, setSavedFingerprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasData = events.length > 0 || links.length > 0 || beliefs.length > 0 || bigFive || cognitiveProfile;

  const computeFingerprint = () => {
    const items = [...events, ...links, ...beliefs, ...positiveLinks, ...positiveBeliefs];
    if (bigFive) items.push(bigFive);
    if (cognitiveProfile) items.push(cognitiveProfile);
    const maxDate = items.reduce((max, item) => {
      const d = item.updated_date || item.created_date || "";
      return d > max ? d : max;
    }, "");
    return `${items.length}|${maxDate}|${bigFive ? "bf1" : "bf0"}|${cognitiveProfile ? "cp1" : "cp0"}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        if (me?.bilan_report) {
          setReport(me.bilan_report);
          setReportDate(me.bilan_date || null);
          setSavedFingerprint(me.bilan_fingerprint || null);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  const buildPrompt = () => {
    const sections = [];

    sections.push("=== DONNÉES UTILISATEUR POUR LE BILAN ===\n");

    // Events
    if (events.length > 0) {
      sections.push("--- ÉVÉNEMENTS DE VIE (Blessures) ---");
      events.forEach(ev => {
        const tags = (ev.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• "${ev.title}" — émotion: ${ev.emotion || "?"}, blessure de l'âme: ${ev.wound_type || "?"}, âge: ${ev.age ?? "?"}`);
        if (ev.description) sections.push(`  Description: ${ev.description}`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    // Links
    if (links.length > 0) {
      sections.push("--- RELATIONS (Racines) ---");
      links.forEach(lk => {
        const tags = (lk.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• ${lk.name} (${lk.type})`);
        if (lk.description) sections.push(`  Description: ${lk.description}`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    // Beliefs
    if (beliefs.length > 0) {
      sections.push("--- CROYANCES LIMITANTES (Branches) ---");
      beliefs.forEach(b => {
        const tags = (b.clinical_tags || []).map(t => getTagLabel(t)).filter(Boolean);
        sections.push(`• [${b.branch}] "${b.belief}"`);
        if (b.origin) sections.push(`  Origine: ${b.origin}`);
        if (b.age != null) sections.push(`  Formée à: ${b.age} ans`);
        if (tags.length) sections.push(`  Catégories cliniques: ${tags.join(", ")}`);
      });
      sections.push("");
    }

    // Big Five
    if (bigFive) {
      sections.push("--- PROFIL BIG FIVE ---");
      sections.push(`Ouverture: ${bigFive.ouverture ?? "?"}/100`);
      sections.push(`Conscience: ${bigFive.conscience ?? "?"}/100`);
      sections.push(`Extraversion: ${bigFive.extraversion ?? "?"}/100`);
      sections.push(`Agréabilité: ${bigFive.agreabilite ?? "?"}/100`);
      sections.push(`Nervosité: ${bigFive.nervosite ?? "?"}/100`);
      if (bigFive.qualites?.length > 0) {
        sections.push(`Qualités personnelles: ${bigFive.qualites.map(q => `${q.text} (${q.trait})`).join(", ")}`);
      }
      sections.push("");
    }

    // Cognitive profile
    if (cognitiveProfile) {
      sections.push("--- PROFIL COGNITIF ---");
      if (cognitiveProfile.mbti_type) sections.push(`Type MBTI: ${cognitiveProfile.mbti_type}`);
      if (cognitiveProfile.enneagram_type) sections.push(`Type Ennéagramme: ${cognitiveProfile.enneagram_type}`);
      if (cognitiveProfile.attachment_style) {
        sections.push(`Style d'attachement: ${cognitiveProfile.attachment_style}`);
        if (cognitiveProfile.attachment_anxiety != null) sections.push(`  Score d'anxiété d'attachement: ${cognitiveProfile.attachment_anxiety.toFixed(1)}/5`);
        if (cognitiveProfile.attachment_avoidance != null) sections.push(`  Score d'évitement d'attachement: ${cognitiveProfile.attachment_avoidance.toFixed(1)}/5`);
      }
      if (cognitiveProfile.notes) sections.push(`Notes: ${cognitiveProfile.notes}`);
      sections.push("");
    }

    // Positive resources
    if (positiveLinks.length > 0) {
      sections.push("--- RESSOURCES RELATIONNELLES POSITIVES ---");
      positiveLinks.forEach(pl => {
        sections.push(`• ${pl.name} (${pl.type})${pl.description ? ": " + pl.description : ""}`);
      });
      sections.push("");
    }
    if (positiveBeliefs.length > 0) {
      sections.push("--- CROYANCES POSITIVES ---");
      positiveBeliefs.forEach(pb => {
        sections.push(`• [${pb.branch}] "${pb.belief}"${pb.note ? " — " + pb.note : ""}`);
      });
      sections.push("");
    }

    sections.push("=== FIN DES DONNÉES ===\n");

    sections.push(`Tu es un accompagnant en développement personnel bienveillant. En te basant UNIQUEMENT sur les données ci-dessus, rédige un bilan personnalisé en français, structuré en 4 parties avec les titres suivants en markdown (## ...):

## Vue d'ensemble
Synthèse des schémas récurrents que tu identifies en croisant les différentes données (blessures, émotions, relations, croyances, profil Big Five, style d'attachement, MBTI/Ennéagramme). Met en évidence les liens entre ces éléments.

## Zones de vigilance
Les fragilités ou manques apparents (ex: patterns répétés de difficultés relationnelles combinés à une Nervosité élevée et un attachement anxieux). Formule avec bienveillance, sans jugement ni diagnostic clinique. N'utilise jamais de termes de pathologie psychiatrique.

## Points d'appui
Les forces sur lesquelles l'utilisateur peut s'appuyer: traits Big Five positifs, ressources relationnelles positives, croyances positives, qualités listées.

## Pistes de développement concrètes
Suggestions pratiques et actionnables, en lien avec les outils thérapeutiques disponibles: Ancrage (grounding), Hypnose, Méditation, Axes d'amélioration. Précise quand un outil est particulièrement pertinent au regard d'une difficulté identifiée.

## Sens de la vie
En te basant EXCLUSIVEMENT sur les croyances limitantes de l'utilisateur et leurs thèmes (branches: Physique, Social, Intellectuel, Émotionnel, Artistique, Spirituel), explore ce qui pourrait donner du sens à sa vie. Identifie les valeurs qui transparaissent à travers ses croyances (ce qu'il craint révèle ce qu'il valorise), et propose des pistes pour aligner sa vie avec un sens porteur. Formule avec bienveillance et sans jugement.

Règles:
- Sois précis et référence les vraies données de l'utilisateur (cite des événements, relations ou croyances spécifiques).
- Sois chaleureux, respectueux, non jugeant.
- Ne pose aucun diagnostic médical ou psychologique.
- Si certaines données manquent, concentre-toi sur ce qui est disponible sans signaler le manque.
- Écris en français, 600-900 mots.`);

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
        bilan_report: text,
        bilan_date: now,
        bilan_fingerprint: fp,
      });
    } catch (e) {
      setError(e.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  if (!hasData) return null;

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
          <FileText className="w-4 h-4" /> Bilan personnalisé
        </h2>
        <button
          onClick={generateReport}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition"
          style={{ background: "rgba(139,157,195,0.12)", color: "#8b9dc3" }}
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Génération…" : report ? "Actualiser mon bilan" : "Générer mon bilan"}
        </button>
      </div>

      {newDataAvailable && (
        <div className="flex items-center gap-1.5 mb-2 text-[10px]" style={{ color: "#e0a868" }}>
          <AlertCircle className="w-3 h-3" />
          De nouvelles données sont disponibles — pensez à actualiser votre bilan
        </div>
      )}

      <div className="rounded-xl border p-3 mb-2 text-[10px] italic" style={{ background: "rgba(139,157,195,0.05)", borderColor: "rgba(139,157,195,0.15)", color: "#6b7b94" }}>
        ⚠️ Ce bilan est un outil de réflexion personnelle généré par IA à partir de vos données. Il ne remplace pas un accompagnement professionnel et ne constitue pas un diagnostic médical ou psychologique.
      </div>

      {error && (
        <div className="rounded-xl border p-3 text-xs text-red-300" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
          Erreur: {error}
        </div>
      )}

      {report && (
        <div className="rounded-xl border p-4" style={{ background: "rgba(139,157,195,0.05)", borderColor: "rgba(139,157,195,0.15)" }}>
          {reportDate && (
            <p className="text-[10px] mb-3" style={{ color: "#6b7b94" }}>
              Bilan généré le {formatDate(reportDate)}
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