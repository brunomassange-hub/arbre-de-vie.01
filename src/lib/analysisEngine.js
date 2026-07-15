import { CLINICAL_LISTS, getTagLabel, getTagDescription } from "@/lib/clinicalCategories";

export const CATEGORIES = {
  type_trauma: { label: "Type de trauma", icon: "🔥", color: "#ef4444" },
  difficulte_relationnelle: { label: "Difficulté relationnelle", icon: "🔗", color: "#f59e0b" },
  probleme_comportemental: { label: "Problème comportemental", icon: "⚡", color: "#eab308" },
  conflit_psychique: { label: "Conflit psychique", icon: "🔀", color: "#8b5cf6" },
  blessure_ame: { label: "Blessure de l'âme", icon: "💔", color: "#ec4899" },
  croyance_limitante: { label: "Croyance limitante", icon: "🔒", color: "#06b6d4" },
};

export const JOURNAL_TOOLS = {
  grounding: { label: "Ancrage", icon: "💚" },
  meditation: { label: "Méditation", icon: "🌬️" },
  hypnose: { label: "Hypnose", icon: "🌀" },
  amelioration: { label: "Axes", icon: "📈" },
};

const WOUND_DESC = {
  Abandon: "La blessure d'abandon se manifeste par une peur profonde d'être laissé seul, un besoin constant de présence et de réassurance.",
  Trahison: "La blessure de trahison crée une difficulté à faire confiance, une hypervigilance face aux engagements des autres.",
  Rejet: "La blessure de rejet génère un sentiment de ne pas être assez bien, une peur de déranger ou d'être exclu.",
  Humiliation: "La blessure d'humiliation produit une honte profonde, une peur du jugement et du ridicule.",
  Injustice: "La blessure d'injustice crée un sentiment permanent d'être traité injustement, une rigidité face à l'autorité.",
};

const EMOTION_PATTERNS = {
  Colère: { title: "Tendance à la colère réactive", desc: "Une récurrence de colère suggère un pattern de réaction colérique face aux frustrations." },
  Anxiété: { title: "Anxiété chronique", desc: "L'anxiété apparaît comme émotion dominante, indiquant un pattern de tension constant." },
  Peur: { title: "Évitement par la peur", desc: "La peur guide certains comportements, suggérant un pattern d'évitement." },
  Culpabilité: { title: "Culpabilité auto-infligée", desc: "La culpabilité récurrente indique une tendance à se blâmer, pouvant mener à l'auto-sabotage." },
  Honte: { title: "Retrait par honte", desc: "La honte apparaît comme un pattern, pouvant provoquer un retrait social." },
  Tristesse: { title: "Mélancolie persistante", desc: "La tristesse récurrente suggère un deuil ou une mélancolie non résolus." },
  Solitude: { title: "Sentiment de solitude", desc: "La solitude émerge comme thème récurrent, indiquant un besoin de connexion insatisfait." },
};

const BRANCH_LABELS = {
  Physique: "Corps & physicalité",
  Social: "Relations sociales",
  Intellectuel: "Capacités intellectuelles",
  Émotionnel: "Vie émotionnelle",
  Artistique: "Expression créative",
  Spirituel: "Quête de sens",
};

