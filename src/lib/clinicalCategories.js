export const CLINICAL_LISTS = [
  {
    id: "trauma",
    label: "Types de traumatisme",
    items: [
      { id: "agression_physique", label: "Agression physique", description: "Subir une violence physique directe (coups, attaque)." },
      { id: "agression_sexuelle", label: "Agression sexuelle", description: "Subir un contact ou une contrainte sexuelle non consentie." },
      { id: "viol", label: "Viol", description: "Subir un rapport sexuel imposé par la force ou la menace." },
      { id: "vol_cambriolage", label: "Vol / Cambriolage", description: "Être victime d'un vol avec effraction ou d'une intrusion à domicile." },
      { id: "accident_grave", label: "Accident grave", description: "Vivre un accident (route, travail) avec risque vital." },
      { id: "traumatisme_precoce", label: "Traumatisme précoce (avant 6 ans)", description: "Vivre un événement traumatique avant l'âge de 6 ans." },
      { id: "separation_parentale", label: "Séparation parentale", description: "Vivre la séparation ou le divorce des parents dans l'enfance." },
      { id: "negligence_emotionnelle", label: "Négligence émotionnelle", description: "Ne pas recevoir d'attention affective, de chaleur ou de réconfort." },
      { id: "negligence_physique", label: "Négligence physique", description: "Ne pas recevoir de soins de base (nourriture, hygiène, sécurité)." },
      { id: "violence_physique", label: "Violence physique", description: "Subir des violences physiques répétées (famille, proche)." },
      { id: "violence_psychologique", label: "Violence psychologique", description: "Subir de la manipulation, du chantage affectif, de l'emprise psychique." },
      { id: "violence_verbale", label: "Violence verbale", description: "Subir des cris, insultes, humiliations verbales répétées." },
      { id: "abandon", label: "Abandon", description: "Être laissé·e seul·e, rejeté·e par une figure d'attachement." },
      { id: "humiliation_publique", label: "Humiliation publique", description: "Être ridiculisé·e ou rabaissé·e devant autrui." },
      { id: "trahison", label: "Trahison", description: "Voir une confiance trahie, un engagement non respecté." },
      { id: "deuil_proche", label: "Deuil d'un proche", description: "Perdre un proche (famille, ami) par décès." },
      { id: "deuil_animal", label: "Deuil d'un animal", description: "Perdre un animal de compagnie." },
      { id: "maladie_soi", label: "Maladie grave (soi-même)", description: "Vivre une maladie grave menaçant le pronostic vital." },
      { id: "maladie_proche", label: "Maladie grave (proche)", description: "Vivre la maladie grave d'un proche." },
      { id: "harcelement_scolaire", label: "Harcèlement scolaire", description: "Subir du harcèlement (brimades, isolement) à l'école." },
      { id: "harcelement_travail", label: "Harcèlement au travail", description: "Subir du harcèlement moral ou sexuel au travail." },
      { id: "discrimination", label: "Discrimination", description: "Être discriminé·e (origine, genre, orientation, handicap)." },
      { id: "exclusion_sociale", label: "Exclusion sociale", description: "Être rejeté·e, exclu·e d'un groupe social." },
      { id: "echec_majeur", label: "Échec majeur (scolaire/professionnel)", description: "Vivre un échec important vécu comme traumatique." },
      { id: "rupture_amoureuse", label: "Rupture amoureuse difficile", description: "Vivre une rupture amoureuse vécue comme traumatique." },
      { id: "violence_domestique", label: "Exposition à la violence domestique", description: "Être exposé·e à la violence entre adultes au foyer." },
      { id: "migration_deracinement", label: "Migration / Déracinement", description: "Vivre un déracinement, une migration forcée ou choisie." },
      { id: "catastrophe_naturelle", label: "Catastrophe naturelle", description: "Vivre une catastrophe naturelle (séisme, inondation)." },
      { id: "temoin_violence", label: "Témoin de violence", description: "Assister à des actes de violence sans pouvoir intervenir." },
      { id: "hospitalisation_traumatique", label: "Hospitalisation traumatique", description: "Vivre une hospitalisation vécue comme effrayante ou abandonnante." },
    ]
  },
  {
    id: "rel",
    label: "Difficultés relationnelles",
    items: [
      { id: "peur_engagement", label: "Peur de l'engagement", description: "Difficulté à s'engager durablement par peur de l'enfermement." },
      { id: "peur_abandon", label: "Peur de l'abandon", description: "Craindre constamment d'être quitté·e ou laissé·e seul·e." },
      { id: "isolement_social", label: "Isolement social", description: "Tendance à se couper des relations et à s'isoler." },
      { id: "agressivite_relationnelle", label: "Agressivité relationnelle", description: "Réagir par l'hostilité dans les relations." },
      { id: "difficulte_confiance", label: "Difficulté à faire confiance", description: "Avoir du mal à accorder sa confiance à autrui." },
      { id: "dependance_affective", label: "Dépendance affective", description: "Besoin excessif de l'autre pour se sentir exister." },
      { id: "evitement_intimite", label: "Évitement de l'intimité", description: "Fuir la proximité émotionnelle et l'intimité." },
      { id: "besoin_controle", label: "Besoin de contrôle", description: "Chercher à contrôler la relation par peur de l'imprévu." },
      { id: "fusion_excessive", label: "Fusion excessive avec l'autre", description: "Se fondre dans l'autre au point de perdre son identité." },
      { id: "difficulte_limites", label: "Difficulté à poser des limites", description: "Ne pas savoir dire non ni poser des limites saines." },
      { id: "sur_adaptation", label: "Sur-adaptation aux besoins d'autrui", description: "S'adapter excessivement aux besoins de l'autre en s'oubliant." },
      { id: "jalousie_excessive", label: "Jalousie excessive", description: "Ressentir une jalousie envahissante et possessive." },
      { id: "difficulte_recevoir_aide", label: "Difficulté à recevoir de l'aide", description: "Refuser ou craindre de recevoir du soutien." },
      { id: "difficulte_exprimer_besoins", label: "Difficulté à exprimer ses besoins", description: "Ne pas savoir identifier ni exprimer ses besoins." },
      { id: "peur_conflit", label: "Peur du conflit", description: "Éviter à tout prix les conflits, même au prix de soi." },
      { id: "recherche_approbation", label: "Recherche compulsive d'approbation", description: "Chercher compulsivement l'approbation et la validation d'autrui." },
      { id: "instabilite_relationnelle", label: "Instabilité relationnelle", description: "Relations marquées par des ruptures et retours fréquents." },
      { id: "attachement_anxieux", label: "Attachement anxieux", description: "Vivre l'attachement dans l'angoisse de la séparation." },
      { id: "attachement_evitant", label: "Attachement évitant", description: "Privilégier l'autonomie et fuir la dépendance affective." },
      { id: "triangulation", label: "Triangulation relationnelle", description: "Impliquer un tiers pour réguler une relation dyadique." },
      { id: "difficulte_rompre_liens", label: "Difficulté à rompre des liens toxiques", description: "Rester dans des relations toxiques par incapacité à partir." },
    ]
  },
  {
    id: "conflict",
    label: "Conflits psychiques",
    items: [
      { id: "culpabilite_chronique", label: "Culpabilité chronique", description: "Sentiment de culpabilité permanent et envahissant." },
      { id: "honte_profonde", label: "Honte profonde", description: "Porter un sentiment de honte viscérale sur soi-même." },
      { id: "ambivalence_affective", label: "Ambivalence affective", description: "Ressentir simultanément amour et haine pour une même personne." },
      { id: "dissonance_valeurs_actions", label: "Dissonance entre valeurs et actions", description: "Vivre un décalage entre ses valeurs et ses actes." },
      { id: "sentiment_imposture", label: "Sentiment d'imposture", description: "Craindre d'être démasqué·e comme un·e imposteur·euse." },
      { id: "conflit_loyaute_besoins", label: "Conflit loyauté familiale / besoins propres", description: "Être tiraillé·e entre loyauté familiale et besoins propres." },
      { id: "conflit_desir_devoir", label: "Conflit désir / devoir", description: "Vivre un conflit entre ce qu'on désire et ce qu'on doit faire." },
      { id: "devalorisation_soi", label: "Dévalorisation de soi", description: "Se dévaloriser constamment, se sentir inférieur·e." },
      { id: "idealisation_devaluation", label: "Idéalisation / dévaluation alternée", description: "Alterner entre idéalisations et dévalorisations de soi ou d'autrui." },
      { id: "deni", label: "Déni", description: "Refuser de reconnaître une réalité douloureuse." },
      { id: "clivage", label: "Clivage (tout bon / tout mauvais)", description: "Penser en tout bon / tout mauvais sans nuances." },
      { id: "rumination_mentale", label: "Rumination mentale", description: "Ressasser en boucle des pensées anxieuses ou douloureuses." },
      { id: "autocritique_severe", label: "Autocritique sévère", description: "Se juger sévèrement et constamment." },
      { id: "perfectionnisme_interieur", label: "Perfectionnisme intérieur", description: "Poursuivre un idéal de perfection intérieur oppressant." },
      { id: "vide_existentiel", label: "Sentiment de vide existentiel", description: "Ressentir un vide intérieur, un manque de sens." },
      { id: "conflit_autonomie_securite", label: "Conflit entre autonomie et besoin de sécurité", description: "Être tiraillé·e entre besoin d'autonomie et besoin de sécurité." },
      { id: "alexithymie", label: "Alexithymie", description: "Difficulté à identifier et nommer ses émotions." },
      { id: "dissociation_legere", label: "Dissociation légère", description: "Moments de déconnexion par rapport à soi ou à la réalité." },
      { id: "hypervigilance_emotionnelle", label: "Hypervigilance émotionnelle", description: "Être en alerte émotionnelle constante, guettant les signaux de menace." },
    ]
  },
  {
    id: "behavior",
    label: "Comportements problématiques",
    items: [
      { id: "addiction_substances", label: "Addiction (substances)", description: "Dépendance à une substance (alcool, drogues, médicaments)." },
      { id: "addiction_comportementale", label: "Addiction comportementale", description: "Dépendance à un comportement (écrans, jeux, achats)." },
      { id: "evitement_chronique", label: "Évitement chronique", description: "Éviter systématiquement les situations anxiogènes." },
      { id: "procrastination", label: "Procrastination", description: "Reporter constamment des tâches importantes." },
      { id: "perfectionnisme_paralysant", label: "Perfectionnisme paralysant", description: "Chercher la perfection au point de ne plus avancer." },
      { id: "hypervigilance", label: "Hypervigilance", description: "Être constamment en alerte, guettant le danger." },
      { id: "repli_soi", label: "Repli sur soi", description: "Se retirer des relations et activités sociales." },
      { id: "agressivite_passive", label: "Agressivité passive", description: "Exprimer son hostilité de manière indirecte." },
      { id: "agressivite_directe", label: "Agressivité directe", description: "Réagir par des actes ou paroles agressifs directs." },
      { id: "automutilation", label: "Automutilation", description: "Se faire du mal physiquement pour réguler une douleur émotionnelle." },
      { id: "troubles_comportement_alimentaire", label: "Troubles du comportement alimentaire", description: "Comportements alimentaires perturbés (restrictions, compulsions)." },
      { id: "workaholisme", label: "Surinvestissement au travail (workaholisme)", description: "Surinvestir le travail pour fuir d'autres aspects de sa vie." },
      { id: "fuite_hyperactivite", label: "Fuite dans l'hyperactivité", description: "Se noyer dans l'hyperactivité pour éviter de ressentir." },
      { id: "mensonge_compulsif", label: "Mensonge compulsif", description: "Mentir de façon répétée et incontrôlable." },
      { id: "besoin_plaire", label: "Besoin de plaire compulsif", description: "Chercher compulsivement à plaire à tout le monde." },
      { id: "auto_sabotage", label: "Auto-sabotage", description: "Se saboter dans ses réussites." },
      { id: "procrastination_emotionnelle", label: "Procrastination émotionnelle", description: "Éviter de ressentir ou d'exprimer ses émotions." },
      { id: "isolement_volontaire", label: "Isolement volontaire", description: "Choisir de s'isoler activement des autres." },
      { id: "comportements_risque", label: "Comportements à risque", description: "Pratiquer des comportements à risque (vitesse, défis)." },
      { id: "difficulte_demander_aide", label: "Difficulté à demander de l'aide", description: "Incapacité ou refus de demander de l'aide." },
    ]
  },
  {
    id: "wound",
    label: "Blessures de l'âme",
    items: [
      { id: "rejet", label: "Rejet", description: "Peur de ne pas être aimé·e pour soi-même." },
      { id: "abandon", label: "Abandon", description: "Peur d'être seul·e, laissé·e." },
      { id: "humiliation", label: "Humiliation", description: "Peur d'être jugé·e, ridiculisé·e." },
      { id: "trahison", label: "Trahison", description: "Peur qu'on ne tienne pas ses engagements." },
      { id: "injustice", label: "Injustice", description: "Peur d'être traité·e de façon inéquitable, rigidité." },
    ]
  },
  {
    id: "need",
    label: "Besoins fondamentaux (Maslow)",
    items: [
      { id: "physiologique", label: "Physiologique", description: "Respiration, sommeil, nourriture, survie" },
      { id: "securite", label: "Sécurité", description: "Stabilité, protection, ancrage matériel" },
      { id: "appartenance", label: "Appartenance", description: "Connexion, amour, lien social" },
      { id: "estime", label: "Estime", description: "Valeur personnelle, confiance, reconnaissance" },
      { id: "accomplissement", label: "Accomplissement", description: "Sens, créativité, réalisation de soi" },
    ]
  },
];

