import { CLINICAL_LISTS, getTagLabel, getTagDescription, getListLabel } from "@/lib/clinicalCategories";

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

export const JOURNAL_THEMES = {
  emotions: { label: "Émotion", icon: "🧠" },
  wound: { label: "Blessure de l'âme", icon: "💔" },
  trauma: { label: "Traumatisme", icon: "❤️" },
  conflits: { label: "Conflit psychique", icon: "✨" },
  relations: { label: "Relation", icon: "👥" },
  comportement: { label: "Comportement", icon: "📈" },
  sens: { label: "Sens de vie", icon: "☀️" },
};

export const LIST_JOURNAL_RECOMMENDATIONS = {
  trauma: { theme: "trauma", tool: "grounding" },
  rel: { theme: "relations", tool: "amelioration" },
  conflict: { theme: "conflits", tool: "meditation" },
  behavior: { theme: "comportement", tool: "amelioration" },
  wound: { theme: "trauma", tool: "hypnose" },
  need: { theme: "emotions", tool: "amelioration" },
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

function tagCount(aggregated, listId, itemId) {
  const items = aggregated?.byList?.[listId] || [];
  return items.find(i => i.key === itemId)?.count || 0;
}

function getAllTopTags(aggregated) {
  const all = [];
  Object.entries(aggregated?.byList || {}).forEach(([listId, items]) => {
    items.forEach(item => all.push({ ...item, listId }));
  });
  return all.sort((a, b) => b.count - a.count);
}

// ─── Big Five cross-reference (dynamic) ──────────────────
export function crossReferenceBigFive({ bigFive, traumaticEvents = [], links = [], aggregated }) {
  const insights = [];
  if (!bigFive) return insights;

  const n = bigFive.nervosite ?? 0;
  const e = bigFive.extraversion ?? 0;
  const o = bigFive.ouverture ?? 0;
  const a = bigFive.agreabilite ?? 0;
  const c = bigFive.conscience ?? 0;

  const abandonWoundCount = traumaticEvents.filter(ev => ev.wound_type === "Abandon").length;
  const rejetWoundCount = traumaticEvents.filter(ev => ev.wound_type === "Rejet").length;
  const trahisonWoundCount = traumaticEvents.filter(ev => ev.wound_type === "Trahison").length;

  const peurAbandonCount = tagCount(aggregated, "rel", "peur_abandon");
  const negligenceCount = tagCount(aggregated, "trauma", "negligence_emotionnelle");
  const isolementCount = tagCount(aggregated, "rel", "isolement_social");
  const dependanceCount = tagCount(aggregated, "rel", "dependance_affective");
  const evitementCount = tagCount(aggregated, "rel", "evitement_intimite") + tagCount(aggregated, "behavior", "evitement_chronique");
  const diffConfianceCount = tagCount(aggregated, "rel", "difficulte_confiance");
  const videCount = tagCount(aggregated, "conflict", "vide_existentiel");
  const perfectionnismeCount = tagCount(aggregated, "behavior", "perfectionnisme_paralysant") + tagCount(aggregated, "conflict", "perfectionnisme_interieur");
  const hasPsychicConflicts = (aggregated?.byList?.conflict || []).length > 0;

  // Nervosité + peur de l'abandon (clinical tag)
  if (n >= 55 && peurAbandonCount > 0) {
    insights.push({
      title: "Hypervigilance d'attachement",
      description: `Votre Nervosité (${n}/100) combinée à ${peurAbandonCount} occurrence(s) de « peur de l'abandon » suggère une hypervigilance d'attachement : vous êtes en alerte constante face aux signaux de retrait ou de distance de l'autre, ce qui peut vous amener à vous accrocher ou à anticiper la séparation.`,
      journal_theme: "relations", journal_tool: "grounding",
    });
  }

  // Nervosité + négligence émotionnelle
  if (n >= 55 && negligenceCount > 0) {
    insights.push({
      title: "Blessure d'attachement précoce",
      description: `Votre Nervosité (${n}/100) associée à ${negligenceCount} expérience(s) de négligence émotionnelle suggère une blessure d'attachement : le manque de réconfort et d'attention affective dans votre histoire a pu créer un besoin insatiable de validation et de présence.`,
      journal_theme: "trauma", journal_tool: "hypnose",
    });
  }

  // Nervosité + peur de l'abandon + négligence émotionnelle → pattern d'attachement insécure
  if (n >= 55 && peurAbandonCount > 0 && negligenceCount > 0) {
    insights.push({
      title: "Pattern d'attachement insécure",
      description: `La combinaison d'une Nervosité élevée (${n}/100), de la peur de l'abandon et de négligence émotionnelle dessine un pattern d'attachement insécure : vos relations sont probablement marquées par une alternance entre le besoin de proximité et la peur de l'engagement, avec une sensibilité exacerbée aux signes de rejet.`,
      journal_theme: "relations", journal_tool: "hypnose",
    });
  }

  // Nervosité + wound_type Abandon (from entity)
  if (n >= 60 && abandonWoundCount > 0) {
    insights.push({
      title: "Hypervigilance relationnelle",
      description: `Un score élevé en Nervosité (${n}/100) combiné à ${abandonWoundCount} traumatisme(s) d'abandon suggère une hypervigilance dans vos relations : vous anticipez la séparation ou le rejet, ce qui peut vous amener à vous accrocher ou, au contraire, à fuir avant d'être abandonné.`,
      journal_theme: "relations", journal_tool: "grounding",
    });
  }

  // Nervosité + wound_type Rejet
  if (n >= 60 && rejetWoundCount > 0) {
    insights.push({
      title: "Peur du jugement social",
      description: `La combinaison d'une Nervosité élevée (${n}/100) et de ${rejetWoundCount} blessure(s) de rejet indique une sensibilité accrue au regard des autres. Vous pouvez tendre à vous effacer ou, inversement, à surcompenser pour éviter le rejet.`,
      journal_theme: "emotions", journal_tool: "meditation",
    });
  }

  // Nervosité + wound_type Trahison
  if (n >= 60 && trahisonWoundCount > 0) {
    insights.push({
      title: "Difficulté de confiance",
      description: `Votre Nervosité (${n}/100) associée à ${trahisonWoundCount} expérience(s) de trahison crée une méfiance de fond. Vous pouvez avoir du mal à vous engager pleinement, par peur d'être à nouveau trahi.`,
      journal_theme: "relations", journal_tool: "hypnose",
    });
  }

  // Nervosité + vide existentiel → angoisse existentielle
  if (n >= 55 && videCount > 0) {
    insights.push({
      title: "Angoisse existentielle",
      description: `Votre Nervosité (${n}/100) associée à ${videCount} occurrence(s) de sentiment de vide existentiel suggère une angoisse de fond : le manque de sens perçu alimente votre tension interne, et votre hypervigilance empêche de relâcher le contrôle pour explorer ce vide.`,
      journal_theme: "sens", journal_tool: "meditation",
    });
  }

  // Extraversion basse + isolement social
  if (e <= 40 && isolementCount > 0) {
    insights.push({
      title: "Retrait social",
      description: `Une Extraversion basse (${e}/100) couplée à ${isolementCount} difficulté(s) d'isolement social suggère un pattern de retrait. Vous vous protégez en vous isolant, mais cela peut renforcer le sentiment de solitude.`,
      journal_theme: "relations", journal_tool: "grounding",
    });
  }

  // Agréabilité élevée + dépendance affective
  if (a >= 65 && dependanceCount > 0) {
    insights.push({
      title: "Tendance au sacrifice de soi",
      description: `Une Agréabilité élevée (${a}/100) combinée à ${dependanceCount} occurrence(s) de dépendance affective indique que vous priorisez souvent les besoins des autres au détriment des vôtres. Cette recherche d'harmonie peut masquer une peur du conflit ou de l'abandon.`,
      journal_theme: "conflits", journal_tool: "amelioration",
    });
  }

  // Agréabilité élevée + difficulté à poser des limites
  if (a >= 65 && hasTag(aggregated, "rel", "difficulte_limites")) {
    insights.push({
      title: "Effacement de soi",
      description: `Votre Agréabilité (${a}/100) associée à une difficulté à poser des limites suggère un pattern d'effacement : vous avez du mal à dire non et à protéger votre espace, ce qui vous expose à l'épuisement et au ressentiment.`,
      journal_theme: "conflits", journal_tool: "amelioration",
    });
  }

  // Ouverture basse + évitement
  if (o <= 40 && evitementCount > 0) {
    insights.push({
      title: "Rigidité face à l'inconnu",
      description: `Une Ouverture basse (${o}/100) associée à ${evitementCount} comportement(s) d'évitement suggère une préférence pour le connu et le contrôlable. Vous évitez les situations nouvelles pour réduire l'anxiété, ce qui peut limiter votre croissance.`,
      journal_theme: "comportement", journal_tool: "amelioration",
    });
  }

  // Conscience élevée + conflits psychiques ou perfectionnisme
  if (c >= 70 && (hasPsychicConflicts || perfectionnismeCount > 0)) {
    const detail = perfectionnismeCount > 0 ? `${perfectionnismeCount} occurrence(s) de perfectionnisme` : "des conflits psychiques identifiés";
    insights.push({
      title: "Surcontrôle interne",
      description: `Une Conscience élevée (${c}/100) combinée à ${detail} suggère une tendance au surcontrôle. Vous tentez de tout maîtriser intérieurement, ce qui génère des tensions entre vos différentes parts et une difficulté à lâcher prise.`,
      journal_theme: "conflits", journal_tool: "meditation",
    });
  }

  // Nervosité + difficulté de confiance (sans trahison)
  if (n >= 60 && diffConfianceCount > 0 && trahisonWoundCount === 0) {
    insights.push({
      title: "Méfiance relationnelle de fond",
      description: `Votre Nervosité (${n}/100) associée à ${diffConfianceCount} difficulté(s) de confiance (sans trahison identifiée) suggère une méfiance qui ne repose pas sur un événement précis. Cette anticipation du danger relationnel peut saboter vos liens.`,
      journal_theme: "relations", journal_tool: "hypnose",
    });
  }

  // Dynamic fallback: generate insight from actual data even without hardcoded pattern
  if (insights.length === 0) {
    const allTags = getAllTopTags(aggregated);
    if (allTags.length > 0) {
      const topTag = allTags[0];
      const traitDesc = n >= 60 ? `une Nervosité élevée (${n}/100)`
        : e <= 40 ? `une Extraversion basse (${e}/100)`
        : o <= 40 ? `une Ouverture basse (${o}/100)`
        : a >= 65 ? `une Agréabilité élevée (${a}/100)`
        : c >= 70 ? `une Conscience élevée (${c}/100)`
        : null;

      if (traitDesc) {
        insights.push({
          title: "Croisement personnalité / expériences",
          description: `${traitDesc} combinée à la récurrence de « ${topTag.label} » (${topTag.count} occurrence(s)) suggère que ce thème occupe une place importante dans votre fonctionnement psychologique. Votre tempérament amplifie la résonance de cette expérience dans votre vie intérieure.`,
          journal_theme: "emotions", journal_tool: "meditation",
        });
      }
    }
  }

  // Anxiété de fond (no specific data but high nervosity)
  if (insights.length === 0 && n >= 65) {
    insights.push({
      title: "Anxiété de fond",
      description: `Votre score élevé en Nervosité (${n}/100) indique une tendance à l'anxiété généralisée. Sans thème spécifique identifié dans vos données, cette tension peut être liée à votre tempérament. Des pratiques d'ancrage peuvent aider à la réguler.`,
      journal_theme: "emotions", journal_tool: "grounding",
    });
  }

  return insights;
}

// ─── Belief synthesis by all clinical tags ───────────────
export function synthesizeBeliefs({ limitingBeliefs = [] }) {
  if (limitingBeliefs.length === 0) {
    return { byTheme: [], total: 0, interpretation: "Aucune croyance limitante enregistrée pour l'instant." };
  }

  const tagCount = {};
  limitingBeliefs.forEach(b => {
    (b.clinical_tags || []).forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const themes = Object.entries(tagCount)
    .map(([tag, count]) => {
      const [listId, itemId] = tag.split(":");
      const list = CLINICAL_LISTS.find(l => l.id === listId);
      const item = list?.items.find(i => i.id === itemId);
      return {
        key: tag,
        listId,
        label: item?.label || itemId,
        count,
        beliefs: limitingBeliefs.filter(b => (b.clinical_tags || []).includes(tag)),
      };
    })
    .sort((a, b) => b.count - a.count);

  return {
    byTheme: themes,
    total: limitingBeliefs.length,
    interpretation: generateBeliefInterpretation(themes, limitingBeliefs),
  };
}

function generateBeliefInterpretation(tags, beliefs) {
  if (tags.length === 0) {
    return `Vous avez enregistré ${beliefs.length} croyance(s) limitante(s) sans thématique clinique associée. Qualifiez vos croyances avec les catégories cliniques pour générer une synthèse de sens.`;
  }

  const top = tags[0];
  const listId = top.listId;

  const interpretations = {
    need: `vos croyances révèlent un besoin non comblé dominant — « ${top.label} » (${top.count} occurrence(s)) — qui structure votre quête de sens. Vous cherchez activement à combler ce que vous percevez comme manquant, et cette recherche oriente vos choix et votre vision du monde.`,
    wound: `la blessure de l'âme « ${top.label} » (${top.count} occurrence(s)) traverse vos croyances, révélant une peur centrale qui filtre votre rapport au monde. Votre sens de la vie semble se construire autour de la gestion de cette blessure.`,
    conflict: `le conflit psychique « ${top.label} » (${top.count} occurrence(s)) domine vos croyances, indiquant une tension interne récurrente. Votre vision du monde se construit dans la négociation entre des forces contradictoires qui cohabitent en vous.`,
    behavior: `le comportement « ${top.label} » (${top.count} occurrence(s)) apparaît comme un pattern d'adaptation récurrent. Vous avez développé des stratégies de protection qui, si elles vous aidaient à survivre, sont devenues des limites à votre épanouissement.`,
    rel: `la difficulté relationnelle « ${top.label} » (${top.count} occurrence(s)) structure vos croyances, révélant un schéma relationnel qui filtre votre vision des autres. Votre sens de la vie se joue dans la qualité de vos liens et la peur de les perdre.`,
    trauma: `le traumatisme « ${top.label} » (${top.count} occurrence(s)) infiltre vos croyances, suggérant qu'un événement non résolu continue de façonner votre interprétation du présent. Votre vision du monde est colorée par cette expérience fondatrice.`,
  };

  let text = `À travers vos ${beliefs.length} croyance(s) limitante(s), ${interpretations[listId] || `le thème « ${top.label} » (${top.count} occurrence(s)) occupe une place centrale dans votre vision du monde.`}`;

  if (tags[1]) {
    const second = tags[1];
    text += ` Ce pattern se combine avec « ${second.label} » (${second.count} occurrence(s)), renforçant la complexité de votre paysage intérieur.`;
  }

  text += " Transformer ces croyances fondatrices est un levier puissant pour redéfinir le sens que vous donnez à votre existence.";

  return text;
}