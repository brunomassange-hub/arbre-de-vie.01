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

  // 1. Type de trauma
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

  // 2. Difficultés relationnelles
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

  // 3. Problèmes comportementaux
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

  // 4. Conflits psychiques
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

  // 5. Blessure de l'âme
  Object.entries(woundCount).forEach(([wound, count]) => {
    suggestions.push({
      id: nid(), category: "blessure_ame",
      title: `Blessure de l'âme : ${wound}`,
      description: `${WOUND_DESC[wound] || `La blessure de ${wound.toLowerCase()} est présente dans votre histoire.`} ${count} occurrence(s).`,
      source_summary: `${count} événement(s) de type ${wound}`,
      journal_theme: "trauma", journal_tool: "hypnose",
    });
  });

  // 6. Croyances limitantes regroupées
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

// ─── Label maps for qualification fields ─────────────────
export const TRAUMA_TYPE_LABELS = {
  agression: "Agression",
  viol: "Viol",
  vol: "Vol",
  traumatisme_precoce: "Traumatisme précoce",
  separation: "Séparation",
  negligence: "Négligence",
  violence: "Violence",
  autre: "Autre",
};

export const REL_DIFFICULTY_LABELS = {
  peur_engagement: "Peur de l'engagement",
  isolement: "Isolement",
  agressivite: "Agressivité",
  difficulte_confiance: "Difficulté de confiance",
  dependance_affective: "Dépendance affective",
  evitement: "Évitement",
  autre: "Autre",
};

export const THEME_TAG_LABELS = {
  valeur_personnelle: "Valeur personnelle",
  securite: "Sécurité",
  amour: "Amour",
  controle: "Contrôle",
  confiance: "Confiance",
  autre: "Autre",
};

// ─── Aggregated data view ────────────────────────────────
export function aggregateData({ traumaticEvents = [], links = [] }) {
  const traumaTypeCount = {};
  const relDifficultyCount = {};
  let psychicConflictsCount = 0;
  let problematicBehaviorsCount = 0;

  const allItems = [...traumaticEvents, ...links];
  allItems.forEach(item => {
    (item.trauma_types || []).forEach(t => { traumaTypeCount[t] = (traumaTypeCount[t] || 0) + 1; });
    (item.relational_difficulties || []).forEach(d => { relDifficultyCount[d] = (relDifficultyCount[d] || 0) + 1; });
    if (item.psychic_conflicts) psychicConflictsCount++;
    if (item.problematic_behaviors) problematicBehaviorsCount++;
  });

  return {
    traumaTypes: Object.entries(traumaTypeCount).map(([key, count]) => ({ key, label: TRAUMA_TYPE_LABELS[key] || key, count })).sort((a, b) => b.count - a.count),
    relDifficulties: Object.entries(relDifficultyCount).map(([key, count]) => ({ key, label: REL_DIFFICULTY_LABELS[key] || key, count })).sort((a, b) => b.count - a.count),
    psychicConflicts: psychicConflictsCount,
    problematicBehaviors: problematicBehaviorsCount,
  };
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
  const relDiffs = aggregated?.relDifficulties || [];
  const hasIsolement = relDiffs.some(d => d.key === "isolement");
  const hasDependance = relDiffs.some(d => d.key === "dependance_affective");
  const hasEvitement = relDiffs.some(d => d.key === "evitement");
  const hasDiffConfiance = relDiffs.some(d => d.key === "difficulte_confiance");

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
  if (c >= 70 && aggregated?.psychicConflicts > 0) {
    insights.push({
      title: "Surcontrôle interne",
      description: `Une Conscience élevée (${c}/100) combinée à ${aggregated.psychicConflicts} conflit(s) psychique(s) suggère une tendance au surcontrôle. Vous tentez de tout maîtriser intérieurement, ce qui génère des tensions entre vos différentes parts.`,
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

// ─── Belief synthesis by theme ───────────────────────────
export function synthesizeBeliefs({ limitingBeliefs = [] }) {
  const byTheme = {};
  limitingBeliefs.forEach(b => {
    const tag = b.theme_tag || "sans_theme";
    (byTheme[tag] ||= []).push(b);
  });

  const themes = Object.entries(byTheme).map(([key, beliefs]) => ({
    key,
    label: THEME_TAG_LABELS[key] || "Sans thème",
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
  const tied = themes.filter(t => t.count === dominant.count);

  const interpretations = {
    securite: "Votre paysage intérieur est structuré autour de la recherche de sécurité : vous cherchez à vous protéger des menaces perçues, ce qui peut limiter votre capacité à vous engager dans l'inconnu.",
    amour: "Le besoin d'amour et de connexion structure votre existence : vos croyances révèlent une quête de validation qui peut entraver votre autonomie émotionnelle.",
    controle: "Le contrôle est au centre de votre rapport au monde : vous cherchez à maîtriser votre environnement pour éviter l'imprévu, ce qui peut générer de la rigidité.",
    confiance: "La confiance — en vous et en les autres — est votre enjeu central : vos croyances révèlent une fragilité dans votre capacité à vous fier, entravant votre ouverture.",
    valeur_personnelle: "Votre valeur personnelle est au cœur de vos questionnements : vous interrogez constamment votre légitimité et votre droit d'exister pleinement.",
    autre: "Vos croyances limitantes touchent à des dimensions variées de votre existence.",
    sans_theme: "Vos croyances limitantes ne sont pas encore thématiquement catégorisées.",
  };

  if (tied.length > 1) {
    const labels = tied.map(t => t.label).join(", ");
    return `Plusieurs thèmes se partagent votre paysage intérieur (${labels}). ${interpretations[dominant.key] || ""}`;
  }

  return interpretations[dominant.key] || interpretations.autre;
}