const ALL_ITEMS = CLINICAL_LISTS.flatMap(list =>
  list.items.map(item => ({ ...item, listId: list.id, fullId: `${list.id}:${item.id}` }))
);

export function getTagLabel(fullId) {
  const item = ALL_ITEMS.find(i => i.fullId === fullId);
  return item?.label || fullId;
}

export function getTagDescription(fullId) {
  const item = ALL_ITEMS.find(i => i.fullId === fullId);
  return item?.description || "";
}

export function getListLabel(listId) {
  return CLINICAL_LISTS.find(l => l.id === listId)?.label || listId;
}

const NEED_MIGRATION = {
  securite: "securite",
  stabilite: "securite",
  controle: "securite",
  justice: "securite",
  appartenance: "appartenance",
  affection: "appartenance",
  reconnaissance: "estime",
  valorisation: "estime",
  etre_vu_entendu: "estime",
  autonomie: "accomplissement",
};

export function migrateNeedTags(tags = []) {
  const seen = new Set();
  return (tags || []).map(tag => {
    if (!tag.startsWith("need:")) return tag;
    const oldId = tag.split(":")[1];
    const newId = NEED_MIGRATION[oldId] || oldId;
    return `need:${newId}`;
  }).filter(tag => {
    if (seen.has(tag)) return false;
    seen.add(tag);
    return true;
  });
}