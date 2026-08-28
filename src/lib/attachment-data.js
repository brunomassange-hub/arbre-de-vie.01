// 24 questions: 12 anxiety, 12 avoidance
// Scale: 1 (pas du tout d'accord) to 5 (tout à fait d'accord)
export const ATTACHMENT_QUESTIONS = [
  // --- Anxiété d'attachement (12) ---
  { dim: "anxiety", text: "Je crains souvent que mon partenaire ne m'aime plus autant qu'avant." },
  { dim: "anxiety", text: "J'ai besoin d'être rassuré(e) régulièrement sur les sentiments de l'autre envers moi." },
  { dim: "anxiety", text: "Quand mon partenaire est distant, je panique intérieurement." },
  { dim: "anxiety", text: "Je surveille constamment les signes de désintérêt chez l'autre." },
  { dim: "anxiety", text: "L'idée d'être abandonné(e) me terrifie." },
  { dim: "anxiety", text: "Je me sens souvent insuffisant(e) ou indigne d'être aimé(e)." },
  { dim: "anxiety", text: "J'ai tendance à trop m'inquiéter pour mes relations." },
  { dim: "anxiety", text: "Si mon partenaire ne répond pas tout de suite, je suppose que quelque chose ne va pas." },
  { dim: "anxiety", text: "J'arrive difficilement à faire confiance à la constance des sentiments de l'autre envers moi." },
  { dim: "anxiety", text: "Je deviens très anxieux(se) quand je ne sais pas où est mon partenaire." },
  { dim: "anxiety", text: "J'ai l'impression que je m'investis plus dans mes relations que l'autre personne." },
  { dim: "anxiety", text: "La moindre distance émotionnelle me fait sentir rejeté(e)." },
  // --- Évitement d'attachement (12) ---
  { dim: "avoidance", text: "Je me sens mal à l'aise quand quelqu'un devient trop proche de moi émotionnellement." },
  { dim: "avoidance", text: "J'ai du mal à exprimer mes besoins et mes émotions à mon partenaire." },
  { dim: "avoidance", text: "Je préfère garder mon indépendance plutôt que de me sentir dépendant(e) de quelqu'un." },
  { dim: "avoidance", text: "Quand on devient intime, j'ai envie de prendre de la distance." },
  { dim: "avoidance", text: "Il m'est difficile de me confier et de me rendre vulnérable." },
  { dim: "avoidance", text: "Je me sens étouffé(e) quand une relation devient trop sérieuse." },
  { dim: "avoidance", text: "Je préfère compter sur moi-même plutôt que de demander de l'aide." },
  { dim: "avoidance", text: "L'engagement à long terme me fait peur." },
  { dim: "avoidance", text: "Je mets plus de temps que les autres à tomber amoureux(se)." },
  { dim: "avoidance", text: "Je n'aime pas partager mes sentiments les plus profonds." },
  { dim: "avoidance", text: "Quand mon partenaire a besoin de soutien émotionnel, je me sens démuni(e)." },
  { dim: "avoidance", text: "J'ai tendance à minimiser l'importance de mes relations intimes." },
];

export const ATTACHMENT_SCALE = [
  { value: 1, label: "Pas du tout\nd'accord" },
  { value: 2, label: "Plutôt pas\nd'accord" },
  { value: 3, label: "Neutre" },
  { value: 4, label: "Plutôt\nd'accord" },
  { value: 5, label: "Tout à fait\nd'accord" },
];

