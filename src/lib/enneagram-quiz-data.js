// Enneagram quiz — ~10 checkable affirmations per type (7 mécanisme comportemental + 3 peur/motivation profonde)
export const TYPE_META = [
  { n: 1, name: "Le Réformateur", center: "Instinct", desc: "Principié, idéaliste, perfectionniste", color: "#ef4444", mechanism: "Perfectionnisme" },
  { n: 2, name: "L'Altruiste", center: "Émotion", desc: "Généreux, attentionné, aime aider", color: "#f59e0b", mechanism: "Aide aux autres" },
  { n: 3, name: "Le Battant", center: "Émotion", desc: "Ambitieux, adapté, orienté succès", color: "#eab308", mechanism: "Quête de victoire" },
  { n: 4, name: "L'Individualiste", center: "Émotion", desc: "Sensible, créatif, cherche l'authenticité", color: "#8b5cf6", mechanism: "Originalité" },
  { n: 5, name: "L'Observateur", center: "Mental", desc: "Analytique, curieux, intérieur", color: "#3b82f6", mechanism: "Explication du monde" },
  { n: 6, name: "Le Loyaliste", center: "Mental", desc: "Fiable, prudent, cherche sécurité", color: "#06b6d4", mechanism: "Quête d'approbation" },
  { n: 7, name: "L'Enthousiaste", center: "Mental", desc: "Spontané, optimiste, polyvalent", color: "#22c55e", mechanism: "Optimisme" },
  { n: 8, name: "Le Protecteur", center: "Instinct", desc: "Direct, protecteur, décidé", color: "#dc2626", mechanism: "Recherche de pouvoir" },
  { n: 9, name: "Le Médiateur", center: "Instinct", desc: "Paisible, accommodant, réconfortant", color: "#14b8a6", mechanism: "Quête d'harmonie" },
];

