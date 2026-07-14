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