export const ATTACHMENT_STYLES = {
  secure: {
    id: "secure",
    label: "Sécure",
    color: "#22c55e",
    icon: "🛡️",
    caractéristiques: "Vous êtes à l'aise avec l'intimité et l'autonomie. Vous faites confiance naturellement, communiquez ouvertement vos besoins et êtes disponible émotionnellement pour votre partenaire.",
    peur: "Peur modérée de perdre la relation, mais sans anxiété paralysante. Vous savez que vous pouvez compter sur vous-même et sur l'autre.",
    comportements: "Vous recherchez la proximité de manière saine, exprimez vos besoins clairement, soutenez votre partenaire sans vous perdre vous-même.",
    stress: "Conflits majeurs, trahisons de confiance, ruptures brutales. Vous récupérez généralement bien grâce à votre résilience émotionnelle.",
    definition: "Le style sécure se construit lorsqu'un enfant a bénéficié de figures d'attachement suffisamment fiables et cohérentes : un parent présent, sensible aux signaux émotionnels et capable de répondre de manière ajustée à ses besoins. Cette base sécurisante permet d'intégrer que l'on peut compter sur autrui tout en développant ses propres ressources internes. La logique interne de ce style repose sur un équilibre dynamique entre proximité et autonomie : la relation est vécue comme un refuge et non comme une menace à l'indépendance. La personne sécure a intériorisé un modèle opérant positif — « je vaux la peine d'être aimé » et « l'autre est digne de confiance » — qui guide ses relations adultes.",
    fonctionnement_detaille: "Dans les relations proches, la personne sécure ose la vulnérabilité : elle exprime ses émotions sans crainte d'être jugée, demande de l'aide quand elle en a besoin et accepte que l'autre ait ses propres limites. Face à un désaccord, elle privilégie le dialogue et la recherche de solution plutôt que le repli ou l'accusation. Ses schémas de pensée restent flexibles : elle n'interprète pas automatiquement un silence comme un rejet ni une distance comme un abandon. Elle tolère l'autonomie du partenaire sans ressentir d'insécurité, et peut passer du temps seule sans que cela menace son sentiment d'être aimée.",
    forces: [
      "Capacité à s'engager authentiquement sans se perdre soi-même, ce qui nourrit des relations équilibrées et durables.",
      "Régulation émotionnelle souple : on ressent la détresse sans s'effondrer, ce qui permet de rester présent à l'autre et à soi.",
      "Confiance communicative : on exprime ses besoins clairement, ce qui limite les malentendus et les ressentiments accumulés.",
    ],
    faiblesses: [
      "Peut sous-estimer la détresse d'un partenaire au style insécurisé, en pensant qu'un simple dialogue suffira à le rassurer.",
      "Tendance à banaliser certains signaux d'alerte (retrait, rumeur, trahison légère) jusqu'à ce qu'ils deviennent patents.",
      "En contexte de trahison répétée, peut basculer temporairement vers de l'anxiété ou de l'évitement défensif.",
    ],
    developpement: [
      "Cultivez votre capacité à reconnaître les styles d'attachement de vos proches pour ajuster votre accompagnement à leurs besoins spécifiques.",
      "Maintenez votre équilibre en continuant à nourrir votre autonomie personnelle (centres d'intérêt, projets) autant que la relation.",
      "Servez de « figure sécure » rassurante pour les personnes insécures de votre entourage, sans vous eriger en thérapeute.",
    ],
  },
  anxious: {
    id: "anxious",
    label: "Anxieux-préoccupé",
    color: "#f59e0b",
    icon: "💭",
    caractéristiques: "Vous désirez ardemment la proximité mais craignez constamment d'être abandonné. Vous avez besoin de beaucoup de réassurance et pouvez devenir dépendant(e) émotionnellement.",
    peur: "La peur de l'abandon et du rejet. Vous redoutez que l'autre ne s'éloigne ou ne vous aime plus.",
    comportements: "Vous surinvestissez dans la relation, cherchez constamment des signes d'amour, pouvez devenir possessif/ve ou jaloux/se. Vous avez du mal à laisser l'autre avoir son espace.",
    stress: "Silence de l'autre, distance perçue, manque de réponse rapide, ambiguïté dans les messages, vue de l'autre avec d'autres personnes.",
    definition: "Le style anxieux-préoccupé prend souvent racine dans des expériences précoces d'attachement incohérent : un parent tour à tour chaleureux et indisponible, dont les réponses étaient imprévisibles. L'enfant a appris qu'il devait « augmenter le signal » — pleurer plus fort, s'accrocher, s'agiter — pour obtenir de l'attention. Cette stratégie devient un modèle opérant dans lequel on se perçoit comme insuffisamment aimable et l'autre comme susceptible de disparaître. La logique interne repose sur l'hyperactivation : plus on est vigilant, plus on pense pouvoir prévenir l'abandon. La proximité est vécue comme vitale, et l'autonomie comme une menace d'isolement.",
    fonctionnement_detaille: "Dans les relations amoureuses, la personne anxieuse surinvestit : elle pense constamment à l'autre, interprète le moindre signe, vérifie ses sentiments. Un message non répondu peut déclencher une cascade de scénarios catastrophes. Dans l'amitié, elle craint d'être oubliée si elle n'est pas toujours disponible. Ses schémas de pensée sont marqués par la rumination (« ai-je dit quelque chose de mal ? ») et la personnalisations systématique (« s'il s'éloigne, c'est de ma faute »). Elle peut développer un sentiment d'insuffisance, se comparer défavorablement aux ex ou à d'autres figures, et chercher dans la relation une validation de sa valeur.",
    forces: [
      "Grande sensibilité émotionnelle et capacité à percevoir les nuances de l'état affectif de l'autre, précieux en relations proches.",
      "Engagement et dévouement authentiques : quand on aime, on investit pleinement et avec sincérité.",
      "Honnêteté émotionnelle : on n'hésite pas à verbaliser ce qu'on ressent, ce qui peut ouvrir des dialogues authentiques.",
    ],
    faiblesses: [
      "Surinterprétation des signaux neutres (un silence, un regard) comme des indices de rejet, créant des crises évitables.",
      "Comportements de vérification répétés (messages, réseaux sociaux, questions) qui peuvent étouffer le partenaire.",
      "Tendance à rester dans des relations insatisfaisantes par peur de la solitude, acceptant moins que ce que l'on mérite.",
    ],
    developpement: [
      "Apprenez à identifier la différence entre un sentiment d'insécurité et un fait objectif : notez les preuves réelles avant de conclure au rejet.",
      "Développez des sources d'estime de soi indépendantes de la relation (projets, passions, amitiés) pour ne pas tout attendre de l'autre.",
      "Pratiquez l'auto-apaisement avant de chercher la réassurance : respirer, différer l'envoi d'un message inquiet de quelques heures.",
    ],
  },
  avoidant: {
    id: "avoidant",
    label: "Évitant-détaché",
    color: "#3b82f6",
    icon: "🏔️",
    caractéristiques: "Vous valorisez votre indépendance avant tout et vous sentez mal à l'aise avec l'intimité émotionnelle. Vous préférez compter sur vous-même et gardez une distance émotionnelle.",
    peur: "La peur de perdre votre autonomie, d'être envahi(e) ou étouffé(e) par les besoins de l'autre.",
    comportements: "Vous minimisez l'importance des relations, évitez la vulnérabilité, vous repliez quand ça devient trop intime. Vous avez du mal à exprimer vos émotions et vos besoins.",
    stress: "Demandes d'intimité accrues, attentes émotionnelles du partenaire, sentiments d'intrusion, perte d'espace personnel.",
    definition: "Le style évitant-détaché se forme souvent lorsque l'enfant a reçu des messages — parfois subtils — selon lesquels ses besoins émotionnels étaient une charge ou une faiblesse. Un parent peu expressif, qui valorisait l'autonomie précoce ou décourageait les manifestations d'attachement, transmet l'idée que compter sur autrui est risqué. Le modèle opérant devient « je dois me suffire à moi-même » et « la proximité expose au danger ». La logique interne repose sur la désactivation : pour rester en sécurité, on réduit les signaux d'attachement, on coupe l'accès à ses propres émotions et on garde une distance qui empêche d'être blessé.",
    fonctionnement_detaille: "Dans les relations proches, la personne évitante se montre fiable sur le plan concret mais reste difficile à atteindre émotionnellement. Elle peut sembler présente tout en restant inaccessible, traiter les sujets intimes par la rationalisation ou l'humour. En amour, elle repousse l'engagement, allonge les délais avant de définir la relation, et peut se sentir « étouffée » dès que le partenaire demande plus de proximité. Ses schémas de pensée valorisent l'indépendance et dévalorisent le besoin : « je n'ai pas besoin de personne », « les émotions compliquent tout ». Sous la surface, elle peut néanmoins ressentir de la solitude sans se l'autoriser.",
    forces: [
      "Autonomie et autarcie émotionnelle solides, précieuses face aux imprévus et aux ruptures de la vie.",
      "Calme et stabilité apparente dans les crises, qui peuvent rassurer un partenaire plus anxieux.",
      "Capacité à respecter l'espace de l'autre et à ne pas étouffer, ce qui préserve la liberté dans la relation.",
    ],
    faiblesses: [
      "Difficulté à exprimer affection et besoins, laissant le partenaire se sentir non aimé ou indésirable.",
      "Tendance à se retirer précisément quand l'autre a le plus besoin de soutien, créant des ruptures de confiance.",
      "Minimisation des relations importantes (« on n'est pas si attaché ») qui empêche de voir leur valeur et d'investir pleinement.",
    ],
    developpement: [
      "Exercez-vous à nommer une émotion par jour, même minuscule, pour réapprendre le chemin de la vie affective.",
      "Repérez vos schémas de retrait automatique et essayez de rester présent 10 minutes de plus avant de vous éloigner.",
      "Acceptez que dépendre ponctuellement de l'autre n'est pas une faiblesse : choisissez une confiance à partager volontairement.",
    ],
  },
  fearful: {
    id: "fearful",
    label: "Craintif-évitant",
    color: "#8b5cf6",
    icon: "🌊",
    caractéristiques: "Vous voulez la proximité mais en avez simultanément peur. Vous oscillez entre le besoin de connexion et le besoin de fuite, ce qui crée une instabilité relationnelle.",
    peur: "Peur simultanée de l'abandon ET de l'intimité. Vous voulez être aimé(e) mais craignez d'être blessé(e).",
    comportements: "Vous vous rapprochez puis vous éloignez. Vous pouvez sembler imprévisible. Vous avez du mal à faire confiance tout en désirant désespérément la connexion.",
    stress: "Toute situation qui crée à la fois proximité et vulnérabilité. Les engagements, les conflits, les moments de vulnérabilité partagée peuvent déclencher la fuite.",
    definition: "Le style craintif-évitant naît typiquement d'expériences précoces où la figure d'attachement était à la fois source de réconfort et source de peur — un parent effrayant, instable, ou à qui l'enfant devait lui-même s'interdire de s'attacher pour se protéger. L'enfant apprend que la proximité est désirable mais dangereuse : on a besoin de l'autre, mais s'en approcher expose à la blessure. Le modèle opérant est double et conflictuel : « je mérite à peine d'être aimé » ET « l'autre est susceptible de me faire du mal ». La logique interne oscille entre hyperactivation (désir de connexion) et désactivation (besoin de fuite), sans parvenir à stabiliser l'une ou l'autre.",
    fonctionnement_detaille: "Dans les relations proches, la personne craintive-évitante alterne phases de rapprochement intense et phases de retrait brutal. Elle peut se confier profondément puis, effrayée par sa propre vulnérabilité, devenir froide ou distante. En amour, elle attire souvent des partenaires eux-mêmes instables, ce qui confirme sa conviction que l'amour est risqué. Ses schémas de pensée associent proximité et danger, intimité et trahison. Les engagements peuvent être vécus comme des pièges, les conflits comme des abandons, et les moments tendres comme des menaces imminentes.",
    forces: [
      "Profondeur émotionnelle et capacité d'empathie aiguisée par la souffrance, qui nourrit un regard sensible sur autrui.",
      "Grande authenticité intérieure : on connaît ses contradictions et on peut, avec le temps, les explorer avec lucidité.",
      "Honnêteté sur sa propre complexité, propice à un travail thérapeutique sincère et durable.",
    ],
    faiblesses: [
      "Alternance rapprochement/retrait qui déstabilise le partenaire et entretient des relations chaotiques.",
      "Auto-sabotage : on peut rompre une relation satisfaisante par peur anticipée de la blessure.",
      "Tendance à interpréter la bienveillance de l'autre comme suspecte, ce qui empêche de recevoir l'amour proposé.",
    ],
    developpement: [
      "Cherchez un accompagnement thérapeutique régulier : ce style bénéficie particulièrement d'une relation sécurisante et stable à explorer.",
      "Identifiez vos cycles rapprochement-fuite et apprenez à signaler votre besoin d'espace plutôt qu'à disparaître.",
      "Construisez des relations sécurisantes par étapes très progressives, en tolérant la vulnérabilité sans vous précipiter vers l'engagement total.",
    ],
  },
};

// Determine style from anxiety and avoidance means (each 1-5)
// Threshold: mean >= 3.0 = "high", < 3.0 = "low"
export function determineAttachmentStyle(anxietyMean, avoidanceMean) {
  const highAnxiety = anxietyMean >= 3.0;
  const highAvoidance = avoidanceMean >= 3.0;
  if (!highAnxiety && !highAvoidance) return "secure";
  if (highAnxiety && !highAvoidance) return "anxious";
  if (!highAnxiety && highAvoidance) return "avoidant";
  return "fearful";
}