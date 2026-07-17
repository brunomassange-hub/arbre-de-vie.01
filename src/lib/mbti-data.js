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
      { titre: "Développer la connexion émotionnelle", detail: "Votre fonction inférieure (Fe) est l'empathie sociale. Pratiquez l'écoute active en reformulant ce que l'autre ressent avant de répondre. Partagez une émotion par jour avec un proche, même brièvement. Autorisez-vous à ressentir avant d'analyser — tenez un journal émotionnel le soir." },
      { titre: "Passer à l'action", detail: "Votre Ne génère beaucoup d'idées mais votre Ti paralyse par analyse. Fixez-vous la règle des 48h : toute idée doit avoir un premier prototype concret sous 48h. Utilisez un minuteur Pomodoro pour limiter la phase de réflexion à 25 minutes avant de passer à l'exécution." },
      { titre: "Ancrer vos habitudes", detail: "Votre Si tertiaire a besoin de routines stables. Créez des rituels quotidiens simples : même heure de réveil, même séquence de démarrage matinal. Utilisez une checklist papier pour ne pas vous égarer dans de nouvelles pistes chaque jour." },
      { titre: "Accepter l'imperfection", detail: "Lâchez le besoin de cohérence absolue. Fixez un seuil de 'suffisamment bon' avant de lancer un projet et tenez-vous-y. Publiez un travail inachevé pour vous habituer à l'idée que l'imperfection n'est pas un échec." },
    ],
  },
  INTJ: {
    axes: [
      { titre: "Rester ancré dans le présent", detail: "Votre Se inférieur vous déconnecte du moment présent. Pratiquez 10 minutes de pleine conscience par jour, faites du sport régulier, ou engagez-vous dans une activité manuelle (cuisine, bricolage, jardinage) pour reconnecter le corps et le mental." },
      { titre: "Cultiver la sensibilité", detail: "Votre Fi tertiaire est votre connexion aux valeurs. Prenez le temps d'identifier ce qui compte vraiment pour vous au-delà de l'efficacité. Tenez un journal de valeurs, notez chaque semaine les moments qui vous ont touché émotionnellement." },
      { titre: "Partager votre vision", detail: "Votre Ni est puissant mais interne. Exercez-vous à communiquer votre vision avec des analogies concrètes et des étapes actionnables. Préparez un 'pitch' de 3 minutes pour vos idées majeures et sollicitez des retours réguliers." },
      { titre: "Accepter l'imprévu", detail: "Lâchez le contrôle planificateur. Une fois par semaine, laissez une demie journée sans planning et laissez-vous guider par l'instant. Notez ce que l'improvisation vous a apporté pour reconditionner votre rapport à l'inattendu." },
    ],
  },
  INFP: {
    axes: [
      { titre: "Structurer vos projets", detail: "Votre Te inférieur est l'organisation externe. Décomposez chaque idéal en étapes concrètes et mesurables. Utilisez un outil comme Trello ou Notion, fixez des deadlines réalistes et demandez à un proche de vous tenir responsable des échéances." },
      { titre: "Ancrer vos routines", detail: "Votre Si tertiaire a besoin de stabilité. Créez des repères quotidiens — rituel matinal, horaires de repas réguliers, routine du soir — pour ne pas vous perdre dans vos rêveries et garder un ancrage tangible." },
      { titre: "Gérer la sensibilité", detail: "Votre Fi est intense. Apprenez à ne pas tout prendre personnellement : avant de réagir à une remarque, demandez-vous 'Est-ce que cela parle de moi ou de l'autre ?'. Pratiquez la technique du 'bouclier' — visualiser une protection émotionnelle avant d'entrer en interaction tendue." },
      { titre: "Passer à l'action", detail: "N'attendez pas que tout soit aligné avec vos valeurs pour agir. Autorisez-vous des compromis pragmatiques : fixez un objectif minimum acceptable (80% d'alignement) et lancez-vous plutôt que d'attendre la perfection éthique." },
    ],
  },
  INFJ: {
    axes: [
      { titre: "Vivre le moment présent", detail: "Votre Se inférieur vous coupe du réel. Pratiquez des activités sensorielles : marche en nature sans écouteurs, cuisine, art, sport, pour ancrer votre esprit visionary dans le corps. Planifiez au moins une activité sensorielle par jour." },
      { titre: "Affiner votre logique", detail: "Votre Ti tertiaire gagne à être entraîné. Exercez votre esprit critique en lisant des essais argumentés, en pratiquant le débat amical, ou en tenant un journal d'analyse où vous forcez le raisonnement logique sur un sujet émotionnel." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour les autres. Apprenez à dire 'non' sans justification : préparez des phrases types ('Je ne peux pas cette fois-ci') et fixez une règle de ne rien accepter sous 24h de réflexion pour éviter l'engagement par culpabilité." },
      { titre: "Partager votre vision", detail: "Votre Ni est riche mais solitaire. Écrivez vos insights dans un journal, créez du contenu (articles, vidéos) ou trouvez un groupe de discussion où vous pouvez exprimer vos intuitions. Ne gardez pas votre vision prisonnière de votre intimité." },
    ],
  },
  ENTP: {
    axes: [
      { titre: "Terminer vos projets", detail: "Votre Si inférieur a besoin de constance. Engagez-vous à terminer un projet avant d'en commencer un nouveau. Créez des routines de suivi hebdomadaire — 30 minutes chaque dimanche pour faire le point sur l'avancement et bloquer du temps dédié." },
      { titre: "Développer l'empathie", detail: "Votre Fe tertiaire vous connecte aux autres. Pratiquez l'écoute avant l'argumentation : dans chaque conversation, reformulez l'émotion de l'autre avant de répondre. Évitez de transformer chaque échange en débat d'idées." },
      { titre: "Approfondir plutôt qu'élargir", detail: "Votre Ne veut tout explorer. Choisissez un domaine et creusez-le vraiment avec votre Ti pendant 3 mois minimum. Mesurez votre progression avec des jalons concrets (certification, projet abouti) plutôt qu'en nombre de sujets abordés." },
      { titre: "Ralentir le mental", detail: "Votre esprit va vite. Pratiquez la méditation ou l'écriture libre (10 min/jour) pour canaliser et structurer vos pensées. Notez vos idées dans un carnet pour libérer votre mental au lieu de les laisser tourner en boucle." },
    ],
  },
  ENTJ: {
    axes: [
      { titre: "Développer la sensibilité", detail: "Votre Fi inférieur est votre accès aux émotions. Pratiquez l'introspection émotionnelle : chaque soir, identifiez 3 émotions ressenties dans la journée et leur contexte. Demandez régulièrement à vos proches comment ils vont et écoutez sans chercher à résoudre." },
      { titre: "Savourer le présent", detail: "Votre Se tertiaire vous connecte au moment. Bloquez des créneaux sans objectif — une promenade, un repas sans téléphone, un moment de détente sans optimisation. Pratiquez l'appréciation consciente de l'instant." },
      { titre: "Déléguer et faire confiance", detail: "Votre Te veut tout contrôler. Identifiez 3 tâches que vous pouvez déléguer cette semaine et laissez les autres faire à leur façon. Acceptez que le résultat diffère du vôtre tant que l'objectif est atteint." },
      { titre: "Écouter avant de décider", detail: "Votre Ni est puissant mais rapide. Avant de trancher une décision importante, consultez au moins 2 perspectives différentes et écoutez activement pendant 15 minutes sans interrompre ni conclure." },
    ],
  },
  ENFP: {
    axes: [
      { titre: "Structurer et organiser", detail: "Votre Te tertiaire a besoin d'entraînement. Utilisez des plannings hebdomadaires avec des blocs de temps dédiés, des listes de priorités quotidiennes et des échéances intermédiaires pour concrétiser vos nombreux projets." },
      { titre: "Stabiliser vos habitudes", detail: "Votre Si inférieur est le défi de la constance. Créez des routines ancrées : même heure de coucher, rituel matinal fixe, jour de réflexion hebdomadaire. Utilisez des rappels visuels pour ne pas vous éparpiller." },
      { titre: "Canaliser l'enthousiasme", detail: "Votre Ne vous emporte partout. Apprenez à dire 'non' aux nouvelles opportunités pendant une semaine pour finir ce que vous avez commencé. Avant de dire oui, vérifiez que vous avez la bande passante pour honorer l'engagement." },
      { titre: "Gérer le stress émotionnel", detail: "Votre Fi est profond. Apprenez à vous recentrer quand les émotions vous submergent : pratiquez la respiration 4-7-8, retirez-vous 5 minutes seul, ou écrivez ce que vous ressentez pour le clarifier avant de réagir." },
    ],
  },
  ENFJ: {
    axes: [
      { titre: "Développer la logique interne", detail: "Votre Ti inférieur gagne à être cultivé. Exercez l'analyse objective : lisez des essais, pratiquez les échecs ou la programmation, et forcez-vous à argumenter logiquement sur un sujet avant de considérer l'impact émotionnel." },
      { titre: "S'ancrer dans le présent", detail: "Votre Se tertiaire vous relie au réel. Pratiquez des activités corporelles (sport, danse, marche) et sensorielles pour sortir du mental et de l'hyper-vigilance sociale. Planifiez au moins 30 minutes d'activité physique par jour." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour autrui. Apprenez à dire 'non' sans culpabilité : préparez des phrases de refus polies mais fermes. Tenez un journal de votre énergie pour identifier ce qui vous épuise et ajustez vos engagements." },
      { titre: "Décider par soi-même", detail: "Votre Ni vous guide mais peut être influencé par le groupe. Cultivez votre propre vision : méditez seul 15 minutes par jour, écrivez vos opinions avant de les partager, et prenez les décisions importantes en solitude plutôt qu'en groupe." },
    ],
  },
  ISTP: {
    axes: [
      { titre: "Développer la connexion sociale", detail: "Votre Fe inférieure est l'empathie. Pratiquez l'expression émotionnelle : partagez ce que vous ressentez avec un proche une fois par semaine. Initiese une activité de groupe (sport, club) pour vous exercer en contexte social structuré." },
      { titre: "Cultiver la vision long-terme", detail: "Votre Ni tertiaire voit les patterns. Prenez 30 minutes par semaine pour réfléchir à votre direction de vie au-delà de l'instant. Écrivez vos objectifs à 1 an, 3 ans, 5 ans et identifiez les étapes qui y mènent." },
      { titre: "Approfondir plutôt que diversifier", detail: "Votre Se veut explorer. Choisissez une compétence et maîtrisez-la vraiment avec votre Ti pendant 6 mois minimum. Mesurez votre niveau avec des projets concrets de difficulté croissante." },
      { titre: "Communiquer vos pensées", detail: "Votre Ti est interne. Exercez-vous à expliquer votre raisonnement à voix haute avant de l'écrire. Pratiquez le résumé en 3 points de vos analyses pour les rendre accessibles aux autres et faciliter la collaboration." },
    ],
  },
  ISTJ: {
    axes: [
      { titre: "Cultiver l'ouverture d'esprit", detail: "Votre Ne inférieur est l'exploration. Essayez une nouvelle chose chaque semaine — un plat, un parcours, un livre hors de votre domaine. Lisez des perspectives opposées aux vôtres pour entraîner votre flexibilité cognitive." },
      { titre: "Développer la sensibilité", detail: "Votre Fi tertiaire est votre monde intérieur. Prenez le temps d'identifier vos émotions : chaque soir, notez ce que vous avez ressenti et pourquoi. Pratiquez l'écoute active sans chercher à résoudre le problème de l'autre." },
      { titre: "Accepter le changement", detail: "Votre Si stabilise mais peut rigidifier. Pratiquez la flexibilité : changez volontairement une routine par semaine (itinéraire, horaire, méthode). Anticipez un plan B pour réduire l'anxiété liée à l'imprévu." },
      { titre: "Déléguer et faire confiance", detail: "Votre Te veut tout contrôler. Identifiez 3 tâches déléguables et laissez les autres faire différemment. Acceptez que votre méthode n'est pas la seule valable et mesurez le résultat sur l'objectif, pas sur la méthode." },
    ],
  },
  ISFP: {
    axes: [
      { titre: "Structurer vos projets", detail: "Votre Te inférieur est l'organisation. Créez des plans concrets avec des deadlines, décomposez vos aspirations en étapes hebdomadaires mesurables. Utilisez un outil simple (liste papier, app todo) et revoyez-le chaque matin." },
      { titre: "Développer la vision long-terme", detail: "Votre Ni tertiaire voit les tendances. Prenez du temps de réflexion mensuel sur votre direction de vie. Écrivez où vous voulez être dans 5 ans et identifiez 3 actions de ce mois qui vous y rapprochent." },
      { titre: "Exprimer vos besoins", detail: "Votre Fi est profond mais interne. Apprenez à communiquer ce qui compte pour vous : utilisez des phrases 'Je ressens…' et 'J'ai besoin de…' au lieu d'éviter les conflits. Pratiquez avec un proche de confiance." },
      { titre: "Sortir de la zone de confort", detail: "Votre Se aime le confort du connu. Essayez une nouvelle expérience chaque quinzaine — un atelier, un voyage, une rencontre. Notez ce que cela vous a apporté pour encourager la répétition." },
    ],
  },
  ISFJ: {
    axes: [
      { titre: "Développer l'ouverture", detail: "Votre Ne inférieur est l'exploration des possibles. Essayez de nouvelles approches : changez une habitude par semaine, lisez un genre différent, voyagez si possible. Tenez un carnet des découvertes pour valoriser la nouveauté." },
      { titre: "Affiner la logique interne", detail: "Votre Ti tertiaire gagne à être entraîné. Exercez le raisonnement analytique : lisez des articles d'analyse, pratiquez les jeux de logique, et forcez-vous à défendre un point de vue opposé au vôtre en débat amical." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour les autres. Apprenez à dire 'non' : préparez des phrases de refus et pratiquez-les. Fixez une règle : ne jamais accepter un engagement sans 24h de réflexion." },
      { titre: "Sortir de la routine", detail: "Votre Si stabilise mais peut enfermer. Introduisez de la nouveauté : un nouveau trajet, un plat inédit, une activité le week-end. Planifiez un imprévu volontaire par semaine pour entraîner votre adaptabilité." },
    ],
  },
  ESTP: {
    axes: [
      { titre: "Développer la vision long-terme", detail: "Votre Ni inférieur voit les patterns futurs. Prenez 30 minutes par semaine pour réfléchir à votre direction de vie. Écrivez vos objectifs à 1 an et 5 ans, et identifiez les actions immédiates qui y mènent." },
      { titre: "Approfondir l'empathie", detail: "Votre Fe tertiaire vous connecte aux autres. Pratiquez l'écoute profonde : dans chaque conversation, attendez 3 secondes avant de répondre, reformulez l'émotion de l'autre, et résistez à l'envie de passer à l'action immédiate." },
      { titre: "Planifier avant d'agir", detail: "Votre Se veut l'action immédiate. Pour les décisions importantes, imposez un délai de 24h de réflexion. Écrivez les pour/contre et les conséquences possibles avant de vous lancer pour éviter les impasses." },
      { titre: "Canaliser l'impulsivité", detail: "Pratiquez la patience : attendez 24h avant les grandes décisions, utilisez un minuteur pour les achats impulsifs. Notez vos déclencheurs d'impulsivité pour les anticiper et préparer des réponses alternatives." },
    ],
  },
  ESTJ: {
    axes: [
      { titre: "Développer la sensibilité", detail: "Votre Fi inférieur est votre accès aux émotions. Pratiquez l'introspection : chaque soir, identifiez 3 émotions ressenties. Demandez à vos proches comment ils se sentent et écoutez sans chercher à résoudre ni juger." },
      { titre: "Cultiver l'ouverture", detail: "Votre Ne tertiaire est l'exploration. Essayez de nouvelles méthodes chaque semaine, écoutez des podcasts aux perspectives différentes, et forcez-vous à considérer au moins 2 approches alternatives avant de trancher." },
      { titre: "Lâcher le contrôle", detail: "Votre Te veut tout structurer. Déléguez une tâche par semaine et laissez l'autre personne choisir sa méthode. Acceptez que l'imprévu fasse partie de la vie et entraînez votre tolérance au désordre ponctuel." },
      { titre: "Ralentir et écouter", detail: "Prenez le temps d'écouter avant de trancher. Dans les réunions, attendez que chacun ait parlé avant de donner votre avis. Pratiquez la reformulation pour vérifier que vous avez compris avant de répondre." },
    ],
  },
  ESFP: {
    axes: [
      { titre: "Développer la vision long-terme", detail: "Votre Ni inférieur voit les tendances. Prenez du temps mensuel pour réfléchir à votre direction de vie au-delà du moment présent. Écrivez où vous voulez être dans 3 ans et identifiez les étapes qui y mènent." },
      { titre: "Structurer et organiser", detail: "Votre Te tertiaire a besoin d'entraînement. Créez des plannings hebdomadaires, des listes de tâches et des routines quotidiennes pour concrétiser vos projets. Utilisez des rappels et des checklists pour ne rien oublier." },
      { titre: "Approfondir plutôt que diversifier", detail: "Votre Se veut tout expérimenter. Choisissez un domaine et approfondissez-le vraiment pendant 6 mois. Mesurez votre progression avec des projets de difficulté croissante plutôt qu'en nombre d'expériences." },
      { titre: "Faire face aux conflits", detail: "Votre Fi évite les tensions. Apprenez à aborder les difficultés au lieu de les fuir dans le plaisir. Pratiquez des phrases d'affirmation douce mais ferme : 'Je ne suis pas d'accord avec ça' ou 'Cela me pose problème'." },
    ],
  },
  ESFJ: {
    axes: [
      { titre: "Développer la logique interne", detail: "Votre Ti inférieur gagne à être cultivé. Exercez l'analyse objective : lisez des essais argumentés, pratiquez les jeux de stratégie, et forcez-vous à raisonner logiquement avant de considérer l'impact social d'une décision." },
      { titre: "Cultiver l'ouverture", detail: "Votre Ne tertiaire est l'exploration. Essayez de nouvelles idées chaque semaine, remettez en question une convention ou une habitude. Lisez des perspectives qui diffèrent des vôtres et notez ce que vous en retenez." },
      { titre: "Poser des limites", detail: "Votre Fe vous pousse à tout faire pour autrui. Apprenez à dire 'non' et à vous occuper de vous : bloquez du temps 'pour vous' dans votre agenda comme un rendez-vous non négociable." },
      { titre: "Décider par soi-même", detail: "Votre Si stabilise mais peut soumettre au groupe. Cultivez votre propre avis : écrivez votre opinion avant de la partager, prenez les décisions personnelles seul(e) d'abord, puis consultez si nécessaire." },
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

// Enriched MBTI type descriptions
export const TYPE_DESCRIPTIONS = {
  INTP: {
    surnom: "Le Logicien",
    definition: "L'INTP perçoit le monde comme un immense système d'énigmes à résoudre. Sa motivation fondamentale est la quête de compréhension — comprendre comment les choses fonctionnent, pourquoi elles sont ainsi, et quels principes sous-jacents les régissent. Il traite l'information de manière analytique et conceptuelle, construisant des cadres mentaux cohérents qui relient les idées entre elles. Ses décisions reposent sur la logique interne plutôt que sur l'émotion ou le consensus social. Dans son environnement, il observe, analyse et théorise, préférant la profondeur conceptuelle à l'action immédiate.",
    fonctionnement_detaille: "Sa fonction dominante (Ti) crée des systèmes de pensée rigoureux, tandis que son auxiliaire (Ne) génère un flux constant de possibilités créatives qui alimentent ces constructions mentales. Au quotidien, cela se traduit par une personne capable de passer des heures à explorer une idée sous tous ses angles, qui connecte des concepts apparemment éloignés et qui repère les incohérences que les autres ne voient pas. En travail, il excelle dans la résolution de problèmes complexes mais peut négliger les aspects pratiques et relationnels. En communication, il est précis et conceptuel, parfois difficile à suivre pour ceux qui préfèrent le concret.",
    forces: [
      "Pensée analytique et logique — Capacité à déconstruire des problèmes complexes et à identifier les failles de raisonnement que les autres ignorent, ce qui en fait un excellent problémiste et concepteur.",
      "Créativité conceptuelle — Talent pour connecter des idées disparates et générer des approches novatrices que personne n'avait envisagées, particulièrement utile dans l'innovation et la recherche.",
      "Objectivité intellectuelle — Aptitude à juger les idées sur leur mérite, indépendamment des émotions ou des pressions sociales, ce qui permet une pensée véritablement libre et indépendante.",
      "Capacité à voir les inconsistances — Repérage rapide des contradictions dans les arguments, les systèmes ou les théories, ce qui aide à éviter les erreurs de logique collectives.",
      "Autonomie intellectuelle — Indépendance de pensée qui permet de résister à la pensée de groupe et à explorer des voies non conventionnelles sans craindre le jugement."
    ],
    faiblesses: [
      "Difficulté avec les émotions — Tendance à intellectualiser les sentiments plutôt qu'à les ressentir, ce qui peut créer une distance dans les relations intimes et mener à des malentendus émotionnels.",
      "Tendance à l'indécision — Exploration prolongée de toutes les options par peur de fermer des possibilités, ce qui retarde les décisions importantes et frustre l'entourage professionnel.",
      "Isolation sociale — Préférence marquée pour la solitude qui peut mener à un retrait excessif, à une détérioration des liens sociaux et à un sentiment de solitude subi.",
      "Perfectionnisme paralysant — Refus de finaliser un projet tant qu'il n'est pas théoriquement parfait, entraînant une procrastination chronique et des projets qui ne voient jamais le jour.",
      "Perte d'intérêt rapide — Enthousiasme intense pour les nouvelles idées qui s'éteint dès que le défi conceptuel est résolu, laissant de nombreux projets inachevés."
    ],
    relations: "En relation, l'INTP est loyal mais distant. Il montre son affection en partageant ses idées et en cherchant à comprendre l'autre en profondeur plutôt que par des démonstrations émotionnelles classiques. Il a besoin de beaucoup d'espace personnel et peut être perçu comme froid ou désengagé. En couple, il valorise un partenaire qui respecte son autonomie intellectuelle et qui ne le surcharge pas d'exigences émotionnelles. En amitié, il préfère les relations basées sur l'échange d'idées plutôt que sur les activités sociales.",
    stress: "Sous stress, l'INTP perd accès à sa logique habituelle et se retrouve submergé par des émotions qu'il ne sait pas gérer — anxiété sociale, hypersensibilité aux critiques, sentiment d'incompétence. Il peut devenir brusquement rigide, obsédé par des détails insignifiants, ou se retirer complètement de toute interaction. La pression sociale ou émotionnelle intense le pousse à fuir dans l'isolement et à ruminer."
  },
  INTJ: {
    surnom: "L'Architecte",
    definition: "L'INTJ perçoit le monde comme un projet à structurer et optimiser. Sa motivation fondamentale est la réalisation de sa vision — transformer ses intuitions profondes en systèmes concrets et efficaces. Il traite l'information de manière synthétique et stratégique, percevant les patterns à long terme que les autres ne voient pas encore. Ses décisions reposent sur une rationalité stratégique orientée vers l'efficacité et l'atteinte d'objectifs. Dans son environnement, il planifie, structure et transforme, cherchant constamment à améliorer les systèmes qui l'entourent.",
    fonctionnement_detaille: "Sa fonction dominante (Ni) synthétise les informations en une vision globale et long-terme, tandis que son auxiliaire (Te) traduit cette vision en plans d'action structurés et mesurables. Au quotidien, cela donne une personne qui sait où elle va, qui anticipe les obstacles et qui organise méthodiquement les ressources pour atteindre ses objectifs. En travail, il excelle en stratégie et en leadership transformateur mais peut négliger les dimensions humaines. En communication, il est direct, structuré et parfois perçu comme arrogant par son assurance.",
    forces: [
      "Vision stratégique — Capacité à anticiper les tendances long-terme et à concevoir des plans qui tiennent compte de multiples variables, ce qui en fait un excellent stratège et planificateur.",
      "Indépendance de pensée — Refus de suivre les conventions sans les questionner, permettant des innovations de rupture et des approches véritablement originales.",
      "Résolution de problèmes complexes — Aptitude à décomposer des défis multiformes en étapes actionnables et à identifier les leviers les plus efficaces pour créer du changement.",
      "Détermination — Persévérance remarquable face à l'adversité, capable de maintenir le cap sur des objectifs long-terme malgré les obstacles et les doutes.",
      "Capacité de planification long-terme — Talent pour construire des feuilles de route cohérentes sur plusieurs années et ajuster le cap en fonction des retours."
    ],
    faiblesses: [
      "Arrogance perçue — Confiance en sa vision qui peut être interprétée comme du mépris pour les autres approches, créant des tensions en équipe et freinant la collaboration.",
      "Difficulté avec les émotions — Tendance à ignorer les dimensions émotionnelles des situations, ce qui peut blesser les proches et créer des incompréhensions en contexte relationnel.",
      "Trop exigeant — Standards élevés appliqués à soi et aux autres qui peuvent décourager l'entourage et créer un climat de pression permanente au travail comme à la maison.",
      "Impatience avec l'inefficacité — Frustration visible face aux processus lents ou aux personnes jugées incompétentes, pouvant mener à des comportements brusques ou cassants.",
      "Isolement — Préférence pour la solitude et le travail indépendant qui peut limiter les réseaux de soutien et les opportunités de collaboration enrichissante."
    ],
    relations: "En relation, l'INTJ est intense et sélectif. Il investit peu de relations mais profondément, cherchant des partenaires capables de stimuler intellectuellement et de partager sa vision. Il exprime son affection par des actes concrets et un engagement long-terme plutôt que par des mots. En couple, il valorise l'autonomie mutuelle et la croissance partagée. En amitié, il préfère les échanges riches de sens aux activités sociales superficielles, et montre une loyauté sans faille envers son cercle intime.",
    stress: "Sous stress, l'INTJ perd accès à sa vision stratégique et se livre à des excès sensoriels inhabituels — boulimie, achats impulsifs, recherche de sensations fortes. Il peut devenir obsessionnel sur des détails sans importance, perdu dans des loops de pensée. La perte de contrôle sur son environnement ou l'échec de ses plans le plonge dans un doute profond et un retrait social marqué."
  },
  INFP: {
    surnom: "Le Médiateur",
    definition: "L'INFP perçoit le monde à travers le prisme de ses valeurs profondes et de sa quête de sens. Sa motivation fondamentale est l'authenticité — vivre en cohérence avec ce qui est juste et vrai pour lui, et trouver une vie qui résonne avec son idéal intérieur. Il traite l'information de manière subjective et symbolique, cherchant le sens caché derrière les apparences. Ses décisions reposent sur un système de valeurs internes intime et non négociable. Dans son environnement, il cherche la beauté, l'harmonie et les connexions authentiques, fuyant la superficialité et l'hypocrisie.",
    fonctionnement_detaille: "Sa fonction dominante (Fi) évalue tout selon un système de valeurs internes profond, tandis que son auxiliaire (Ne) explore les possibilités et les significations multiples de chaque expérience. Au quotidien, cela crée une personne profondément authentique, créative et idéaliste, qui ressent le monde avec une intensité rare. En travail, il excelle dans les domaines créatifs et humanistes mais peut se heurter aux exigences pragmatiques. En communication, il est métaphorique et sensible, cherchant la connexion véritable plutôt que l'échange d'informations.",
    forces: [
      "Profondeur émotionnelle — Capacité à ressentir et comprendre les émotions avec une finesse remarquable, ce qui en fait un confident et un accompagnant naturellement empathique.",
      "Créativité — Talent pour générer des idées originales et explorer des perspectives inattendues, particulièrement dans l'art, l'écriture et les domaines expressifs.",
      "Empathie — Aptitude à se mettre à la place d'autrui et à comprendre ses motivations profondes, créant des connexions authentiques et durables.",
      "Authenticité — Engagement inébranlable envers ses valeurs personnelles, refusant les compromis éthiques même sous pression sociale ou professionnelle.",
      "Idéalisme — Vision d'un monde meilleur qui motive l'engagement dans des causes et inspire les autres à viser plus haut."
    ],
    faiblesses: [
      "Trop idéaliste — Tendance à comparer la réalité à un idéal inatteignable, ce qui génère une déception chronique et freine l'appréciation de ce qui existe.",
      "Difficulté avec les détails pratiques — Négligence des aspects concrets et logistiques de la vie quotidienne, ce qui peut créer des problèmes administratifs ou organisationnels récurrents.",
      "Sensibilité excessive — Réactions émotionnelles intenses face aux critiques ou aux conflits, pouvant mener à un retrait prolongé et à une rumination douloureuse.",
      "Procrastination — Tendance à reporter les actions qui ne résonnent pas avec les valeurs internes, entraînant un retard chronique sur les tâches perçues comme triviales.",
      "Évitement des conflits — Peur de la confrontation qui pousse à enfouir les frustrations, créant une résentiment latent et des relations qui se dégradent en silence."
    ],
    relations: "En relation, l'INFP est romantique, profondément dévoué et idéaliste. Il cherche une connexion de l'âme, un partenaire qui partage ses valeurs et comprend son monde intérieur complexe. Il investit intensément ses relations mais peut être déçu si la réalité ne correspond pas à son idéal. En couple, il a besoin d'authenticité et de profondeur émotionnelle. En amitié, il préfère quelques liens profonds à de nombreuses connaissances superficielles.",
    stress: "Sous stress, l'INFP perd accès à ses valeurs et se lance dans des excès de rationalité froide — il devient brusquement critique, cassant, obsédé par l'efficacité et les détails logistiques. Cette phase inhabituelle surprend son entourage. La désillusion idéale et le sentiment de ne pas vivre selon ses valeurs le plongent dans une mélancolie profonde et un retrait protecteur."
  },
  INFJ: {
    surnom: "Le Conseiller",
    definition: "L'INFJ perçoit le monde comme un tissu de connexions profondes et de significations cachées. Sa motivation fondamentale est la compréhension des dynamiques humaines et la contribution au bien-être d'autrui. Il traite l'information de manière intuitive et synthétique, percevant les patterns sous-jacents aux comportements et aux situations. Ses décisions reposent sur une intuition profonde tempérée par le souci de l'harmonie humaine. Dans son environnement, il observe, accompagne et guide, cherchant à révéler le potentiel des personnes et des situations.",
    fonctionnement_detaille: "Sa fonction dominante (Ni) synthétise les observations en intuitions profondes sur les personnes et les situations, tandis que son auxiliaire (Fe) canalise ces insights au service de l'harmonie sociale et du bien-être d'autrui. Au quotidien, cela crée une personne qui lit entre les lignes, qui ressent l'atmosphère émotionnelle et qui sait souvent ce dont les autres ont besoin avant qu'ils ne le demandent. En travail, il excelle dans l'accompagnement humain mais peut s'épuiser à porter les émotions des autres. En communication, il est nuancé, inspirant et parfois mystérieux.",
    forces: [
      "Intuition profonde — Capacité à percevoir les dynamiques cachées et les motivations sous-jacentes des personnes et des situations, ce qui en fait un excellent analyste humain.",
      "Empathie — Aptitude à ressentir les émotions d'autrui avec une précision remarquable, créant des connexions authentiques et un accompagnement véritablement sur-mesure.",
      "Vision idéalisée — Talent pour imaginer des futurs possibles et inspirer les autres à les réaliser, particulièrement dans les domaines humains et sociaux.",
      "Détermination tranquille — Persévérance discrète mais inébranlable face aux objectifs qui ont du sens, capable de soutenir des engagements long-terme sans éclat.",
      "Compréhension des motivations humaines — Capacité à décoder pourquoi les gens agissent comme ils agissent, ce qui aide à naviguer les dynamiques sociales complexes."
    ],
    faiblesses: [
      "Perfectionnisme — Standards idéaux appliqués à soi et aux autres qui génèrent une déception chronique et un épuisement lié à la quête d'impeccabilité.",
      "Épuisement émotionnel — Tendance à absorber les émotions d'autrui et à se sacrifier pour les autres, menant à un burn-out émotionnel si les limites ne sont pas posées.",
      "Secret et difficile à connaître — Préférence pour la vie intérieure qui crée une distance perçue comme de l'hermétisme, freinant l'intimité véritable.",
      "Trop sensible aux critiques — Réactions émotionnelles intenses face aux retours négatifs, pouvant mener à un retrait et à une rumination prolongée.",
      "Difficulté à vivre le moment présent — Tendance à se perdre dans les visions et les projections futures, au détriment de l'appréciation de l'instant présent."
    ],
    relations: "En relation, l'INFJ est profondément investi, cherchant une connexion de l'âme authentique et un partenaire qui partage sa vision d'une vie ayant du sens. Il est intuitivement attentif aux besoins de l'autre mais peut négliger les siens. En couple, il valorise la profondeur, l'authenticité et la croissance mutuelle. En amitié, il accompagne fidèlement mais sélectionne rigoureusement son cercle intime, préférant la qualité à la quantité.",
    stress: "Sous stress, l'INFJ perd accès à son intuition et se lance dans des excès sensoriels — boulimie, achats compulsifs, recherche de sensations. Il peut devenir brusquement froid et critique, coupant le contact émotionnel. La surcharge émotionnelle des autres et le sentiment de ne pas vivre selon sa vision le plongent dans une mélancolie profonde et un isolement protecteur."
  },
  ENTP: {
    surnom: "Le Débatteur",
    definition: "L'ENTP perçoit le monde comme un terrain de jeu intellectuel infini. Sa motivation fondamentale est l'exploration des possibilités et le défi des idées reçues. Il traite l'information de manière divergente et connective, voyant des liens entre concepts apparemment éloignés. Ses décisions reposent sur une analyse logique rapide mais adaptable, toujours prête à être révisée. Dans son environnement, il explore, argumente et innove, stimulé par les défis intellectuels et les interactions dynamiques.",
    fonctionnement_detaille: "Sa fonction dominante (Ne) génère un flux constant de possibilités et de connexions d'idées, tandis que son auxiliaire (Ti) analyse ces pistes avec une logique rigoureuse. Au quotidien, cela crée une personne qui pense vite, qui voit les angles morts des arguments et qui excelle dans le brainstorming et l'innovation. En travail, il brille dans les environnements dynamiques et intellectuellement stimulants mais peut s'ennuyer rapidement dans les routines. En communication, il est vif, argumentatif et souvent provocateur par jeu.",
    forces: [
      "Pensée rapide et créative — Capacité à générer des idées originales sous pression et à connecter des concepts inattendus, particulièrement utile en innovation.",
      "Capacité à voir de multiples angles — Talent pour examiner un problème sous tous ses angles et identifier les approches que personne n'envisage.",
      "Charisme intellectuel — Aptitude à captiver et à stimuler intellectuellement son auditoire, ce qui en fait un excellent communicant et animateur de débats.",
      "Adaptabilité — Flexibilité cognitive remarquable qui permet de pivoter rapidement face aux imprévus et de s'ajuster aux nouvelles informations.",
      "Innovation — Talent pour identifier les failles des systèmes existants et proposer des solutions novatrices qui transforment les approches établies."
    ],
    faiblesses: [
      "Difficulté à terminer les projets — Enthousiasme pour le démarrage qui s'évapore une fois le défi conceptuel résolu, laissant de nombreux projets inachevés.",
      "Argumentatif — Tendance à débattre pour le plaisir du débat, ce qui peut être perçu comme de l'agressivité ou de l'insensibilité par l'entourage.",
      "Impatient — Frustration face aux rythmes lents et aux processus routines, pouvant mener à des comportements brusques ou à un désengagement.",
      "Évite la routine — Rejet des structures stables et des processus répétitifs qui freine la concrétisation des projets et la fiabilité opérationnelle.",
      "Peut blesser par insensibilité — Tendance à prioriser l'idée sur la personne, ce qui peut heurter sans le vouloir, particulièrement avec les profils émotionnels."
    ],
    relations: "En relation, l'ENTP est stimulant, imprévisible et intellectuellement engageant. Il cherche un partenaire qui sait le suivre dans ses explorations et qui ne se laisse pas déstabiliser par son besoin de débattre. Il montre son affection en partageant ses idées et en embarquant l'autre dans ses aventures intellectuelles. En couple, il valorise la stimulation mentale et la liberté. En amitié, il préfère les relations dynamiques où l'on peut tout aborder et tout débattre.",
    stress: "Sous stress, l'ENTP perd accès à sa créativité et se lance dans des excès de routine — il devient brusquement obsédé par les détails, l'organisation et la stabilité. Il peut devenir maniaque sur l'ordre et la mémoire, cherchant frénétiquement à contrôler ce qui échappe à son contrôle. La perte de stimulation intellectuelle et l'enfermement dans la routine le plongent dans une anxiété et une irritabilité marquées."
  },
  ENTJ: {
    surnom: "Le Commandant",
    definition: "L'ENTJ perçoit le monde comme un système à optimiser et à diriger. Sa motivation fondamentale est l'efficacité et l'atteinte d'objectifs ambitieux. Il traite l'information de manière stratégique et orientée vers l'action, identifiant rapidement les leviers de performance. Ses décisions sont rapides, logiques et orientées résultats. Dans son environnement, il organise, dirige et transforme, cherchant constamment à maximiser l'efficacité des systèmes et des équipes.",
    fonctionnement_detaille: "Sa fonction dominante (Te) structure l'environnement externe selon des critères d'efficacité objectifs, tandis que son auxiliaire (Ni) fournit une vision stratégique long-terme qui guide les priorités. Au quotidien, cela crée une personne qui sait ce qu'elle veut, qui planifie méthodiquement et qui délègue avec assurance pour atteindre ses objectifs. En travail, il excelle en leadership et en management stratégique mais peut négliger les dimensions humaines. En communication, il est direct, assertif et orienté vers l'action.",
    forces: [
      "Leadership naturel — Capacité à inspirer et à mobiliser les autres vers un objectif commun, ce qui en fait un leader charismatique et efficace.",
      "Efficacité — Talent pour optimiser les processus, éliminer les gaspillages et maximiser les résultats avec les ressources disponibles.",
      "Vision stratégique — Aptitude à anticiper les tendances long-terme et à concevoir des plans qui alignent ressources et objectifs de manière cohérente.",
      "Détermination — Persévérance remarquable face à l'adversité, capable de maintenir le cap malgré les obstacles et les doutes.",
      "Capacité d'organisation — Talent pour structurer les équipes, les systèmes et les projets de manière à maximiser la performance collective."
    ],
    faiblesses: [
      "Dominant — Tendance à imposer sa vision sans consulter, ce qui peut créer un climat de peur et freiner l'initiative des collaborateurs.",
      "Intolérant à l'inefficacité — Frustration visible face aux lenteurs et aux erreurs, pouvant mener à des comportements cassants ou humiliants.",
      "Impatient — Besoin de résultats rapides qui peut conduire à bâcler les phases de réflexion et à négliger les nuances importantes.",
      "Peut écraser les autres — Assurance et intensité qui peuvent intimider l'entourage et limiter la diversité des perspectives dans les équipes.",
      "Difficulté avec les émotions — Tendance à ignorer les dimensions émotionnelles des situations, ce qui peut blesser les proches et créer des incompréhensions."
    ],
    relations: "En relation, l'ENTJ est direct, protecteur et orienté vers la croissance mutuelle. Il montre son affection en aidant l'autre à atteindre ses objectifs et en partageant ses ambitions. Il valorise un partenaire qui le stimule intellectuellement et qui respecte son besoin de contrôle. En couple, il peut être perçu comme autoritaire mais est profondément loyal et investi. En amitié, il préfère les relations dynamiques basées sur l'action et les projets partagés.",
    stress: "Sous stress, l'ENTJ perd accès à son efficacité et se lance dans des excès émotionnels inhabituels — il devient brusquement sensible, sentimental, ou en proie à des doutes existentiels. Il peut se retirer et ruminer, hanté par le sentiment d'échec. La perte de contrôle sur son environnement et l'échec de ses plans le plongent dans une vulnérabilité émotionnelle déstabilisante."
  },
  ENFP: {
    surnom: "Le Campaigner",
    definition: "L'ENFP perçoit le monde comme un terrain d'exploration infini riche de possibilités et de connexions humaines. Sa motivation fondamentale est l'authenticité et la découverte — vivre pleinement, explorer toutes les pistes et connecter avec les autres authentiquement. Il traite l'information de manière divergente et émotionnelle, voyant le potentiel dans chaque personne et chaque situation. Ses décisions reposent sur un système de valeurs internes nourri par l'enthousiasme. Dans son environnement, il explore, inspire et connecte, cherchant à révéler le meilleur de chaque expérience et de chaque personne.",
    fonctionnement_detaille: "Sa fonction dominante (Ne) génère un flux constant de possibilités et de connexions d'idées, tandis que son auxiliaire (Fi) évalue ces pistes selon un système de valeurs internes authentique. Au quotidien, cela crée une personne enthousiaste, créative et profondément humaine, qui inspire et embarque les autres dans ses aventures. En travail, il excelle dans les rôles créatifs et relationnels mais peut se disperser. En communication, il est chaleureux, spontané et inspirant, capable de créer rapidement une atmosphère de confiance.",
    forces: [
      "Enthousiasme contagieux — Capacité à insuffler une énergie positive et à motiver les autres, ce qui en fait un animateur naturel de groupe.",
      "Créativité — Talent pour générer des idées originales et explorer des perspectives inattendues, particulièrement dans les domaines expressifs et humains.",
      "Empathie — Aptitude à comprendre les émotions et les motivations des autres, créant des connexions authentiques et un climat de confiance.",
      "Sociabilité — Facilité à créer du lien et à naviguer les dynamiques sociales avec naturel et chaleur.",
      "Capacité à inspirer — Talent pour révéler le potentiel des personnes et les motiver à viser plus haut, particulièrement dans les contextes de croissance personnelle."
    ],
    faiblesses: [
      "Désorganisation — Difficulté à structurer et à finaliser les projets, entraînant un éparpillement et des échéances manquées.",
      "Difficulté à se concentrer — Tendance à sauter d'une idée à l'autre sans approfondir, freinant l'expertise et la profondeur.",
      "Évitement des conflits — Peur de la confrontation qui pousse à fuir les tensions et à accumuler des frustrations non exprimées.",
      "Trop dispersé — Multiplication des projets et des engagements qui dilue l'énergie et empêche la concrétisation des ambitions.",
      "Sensibilité au stress — Réactions émotionnelles intenses face à la pression, pouvant mener à un épuisement et à une perte de motivation."
    ],
    relations: "En relation, l'ENFP est chaleureux, enthousiaste et profondément authentique. Il cherche un partenaire qui partage son envie d'explorer et qui ne l'enferme pas dans la routine. Il montre son affection par des attentions spontanées et une présence émotionnelle intense. En couple, il valorise la liberté, la croissance mutuelle et l'aventure partagée. En amitié, il cultive un large cercle d'amis tout en gardant quelques liens profonds et authentiques.",
    stress: "Sous stress, l'ENFP perd accès à son enthousiasme et se lance dans des excès de rigidité — il devient brusquement obsédé par l'ordre, les détails et la logique froide. Il peut devenir critique et cassant, coupant le contact émotionnel. La perte de sens et l'isolement social le plongent dans une mélancolie et un doute de soi profonds."
  },
  ENFJ: {
    surnom: "Le Protagoniste",
    definition: "L'ENFJ perçoit le monde comme une communauté à harmoniser et à faire grandir. Sa motivation fondamentale est le bien-être d'autrui et la réalisation du potentiel collectif. Il traite l'information de manière émotionnelle et relationnelle, ressentant l'atmosphère sociale avec acuité. Ses décisions reposent sur le souci de l'harmonie et de la croissance des personnes. Dans son environnement, il accompagne, mobilise et inspire, cherchant à créer des communautés authentiques et porteuses de sens.",
    fonctionnement_detaille: "Sa fonction dominante (Fe) s'accorde aux émotions et besoins du groupe, tandis que son auxiliaire (Ni) fournit une vision des potentiels et des trajectoires de croissance. Au quotidien, cela crée une personne qui ressent l'ambiance, qui sait motiver et qui guide les autres vers leur meilleur. En travail, il excelle en leadership empathique et en accompagnement humain mais peut s'épuiser à porter les émotions des autres. En communication, il est chaleureux, inspirant et naturellement rassembleur.",
    forces: [
      "Leadership empathique — Capacité à mobiliser les autres en comprenant et en valorisant leurs émotions, ce qui en fait un leader charismatique et rassembleur.",
      "Charisme — Présence naturelle qui inspire la confiance et motive l'engagement, particulièrement dans les contextes collectifs.",
      "Vision sociale — Aptitude à percevoir les dynamiques de groupe et à identifier les leviers de cohésion et de croissance collective.",
      "Capacité à motiver — Talent pour révéler le potentiel des personnes et les accompagner vers leur réalisation, particulièrement dans les contextes d'accompagnement.",
      "Sens des responsabilités — Engagement profond envers le bien-être du groupe et la réussite collective, capable de porter des charges importantes avec sérieux."
    ],
    faiblesses: [
      "Trop idéaliste — Tendance à idéaliser les personnes et les situations, ce qui génère des déceptions et une difficulté à accepter les limites réelles.",
      "Difficulté à dire non — Besoin d'approbation et de harmony qui pousse à tout accepter, menant à un épuisement et à une accumulation de engagements intenables.",
      "Épuisement à aider les autres — Tendance à se sacrifier pour les autres au détriment de ses propres besoins, menant à un burn-out émotionnel.",
      "Sensibilité aux critiques — Réactions émotionnelles intenses face aux retours négatifs, pouvant mener à un doute de soi et à un retrait.",
      "Contrôle par la culpabilité — Tendance à utiliser la culpabilisation (consciente ou non) pour maintenir l'harmonie, ce qui peut étouffer les relations à long-terme."
    ],
    relations: "En relation, l'ENFJ est chaleureux, investi et profondément attentif. Il anticipe les besoins de l'autre et cherche à créer une harmonie authentique. Il montre son affection par des actes de soin et une présence émotionnelle constante. En couple, il valorise la croissance mutuelle, la connexion profonde et l'engagement. En amitié, il est le pilier affectif du groupe, toujours disponible et attentif, mais peut négliger ses propres besoins.",
    stress: "Sous stress, l'ENFJ perd accès à son empathie et se lance dans des excès de logique froide — il devient brusquement critique, cynique et obsédé par l'efficacité. Il peut se retirer et couper le contact émotionnel, ce qui surprend son entourage. Le sentiment de ne pas être reconnu et l'épuisement émotionnel le plongent dans un cynisme et un isolement inhabituels."
  },
  ISTP: {
    surnom: "Le Virtuose",
    definition: "L'ISTP perçoit le monde comme un ensemble de mécanismes à comprendre et à maîtriser par l'action. Sa motivation fondamentale est l'autonomie et la maîtrise pratique. Il traite l'information de manière concrète et analytique, déconstruisant les systèmes pour comprendre comment ils fonctionnent. Ses décisions reposent sur une logique interne nourrie par l'expérience directe. Dans son environnement, il explore, manipule et résout, cherchant à comprendre par la pratique plutôt que par la théorie.",
    fonctionnement_detaille: "Sa fonction dominante (Ti) analyse les principes sous-jacents des systèmes, tandis que son auxiliaire (Se) absorbe les données concrètes de l'environnement en temps réel. Au quotidien, cela crée une personne qui apprend en faisant, qui maîtrise rapidement les outils et les techniques, et qui reste calme face à l'imprévu. En travail, il excelle dans les domaines techniques et opérationnels mais peut se lasser des routines. En communication, il est concis, pragmatique et peu enclin aux longueurs.",
    forces: [
      "Maîtrise pratique — Capacité à comprendre et à utiliser rapidement les outils et les systèmes concrets, ce qui en fait un expert technique naturel.",
      "Résolution de problèmes — Talent pour identifier la source des dysfonctionnements et trouver des solutions pragmatiques sous pression.",
      "Adaptabilité — Flexibilité cognitive remarquable qui permet de s'ajuster aux imprévus et de trouver des solutions créatives en temps réel.",
      "Calme sous pression — Aptitude à garder son sang-froid dans les situations d'urgence, ce qui en fait un acteur fiable en contexte critique.",
      "Indépendance — Autonomie de pensée et d'action qui permet de travailler efficacement sans supervision et à explorer librement."
    ],
    faiblesses: [
      "Réservé — Difficulté à exprimer ses émotions et à créer des connexions sociales profondes, ce qui peut créer une distance perçue comme du détachement.",
      "Difficulté à s'engager — Peur de l'enfermement qui pousse à fuir les engagements long-terme, tant professionnels que relationnels.",
      "Prend des risques — Goût pour l'adrénaline et la stimulation qui peut mener à des comportements imprudents, particulièrement dans les moments d'ennui.",
      "Insensible parfois — Tendance à prioriser l'efficacité sur l'émotion, ce qui peut blesser les proches sans le vouloir, particulièrement avec les profils affectifs.",
      "Évite les émotions — Préférence pour l'action sur la réflexion émotionnelle, ce qui peut créer une accumulation de tensions non traitées."
    ],
    relations: "En relation, l'ISTP est indépendant, pragmatique et fidèle à sa manière. Il montre son affection par des actes concrets plutôt que par des mots, et a besoin d'espace personnel. Il valorise un partenaire qui respecte son autonomie et qui ne le surcharge pas d'exigences émotionnelles. En couple, il est loyal mais peu démonstratif. En amitié, il préfère les activités partagées aux longues conversations émotionnelles.",
    stress: "Sous stress, l'ISTP perd accès à sa logique et se lance dans des excès émotionnels — il devient brusquement sensible, anxieux sur l'avenir, ou en proie à des sentiments d'incompétence sociale. Il peut se retirer et ruminer. La perte d'autonomie et l'enfermement dans des routines imposées le plongent dans une irritabilité et une fuite marquées."
  },
  ISTJ: {
    surnom: "Le Logisticien",
    definition: "L'ISTJ perçoit le monde comme un système à stabiliser et à fiabiliser. Sa motivation fondamentale est l'ordre, la fiabilité et le respect des engagements. Il traite l'information de manière concrète et séquentielle, s'appuyant sur l'expérience passée pour naviguer le présent. Ses décisions reposent sur une logique pragmatique orientée vers l'efficacité. Dans son environnement, il organise, fiabilise et maintient, cherchant à créer des structures stables et prévisibles.",
    fonctionnement_detaille: "Sa fonction dominante (Si) crée une bibliothèque interne d'expériences et de repères, tandis que son auxiliaire (Te) organise l'environnement externe selon des critères d'efficacité. Au quotidien, cela crée une personne méthodique, fiable et respectueuse des règles, qui stabilise son environnement par la routine et les standards. En travail, il excelle dans les domaines administratifs et opérationnels mais peut résister au changement. En communication, il est précis, factuel et peu enclin aux détours.",
    forces: [
      "Fiabilité — Engagement inébranlable envers ses responsabilités et ses engagements, ce qui en fait un partenaire professionnel et personnel de confiance.",
      "Organisation — Talent pour structurer les tâches, les processus et les environnements de manière à maximiser la fiabilité et l'efficacité.",
      "Mémoire détaillée — Capacité à retenir les faits, les procédures et les expériences avec précision, particulièrement utile dans les contextes techniques.",
      "Sens du devoir — Engagement profond envers les obligations et les responsabilités, capable de soutenir des charges importantes avec sérieux.",
      "Pragmatisme — Approche concrète et réaliste des problèmes, cherchant des solutions éprouvées plutôt que des innovations risquées."
    ],
    faiblesses: [
      "Rigide — Résistance au changement et aux approches non conventionnelles, ce qui peut freiner l'innovation et frustrer les profils créatifs.",
      "Difficulté avec le changement — Inconfort face à l'imprévu et aux transitions, pouvant mener à de l'anxiété ou à un blocage.",
      "Peu expressif — Difficulté à partager ses émotions et à créer une atmosphère chaleureuse, ce qui peut créer une distance dans les relations.",
      "Trop littéral — Tendance à interpréter les choses au premier degré, ce qui peut mener à des malentendus avec les profis métaphoriques.",
      "Jugeant — Tendance à évaluer les autres selon des standards rigides, ce qui peut créer des tensions et freiner l'acceptation de la diversité."
    ],
    relations: "En relation, l'ISTJ est loyal, fiable et pragmatique. Il montre son affection par des actes concrets — s'occuper des tâches, honorer ses engagements, être présent quand il le faut. Il valorise un partenaire qui respecte les routines et qui partage son sens du devoir. En couple, il est stable mais peu démonstratif. En amitié, il préfère les relations durables et fiables aux aventures sociales éphémères.",
    stress: "Sous stress, l'ISTJ perd accès à sa stabilité et se lance dans des excès d'imagination — il devient brusquement anxieux, imaginant des scénarios catastrophes et des possibilités irréalistes. Il peut se figer et ruminer. La perte de repères et l'exposition à trop de nouveauté le plongent dans une anxiété et un besoin de contrôle accrus."
  },
  ISFP: {
    surnom: "L'Aventurier",
    definition: "L'ISFP perçoit le monde comme une toile d'expériences sensorielles et émotionnelles à savourer. Sa motivation fondamentale est l'authenticité et la beauté — vivre pleinement l'instant présent en cohérence avec ses valeurs. Il traite l'information de manière subjective et sensorielle, ressentant le monde avec une finesse esthétique rare. Ses décisions reposent sur un système de valeurs internes intime. Dans son environnement, il crée, ressent et explore, cherchant la beauté et l'authenticité dans chaque expérience.",
    fonctionnement_detaille: "Sa fonction dominante (Fi) évalue tout selon un système de valeurs internes authentique, tandis que son auxiliaire (Se) absorbe les sensations et les expériences du moment présent. Au quotidien, cela crée une personne sensible, esthète et authentique, qui vit pleinement l'instant et qui crée avec une sensibilité rare. En travail, il excelle dans les domaines artistiques et artisanaux mais peut fuir les structures trop rigides. En communication, il est réservé mais chaleureux, préférant les actes aux mots.",
    forces: [
      "Sensibilité artistique — Capacité à percevoir et à créer la beauté dans les détails, ce qui en fait un créateur naturel dans les domaines expressifs.",
      "Présence au moment — Aptitude à vivre pleinement l'instant présent, ce qui crée une qualité d'être et une appréciation rare de la vie.",
      "Authenticité — Engagement inébranlable envers ses valeurs personnelles, refusant les compromis éthiques même sous pression.",
      "Empathie douce — Capacité à comprendre les émotions d'autrui avec finesse, créant des connexions authentiques et bienveillantes.",
      "Adaptabilité — Flexibilité naturelle qui permet de s'ajuster aux situations et de naviguer les imprévus avec sérénité."
    ],
    faiblesses: [
      "Difficulté à planifier — Faiblesse pour l'organisation long-terme et la structuration des projets, ce qui peut créer des retards et des oublis.",
      "Évite les conflits — Peur de la confrontation qui pousse à fuir les tensions et à accumuler des frustrations non exprimées.",
      "Trop sensible — Réactions émotionnelles intenses face aux critiques ou aux tensions, pouvant mener à un retrait prolongé.",
      "Indécis — Difficulté à trancher entre plusieurs options par peur de faire le mauvais choix éthique, ce qui peut créer des blocages.",
      "Difficulté à s'exprimer — Tendance à garder ses émotions pour soi, ce qui peut créer des incompréhensions et des relations qui se dégradent en silence."
    ],
    relations: "En relation, l'ISFP est doux, authentique et profondément attentif. Il montre son affection par des gestes tendres et une présence chaleureuse, et a besoin de se sentir en sécurité pour s'ouvrir. Il valorise un partenaire qui respecte son rythme et qui ne le brusque pas. En couple, il est tendre et fidèle mais peu expressif verbalement. En amitié, il préfère les relations douces et authentiques aux dynamiques de groupe intenses.",
    stress: "Sous stress, l'ISFP perd accès à sa sensibilité et se lance dans des excès de logique froide — il devient brusquement critique, cassant, obsédé par l'efficacité et les plans. Il peut se retirer et ruminer. Le sentiment de ne pas vivre selon ses valeurs et la pression pour se conformer le plongent dans une mélancolie et un retrait marqués."
  },
  ISFJ: {
    surnom: "Le Défenseur",
    definition: "L'ISFJ perçoit le monde comme une communauté à protéger et à servir. Sa motivation fondamentale est le soin des autres et la préservation de l'harmonie. Il traite l'information de manière concrète et émotionnelle, s'appuyant sur l'expérience passée pour anticiper les besoins d'autrui. Ses décisions reposent sur le souci des autres et le respect des traditions. Dans son environnement, il prend soin, stabilise et soutient, cherchant à créer un climat de sécurité et de bienveillance.",
    fonctionnement_detaille: "Sa fonction dominante (Si) crée une mémoire détaillée des expériences et des besoins, tandis que son auxiliaire (Fe) s'accorde aux émotions et aux attentes du groupe. Au quotidien, cela crée une personne attentionnée, fiable et profondément dévouée, qui prend soin des autres avec constance. En travail, il excelle dans les domaines de soin et d'administration bienveillante mais peut négliger ses propres besoins. En communication, il est doux, précis et attentif aux nuances émotionnelles.",
    forces: [
      "Dévouement — Engagement profond envers le bien-être des autres, ce qui en fait un accompagnant naturellement bienveillant et présent.",
      "Mémoire attentionnée — Capacité à retenir les détails sur les personnes et les situations, ce qui crée un sentiment de reconnaissance et de soin.",
      "Fiabilité — Engagement inébranlable envers ses responsabilités, capable de soutenir des charges importantes avec sérieux et constance.",
      "Empathie pratique — Aptitude à comprendre les besoins concrets d'autrui et à y répondre avec efficacité, créant un véritable accompagnement.",
      "Stabilité — Présence rassurante qui crée un climat de sécurité et de bienveillance, particulièrement dans les contextes de soin."
    ],
    faiblesses: [
      "Trop altruiste — Tendance à se sacrifier pour les autres au détriment de ses propres besoins, menant à un épuisement et à un ressentiment latent.",
      "Résistance au changement — Inconfort face à l'imprévu et aux transitions, pouvant mener à de l'anxiété ou à un blocage face à la nouveauté.",
      "Difficulté à exprimer ses besoins — Tendance à enfouir ses propres besoins pour préserver l'harmonie, créant une accumulation de frustrations.",
      "Évite les conflits — Peur de la confrontation qui pousse à fuir les tensions et à laisser les problèmes se dégrader en silence.",
      "Perfectionnisme — Standards élevés appliqués à soi qui génèrent un épuisement et une difficulté à déléguer ou à accepter l'imperfection."
    ],
    relations: "En relation, l'ISFJ est dévoué, attentif et profondément fiable. Il anticipe les besoins de l'autre et montre son affection par des actes de soin concrets. Il valorise un partenaire qui reconnaît ses efforts et qui ne le prend pas pour acquis. En couple, il est tendre, stable et fidèle mais peut négliger ses propres besoins. En amitié, il est le pilier bienveillant du groupe, toujours disponible mais peu enclin à demander de l'aide.",
    stress: "Sous stress, l'ISFJ perd accès à sa stabilité et se lance dans des excès d'imagination — il devient brusquement anxieux, imaginant des scénarios catastrophes et des possibilités irréalistes. Il peut se figer et ruminer. La surcharge émotionnelle et le sentiment de ne pas être reconnu le plongent dans un épuisement et un retrait marqués."
  },
  ESTP: {
    surnom: "L'Entrepreneur",
    definition: "L'ESTP perçoit le monde comme un terrain d'action et d'opportunités à saisir. Sa motivation fondamentale est l'action, la stimulation et l'efficacité immédiate. Il traite l'information de manière concrète et rapide, absorbant les données de l'environnement en temps réel. Ses décisions sont rapides, pragmatiques et orientées vers l'action. Dans son environnement, il agit, négocie et s'adapte, cherchant à maximiser les opportunités et à vivre pleinement l'instant.",
    fonctionnement_detaille: "Sa fonction dominante (Se) absorbe les données concrètes de l'environnement en temps réel, tandis que son auxiliaire (Ti) analyse ces données avec une logique rapide et pragmatique. Au quotidien, cela crée une personne réactive, charismatique et audacieuse, qui agit vite et qui s'adapte aux situations avec brio. En travail, il excelle dans les environnements dynamiques et commerciaux mais peut se lasser des routines. En communication, il est direct, vivant et captivant.",
    forces: [
      "Réactivité — Capacité à agir rapidement et efficacement face aux imprévus, ce qui en fait un acteur redoutable en contexte dynamique.",
      "Présence d'esprit — Aptitude à garder son sang-froid et à trouver des solutions en temps réel, particulièrement dans les situations d'urgence.",
      "Charisme — Présence naturelle qui captive et influence, ce qui en fait un communicant et un négociateur né.",
      "Adaptabilité — Flexibilité remarquable qui permet de s'ajuster aux situations et aux personnes avec aisance.",
      "Action — Talent pour passer à l'acte et concrétiser les opportunités, sans se perdre dans l'analyse interminable."
    ],
    faiblesses: [
      "Impulsif — Tendance à agir sans réfléchir aux conséquences long-terme, ce qui peut mener à des erreurs évitables et à des regrets.",
      "Évite la planification — Rejet des structures long-terme et des processus, ce qui peut freiner la concrétisation des ambitions durables.",
      "Prend des risques — Goût pour l'adrénaline et la stimulation qui peut mener à des comportements imprudents, particulièrement financiers ou physiques.",
      "Impatient — Frustration face aux rythmes lents et aux processus, pouvant mener à des comportements brusques ou à un désengagement.",
      "Peut être insensible — Tendance à prioriser l'action sur l'émotion, ce qui peut blesser les proches sans le vouloir, particulièrement avec les profils affectifs."
    ],
    relations: "En relation, l'ESTP est dynamique, charismatique et plein de vie. Il montre son affection par des expériences partagées et des moments intenses. Il valorise un partenaire qui sait le suivre dans ses aventures et qui ne l'enferme pas dans la routine. En couple, il est passionné mais peut fuir l'engagement trop contraignant. En amitié, il est le moteur du groupe, toujours partant pour de nouvelles expériences.",
    stress: "Sous stress, l'ESTP perd accès à son action et se lance dans des excès de rumination — il devient brusquement anxieux sur l'avenir, imaginant des scénarios catastrophes et se perdant dans des loops de pensée. Il peut se retirer et se figer. La perte de stimulation et l'enfermement dans la routine le plongent dans une anxiété et une irritabilité marquées."
  },
  ESTJ: {
    surnom: "L'Exécutif",
    definition: "L'ESTJ perçoit le monde comme un système à organiser et à faire fonctionner. Sa motivation fondamentale est l'ordre, l'efficacité et le respect des règles. Il traite l'information de manière concrète et logique, s'appuyant sur l'expérience pour structurer l'environnement. Ses décisions sont rapides, logiques et orientées vers l'efficacité. Dans son environnement, il organise, dirige et fiabilise, cherchant à créer des structures stables et performantes.",
    fonctionnement_detaille: "Sa fonction dominante (Te) organise l'environnement externe selon des critères d'efficacité, tandis que son auxiliaire (Si) s'appuie sur l'expérience et les standards éprouvés. Au quotidien, cela crée une personne structurée, décisive et fiable, qui applique les règles et maintient l'ordre avec détermination. En travail, il excelle en management et en administration mais peut être perçu comme rigide. En communication, il est direct, factuel et peu enclin aux détours.",
    forces: [
      "Organisation — Talent pour structurer les tâches, les processus et les équipes de manière à maximiser la performance et la fiabilité.",
      "Détermination — Persévérance remarquable face à l'adversité, capable de maintenir le cap et de mobiliser les autres vers l'objectif.",
      "Leadership — Capacité naturelle à diriger et à mobiliser, ce qui en fait un leader efficace et respecté, particulièrement dans les contextes structurés.",
      "Efficacité — Aptitude à optimiser les processus et à maximiser les résultats avec les ressources disponibles.",
      "Sens du devoir — Engagement profond envers les obligations et les responsabilités, capable de soutenir des charges importantes avec sérieux."
    ],
    faiblesses: [
      "Rigide — Résistance au changement et aux approches non conventionnelles, ce qui peut freiner l'innovation et frustrer les profils créatifs.",
      "Dominant — Tendance à imposer sa vision sans consulter, ce qui peut créer un climat de tension et freiner l'initiative des collaborateurs.",
      "Peu empathique — Difficulté à prendre en compte les émotions et les besoins individuels, ce qui peut créer un climat froid et blessant.",
      "Intolérant à l'inefficacité — Frustration visible face aux lenteurs et aux erreurs, pouvant mener à des comportements cassants ou humiliants.",
      "Conformiste — Tendance à respecter les règles établies même quand elles sont inefficaces, ce qui peut limiter la créativité et l'adaptation."
    ],
    relations: "En relation, l'ESTJ est loyal, fiable et orienté vers les actes concrets. Il montre son affection en prenant en charge les responsabilités et en assurant la stabilité matérielle. Il valorise un partenaire qui respecte les règles et qui partage son sens du devoir. En couple, il est stable mais peut être perçu comme peu démonstratif ou contrôlant. En amitié, il préfère les relations durables et structurées aux aventures éphémères.",
    stress: "Sous stress, l'ESTJ perd accès à son efficacité et se lance dans des excès émotionnels — il devient brusquement sensible, sentimentale, ou en proie à des doutes existentiels. Il peut se retirer et ruminer. La perte de contrôle sur son environnement et l'échec de ses plans le plongent dans une vulnérabilité émotionnelle déstabilisante."
  },
  ESFP: {
    surnom: "L'Amuseur",
    definition: "L'ESFP perçoit le monde comme une scène d'expériences à savourer et à partager. Sa motivation fondamentale est la plaisir, la connexion et l'intensité du moment. Il traite l'information de manière concrète et émotionnelle, absorbant les sensations et les atmosphères avec acuité. Ses décisions reposent sur le ressenti du moment et le souci de l'harmonie. Dans son environnement, il anime, crée et partage, cherchant à maximiser la joie et la connexion.",
    fonctionnement_detaille: "Sa fonction dominante (Se) absorbe les sensations et les expériences du moment présent, tandis que son auxiliaire (Fi) évalue ces expériences selon un système de valeurs internes authentique. Au quotidien, cela crée une personne vive, chaleureuse et spontanée, qui apporte la joie et la légèreté dans chaque situation. En travail, il excelle dans les rôles relationnels et expressifs mais peut fuir les structures trop rigides. En communication, il est vivant, chaleureux et captivant.",
    forces: [
      "Présence contagieuse — Capacité à insuffler une énergie positive et à créer une atmosphère chaleureuse, ce qui en fait un animateur naturel.",
      "Spontanéité — Talent pour saisir l'instant et créer des moments mémorables, particulièrement dans les contextes sociaux.",
      "Empathie chaleureuse — Aptitude à comprendre et à répondre aux émotions d'autrui avec chaleur, créant des connexions authentiques.",
      "Sens pratique — Approche concrète et réaliste des problèmes, cherchant des solutions immédiates et efficaces.",
      "Sociabilité — Facilité à créer du lien et à naviguer les dynamiques sociales avec naturel et enthousiasme."
    ],
    faiblesses: [
      "Évite la planification — Rejet des structures long-terme et des processus, ce qui peut freiner la concrétisation des ambitions durables.",
      "Sensible aux critiques — Réactions émotionnelles intenses face aux retours négatifs, pouvant mener à un retrait ou à une perte de motivation.",
      "Impulsif — Tendance à agir sous le coup de l'émotion sans réfléchir aux conséquences, ce qui peut mener à des regrets.",
      "Difficulté avec l'abstrait — Préférence pour le concret qui peut limiter la capacité à anticiper et à planifier les stratégies long-terme.",
      "Évite les conflits — Peur de la confrontation qui pousse à fuir les tensions et à laisser les problèmes se dégrader en silence."
    ],
    relations: "En relation, l'ESFP est chaleureux, généreux et plein de vie. Il montre son affection par des moments partagés et des attentions spontanées. Il valorise un partenaire qui sait profiter de l'instant et qui ne l'enferme pas dans la routine. En couple, il est passionné et attentionné mais peut fuir l'engagement trop contraignant. En amitié, il est le cœur du groupe, toujours partant pour de nouvelles expériences et attentif au bien-être de chacun.",
    stress: "Sous stress, l'ESFP perd accès à sa spontanéité et se lance dans des excès de rumination — il devient brusquement anxieux sur l'avenir, imaginant des scénarios catastrophes et se perdant dans des loops de pensée. Il peut se retirer et se figer. La perte de stimulation sociale et l'isolement le plongent dans une mélancolie et une perte de sens marquées."
  },
  ESFJ: {
    surnom: "Le Consul",
    definition: "L'ESFJ perçoit le monde comme une communauté à harmoniser et à servir. Sa motivation fondamentale est le bien-être du groupe et la préservation des traditions. Il traite l'information de manière concrète et émotionnelle, s'appuyant sur l'expérience pour anticiper les besoins d'autrui. Ses décisions reposent sur le souci de l'harmonie et le respect des normes sociales. Dans son environnement, il prend soin, organise et rassemble, cherchant à créer un climat de chaleur et de cohésion.",
    fonctionnement_detaille: "Sa fonction dominante (Fe) s'accorde aux émotions et aux besoins du groupe, tandis que son auxiliaire (Si) s'appuie sur l'expérience et les traditions pour structurer l'accompagnement. Au quotidien, cela crée une personne chaleureuse, organisée et profondément dévouée, qui prend soin du groupe avec constance. En travail, il excelle dans les rôles de coordination et de soin mais peut négliger ses propres besoins. En communication, il est chaleureux, précis et attentif aux nuances sociales.",
    forces: [
      "Chaleur sociale — Capacité à créer une atmosphère chaleureuse et inclusive, ce qui en fait un rassembleur naturel de communauté.",
      "Sens du devoir — Engagement profond envers les obligations et les responsabilités, capable de soutenir des charges importantes avec sérieux.",
      "Organisation — Talent pour structurer les tâches et les processus de manière à maximiser la fiabilité et l'harmonie collective.",
      "Empathie pratique — Aptitude à comprendre les besoins concrets d'autrui et à y répondre avec efficacité, créant un véritable accompagnement.",
      "Fiabilité — Engagement inébranlable envers ses responsabilités, ce qui en fait un partenaire professionnel et personnel de confiance."
    ],
    faiblesses: [
      "Trop conformiste — Tendance à respecter les normes sociales même quand elles sont inefficaces, ce qui peut limiter l'innovation.",
      "Sensible aux critiques — Réactions émotionnelles intenses face aux retours négatifs, pouvant mener à un doute de soi et à un retrait.",
      "Évite les conflits — Peur de la confrontation qui pousse à fuir les tensions et à laisser les problèmes se dégrader en silence.",
      "Besoin de validation — Dépendance à la reconnaissance externe qui peut créer un épuisement lié à la quête d'approbation.",
      "Rigide parfois — Résistance au changement et aux approches non conventionnelles, ce qui peut créer des tensions avec les profils innovants."
    ],
    relations: "En relation, l'ESFJ est chaleureux, dévoué et profondément attentif. Il anticipe les besoins de l'autre et montre son affection par des actes de soin concrets. Il valorise un partenaire qui reconnaît ses efforts et qui partage son sens de la communauté. En couple, il est tendre, stable et fidèle mais peut étouffer par son besoin de contrôler l'harmonie. En amitié, il est le pilier affectif du groupe, toujours disponible mais peu enclin à demander de l'aide.",
    stress: "Sous stress, l'ESFJ perd accès à sa chaleur et se lance dans des excès de logique froide — il devient brusquement critique, cynique et obsédé par l'efficacité. Il peut se retirer et couper le contact émotionnel. Le sentiment de ne pas être reconnu et l'épuisement lié au soin des autres le plongent dans un cynisme et un isolement inhabituels."
  },
};