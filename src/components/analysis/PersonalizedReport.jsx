import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, FileText, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { base44 } from "@/api/base44Client";
import { getTagLabel, migrateNeedTags, CLINICAL_LISTS, isGeneralTag, getListLabel } from "@/lib/clinicalCategories";

// Listes cliniques détaillées dans le bilan (hors wound/need gérés via champs dédiés)
const DETAIL_LIST_IDS = ["rel", "trauma", "conflict", "behavior"];

// Produit un résumé structuré des catégories cliniques : pour chaque grande
// catégorie sélectionnée, liste les sous-catégories précises cochées.
function formatClinicalDetail(tags = []) {
  const byList = {};
  tags.forEach(tag => {
    const [listId, itemId] = tag.split(":");
    if (!DETAIL_LIST_IDS.includes(listId)) return;
    (byList[listId] ||= { general: false, specifics: [] });
    if (isGeneralTag(tag)) byList[listId].general = true;
    else byList[listId].specifics.push(getTagLabel(tag));
  });
  const lines = [];
  DETAIL_LIST_IDS.forEach(listId => {
    const entry = byList[listId];
    if (!entry) return;
    const catLabel = getListLabel(listId);
    const parts = [];
    if (entry.specifics.length) parts.push(entry.specifics.join(", "));
    if (entry.general) parts.push("(catégorie générale)");
    lines.push(`  • ${catLabel}${parts.length ? ": " + parts.join(" — ") : ""}`);
  });
  return lines.length ? lines.join("\n") : "";
}