export function generateSuggestions({ traumaticEvents = [], links = [], limitingBeliefs = [] }) {
  const suggestions = [];
  let idc = 0;
  const nid = () => `sug-${++idc}`;

  const woundCount = {};
  traumaticEvents.forEach(e => { if (e.wound_type) woundCount[e.wound_type] = (woundCount[e.wound_type] || 0) + 1; });
  Object.entries(woundCount).forEach(([wound, count]) => {
    const events = traumaticEvents.filter(e => e.wound_type === wound);
    const ages = events.map(e => e.age).filter(a => a).join(", ");
    suggestions.push({
      id: nid(), category: "type_trauma",
      title: `Trauma de type « ${wound} »`,
      description: `${count} événement(s) de type « ${wound} »${ages ? ` survenu(s) vers ${ages} ans` : ""}. ${WOUND_DESC[wound] || ""}`,
      source_summary: events.map(e => e.title).join(" · "),
      journal_theme: "trauma",
      journal_tool: wound === "Abandon" ? "grounding" : "hypnose",
    });
  });

  if (links.length > 0) {
    const typeCount = {};
    links.forEach(l => { if (l.type) typeCount[l.type] = (typeCount[l.type] || 0) + 1; });
    const relSugs = [];
    Object.entries(typeCount).forEach(([type, count]) => {
      if (count >= 2) {
        const typed = links.filter(l => l.type === type);
        relSugs.push({
          id: nid(), category: "difficulte_relationnelle",
          title: `Pattern relationnel : ${type}s`,
          description: `${count} relations de type « ${type} » enregistrées, indiquant un schéma récurrent dans vos liens ${type.toLowerCase()}s.`,
          source_summary: typed.map(l => l.name).join(" · "),
          journal_theme: "relations", journal_tool: "amelioration",
        });
      }
    });
    if (relSugs.length === 0) {
      relSugs.push({
        id: nid(), category: "difficulte_relationnelle",
        title: "Relations douloureuses identifiées",
        description: `${links.length} relation(s) douloureuse(s) enregistrée(s). Prendre conscience de ces liens est une première étape vers la guérison relationnelle.`,
        source_summary: links.map(l => l.name).join(" · "),
        journal_theme: "relations", journal_tool: "hypnose",
      });
    }
    suggestions.push(...relSugs);
  }

  const emoCount = {};
  traumaticEvents.forEach(e => { if (e.emotion) emoCount[e.emotion] = (emoCount[e.emotion] || 0) + 1; });
  Object.entries(emoCount).forEach(([emotion, count]) => {
    const p = EMOTION_PATTERNS[emotion];
    if (p) suggestions.push({
      id: nid(), category: "probleme_comportemental",
      title: p.title,
      description: `${p.desc} (${count} occurrence(s) dans vos événements).`,
      source_summary: traumaticEvents.filter(e => e.emotion === emotion).map(e => e.title).join(" · "),
      journal_theme: "comportement",
      journal_tool: emotion === "Colère" ? "grounding" : "meditation",
    });
  });

  if (limitingBeliefs.length > 0) {
    const byBranch = {};
    limitingBeliefs.forEach(b => { (byBranch[b.branch] ||= []).push(b); });
    Object.entries(byBranch).forEach(([branch, beliefs]) => {
      if (beliefs.length >= 2) suggestions.push({
        id: nid(), category: "conflit_psychique",
        title: `Tension interne : ${branch}`,
        description: `Plusieurs croyances limitantes coexistent dans « ${branch} », indiquant un conflit entre différentes parts de vous.`,
        source_summary: beliefs.map(b => b.belief).join(" · "),
        journal_theme: "conflits", journal_tool: "meditation",
      });
    });
    limitingBeliefs.forEach(b => {
      if (b.origin && b.reframe) suggestions.push({
        id: nid(), category: "conflit_psychique",
        title: `Conflit entre origine et idéal`,
        description: `Une croyance issue de « ${b.origin} » est en tension avec votre idéal de la reformuler. Ce conflit entre passé et avenir mérite exploration.`,
        source_summary: b.belief,
        journal_theme: "conflits", journal_tool: "hypnose",
      });
    });
  }

  Object.entries(woundCount).forEach(([wound, count]) => {
    suggestions.push({
      id: nid(), category: "blessure_ame",
      title: `Blessure de l'âme : ${wound}`,
      description: `${WOUND_DESC[wound] || `La blessure de ${wound.toLowerCase()} est présente dans votre histoire.`} ${count} occurrence(s).`,
      source_summary: `${count} événement(s) de type ${wound}`,
      journal_theme: "trauma", journal_tool: "hypnose",
    });
  });

  if (limitingBeliefs.length > 0) {
    const groups = {};
    limitingBeliefs.forEach(b => { (groups[b.branch || "Autre"] ||= []).push(b); });
    Object.entries(groups).forEach(([branch, beliefs]) => {
      suggestions.push({
        id: nid(), category: "croyance_limitante",
        title: `Croyances : ${BRANCH_LABELS[branch] || branch}`,
        description: `${beliefs.length} croyance(s) limitante(s) dans « ${BRANCH_LABELS[branch] || branch} » : ${beliefs.map(b => b.belief).join(" ; ")}`,
        source_summary: beliefs.map(b => b.belief).join(" · "),
        journal_theme: "emotions", journal_tool: "amelioration",
      });
    });
  }

  return suggestions;
}

