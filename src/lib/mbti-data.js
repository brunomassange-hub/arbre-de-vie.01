// Short labels for each cognitive function
export const FUNCTION_SHORT = {
  Ti: "Logique",
  Te: "Rationalité",
  Fi: "Authenticité",
  Fe: "Empathie",
  Si: "Souvenir",
  Se: "Sensation",
  Ni: "Intuition",
  Ne: "Déduction",
};

// Enhanced MBTI cognitive function descriptions
export const FUNCTION_DESCRIPTIONS = {
  Ti: {
    label: "Pensée Introvertie",
    desc: "Logique interne, analyse systémique, cohérence personnelle",
    fonctionnement: "Cherche à comprendre les principes fondamentaux. Décortique les idées pour en extraire la logique pure. Fonctionne comme un système d'analyse interne qui vérifie la cohérence de chaque élément avant de l'accepter.",
    color: "#3b82f6",
  },
  Te: {
    label: "Pensée Extravertie",
    desc: "Rationalité externe, organisation, efficacité factuelle",
    fonctionnement: "Organise le monde extérieur selon des critères objectifs. Planifie, structure, mesure. Cherche l'efficacité maximale et applique des standards mesurables à l'environnement.",
    color: "#2563eb",
  },
  Ni: {
    label: "Intuition Introvertie",
    desc: "Intuition profonde, vision long-terme, pressentiments",
    fonctionnement: "Synthétise inconsciemment les informations en une vision globale. Perçoit les patterns cachés et les tendances futures. Fonctionne par 'aha moments' — des révélations soudaines qui connectent les points.",
    color: "#8b5cf6",
  },
  Ne: {
    label: "Intuition Extravertie",
    desc: "Déduction, connexion d'idées, exploration de possibilités",
    fonctionnement: "Génère des possibilités en explorant les connections entre idées. Saute d'une association à l'autre. Voit le potentiel dans chaque situation et explore de multiples chemins simultanément.",
    color: "#7c3aed",
  },
  Si: {
    label: "Sensation Introvertie",
    desc: "Souvenir, impressions, comparaison avec le passé",
    fonctionnement: "Stabilise l'expérience en créant une bibliothèque interne de souvenirs détaillés. Compare le présent au passé pour détecter les changements. Crée des routines et des repères familiers.",
    color: "#f59e0b",
  },
  Se: {
    label: "Sensation Extravertie",
    desc: "Sensation du moment, action immédiate, présence physique",
    fonctionnement: "Répond à l'environnement en temps réel. Absorbe les détails concrets du moment présent. Cherche l'expérience directe, l'action et la stimulation sensorielle immédiate.",
    color: "#d97706",
  },
  Fi: {
    label: "Sentiment Introverti",
    desc: "Authenticité, valeurs personnelles profondes, intégrité",
    fonctionnement: "Évalue selon un système de valeurs internes. Cherche l'authenticité et la congruence avec soi-même. Ressent profondément ce qui est juste ou faux pour soi, indépendamment des normes externes.",
    color: "#ec4899",
  },
  Fe: {
    label: "Sentiment Extraverti",
    desc: "Empathie, harmonie sociale, conscience des émotions d'autrui",
    fonctionnement: "S'accorde aux émotions et besoins des autres. Cherche l'harmonie du groupe et ajuste son comportement au climat émotionnel ambiant. Ressent naturellement l'atmosphère sociale.",
    color: "#db2777",
  },
};