// Calcule les récurrences entre émotions, blessures de l'âme, besoins et les
// sous-catégories cliniques, pour nourrir l'analyse fine du LLM.
function buildRecurrenceSummary({ events = [], links = [], beliefs = [] }) {
  const emoCount = {};
  const woundCount = {};
  const needCount = {};
  const emoTrauma = {};
  const needRel = {};

  const addEmotion = (emo, clinicalTags = []) => {
    if (!emo) return;
    emoCount[emo] = (emoCount[emo] || 0) + 1;
    const traumaSubs = (clinicalTags || [])
      .filter(t => t.startsWith("trauma:") && !isGeneralTag(t))
      .map(t => getTagLabel(t));
    if (traumaSubs.length) (emoTrauma[emo] ||= []).push(...traumaSubs);
  };
  const addWound = (w) => { if (w) woundCount[w] = (woundCount[w] || 0) + 1; };
  const addNeeds = (tags, clinicalTags = []) => {
    const needs = migrateNeedTags(tags).map(t => getTagLabel(t));
    needs.forEach(n => { needCount[n] = (needCount[n] || 0) + 1; });
    const relSubs = (clinicalTags || [])
      .filter(t => t.startsWith("rel:") && !isGeneralTag(t))
      .map(t => getTagLabel(t));
    if (needs.length && relSubs.length) needs.forEach(n => (needRel[n] ||= []).push(...relSubs));
  };

  events.forEach(ev => { addEmotion(ev.emotion, ev.clinical_tags); addWound(ev.wound_type); addNeeds(ev.need_tags, ev.clinical_tags); });
  links.forEach(lk => { addEmotion(lk.emotion, lk.clinical_tags); addWound(lk.soul_wound); addNeeds(lk.need_tags, lk.clinical_tags); });
  beliefs.forEach(b => { addEmotion(b.emotion, b.clinical_tags); addWound(b.soul_wound); addNeeds(b.need_tags, b.clinical_tags); });

  const topSubs = (subs) => {
    const c = {};
    subs.forEach(s => c[s] = (c[s] || 0) + 1);
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s, n]) => `${s} (${n}×)`).join(", ");
  };

  const lines = [];
  const emoRec = Object.entries(emoCount).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]);
  if (emoRec.length) lines.push(`Émotions récurrentes (≥2): ${emoRec.map(([e, c]) => `${e} (${c}×)`).join(", ")}`);
  const woundRec = Object.entries(woundCount).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]);
  if (woundRec.length) lines.push(`Blessures de l'âme récurrentes (≥2): ${woundRec.map(([w, c]) => `${w} (${c}×)`).join(", ")}`);
  const needRec = Object.entries(needCount).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]);
  if (needRec.length) lines.push(`Besoins troublés récurrents (≥2): ${needRec.map(([n, c]) => `${n} (${c}×)`).join(", ")}`);

  const emoTraumaLines = Object.entries(emoTrauma)
    .map(([emo, subs]) => `  - Émotion « ${emo} » associée à des traumatismes: ${topSubs(subs)}`);
  if (emoTraumaLines.length) lines.push(`Croisements émotion × sous-catégorie de traumatisme:\n${emoTraumaLines.join("\n")}`);

  const needRelLines = Object.entries(needRel)
    .map(([n, subs]) => `  - Besoin « ${n} » associé à des difficultés relationnelles: ${topSubs(subs)}`);
  if (needRelLines.length) lines.push(`Croisements besoin × difficulté relationnelle:\n${needRelLines.join("\n")}`);

  return lines.join("\n");
}

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
        const needs = migrateNeedTags(ev.need_tags).map(t => getTagLabel(t)).filter(Boolean);
        const clinical = formatClinicalDetail(ev.clinical_tags || []);
        sections.push(`• "${ev.title}" — émotion: ${ev.emotion || "non précisée"}, blessure de l'âme: ${ev.wound_type || "non précisée"}, âge: ${ev.age ?? "?"}`);
        if (ev.description) sections.push(`  Description: ${ev.description}`);
        if (needs.length) sections.push(`  Besoins troublés: ${needs.join(", ")}`);
        if (clinical) sections.push(`  Catégorisation clinique:\n${clinical}`);
      });
      sections.push("");
    }

    // Links
    if (links.length > 0) {
      sections.push("--- RELATIONS (Racines) ---");
      links.forEach(lk => {
        const needs = migrateNeedTags(lk.need_tags).map(t => getTagLabel(t)).filter(Boolean);
        const clinical = formatClinicalDetail(lk.clinical_tags || []);
        sections.push(`• ${lk.name} (${lk.type}) — émotion: ${lk.emotion || "non précisée"}, blessure de l'âme: ${lk.soul_wound || "non précisée"}`);
        if (lk.description) sections.push(`  Description: ${lk.description}`);
        if (needs.length) sections.push(`  Besoins troublés: ${needs.join(", ")}`);
        if (clinical) sections.push(`  Catégorisation clinique:\n${clinical}`);
      });
      sections.push("");
    }

    // Beliefs
    if (beliefs.length > 0) {
      sections.push("--- CROYANCES LIMITANTES (Branches) ---");
      beliefs.forEach(b => {
        const needs = migrateNeedTags(b.need_tags).map(t => getTagLabel(t)).filter(Boolean);
        const clinical = formatClinicalDetail(b.clinical_tags || []);
        sections.push(`• [${b.branch}] "${b.belief}" — émotion: ${b.emotion || "non précisée"}, blessure de l'âme: ${b.soul_wound || "non précisée"}`);
        if (b.origin) sections.push(`  Origine: ${b.origin}`);
        if (b.age != null) sections.push(`  Formée à: ${b.age} ans`);
        if (needs.length) sections.push(`  Besoins troublés: ${needs.join(", ")}`);
        if (clinical) sections.push(`  Catégorisation clinique:\n${clinical}`);
      });
      sections.push("");
    }

    // Synthèse des récurrences (émotions / blessures / besoins / sous-catégories cliniques)
    const recurrence = buildRecurrenceSummary({ events, links, beliefs });
    if (recurrence) {
      sections.push("--- SYNTHÈSE DES RÉCURRENCES ---");
      sections.push(recurrence);
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
Synthèse des schémas récurrents que tu identifies en croisant TOUTES les données disponibles : émotions associées à chaque événement/relation/croyance, blessures de l'âme, besoins troublés, sous-catégories cliniques précises (Difficulté relationnelle, Traumatisme, Conflit psychique, Troubles du comportement), profil Big Five, style d'attachement, MBTI/Ennéagramme. Identifie notamment les récurrences croisées: une émotion récurrente associée à une sous-catégorie précise de traumatisme, un besoin troublé à répétition en lien avec un type de difficulté relationnelle, ou une blessure de l'âme qui revient dans plusieurs contexte. Appuie-toi sur la section « Synthèse des récurrences » fournie dans les données. Met en évidence les liens entre ces éléments.

## Zones de vigilance
Les fragilités ou manques apparents (ex: patterns répétés de difficultés relationnelles combinés à une Nervosité élevée et un attachement anxieux). Formule avec bienveillance, sans jugement ni diagnostic clinique. N'utilise jamais de termes de pathologie psychiatrique.

## Points d'appui
Les forces sur lesquelles l'utilisateur peut s'appuyer: traits Big Five positifs, ressources relationnelles positives, croyances positives, qualités listées.

## Pistes de développement concrètes
Centre cette section sur la personne et son vécu propre, pas sur un catalogue de pratiques. Propose des pistes de réflexion et d'action concrètes et personnalisées, ancrées dans les données réelles de l'utilisateur:
- Comment aborder différemment un conflit psychique identifié (ex: une tension entre deux besoins ou croyances repérés dans ses données).
- Quels nouveaux comportements ou réflexes pourraient remplacer un pattern problématique identifié (ex: remplacer l'évitement relationnel par une action progressive et concrète adaptée à sa situation).
- Comment faire évoluer une habitude relationnelle repérée comme récurrente, en lien avec les événements et relations spécifiques de son parcours.
- Des questions de réflexion personnelle ou des micro-actions à essayer dans son quotidien, ancrées dans ses propres événements et croyances plutôt que des recommandations génériques.
N'évoque pas les outils du Journal (Ancrage, Hypnose, Méditation, Axes d'amélioration) dans cette section et ne les utilise pas comme fil conducteur: reste centré sur l'analyse humaine et personnelle de la situation de l'utilisateur.

## Sens de la vie
En te basant EXCLUSIVEMENT sur les croyances limitantes de l'utilisateur et leurs thèmes (branches: Physique, Social, Intellectuel, Émotionnel, Artistique, Spirituel), explore ce qui pourrait donner du sens à sa vie. Identifie les valeurs qui transparaissent à travers ses croyances (ce qu'il craint révèle ce qu'il valorise), et propose des pistes pour aligner sa vie avec un sens porteur. Formule avec bienveillance et sans jugement.

Règles:
- Sois précis et référence les vraies données de l'utilisateur (cite des événements, relations ou croyances spécifiques, et nomme explicitement les sous-catégories cliniques et les émotions/besoins/blessures concernés).
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