// ─── Aggregated data from clinical_tags ──────────────────
export function aggregateData({ traumaticEvents = [], links = [], limitingBeliefs = [] }) {
  const tagCount = {};
  const allItems = [...traumaticEvents, ...links, ...limitingBeliefs];
  allItems.forEach(item => {
    (item.clinical_tags || []).forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const byList = {};
  CLINICAL_LISTS.forEach(list => {
    const items = Object.entries(tagCount)
      .filter(([tag]) => tag.startsWith(`${list.id}:`))
      .map(([tag, count]) => {
        const itemId = tag.split(":")[1];
        const item = list.items.find(i => i.id === itemId);
        return { key: itemId, label: item?.label || itemId, count };
      })
      .sort((a, b) => b.count - a.count);
    if (items.length > 0) byList[list.id] = items;
  });

  return { byList, total: Object.values(tagCount).reduce((a, b) => a + b, 0) };
}

function hasTag(aggregated, listId, itemId) {
  return (aggregated?.byList?.[listId] || []).some(item => item.key === itemId);
}

// ─── Big Five cross-reference ────────────────────────────
export function crossReferenceBigFive({ bigFive, traumaticEvents = [], links = [], aggregated }) {
  const insights = [];
  if (!bigFive) return insights;

  const n = bigFive.nervosite ?? 0;
  const e = bigFive.extraversion ?? 0;
  const o = bigFive.ouverture ?? 0;
  const a = bigFive.agreabilite ?? 0;
  const c = bigFive.conscience ?? 0;

  const abandonCount = traumaticEvents.filter(ev => ev.wound_type === "Abandon").length;
  const rejetCount = traumaticEvents.filter(ev => ev.wound_type === "Rejet").length;
  const trahisonCount = traumaticEvents.filter(ev => ev.wound_type === "Trahison").length;

  const hasIsolement = hasTag(aggregated, "rel", "isolement_social");
  const hasDependance = hasTag(aggregated, "rel", "dependance_affective");
  const hasEvitement = hasTag(aggregated, "rel", "evitement_intimite") || hasTag(aggregated, "behavior", "evitement_chronique");
  const hasDiffConfiance = hasTag(aggregated, "rel", "difficulte_confiance");
  const hasPsychicConflicts = (aggregated?.byList?.conflict || []).length > 0;

  if (n >= 60 && abandonCount > 0) {
    insights.push({
      title: "Hypervigilance relationnelle",
      description: `Un score élevé en Nervosité (${n}/100) combiné à ${abandonCount} traumatisme(s) d'abandon suggère une hypervigilance dans vos relations : vous anticipez la séparation ou le rejet, ce qui peut vous amener à vous accrocher ou, au contraire, à fuir avant d'être abandonné.`,
      journal_theme: "relations", journal_tool: "grounding",
    });
  }
  if (n >= 60 && rejetCount > 0) {
    insights.push({
      title: "Peur du jugement social",
      description: `La combinaison d'une Nervosité élevée (${n}/100) et de ${rejetCount} blessure(s) de rejet indique une sensibilité accrue au regard des autres. Vous pouvez tendre à vous effacer ou, inversement, à surcompenser pour éviter le rejet.`,
      journal_theme: "emotions", journal_tool: "meditation",
    });
  }
  if (n >= 60 && trahisonCount > 0) {
    insights.push({
      title: "Difficulté de confiance",
      description: `Votre Nervosité (${n}/100) associée à ${trahisonCount} expérience(s) de trahison crée une méfiance de fond. Vous pouvez avoir du mal à vous engager pleinement, par peur d'être à nouveau trahi.`,
      journal_theme: "relations", journal_tool: "hypnose",
    });
  }
  if (e <= 40 && hasIsolement) {
    insights.push({
      title: "Retrait social",
      description: `Une Extraversion basse (${e}/100) couplée à des difficultés d'isolement suggère un pattern de retrait. Vous vous protégez en vous isolant, mais cela peut renforcer le sentiment de solitude.`,
      journal_theme: "relations", journal_tool: "grounding",
    });
  }
  if (a >= 65 && hasDependance) {
    insights.push({
      title: "Tendance au sacrifice de soi",
      description: `Une Agréabilité élevée (${a}/100) combinée à une dépendance affective indique que vous priorisez souvent les besoins des autres au détriment des vôtres. Cette recherche d'harmonie peut masquer une peur du conflit ou de l'abandon.`,
      journal_theme: "conflits", journal_tool: "amelioration",
    });
  }
  if (o <= 40 && hasEvitement) {
    insights.push({
      title: "Rigidité face à l'inconnu",
      description: `Une Ouverture basse (${o}/100) associée à des comportements d'évitement suggère une préférence pour le connu et le contrôlable. Vous évitez les situations nouvelles pour réduire l'anxiété, ce qui peut limiter votre croissance.`,
      journal_theme: "comportement", journal_tool: "amelioration",
    });
  }
  if (c >= 70 && hasPsychicConflicts) {
    insights.push({
      title: "Surcontrôle interne",
      description: `Une Conscience élevée (${c}/100) combinée à des conflits psychiques identifiés suggère une tendance au surcontrôle. Vous tentez de tout maîtriser intérieurement, ce qui génère des tensions entre vos différentes parts.`,
      journal_theme: "conflits", journal_tool: "meditation",
    });
  }
  if (n >= 60 && hasDiffConfiance && trahisonCount === 0) {
    insights.push({
      title: "Méfiance relationnelle de fond",
      description: `Votre Nervosité (${n}/100) associée à des difficultés de confiance (sans trahison identifiée) suggère une méfiance qui ne repose pas sur un événement précis. Cette anticipation du danger relationnel peut saboter vos liens.`,
      journal_theme: "relations", journal_tool: "hypnose",
    });
  }
  if (n >= 65 && insights.length === 0) {
    insights.push({
      title: "Anxiété de fond",
      description: `Votre score élevé en Nervosité (${n}/100) indique une tendance à l'anxiété généralisée. Sans traumatisme spécifique identifié, cette tension peut être liée à votre tempérament. Des pratiques d'ancrage peuvent aider à la réguler.`,
      journal_theme: "emotions", journal_tool: "grounding",
    });
  }

  return insights;
}

// ─── Belief synthesis by unmet needs ──────────────────────
export function synthesizeBeliefs({ limitingBeliefs = [] }) {
  const byNeed = {};
  limitingBeliefs.forEach(b => {
    const needTags = (b.clinical_tags || []).filter(t => t.startsWith("need:"));
    if (needTags.length === 0) {
      (byNeed["sans_need"] ||= []).push(b);
    } else {
      needTags.forEach(tag => {
        const itemId = tag.split(":")[1];
        (byNeed[itemId] ||= []).push(b);
      });
    }
  });

  const needList = CLINICAL_LISTS.find(l => l.id === "need");
  const themes = Object.entries(byNeed).map(([key, beliefs]) => ({
    key,
    label: key === "sans_need" ? "Sans besoin identifié" : (needList?.items.find(i => i.id === key)?.label || key),
    count: beliefs.length,
    beliefs,
  })).sort((a, b) => b.count - a.count);

  return {
    byTheme: themes,
    total: limitingBeliefs.length,
    interpretation: generateLifeInterpretation(themes),
  };
}

function generateLifeInterpretation(themes) {
  if (themes.length === 0) return "Aucune croyance limitante enregistrée pour l'instant.";

  const dominant = themes[0];
  if (dominant.key === "sans_need") {
    return "Vos croyances limitantes ne sont pas encore rattachées à des besoins fondamentaux. Qualifiez-les pour générer une interprétation de sens.";
  }

  const tied = themes.filter(t => t.count === dominant.count && t.key !== "sans_need");

  const interpretations = {
    securite: "Votre paysage intérieur est structuré autour de la recherche de sécurité : vous cherchez à vous protéger des menaces perçues, ce qui peut limiter votre capacité à vous engager dans l'inconnu.",
    appartenance: "Le besoin d'appartenance structure votre existence : vos croyances révèlent une quête de validation du groupe qui peut entraver votre autonomie émotionnelle.",
    reconnaissance: "Le besoin de reconnaissance est au centre de votre rapport au monde : vous cherchez constamment à prouver votre valeur, ce qui peut générer une dépendance au regard des autres.",
    autonomie: "L'autonomie est votre enjeu central : vous êtes tiraillé·e entre le désir d'indépendance et la peur de la solitude.",
    etre_vu_entendu: "Le besoin d'être vu et entendu est au cœur de vos questionnements : vous interrogez constamment votre légitimité à exister pleinement.",
    justice: "Le besoin de justice structure votre vision du monde : vous êtes particulièrement sensible aux iniquités, ce qui peut générer de la rigidité face à l'autorité.",
    stabilite: "Le besoin de stabilité est au centre de votre existence : vous cherchez à sécuriser votre environnement pour réduire l'anxiété de l'imprévu.",
    controle: "Le contrôle est au centre de votre rapport au monde : vous cherchez à maîtriser votre environnement pour éviter l'imprévu, ce qui peut générer de la rigidité.",
    affection: "Le besoin d'affection structure votre existence : vos croyances révèlent une quête de chaleur humaine qui peut entraver votre autonomie émotionnelle.",
    valorisation: "Le besoin de valorisation est au cœur de vos questionnements : vous doutez de votre propre valeur et cherchez constamment des preuves extérieures de votre mérite.",
  };

  if (tied.length > 1) {
    const labels = tied.map(t => t.label).join(", ");
    return `Plusieurs besoins se partagent votre paysage intérieur (${labels}). ${interpretations[dominant.key] || ""}`;
  }

  return interpretations[dominant.key] || "Vos croyances limitantes révèlent des besoins profonds à explorer.";
}