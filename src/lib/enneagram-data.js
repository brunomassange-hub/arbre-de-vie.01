// Enneagram type data — enriched descriptions for each of the 9 types
export const ENNEAGRAM_TYPES = [
  {
    num: 1,
    name: "Le Réformateur",
    center: "Instinctif",
    color: "#ef4444",
    desc: "Principe, intégrité, perfectionnisme. Consciencieux et idéaliste.",
    wings: [9, 2],
    stress: 4,
    growth: 7,
    definition: "Le Type 1 perçoit le monde comme fondamentalement imparfait et se sent moralement responsable de l'améliorer. Sa motivation profonde est d'être bon, intègre et juste ; sa peur fondamentale est d'être corrompu, défectueux ou moralement mauvais. Cette tension entre le désir de perfection et la peur de l'erreur façonne un comportement quotidien fait de vigilance, de rigueur et d'exigence — envers soi d'abord, puis envers les autres. Face aux autres, il se positionne comme un gardien des standards, parfois perçu comme jugeant ; face à lui-même, il entretient un dialogue intérieur sévère où le critique interne ne chôme jamais.",
    fonctionnement_detaille: "La fixation du Type 1 est le perfectionnisme — la certitude qu'il existe une 'bonne façon' de faire chaque chose et que s'en écarter est moralement condamnable. Ce piège mental le pousse à comparer sans cesse la réalité à un idéal inatteignable, générant frustration et ressentiment. La vertu qu'il cherche à développer est la sérénité — l'acceptation que le monde peut être bon sans être parfait. Au quotidien, cela se manifeste par une personne méticuleuse, ponctuelle et fiable, qui repère instantanément ce qui cloche, mais qui peut s'épuiser dans l'obsession du détail et la répression de sa colère.",
    forces: [
      "Intégrité morale — Engagement inébranlable envers ses principes, refusant les compromis éthiques même sous pression, ce qui en fait une personne de confiance.",
      "Conscienciosité — Soigneuse attention au détail et souci du travail bien fait, garantissant fiabilité et qualité dans tout ce qu'il entreprend.",
      "Sens de la justice — Capacité à identifier ce qui est juste ou injuste dans une situation, et courage de défendre les causes justes.",
      "Idéalisme constructif — Vision d'un monde meilleur qui motive l'action et inspire les autres à viser plus haut, plutôt qu'un simple rêve.",
      "Capacité d'amélioration — Talent pour repérer les dysfonctionnements et proposer des solutions concrètes, particulièrement utile en management et organisation."
    ],
    faiblesses: [
      "Perfectionnisme paralysant — Refus de finaliser un projet tant qu'il n'est pas irréprochable, entraînant une procrastination et une frustration persistante, comme remettre sans cesse un rapport important.",
      "Critique intérieur sévère — Voix interne punitive qui évalue chaque action et génère un sentiment chronique d'insuffisance, visible dans l'incapacité à célébrer ses succès.",
      "Ressentiment refoulé — Colère réprimée derrière une façade de contrôle, qui peut exploser soudainement sur un détail anodin, surprenant l'entourage.",
      "Rigidité — Difficulté à accepter les approches non conventionnelles ou les imprévus, créant des tensions avec les profils flexibles en équipe.",
      "Jugement des autres — Tendance à évaluer les autres selon ses propres standards élevés, ce qui peut créer un climat de pression et blesser sans le vouloir."
    ],
    relations: "En relation, le Type 1 est loyal, fiable et profondément engagé, mais peut être perçu comme critique ou exigeant. Il montre son affection par des actes concrets et un dévouement constant plutôt que par des démonstrations émotionnelles. En couple, il valorise la fiabilité et la croissance mutuelle mais doit apprendre à lâcher le besoin de tout corriger. En amitié, il est le confident droit et franc, celui qui dira la vérité même quand elle dérange. Au travail, il est le collègue scrupuleux qui garantit la qualité mais peut étouffer par ses standards.",
    stress_croissance: "Sous stress, le Type 1 migre vers les comportements du Type 4 (ligne de désintégration) : il devient mélancolique, ruminant ses imperfections, se sentant incompris et se repliant dans un monde intérieur douloureux. En croissance (ligne d'intégration vers le Type 7), il développe la spontanéité, la légèreté et la joie — il apprend à lâcher le contrôle, à savourer l'instant et à accepter que la vie puisse être belle même imparfaite.",
    ailes: "L'aile 9 adoucit le Type 1 : le rend plus patient, détendu et tolérant, moins rigide dans ses standards, mais peut accentuer la tendance à fuir les conflits. L'aile 2 intensifie le désir d'aider et d'être utile : le rend plus chaleureux et relationnel, mais peut ajouter un besoin d'approbation et une tendance à se sacrifier pour être reconnu."
  },
  {
    num: 2,
    name: "L'Altruiste",
    center: "Sentiment",
    color: "#f59e0b",
    desc: "Générosité, relations, amour. Aime aider et être apprécié.",
    wings: [1, 3],
    stress: 8,
    growth: 4,
    definition: "Le Type 2 perçoit le monde comme un réseau de relations à nourrir et se sent valorisé par sa capacité à répondre aux besoins d'autrui. Sa motivation profonde est d'être aimé et apprécié ; sa peur fondamentale est d'être indésirable, non aimé pour lui-même. Cette tension entre le désir d'amour et la peur du rejet façonne un comportement quotidien fait d'attention, de générosité et d'anticipation des besoins des autres. Face aux autres, il se positionne comme le donneur, le soutien inconditionnel ; face à lui-même, il a souvent du mal à reconnaître ses propres besoins, les subordonnant systématiquement à ceux des autres.",
    fonctionnement_detaille: "La fixation du Type 2 est la flatterie — non pas au sens hypocrite, mais comme tendance à adapter son comportement pour plaire et se rendre indispensable. Ce piège mental le pousse à donner compulsivement pour mériter l'amour, créant une dynamique de dette émotionnelle. La vertu qu'il cherche à développer est l'humilité — la reconnaissance que ses propres besoins sont légitimes et que l'amour véritable ne s'achète pas. Au quotidien, cela se manifeste par une personne chaleureuse, attentive et dévouée, qui anticipe les besoins des autres, mais qui peut s'épuiser et développer un ressentiment silencieux quand ses attentes invisibles ne sont pas rencontrées.",
    forces: [
      "Générosité authentique — Capacité à donner sincèrement et abondamment, créant un climat de chaleur et de soutien autour de lui.",
      "Empathie fine — Aptitude à percevoir les émotions et besoins d'autrui, souvent avant qu'ils ne les expriment, créant des connexions profondes.",
      "Chaleur relationnelle — Présence affectueuse qui met les autres en confiance et crée rapidement un sentiment de proximité authentique.",
      "Soutien inconditionnel — Engagement profond envers le bien-être des autres, particulièrement dans les moments difficiles, où il est le premier présent.",
      "Capacité à créer du lien — Talent pour rassembler les gens et créer une atmosphère de communauté, particulièrement dans les contextes sociaux."
    ],
    faiblesses: [
      "Négligence de soi — Tendance à ignorer systématiquement ses propres besoins, menant à un épuisement et à un ressentiment latent, comme oublier de se reposer pendant des semaines.",
      "Aide manipulatoire — Donner pour recevoir de la reconnaissance, créant des dettes émotionnelles invisibles qui étouffent les relations à long-terme.",
      "Difficulté à recevoir — Incapacité à accepter de l'aide ou des compliments, ce qui crée une asymétrie épuisante dans les relations.",
      "Ressentiment silencieux — Attentes non exprimées qui s'accumulent en colère refoulée, pouvant exploser soudainement après des mois de patience.",
      "Perte d'identité — Tendance à se définir uniquement par rapport aux autres, perdant de vue qui il est en dehors des relations."
    ],
    relations: "En relation, le Type 2 est chaleureux, dévoué et profondément attentif, mais peut étouffer par son besoin de se rendre indispensable. Il montre son affection par des actes de soin et une présence constante, mais attend souvent une reconnaissance qu'il ne demande pas explicitement. En couple, il est tendre et généreux mais peut développer une dépendance affective. En amitié, il est le pilier émotionnel toujours disponible mais qui s'oublie. Au travail, il crée un climat chaleureux mais peut avoir du mal à dire non.",
    stress_croissance: "Sous stress, le Type 2 migre vers les comportements du Type 8 (ligne de désintégration) : il devient directif, contrôlant et colérique, exigeant que les autres reconnaissent ce qu'il a fait pour eux. En croissance (ligne d'intégration vers le Type 4), il développe l'authenticité et l'introspection — il apprend à reconnaître et exprimer ses propres besoins, à cesser de se définir par le regard des autres et à cultiver une identité propre.",
    ailes: "L'aile 1 apporte structure et idéalisme : le rend plus rigide sur ses principes et perfectionniste dans son aide, mais peut accentuer le jugement moral. L'aile 3 ajoute ambition et sens de l'image : le rend plus orienté résultats et sociable, mais peut renforcer le besoin de validation externe et la tendance à se mettre en avant."
  },
  {
    num: 3,
    name: "Le Battant",
    center: "Sentiment",
    color: "#eab308",
    desc: "Succès, image, efficacité. Ambitieux et adaptable.",
    wings: [2, 4],
    stress: 9,
    growth: 6,
    definition: "Le Type 3 perçoit le monde comme une scène où la valeur se mesure aux résultats et à l'image projetée. Sa motivation profonde est d'être valorisé et admiré ; sa peur fondamentale est d'être sans valeur, un échec. Cette tension entre le désir de succès et la peur de l'échec façonne un comportement quotidien fait d'ambition, d'efficacité et d'adaptation constante. Face aux autres, il se positionne comme le performeur brillant, toujours à la hauteur ; face à lui-même, il entretient souvent une distance avec ses émotions authentiques, craignant que se montrer vulnérable ne dévoile une nullité intérieure.",
    fonctionnement_detaille: "La fixation du Type 3 est la vanité — non pas au sens narcissique simple, mais comme tendance à se confondre avec l'image qu'il projette et à mesurer sa valeur aux regards externes. Ce piège mental le pousse à performer compulsivement pour exister, créant un décalage entre l'image publique et le ressenti intérieur. La vertu qu'il cherche à développer est l'authenticité — la capacité à se connaître et s'aimer indépendamment des accomplissements. Au quotidien, cela se manifeste par une personne dynamique, efficace et charismatique, qui avance vite, mais qui peut perdre contact avec ses émotions et son identité profonde derrière le masque du succès.",
    forces: [
      "Ambition et efficacité — Capacité à se fixer des objectifs ambitieux et à les atteindre avec détermination, ce qui en fait un moteur de réussite.",
      "Adaptabilité — Talent pour s'ajuster aux situations et aux interlocuteurs, naviguant les environnements sociaux et professionnels avec aisance.",
      "Charisme — Présence naturelle qui inspire confiance et motivation, particulièrement utile en leadership et représentation.",
      "Orientation résultats — Capacité à focaliser l'énergie sur ce qui produit des résultats tangibles, maximisant l'efficacité des équipes et des projets.",
      "Capacité à inspirer — Talent pour motiver les autres et créer une dynamique positive, particulièrement dans les contextes de défi collectif."
    ],
    faiblesses: [
      "Suridentification à l'image — Tendance à confondre sa valeur avec ses réussites et le regard des autres, créant une fragilité identitaire, comme s'effondrer après un échec.",
      "Évitement émotionnel — Mise à l'écart des émotions jugées inefficaces (tristesse, peur, vulnérabilité), créant une coupure avec soi et les autres.",
      "Workaholisme — Incapacité à ralentir de peur de perdre sa valeur, menant à un épuisement et une négligence de la vie personnelle.",
      "Chameleonisme — Tendance à adapter son identité au contexte au point de ne plus savoir qui il est vraiment, créant une fragmentation du soi.",
      "Impatience avec l'inefficacité — Frustration visible face aux rythmes lents ou aux personnes jugées improductives, pouvant blesser sans le vouloir."
    ],
    relations: "En relation, le Type 3 est charmant, dynamique et orienté vers la croissance mutuelle, mais peut être perçu comme superficiel ou absent. Il montre son affection par des actes et des réussites partagées plutôt que par des confidences émotionnelles. En couple, il valorise un partenaire qui le soutient dans ses ambitions mais doit apprendre à être présent émotionnellement. En amitié, il est stimulant mais peut disparaître quand il performe. Au travail, il est le leader efficace mais peut écraser par son intensité.",
    stress_croissance: "Sous stress, le Type 3 migre vers les comportements du Type 9 (ligne de désintégration) : il devient apathique, désengagé, fuyant dans des activités sans but pour échapper à la pression de performance. En croissance (ligne d'intégration vers le Type 6), il développe la loyauté, la coopération et le sens du collectif — il apprend à s'engager pour les autres plutôt que pour son image, et à trouver sa valeur dans l'appartenance plutôt que dans l'admiration.",
    ailes: "L'aile 2 adoucit le Type 3 : le rend plus chaleureux, relationnel et attentionné aux besoins des autres, mais peut accentuer le besoin d'approbation. L'aile 4 apporte profondeur et authenticité : le rend plus introspectif et créatif, mais peut amplifier la sensibilité aux critiques et la tendance à se comparer défavorablement."
  },
  {
    num: 4,
    name: "L'Individualiste",
    center: "Sentiment",
    color: "#a855f7",
    desc: "Identité, authenticité, émotions. Créatif et sensible.",
    wings: [3, 5],
    stress: 2,
    growth: 1,
    definition: "Le Type 4 perçoit le monde comme un lieu où chacun cherche sa singularité et où la profondeur émotionnelle est la marque d'une vie authentique. Sa motivation profonde est de découvrir et affirmer son identité unique ; sa peur fondamentale est d'être ordinaire, sans identité propre. Cette tension entre le désir d'authenticité et la peur de la banalité façonne un comportement quotidien fait de recherche esthétique, d'intensité émotionnelle et de quête de sens. Face aux autres, il se positionne comme l'être à part, incompris dans sa singularité ; face à lui-même, il entretient un dialogue intérieur riche mais souvent teinté de mélancolie et de comparaison.",
    fonctionnement_detaille: "La fixation du Type 4 est l'envie — non pas la jalousie简单, mais comme tendance à se focaliser sur ce qui manque et à idéaliser ce que les autres possèdent. Ce piège mental le pousse à entretenir un sentiment de manque chronique, nourrissant une identité de 'personne à part'. La vertu qu'il cherche à développer est l'équanimité — l'équilibre émotionnel et l'acceptation de l'ordinaire comme suffisant. Au quotidien, cela se manifeste par une personne profondément authentique, créative et sensible, qui ressent le monde avec une intensité rare, mais qui peut s'enliser dans la mélancolie et l'isolement.",
    forces: [
      "Authenticité profonde — Engagement inébranlable envers sa vérité intérieure, refusant les masques sociaux, ce qui crée des connexions véritablement sincères.",
      "Créativité — Talent pour exprimer la beauté et la profondeur émotionnelle, particulièrement dans l'art, l'écriture et les domaines expressifs.",
      "Sensibilité émotionnelle — Capacité à ressentir et comprendre les nuances émotionnelles avec une finesse remarquable, créant une empathy rare.",
      "Capacité à trouver le sens — Aptitude à percevoir la signification cachée derrière les expériences et les relations, enrichissant la vie de profondeur.",
      "Esthétisme — Sens du beau qui enrichit chaque expérience et environnement, créant une qualité d'être et d'appréciation rare."
    ],
    faiblesses: [
      "Mélancolie chronique — Tendance à idéaliser ce qui manque et à dévaluer ce qui est présent, créant une insatisfaction persistante, comme envier la vie d'autrui sur les réseaux.",
      "Envy et comparaison — focalisation sur ce que les autres ont de meilleur, générant un sentiment d'incomplétude qui empoisonne les relations.",
      "Isolement — Retrait dans la singularité pour préserver l'identité, menant à une solitude subie et à une détérioration des liens sociaux.",
      "Dramatisation émotionnelle — Tendance à amplifier les émotions et à transformer les difficultés en tragédies, épuisant l'entourage par l'intensité.",
      "Indécision identitaire — Difficulté à s'engager par peur de trahir son authenticité, ce qui freine la concrétisation des projets et des relations."
    ],
    relations: "En relation, le Type 4 est intense, romantique et profondément authentique, mais peut être perçu comme dramatique ou exigeant. Il cherche une connexion de l'âme, une compréhension de sa singularité, et se déçoit quand la réalité ne correspond pas à son idéal. En couple, il est passionné et dévoué mais peut idéaliser puis dévaloriser son partenaire. En amitié, il préfère quelques liens profonds et authentiques. Au travail, il apporte créativité et profondeur mais peut fuir les routines.",
    stress_croissance: "Sous stress, le Type 4 migre vers les comportements du Type 2 (ligne de désintégration) : il devient dépendant affectif, cherchant désespérément l'attention et la validation des autres, se plaignant de ne pas être reconnu. En croissance (ligne d'intégration vers le Type 1), il développe la discipline, l'objectivité et l'action — il apprend à canaliser son intensité émotionnelle dans des projets concrets, à sortir de la rumination et à agir avec intégrité plutôt que de rester dans le ressenti.",
    ailes: "L'aile 3 apporte ambition et sociabilité : le rend plus orienté résultats et capable de s'adapter socialement, mais peut renforcer le besoin de se distinguer par les succès. L'aile 5 ajoute profondeur intellectuelle et introspection : le rend plus analytique et réservé, mais peut amplifier le retrait social et la tendance à vivre dans un monde intérieur coupé du réel."
  },
  {
    num: 5,
    name: "L'Observateur",
    center: "Mental",
    color: "#3b82f6",
    desc: "Savoir, compétence, autonomie. Analytique et curieux.",
    wings: [4, 6],
    stress: 7,
    growth: 8,
    definition: "Le Type 5 perçoit le monde comme un environnement intrusif et imprévisible dont il faut se protéger en accumulant savoir et ressources. Sa motivation profonde est d'être compétent et capable ; sa peur fondamentale est d'être envahi, incapable, ou de manquer de ressources. Cette tension entre le désir de maîtrise et la peur de l'épuisement façonne un comportement quotidien fait de retrait, d'observation et de thésaurisation cognitive. Face aux autres, il se positionne comme l'expert distant, gardien de son énergie ; face à lui-même, il entretient un monde intérieur riche mais souvent déconnecté du corps et de l'action.",
    fonctionnement_detaille: "La fixation du Type 5 est l'avarice — non pas matérielle, mais comme tendance à retenir énergie, temps et informations par peur de l'épuisement. Ce piège mental le pousse à accumuler du savoir sans jamais passer à l'action, créant un décalage entre la richesse intérieure et l'impact réel. La vertu qu'il cherche à développer est la générosité — la capacité à donner son énergie et à s'engager pleinement dans le monde. Au quotidien, cela se manifeste par une personne analytique, indépendante et curieuse, qui maîtrise rapidement les domaines complexes, mais qui peut se couper des autres et de l'action par peur de l'épuisement.",
    forces: [
      "Profondeur d'analyse — Capacité à comprendre les systèmes complexes et à percevoir les patterns cachés, ce qui en fait un expert reconnu dans son domaine.",
      "Autonomie — Indépendance de pensée et d'action remarquable, capable de travailler seul et d'explorer librement sans validation externe.",
      "Objectivité — Aptitude à juger les situations avec calme et rationalité, indépendamment des pressions émotionnelles, créant une vision claire.",
      "Curiosité intellectuelle — Soif de comprendre qui pousse à explorer en profondeur et à accumuler une expertise rare et précieuse.",
      "Calme face à l'imprévu — Sang-froid remarquable dans les situations tendues, capable de garder son recul et de trouver des solutions rationnelles."
    ],
    faiblesses: [
      "Isolement social — Retrait excessif dans le monde intérieur par peur de l'épuisement, créant une solitude subie et une détérioration des liens, comme fuir toute interaction sociale.",
      "Déconnexion du corps — Tendance à vivre dans la tête au détriment du corps et des sensations, négligeant santé, alimentation et activité physique.",
      "Avarice d'énergie — Réfus de s'engager par peur de l'épuisement, freinant les projets et les relations par une retenue systématique.",
      "Difficulté à agir — Accumulation de savoir sans passage à l'action, créant un décalage entre la richesse intérieure et l'impact réel, comme connaître une théorie sans jamais la pratiquer.",
      "Détachement émotionnel — Tendance à intellectualiser les émotions plutôt qu'à les ressentir, créant une distance perçue comme froideur par l'entourage."
    ],
    relations: "En relation, le Type 5 est loyal, intègre et profondément indépendant, mais peut être perçu comme distant ou fermé. Il montre son affection en partageant ses connaissances et en respectant l'autonomie de l'autre. Il a besoin de beaucoup d'espace personnel et fuit les exigences émotionnelles. En couple, il valorise un partenaire qui respecte son besoin de solitude. En amitié, il préfère les échanges intellectuels aux activités sociales. Au travail, il est l'expert fiable mais peu présent émotionnellement.",
    stress_croissance: "Sous stress, le Type 5 migre vers les comportements du Type 7 (ligne de désintégration) : il devient dispersé, cherchant des stimulations et des distractions, fuyant l'angoisse dans l'hyperactivité mentale et la quête de nouveauté. En croissance (ligne d'intégration vers le Type 8), il développe la confiance, l'action et la présence — il apprend à s'engager pleinement dans le monde, à passer du savoir à l'action, et à utiliser son expertise avec impact plutôt que de la thésauriser.",
    ailes: "L'aile 4 apporte profondeur émotionnelle et créativité : le rend plus sensible, artistique et expressif, mais peut amplifier la mélancolie et le retrait. L'aile 6 ajoute loyauté et anxiété : le rend plus attaché aux groupes et plus vigilant face aux menaces, mais peut accentuer le doute et la quête de sécurité."
  },
  {
    num: 6,
    name: "Le Loyaliste",
    center: "Mental",
    color: "#06b6d4",
    desc: "Sécurité, soutien, certitude. Loyal et vigilant.",
    wings: [5, 7],
    stress: 3,
    growth: 9,
    definition: "Le Type 6 perçoit le monde comme un environnement incertain et potentiellement dangereux où il faut anticiper les menaces et sécuriser les alliances. Sa motivation profonde est d'être en sécurité et soutenu ; sa peur fondamentale est d'être sans soutien, sans guidance, exposé au danger. Cette tension entre le désir de sécurité et la peur de l'abandon façonne un comportement quotidien fait de vigilance, de loyauté et de recherche de certitude. Face aux autres, il se positionne comme le fidèle allié, toujours prêt à défendre le groupe ; face à lui-même, il entretient un dialogue intérieur fait de doute et de scénarios catastrophe.",
    fonctionnement_detaille: "La fixation du Type 6 est le doute — la tendance à remettre en question les certitudes, y compris les siennes, par peur de l'erreur et de la trahison. Ce piège mental le pousse à anticiper les pires scénarios et à chercher frénétiquement des garanties externes. La vertu qu'il cherche à développer est le courage — non l'absence de peur, mais la capacité à agir malgré elle et à faire confiance à sa propre voix intérieure. Au quotidien, cela se manifeste par une personne loyale, responsable et vigilante, qui anticipe les risques et soutient le groupe, mais qui peut se perdre dans l'angoisse et la quête de réassurance.",
    forces: [
      "Loyauté — Engagement profond et fiable envers les personnes et les causes, ce qui en fait un allié précieux et un partenaire de confiance.",
      "Vigilance — Capacité à anticiper les risques et les menaces, repérant les failles que les autres ignorent, particulièrement utile en gestion de crise.",
      "Sens de la responsabilité — Engagement sérieux envers les obligations et les engagements, capable de soutenir des charges importantes avec fiabilité.",
      "Esprit communautaire — Talent pour créer de la cohésion et du soutien mutuel, rassemblant les gens autour de valeurs et de causes communes.",
      "Capacité d'analyse critique — Aptitude à évaluer les situations sous tous les angles et à identifier les inconsistances dans les arguments."
    ],
    faiblesses: [
      "Anxiété chronique — Tendance à anticiper les pires scénarios, générant un stress constant qui épuise l'énergie, comme imaginer des catastrophes avant chaque réunion.",
      "Indécision par doute — Difficulté à trancher par peur de se tromper, retardant les décisions importantes et frustant l'entourage.",
      "Suspicion — Tendance à douter des intentions d'autrui, même sans motif, créant des tensions et freinant la confiance dans les relations.",
      "Dépendance à l'autorité — Oscillation entre soumission et rébellion face aux figures d'autorité, créant des dynamiques relationnelles instables.",
      "Rumination mentale — Tendance à rejouer les situations et à chercher frénétiquement des réassurances, épuisant l'entourage par les questions répétées."
    ],
    relations: "En relation, le Type 6 est loyal, dévoué et profondément fiable, mais peut être perçu comme anxieux ou méfiant. Il montre son affection par son engagement et sa disponibilité constante, mais a besoin d'être rassuré sur la solidité du lien. En couple, il valorise la sécurité et la loyauté mutuelle mais doit apprendre à faire confiance. En amitié, il est l'allié fidèle toujours présent dans les moments difficiles. Au travail, il est le collaborateur consciencieux qui anticipe les risques.",
    stress_croissance: "Sous stress, le Type 6 migre vers les comportements du Type 3 (ligne de désintégration) : il devient travailleur compulsif, cherchant la validation par l'action et l'image, fuyant l'angoisse dans l'hyperactivité. En croissance (ligne d'intégration vers le Type 9), il développe la sérénité, la confiance et le lâcher-prise — il apprend à faire confiance au flux de la vie, à cesser d'anticiper les menaces et à trouver la paix dans l'instant présent.",
    ailes: "L'aile 5 apporte profondeur analytique et autonomie : le rend plus introverti et intellectuel, mais peut amplifier le retrait et la suspicion. L'aile 7 ajoute optimisme et sociabilité : le rend plus ouvert, curieux et aventurier, mais peut créer une tendance à fuir l'angoisse dans la distraction et la quête de nouveauté."
  },
  {
    num: 7,
    name: "L'Épicurien",
    center: "Mental",
    color: "#22c55e",
    desc: "Plaisir, liberté, variété. Optimiste et spontané.",
    wings: [6, 8],
    stress: 1,
    growth: 5,
    definition: "Le Type 7 perçoit le monde comme un buffet infini d'expériences à savourer et de possibilités à explorer. Sa motivation profonde est d'être libre, heureux et comblé ; sa peur fondamentale est d'être privé, bloqué, ou confronté à la douleur. Cette tension entre le désir de plénitude et la peur de la souffrance façonne un comportement quotidien fait d'enthousiasme, de spontanéité et de fuite vers le nouveau. Face aux autres, il se positionne comme l'animateur joyeux, toujours partant ; face à lui-même, il entretient une stratégie d'évitement systématique de tout ce qui pourrait faire mal.",
    fonctionnement_detaille: "La fixation du Type 7 est la planification — non pas au sens organisé, mais comme tendance à anticiper compulsivement la prochaine expérience pour ne pas rester avec l'instant présent. Ce piège mental le pousse à fuir la difficulté et la douleur vers de nouvelles possibilités, créant une dispersion chronique. La vertu qu'il cherche à développer est la sobriété — la capacité à rester avec l'instant présent, même inconfortable, et à trouver la profondeur dans la retenue. Au quotidien, cela se manifeste par une personne enthousiaste, créative et optimiste, qui inspire et embarque les autres, mais qui peut fuir les engagements et les émotions difficiles.",
    forces: [
      "Optimisme contagieux — Capacité à voir le positif et à insuffler une énergie joyeuse, ce qui en fait un animateur naturel de groupe.",
      "Créativité foisonnante — Talent pour générer des idées originales et explorer des perspectives inattendues, particulièrement utile en innovation.",
      "Spontanéité — Capacité à saisir l'instant et à créer des moments mémorables, rendant chaque expérience vivante et stimulante.",
      "Adaptabilité — Flexibilité remarquable qui permet de s'ajuster aux imprévus et de trouver des opportunités dans les changements.",
      "Capacité à inspirer — Talent pour révéler le potentiel des situations et des personnes, motivant les autres à viser plus haut."
    ],
    faiblesses: [
      "Évitement de la douleur — Fuite systématique des émotions difficiles par la distraction et le plaisir, créant une accumulation de tensions non traitées, comme fuir un deuil dans l'hyperactivité.",
      "Dispersion — Multiplication des projets et engagements sans approfondir, freinant l'expertise et la concrétisation des ambitions.",
      "Difficulté à s'engager — Peur de l'enfermement qui pousse à fuir les engagements long-terme, tant professionnels que relationnels.",
      "Impulsivité — Tendance à agir sous le coup de l'enthousiasme sans réfléchir aux conséquences, menant à des erreurs évitables et des regrets.",
      "Intolérance à l'ennui — Incapacité à rester avec la monotonie ou la frustration, créant une instabilité qui épuise l'entourage par les changements constants."
    ],
    relations: "En relation, le Type 7 est joyeux, stimulant et plein de vie, mais peut être perçu comme superficiel ou fuyant. Il montre son affection par des expériences partagées et des moments intenses, mais fuit les conversations difficiles. En couple, il valorise l'aventure et la liberté mais doit apprendre à rester dans la difficulté. En amitié, il est le moteur du groupe, toujours partant pour de nouvelles expériences. Au travail, il apporte créativité et dynamisme mais peut laisser les projets inachevés.",
    stress_croissance: "Sous stress, le Type 7 migre vers les comportements du Type 1 (ligne de désintégration) : il devient rigide, critique et perfectionniste, imposant des standards élevés et devenant intolérant à l'imperfection. En croissance (ligne d'intégration vers le Type 5), il développe la profondeur, le focus et la contemplation — il apprend à rester avec une idée, à l'approfondir vraiment, et à trouver la satisfaction dans la maîtrise plutôt que dans la dispersion.",
    ailes: "L'aile 6 apporte loyauté et anxiété : le rend plus attaché aux groupes et plus conscient des risques, mais peut créer une tension entre le désir de liberté et le besoin de sécurité. L'aile 8 ajoute puissance et assertivité : le rend plus directif et charismatique, mais peut amplifier l'intensité et la tendance à imposer ses envies."
  },
  {
    num: 8,
    name: "Le Protecteur",
    center: "Instinctif",
    color: "#dc2626",
    desc: "Pouvoir, justice, contrôle. Franc et protecteur.",
    wings: [7, 9],
    stress: 5,
    growth: 2,
    definition: "Le Type 8 perçoit le monde comme un environnement où les forts dominent et où il faut se protéger pour ne pas être dominé. Sa motivation profonde est d'être fort, maître de soi et de sa vie ; sa peur fondamentale est d'être contrôlé, blessé ou vulnérable. Cette tension entre le désir de puissance et la peur de la vulnérabilité façonne un comportement quotidien fait d'intensité, de franchise et de protection. Face aux autres, il se positionne comme le protecteur puissant, le défenseur des faibles ; face à lui-même, il entretient une armure qui masque une tendresse souvent inaccessible.",
    fonctionnement_detaille: "La fixation du Type 8 est l'excès — la tendance à amplifier l'intensité, à pousser les limites et à refuser la modération par peur de paraître faible. Ce piège mental le pousse à dominer pour se sentir en sécurité, créant des relations de pouvoir. La vertu qu'il cherche à développer est l'innocence — la capacité à montrer sa vulnérabilité et à faire confiance sans calcul. Au quotidien, cela se manifeste par une personne puissante, franche et protectrice, qui défend les siens avec courage, mais qui peut écraser par son intensité et fuir la tendresse par peur de la vulnérabilité.",
    forces: [
      "Courage — Capacité à affronter les défis et à défendre les causes justes avec une détermination remarquable, ce qui en fait un leader naturel.",
      "Protection des faibles — Engagement profond envers la défense des vulnérables, refusant l'injustice et intervenant avec force quand il le faut.",
      "Franchise — Authenticité directe qui dit les choses comme elles sont, créant un climat de confiance et de clarté dans les relations.",
      "Leadership charismatique — Présence puissante qui inspire et mobilise, capable de rassembler et de diriger avec naturel et intensité.",
      "Résilience — Capacité à encaisser les coups et à rebondir, affrontant l'adversité avec une force d'âme peu commune."
    ],
    faiblesses: [
      "Domination — Tendance à imposer sa volonté et à écraser les autres par son intensité, créant un climat de peur, comme imposer ses décisions sans consulter.",
      "Refus de la vulnérabilité — Masquage systématique de la sensibilité derrière la force, créant une distance émotionnelle qui isole et empêche l'intimité.",
      "Colère explosive — Réactions intenses face aux frustrations, pouvant blesser les proches et créer des tensions dans les relations.",
      "Contrôle excessif — Besoin de tout piloter par peur d'être dominé, freinant la délégation et étouffant l'initiative des collaborateurs.",
      "Confrontation inutile — Tendance à transformer les échanges en rapports de force, même quand ce n'est pas nécessaire, épuisant l'entourage."
    ],
    relations: "En relation, le Type 8 est loyal, protecteur et intensément présent, mais peut être perçu comme dominant ou écrasant. Il montre son affection par des actes de protection et une présence forte, mais fuit la vulnérabilité et la tendresse. En couple, il est passionné et dévoué mais doit apprendre à montrer sa sensibilité. En amitié, il est le protecteur fidèle toujours présent dans les moments difficiles. Au travail, il est le leader charismatique mais peut étouffer par son intensité.",
    stress_croissance: "Sous stress, le Type 8 migre vers les comportements du Type 5 (ligne de désintégration) : il se replie, devient distant, secret et méfiant, thésaurisant énergie et informations par peur de l'épuisement. En croissance (ligne d'intégration vers le Type 2), il développe la tendresse, la générosité et l'ouverture du cœur — il apprend à montrer sa vulnérabilité, à donner sans calcul, et à trouver la véritable force dans la douceur plutôt que dans la domination.",
    ailes: "L'aile 7 apporte enthousiasme et aventurisme : le rend plus optimiste, sociable et spontané, mais peut amplifier l'impulsivité et la quête de stimulation. L'aile 9 ajoute patience et douceur : le rend plus calme, accommodant et diplomate, mais peut accentuer la tendance à fuir les conflits et à se endormir dans le confort."
  },
  {
    num: 9,
    name: "Le Médiateur",
    center: "Instinctif",
    color: "#14b8a6",
    desc: "Paix, harmonie, union. Doux et accommodant.",
    wings: [8, 1],
    stress: 6,
    growth: 3,
    definition: "Le Type 9 perçoit le monde comme un lieu de tensions à apaiser et de conflits à éviter pour préserver l'harmonie. Sa motivation profonde est d'être en paix, en harmonie avec soi et les autres ; sa peur fondamentale est de la disruption, du conflit, de la séparation. Cette tension entre le désir de paix et la peur du conflit façonne un comportement quotidien fait d'accommodement, de douceur et de fusion avec l'environnement. Face aux autres, il se positionne comme le médiateur calme, le pacificateur ; face à lui-même, il entretient une tendance à s'effacer et à se déconnecter de ses propres désirs.",
    fonctionnement_detaille: "La fixation du Type 9 est la paresse — non pas au sens de l'inaction, mais comme tendance à s'oublier et à différer ses propres priorités pour maintenir l'harmonie. Ce piège mental le pousse à fusionner avec l'environnement et à fuir l'action par inertie confortable. La vertu qu'il cherche à développer est l'action — la capacité à se réveiller, à s'affirmer et à poursuivre ses propres priorités avec vitalité. Au quotidien, cela se manifeste par une personne douce, accommodante et apaisante, qui crée un climat de sérénité, mais qui peut s'éteindre, fuir les conflits et négliger ses propres besoins.",
    forces: [
      "Capacité de médiation — Talent pour apaiser les tensions et rassembler les points de vue, ce qui en fait un pacificateur naturel dans les conflits.",
      "Calme et stabilité — Présence apaisante qui crée un climat de sécurité et de sérénité, particulièrement dans les contextes tendus.",
      "Acceptation de l'autre — Capacité à voir et respecter les différents points de vue sans juger, créant un climat d'inclusion authentique.",
      "Patience — Tolérance remarquable face aux lenteurs et aux difficultés, capable de soutenir les processus longs sans s'épuiser.",
      "Sens de l'harmonie — Talent pour créer un climat de cohésion et de bien-être collectif, rassemblant les gens autour d'une atmosphère apaisée."
    ],
    faiblesses: [
      "Inertie et procrastination — Tendance à repousser les actions importantes et à s'enliser dans le confort, comme rester dans une situation insatisfaisante pendant des années par inertie.",
      "Évitement des conflits — Peur de la confrontation qui pousse à enfouir les tensions, laissant les problèmes se dégrader en silence jusqu'à l'explosion.",
      "Perte de soi — Tendance à fusionner avec les désirs des autres et à oublier les siens, créant une érosion de l'identité et du désir.",
      "Passivité — Attente que les choses se fassent toutes seules ou par les autres, freinant l'initiative et la concrétisation des aspirations.",
      "Résistance sourde — Refus de coopérer par inertie passive-agressive quand il se sent poussé, créant des blocages invisibles dans les projets."
    ],
    relations: "En relation, le Type 9 est doux, accommodant et profondément loyal, mais peut être perçu comme passif ou absent. Il montre son affection par sa présence stable et son soutien constant, mais a du mal à exprimer ses propres besoins. En couple, il valorise l'harmonie et la stabilité mais doit apprendre à s'affirmer. En amitié, il est le confident apaisant toujours disponible. Au travail, il est le collègue diplomate qui crée la cohésion mais peut fuir les décisions difficiles.",
    stress_croissance: "Sous stress, le Type 9 migre vers les comportements du Type 6 (ligne de désintégration) : il devient anxieux, méfiant, imaginant des menaces et cherchant frénétiquement des réassurances. En croissance (ligne d'intégration vers le Type 3), il développe la vitalité, l'ambition et l'action — il apprend à se réveiller, à poursuivre ses propres priorités avec énergie, et à trouver sa valeur dans l'action et la concrétisation plutôt que dans la passivité.",
    ailes: "L'aile 8 apporte puissance et assertivité : le rend plus direct, confiant et capable de s'imposer, mais peut créer une tension entre le désir de paix et le besoin de contrôle. L'aile 1 ajoute idéalisme et structure : le rend plus perfectionniste et orienté principes, mais peut amplifier le jugement et la rigidité interne."
  },
];

export const CENTERS = {
  Instinctif: { color: "#dc2626", label: "Instinctif (Ventre)" },
  Sentiment: { color: "#f59e0b", label: "Sentiment (Cœur)" },
  Mental: { color: "#3b82f6", label: "Mental (Tête)" },
};