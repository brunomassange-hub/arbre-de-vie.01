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