// group: "behavior" (mécanisme comportemental) | "deep" (peur et motivation profonde)
export const ENNEAGRAM_QUIZ = [
  // ─── Type 1 — Perfectionnisme ───
  { type: 1, group: "behavior", text: "Je repère instantanément ce qui est mal fait ou imparfait autour de moi." },
  { type: 1, group: "behavior", text: "Je me corrige intérieurement en permanence et je me juge sévèrement." },
  { type: 1, group: "behavior", text: "J'ai du mal à terminer une tâche tant qu'elle n'est pas irréprochable." },
  { type: 1, group: "behavior", text: "Je compare souvent la réalité à un idéal et j'en éprouve de la frustration." },
  { type: 1, group: "behavior", text: "Je réprime ma colère pour rester correct et digne." },
  { type: 1, group: "behavior", text: "Je donne des conseils pour aider les autres à s'améliorer, même sans qu'on le demande." },
  { type: 1, group: "behavior", text: "Je respecte scrupuleusement les règles, les délais et les engagements." },
  { type: 1, group: "deep", text: "Je redoute profondément d'être mauvais, corrompu ou moralement défectueux." },
  { type: 1, group: "deep", text: "L'idée de commettre une erreur impardonnable me hante." },
  { type: 1, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'être juste, intègre et de faire ce qui est bien." },

  // ─── Type 2 — Aide aux autres ───
  { type: 2, group: "behavior", text: "Je devine et j'anticipe les besoins des autres avant qu'ils ne les expriment." },
  { type: 2, group: "behavior", text: "Je me rends disponible et je me sacrifie pour les autres, même au détriment de moi-même." },
  { type: 2, group: "behavior", text: "Je donne pour créer du lien et me sentir important à leurs yeux." },
  { type: 2, group: "behavior", text: "J'ai du mal à dire non quand on me demande de l'aide." },
  { type: 2, group: "behavior", text: "J'attends de la reconnaissance et je suis blessé quand mes efforts passent inaperçus." },
  { type: 2, group: "behavior", text: "Je me définis beaucoup par mes relations et par le fait d'être utile." },
  { type: 2, group: "behavior", text: "Je m'oublie pour maintenir la relation et éviter le rejet." },
  { type: 2, group: "deep", text: "Je redoute profondément de ne pas être aimé ou d'être inutile aux autres." },
  { type: 2, group: "deep", text: "L'idée que personne n'aurait besoin de moi me terrifie." },
  { type: 2, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'être aimé et de me sentir indispensable." },

  // ─── Type 3 — Quête de victoire ───
  { type: 3, group: "behavior", text: "Je me fixe des objectifs ambitieux et je mesure ma valeur à mes résultats." },
  { type: 3, group: "behavior", text: "Je soigne mon image et je m'adapte au regard des autres." },
  { type: 3, group: "behavior", text: "Je travaille dur et j'ai du mal à ralentir de peur de perdre ma valeur." },
  { type: 3, group: "behavior", text: "Je mets de côté mes émotions quand elles freinent ma performance." },
  { type: 3, group: "behavior", text: "J'aime être admiré et reconnu pour mes accomplissements." },
  { type: 3, group: "behavior", text: "Je tiens à paraître compétent et confiant en toutes circonstances." },
  { type: 3, group: "behavior", text: "Je fuis l'échec et l'exposition de mes faiblesses." },
  { type: 3, group: "deep", text: "Je redoute profondément d'être un échec ou de n'avoir aucune valeur." },
  { type: 3, group: "deep", text: "L'idée d'être exposé comme incompétent devant les autres me terrifie." },
  { type: 3, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est l'envie de réussir et d'être admiré." },

  // ─── Type 4 — Originalité ───
  { type: 4, group: "behavior", text: "Je cherche à exprimer ma singularité et à me distinguer des autres." },
  { type: 4, group: "behavior", text: "Je ressens les émotions avec une intensité rare et je les cultive." },
  { type: 4, group: "behavior", text: "Je me compare souvent et j'idéalise ce que les autres possèdent." },
  { type: 4, group: "behavior", text: "J'ai le sentiment d'être incompris et à part." },
  { type: 4, group: "behavior", text: "Je m'attache à la beauté, à l'esthétique et à la profondeur." },
  { type: 4, group: "behavior", text: "Je me retire et je rumine quand je me sens blessé." },
  { type: 4, group: "behavior", text: "J'ai du mal à m'engager par peur de trahir mon authenticité." },
  { type: 4, group: "deep", text: "Je redoute profondément d'être ordinaire, sans identité propre." },
  { type: 4, group: "deep", text: "L'idée de n'avoir rien de unique ou de spécial me terrifie." },
  { type: 4, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est la quête d'authenticité et de profondeur émotionnelle." },

  // ─── Type 5 — Explication du monde ───
  { type: 5, group: "behavior", text: "J'observe avant d'agir et je me replie pour préserver mon énergie." },
  { type: 5, group: "behavior", text: "J'accumule des connaissances pour comprendre et maîtriser mon environnement." },
  { type: 5, group: "behavior", text: "Je garde mon espace privé et je fuis les intrusions émotionnelles." },
  { type: 5, group: "behavior", text: "J'analyse les situations avec recul plutôt que de m'impliquer." },
  { type: 5, group: "behavior", text: "Je thésaurise mon temps, mon énergie et mes informations par peur d'en manquer." },
  { type: 5, group: "behavior", text: "Je préfère l'autonomie et je me méfie des dépendances." },
  { type: 5, group: "behavior", text: "J'intellectualise mes émotions plutôt que de les ressentir." },
  { type: 5, group: "deep", text: "Je redoute profondément d'être envahi par les demandes des autres ou de ne pas savoir." },
  { type: 5, group: "deep", text: "L'idée d'être exposé comme incompétent ou ignorant me terrifie." },
  { type: 5, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est la soif de comprendre et de préserver mon autonomie." },

  // ─── Type 6 — Quête d'approbation ───
  { type: 6, group: "behavior", text: "J'anticipe les risques et j'identifie les menaces potentielles." },
  { type: 6, group: "behavior", text: "Je cherche sécurité, certitude et réassurance avant de décider." },
  { type: 6, group: "behavior", text: "Je me montre loyal et dévoué envers les personnes et les causes." },
  { type: 6, group: "behavior", text: "Je doute de mes décisions et je remets en question mes certitudes." },
  { type: 6, group: "behavior", text: "Je me méfie parfois des intentions des autres, même sans motif." },
  { type: 6, group: "behavior", text: "J'ai tendance à imaginer des scénarios catastrophe." },
  { type: 6, group: "behavior", text: "J'oscille entre obéissance et rébellion face aux autorités." },
  { type: 6, group: "deep", text: "Je redoute profondément d'être sans soutien ni guidance." },
  { type: 6, group: "deep", text: "L'idée d'être trahi ou abandonné par ceux en qui j'ai confiance me terrifie." },
  { type: 6, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est la recherche de sécurité et de soutien." },

  // ─── Type 7 — Optimisme ───
  { type: 7, group: "behavior", text: "Je multiplie les projets et les options pour éviter de m'ennuyer." },
  { type: 7, group: "behavior", text: "Je fuis la douleur et l'inconfort dans la distraction et le plaisir." },
  { type: 7, group: "behavior", text: "Je vois toujours le positif et je garde l'enthousiasme." },
  { type: 7, group: "behavior", text: "J'ai du mal à m'engager sur le long terme par peur de l'enfermement." },
  { type: 7, group: "behavior", text: "Je planifie sans cesse la prochaine expérience plutôt que de rester ici." },
  { type: 7, group: "behavior", text: "J'agis sous le coup de l'impulsion et de l'envie." },
  { type: 7, group: "behavior", text: "Je me disperse et j'ai du mal à approfondir." },
  { type: 7, group: "deep", text: "Je redoute profondément d'être piégé dans la douleur ou privé de liberté." },
  { type: 7, group: "deep", text: "L'idée de m'ennuyer ou d'être limité dans mes options me terrifie." },
  { type: 7, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est l'envie d'explorer et de profiter de la vie." },

  // ─── Type 8 — Recherche de pouvoir ───
  { type: 8, group: "behavior", text: "J'aime prendre le contrôle et décider pour les autres." },
  { type: 8, group: "behavior", text: "Je dis les choses franchement et directement, sans détour." },
  { type: 8, group: "behavior", text: "Je protège les miens et je défends les faibles avec force." },
  { type: 8, group: "behavior", text: "Je cache ma vulnérabilité derrière une façade de force." },
  { type: 8, group: "behavior", text: "J'encaisse les coups et je rebondis avec intensité." },
  { type: 8, group: "behavior", text: "Je transforme parfois les échanges en rapports de force." },
  { type: 8, group: "behavior", text: "Je réagis par la colère quand je me sens bafoué." },
  { type: 8, group: "deep", text: "Je redoute profondément d'être contrôlé ou manipulé par quelqu'un." },
  { type: 8, group: "deep", text: "L'idée de me montrer vulnérable ou faible me terrifie." },
  { type: 8, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est l'envie de protéger et de garder le contrôle." },

  // ─── Type 9 — Quête d'harmonie ───
  { type: 9, group: "behavior", text: "Je fuis les conflits et j'apaise les tensions autour de moi." },
  { type: 9, group: "behavior", text: "Je m'adapte aux désirs des autres et je m'efface pour préserver l'harmonie." },
  { type: 9, group: "behavior", text: "Je repousse mes propres priorités par inertie confortable." },
  { type: 9, group: "behavior", text: "Je reste calme et stable, même quand tout s'agite." },
  { type: 9, group: "behavior", text: "J'ai du mal à exprimer mes besoins et mes vraies envies." },
  { type: 9, group: "behavior", text: "Je préfère la stabilité et la routine aux changements." },
  { type: 9, group: "behavior", text: "Je résiste en silence quand on me pousse, sans affronter." },
  { type: 9, group: "deep", text: "Je redoute profondément les conflits et la séparation d'avec les autres." },
  { type: 9, group: "deep", text: "L'idée de perdre la connexion ou l'harmonie avec mes proches me terrifie." },
  { type: 9, group: "deep", text: "Ce qui me pousse fondamentalement à agir, c'est le maintien de la paix et de l'harmonie." },
];

export const GROUP_LABELS = {
  behavior: { label: "Mécanisme comportemental", icon: "⚡" },
  deep: { label: "Peur & motivation profonde", icon: "🔥" },
};