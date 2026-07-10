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

// Personalized improvement axes for each MBTI type
export const TYPE_IMPROVEMENTS = {
  INTP: {
    axes: [
      { titre: "Développer la connexion émotionnelle", detail: "Votre fonction inférieure (Fe) est l'empathie sociale. Pratiquez l'écoute active, partagez vos émotions avec confiance, et autorisez-vous à ressentir avant d'analyser." },
      { titre: "Passer à l'action", detail: "Votre Ne génère beaucoup d'idées mais votre Ti peut paralysier par analyse. Fixez-vous des deadlines courtes et lancez-vous avant que ce soit parfait." },
      { titre: "Ancrer vos habitudes", detail: "Votre Si tertiaire a besoin de routines stables. Créez des rituels quotidiens simples pour ne pas vous éparpiller." },
      { titre: "Accepter l'imperfection", detail: "Lâchez le besoin de cohérence absolue. Acceptez que certaines choses soient 'assez bonnes' pour avancer." },
    ],
  },
  INTJ: {
    axes: [
      { titre: "Rester ancré dans le présent", detail: "Votre Se inférieur vous déconnecte du moment présent. Pratiquez la pleine conscience, le sport, ou des activités manuelles pour vous reconnecter au corps." },
      { titre: "Cultiver la sensibilité", detail: "Votre Fi tertiaire est votre connexion aux valeurs. Prenez le temps d'identifier ce qui compte vraiment pour vous, au-delà de l'efficacité." },
      { titre: "Partager votre vision", detail: "Votre Ni est puissant mais interne. Apprenez à communiquer votre vision de manière accessible aux autres pour les embarquer." },
      { titre: "Accepter l'imprévu", detail: "Lâchez le contrôle planificateur. Autorisez-vous à improviser et à voir où la spontanéité vous mène." },
    ],
  },
  INFP: {
    axes: [
      { titre: "Structurer vos projets", detail: "Votre Te inférieur est l'organisation externe. Utilisez des outils de gestion, décomposez vos idéaux en étapes concrètes et mesurables." },
      { titre: "Ancrer vos routines", detail: "Votre Si tertiaire a besoin de stabilité. Créez des repères quotidiens pour ne pas vous perdre dans vos rêveries." },
      { titre: "Gérer la sensibilité", detail: "Votre Fi est intense. Apprenez à ne pas tout prendre personnellement et à distinguer vos émotions de celles des autres." },
      { titre: "Passer à l'action", detail: "Ne attendez pas que tout soit aligné avec vos valeurs pour agir. Autorisez-vous des compromis pragmatiques." },
    ],
  },
  INFJ: {
    axes: [
      { titre: "Vivre le moment présent", detail: "Votre Se inférieur vous coupe du réel. Pratiquez des activités sensorielles : marche, cuisine, art, pour ancrer votre esprit visionary dans le corps." },
      { titre: "Affiner votre logique", detail: "Votre Ti tertiaire gagne à être entraîné. Exercez votre esprit critique et analytique pour équilibrer vos intuitions." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour les autres. Apprenez à dire non et à protéger votre énergie." },
      { titre: "Partager votre vision", detail: "Votre Ni est riche mais solitaire. Trouvez des moyens concrets de partager vos insights avec le monde." },
    ],
  },
  ENTP: {
    axes: [
      { titre: "Terminer vos projets", detail: "Votre Si inférieur a besoin de constance. Engagez-vous à terminer avant de commencer la prochaine idée. Créez des routines de suivi." },
      { titre: "Développer l'empathie", detail: "Votre Fe tertiaire vous connecte aux autres. Pratiquez l'écoute avant l'argumentation, et validez les émotions avant de débattre." },
      { titre: "Approfondir plutôt qu'élargir", detail: "Votre Ne veut tout explorer. Choisissez un domaine et creusez-le vraiment avec votre Ti pour atteindre une vraie maîtrise." },
      { titre: "Ralentir le mental", detail: "Votre esprit va vite. Pratiquez la méditation ou l'écriture pour canaliser et ne pas vous éparpiller." },
    ],
  },
  ENTJ: {
    axes: [
      { titre: "Développer la sensibilité", detail: "Votre Fi inférieur est votre accès aux émotions. Pratiquez l'introspection émotionnelle, identifiez ce que vous ressentez, et tenez compte des émotions des autres." },
      { titre: "Savourer le présent", detail: "Votre Se tertiaire vous connecte au moment. Autorisez-vous à ralentir, à profiter sans optimiser." },
      { titre: "Déléguer et faire confiance", detail: "Votre Te veut tout contrôler. Apprenez à faire confiance aux autres et à accepter que votre façon ne soit pas la seule." },
      { titre: "Écouter avant de décider", detail: "Votre Ni est puissant mais rapide. Prenez le temps d'écouter d'autres perspectives avant de trancher." },
    ],
  },
  ENFP: {
    axes: [
      { titre: "Structurer et organiser", detail: "Votre Te tertiaire a besoin d'entraînement. Utilisez des plannings, des listes et des échéances pour concrétiser vos nombreux projets." },
      { titre: "Stabiliser vos habitudes", detail: "Votre Si inférieur est le défi de la constance. Créez des routines ancrées pour ne pas vous éparpiller." },
      { titre: "Canaliser l'enthousiasme", detail: "Votre Ne vous emporte partout. Apprenez à dire non aux nouvelles opportunités pour finir ce que vous avez commencé." },
      { titre: "Gérer le stress émotionnel", detail: "Votre Fi est profond. Apprenez à vous recentrer quand les émotions vous submergent." },
    ],
  },
  ENFJ: {
    axes: [
      { titre: "Développer la logique interne", detail: "Votre Ti inférieur gagne à être cultivé. Exercez l'analyse objective et le raisonnement logique pour équilibrer l'empathie." },
      { titre: "S'ancrer dans le présent", detail: "Votre Se tertiaire vous relie au réel. Pratiquez des activités corporelles et sensorielles pour sortir du mental." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour autrui. Apprenez à dire non sans culpabilité et à vous occuper de vous d'abord." },
      { titre: "Décider par soi-même", detail: "Votre Ni vous guide mais peut être influencé par le groupe. Cultivez votre propre vision indépendamment des attentes des autres." },
    ],
  },
  ISTP: {
    axes: [
      { titre: "Développer la connexion sociale", detail: "Votre Fe inférieure est l'empathie. Pratiquez l'expression émotionnelle, partagez ce que vous ressentez avec vos proches." },
      { titre: "Cultiver la vision long-terme", detail: "Votre Ni tertiaire voit les patterns. Prenez le temps de réfléchir à votre direction de vie, pas seulement à l'instant." },
      { titre: "Approfondir plutôt que diversifier", detail: "Votre Se veut explorer. Choisissez une compétence et maîtrisez-la vraiment avec votre Ti." },
      { titre: "Communiquer vos pensées", detail: "Votre Ti est interne. Apprenez à expliquer votre raisonnement aux autres pour mieux collaborer." },
    ],
  },
  ISTJ: {
    axes: [
      { titre: "Cultiver l'ouverture d'esprit", detail: "Votre Ne inférieur est l'exploration. Essayez de nouvelles choses, lisez des perspectives différentes, sortez de votre zone de confort." },
      { titre: "Développer la sensibilité", detail: "Votre Fi tertiaire est votre monde intérieur. Prenez le temps d'identifier vos émotions et vos valeurs profondes." },
      { titre: "Accepter le changement", detail: "Votre Si stabilise mais peut rigidifier. Pratiquez la flexibilité face à l'imprévu." },
      { titre: "Déléguer et faire confiance", detail: "Votre Te veut tout contrôler. Apprenez à faire confiance aux autres pour faire les choses différemment." },
    ],
  },
  ISFP: {
    axes: [
      { titre: "Structurer vos projets", detail: "Votre Te inférieur est l'organisation. Créez des plans concrets, des deadlines, décomposez vos aspirations en étapes." },
      { titre: "Développer la vision long-terme", detail: "Votre Ni tertiaire voit les tendances. Prenez le temps de réfléchir à votre direction de vie au-delà du moment présent." },
      { titre: "Exprimer vos besoins", detail: "Votre Fi est profond mais interne. Apprenez à communiquer ce qui compte pour vous au lieu d'éviter les conflits." },
      { titre: "Sortir de la zone de confort", detail: "Votre Se aime le confort du connu. Essayez de nouvelles expériences pour vous enrichir." },
    ],
  },
  ISFJ: {
    axes: [
      { titre: "Développer l'ouverture", detail: "Votre Ne inférieur est l'exploration des possibles. Essayez de nouvelles approches, lisez, voyagez pour élargir vos horizons." },
      { titre: "Affiner la logique interne", detail: "Votre Ti tertiaire gagne à être entraîné. Exercez le raisonnement analytique et l'esprit critique." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour les autres. Apprenez à dire non et à exprimer vos propres besoins." },
      { titre: "Sortir de la routine", detail: "Votre Si stabilise mais peut enfermer. Introduisez de la nouveauté dans votre quotidien." },
    ],
  },
  ESTP: {
    axes: [
      { titre: "Développer la vision long-terme", detail: "Votre Ni inférieur voit les patterns futurs. Prenez le temps de réfléchir à votre direction de vie, pas seulement à l'action immédiate." },
      { titre: "Approfondir l'empathie", detail: "Votre Fe tertiaire vous connecte aux autres. Pratiquez l'écoute profonde avant l'action." },
      { titre: "Planifier avant d'agir", detail: "Votre Se veut l'action immédiate. Apprenez à réfléchir avant de vous lancer pour éviter les impasses." },
      { titre: "Canaliser l'impulsivité", detail: "Pratiquez la patience. Attendez 24h avant les grandes décisions pour laisser votre Ti analyser." },
    ],
  },
  ESTJ: {
    axes: [
      { titre: "Développer la sensibilité", detail: "Votre Fi inférieur est votre accès aux émotions. Pratiquez l'introspection, identifiez vos sentiments et tenez compte de ceux des autres." },
      { titre: "Cultiver l'ouverture", detail: "Votre Ne tertiaire est l'exploration. Essayez de nouvelles méthodes, écoutez les perspectives différentes." },
      { titre: "Lâcher le contrôle", detail: "Votre Te veut tout structurer. Apprenez à faire confiance aux autres et à accepter l'imprévu." },
      { titre: "Ralentir et écouter", detail: "Prenez le temps d'écouter avant de trancher. Les autres ont des idées valables même si elles diffèrent des vôtres." },
    ],
  },
  ESFP: {
    axes: [
      { titre: "Développer la vision long-terme", detail: "Votre Ni inférieur voit les tendances. Prenez le temps de réfléchir à votre direction de vie au-delà du moment présent." },
      { titre: "Structurer et organiser", detail: "Votre Te tertiaire a besoin d'entraînement. Créez des plannings, des listes et des routines pour concrétiser." },
      { titre: "Approfondir plutôt que diversifier", detail: "Votre Se veut tout expérimenter. Choisissez un domaine et approfondissez-le vraiment avec votre Fi." },
      { titre: "Faire face aux conflits", detail: "Votre Fi évite les tensions. Apprenez à aborder les difficultés au lieu de les fuir dans le plaisir." },
    ],
  },
  ESFJ: {
    axes: [
      { titre: "Développer la logique interne", detail: "Votre Ti inférieur gagne à être cultivé. Exercez l'analyse objective pour équilibrer l'empathie et l'harmonie sociale." },
      { titre: "Cultiver l'ouverture", detail: "Votre Ne tertiaire est l'exploration. Essayez de nouvelles idées, remettez en question les conventions." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour autrui. Apprenez à dire non et à vous occuper de vous." },
      { titre: "Décider par soi-même", detail: "Votre Si stabilise mais peut soumettre au groupe. Cultivez votre propre avis indépendamment des attentes." },
    ],
  },
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