// MBTI type descriptions: strengths, weaknesses, and how each type works
export const TYPE_DESCRIPTIONS = {
  INTP: {
    surnom: "Le Logicien",
    forces: ["Pensée analytique et logique", "Créativité conceptuelle", "Objectivité intellectuelle", "Capacité à voir les inconsistances", "Autonomie intellectuelle"],
    faiblesses: ["Difficulté avec les émotions", "Tendance à l'indécision", "Isolation sociale", "Perfectionnisme paralysant", "Perte d'intérêt rapide"],
    fonctionnement: "Fonctionne par analyse logique interne (Ti) nourrie par l'exploration de possibilités (Ne). Construit des systèmes mentaux complexes pour comprendre le monde. A besoin de solitude pour traiter l'information. Ses valeurs (Fe) sont en développement — il apprend à connecter avec autrui.",
  },
  INTJ: {
    surnom: "L'Architecte",
    forces: ["Vision stratégique", "Indépendance de pensée", "Résolution de problèmes complexes", "Détermination", "Capacité de planification long-terme"],
    faiblesses: ["Arrogance perçue", "Difficulté avec les émotions", "Trop exigeant", "Impatience avec l'inefficacité", "Isolement"],
    fonctionnement: "Fonctionne par vision intuitive profonde (Ni) traduite en plans d'action structurés (Te). Voit où les choses vont avant les autres. Ses valeurs internes (Fi) guident ses choix de vie. L'action concrète (Se) est son défi — rester ancré dans le présent.",
  },
  INFP: {
    surnom: "Le Médiateur",
    forces: ["Profondeur émotionnelle", "Créativité", "Empathie", "Authenticité", "Idéalisme"],
    faiblesses: ["Trop idéaliste", "Difficulté avec les détails pratiques", "Sensibilité excessive", "Procrastination", "Évitement des conflits"],
    fonctionnement: "Fonctionne selon des valeurs internes profondes (Fi) explorées à travers la créativité (Ne). Cherche un sens profond dans tout ce qu'il fait. Doit développer l'organisation (Te) pour concrétiser ses idéaux.",
  },
  INFJ: {
    surnom: "Le Conseiller",
    forces: ["Intuition profonde", "Empathie", "Vision idéalisée", "Détermination tranquille", "Compréhension des motivations humaines"],
    faiblesses: ["Perfectionnisme", "Épuisement émotionnel", "Secret et difficile à connaître", "Trop sensible aux critiques", "Difficulté à vivre le moment présent"],
    fonctionnement: "Fonctionne par vision intuitive (Ni) mise au service de l'harmonie d'autrui (Fe). Perçoit les patterns humains et les dynamiques cachées. Sa logique (Ti) affine ses intuitions. Doit développer la présence (Se) pour s'ancrer.",
  },
  ENTP: {
    surnom: "Le Débatteur",
    forces: ["Pensée rapide et créative", "Capacité à voir de multiples angles", "Charisme intellectuel", "Adaptabilité", "Innovation"],
    faiblesses: ["Difficulté à terminer les projets", "Argumentatif", "Impatient", "Évite la routine", "Peut blesser par insensibilité"],
    fonctionnement: "Fonctionne par génération de possibilités (Ne) analysées logiquement (Ti). Excelle à voir les failles dans les systèmes et les arguments. A besoin de stimulation constante. Son défi est la constance (Si) et la connexion émotionnelle (Fe).",
  },
  ENTJ: {
    surnom: "Le Commandant",
    forces: ["Leadership naturel", "Efficacité", "Vision stratégique", "Détermination", "Capacité d'organisation"],
    faiblesses: ["Dominant", "Intolérant à l'inefficacité", "Impatient", "Peut écraser les autres", "Difficulté avec les émotions"],
    fonctionnement: "Fonctionne par planification externe (Te) guidée par une vision profonde (Ni). Structure le monde pour atteindre ses objectifs. Ses valeurs (Fi) sont son point faible à développer. L'action présente (Se) est son moteur.",
  },
  ENFP: {
    surnom: "Le Campaigner",
    forces: ["Enthousiasme contagieux", "Créativité", "Empathie", "Sociabilité", "Capacité à inspirer"],
    faiblesses: ["Désorganisation", "Difficulté à se concentrer", "Évitement des conflits", "Trop dispersé", "Sensibilité au stress"],
    fonctionnement: "Fonctionne par exploration enthousiaste (Ne) guidée par des valeurs authentiques (Fi). Connecte les idées et les personnes. Doit développer l'organisation (Te) pour concrétiser ses projets. La stabilité (Si) est son défi.",
  },
  ENFJ: {
    surnom: "Le Protagoniste",
    forces: ["Leadership empathique", "Charisme", "Vision sociale", "Capacité à motiver", "Sens des responsabilités"],
    faiblesses: ["Trop idéaliste", "Difficulté à dire non", "Épuisement à aider les autres", "Sensibilité aux critiques", "Contrôle par la culpabilité"],
    fonctionnement: "Fonctionne par harmonie sociale (Fe) nourrie par une vision profonde (Ni). Respire l'atmosphère émotionnelle et guide les autres vers leur potentiel. Sa logique (Ti) est à développer pour l'objectivité.",
  },
  ISTP: {
    surnom: "Le Virtuose",
    forces: ["Maîtrise pratique", "Résolution de problèmes", "Adaptabilité", "Calme sous pression", "Indépendance"],
    faiblesses: ["Réservé", "Difficulté à s'engager", "Prend des risques", "Insensible parfois", "Évite les émotions"],
    fonctionnement: "Fonctionne par action présente (Se) analysée logiquement (Ti). Maîtrise son environnement par l'expérimentation directe. Intègre les patterns (Ni) progressivement. Sa connexion sociale (Fe) est son défi de développement.",
  },
  ISTJ: {
    surnom: "Le Logisticien",
    forces: ["Fiabilité", "Organisation", "Mémoire détaillée", "Sens du devoir", "Pragmatisme"],
    faiblesses: ["Rigide", "Difficulté avec le changement", "Peu expressif", "Trop littéral", "Jugeant"],
    fonctionnement: "Fonctionne par référence au passé (Si) organisée par une logique externe (Te). Stabilise son environnement par la routine et les standards. Doit développer l'ouverture (Ne) et la sensibilité (Fi) pour s'enrichir.",
  },
  ISFP: {
    surnom: "L'Aventurier",
    forces: ["Sensibilité artistique", "Présence au moment", "Authenticité", "Empathie douce", "Adaptabilité"],
    faiblesses: ["Difficulté à planifier", "Évite les conflits", "Trop sensible", "Indécis", "Difficulté à s'exprimer"],
    fonctionnement: "Fonctionne par valeurs internes (Fi) vécues dans l'instant présent (Se). Crée et ressent la beauté du monde. Doit développer la vision long-terme (Ni) et l'organisation (Te) pour se structurer.",
  },
  ISFJ: {
    surnom: "Le Défenseur",
    forces: ["Dévouement", "Mémoire attentionnée", "Fiabilité", "Empathie pratique", "Stabilité"],
    faiblesses: ["Trop altruiste", "Résistance au changement", "Difficulté à exprimer ses besoins", "Évite les conflits", "Perfectionnisme"],
    fonctionnement: "Fonctionne par souvenirs détaillés (Si) au service de l'harmonie (Fe). Prend soin des autres avec constance. Doit développer la logique interne (Ti) et l'ouverture (Ne) pour s'affirmer.",
  },
  ESTP: {
    surnom: "L'Entrepreneur",
    forces: ["Réactivité", "Présence d'esprit", "Charisme", "Adaptabilité", "Action"],
    faiblesses: ["Impulsif", "Évite la planification", "Prend des risques", "Impatient", "Peut être insensible"],
    fonctionnement: "Fonctionne par action immédiate (Se) analysée logiquement (Ti). Thrive dans l'urgence et l'imprévu. Doit développer la vision (Ni) et la connexion émotionnelle (Fe) pour la profondeur.",
  },
  ESTJ: {
    surnom: "L'Exécutif",
    forces: ["Organisation", "Détermination", "Leadership", "Efficacité", "Sens du devoir"],
    faiblesses: ["Rigide", "Dominant", "Peu empathique", "Intolérant à l'inefficacité", "Conformiste"],
    fonctionnement: "Fonctionne par organisation externe (Te) stabilisée par l'expérience (Si). Applique les règles et maintient l'ordre. Doit développer la sensibilité (Fi) et l'ouverture (Ne) pour s'adapter.",
  },
  ESFP: {
    surnom: "L'Amuseur",
    forces: ["Présence contagieuse", "Spontanéité", "Empathie chaleureuse", "Sens pratique", "Sociabilité"],
    faiblesses: ["Évite la planification", "Sensible aux critiques", "Impulsif", "Difficulté avec l'abstrait", "Évite les conflits"],
    fonctionnement: "Fonctionne par expérience présente (Se) vécue selon ses valeurs (Fi). Apporte la joie et la légèreté. Doit développer l'intuition (Ni) et l'organisation (Te) pour la constance.",
  },
  ESFJ: {
    surnom: "Le Consul",
    forces: ["Chaleur sociale", "Sens du devoir", "Organisation", "Empathie pratique", "Fiabilité"],
    faiblesses: ["Trop conformiste", "Sensible aux critiques", "Évite les conflits", "Besoin de validation", "Rigide parfois"],
    fonctionnement: "Fonctionne par harmonie sociale (Fe) stabilisée par l'expérience (Si). Prend soin du groupe avec chaleur et constance. Doit développer la logique (Ti) et l'ouverture (Ne) pour la flexibilité.",
  },
};