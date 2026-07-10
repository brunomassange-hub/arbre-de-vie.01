import React from "react";
import { TrendingUp } from "lucide-react";

const ENNEAGRAM_IMPROVEMENTS = {
  1: [
    { titre: "Lâcher le perfectionnisme", detail: "Acceptez que 'assez bien' soit suffisant. Le monde n'a pas besoin d'être parfait pour être bon. Pratiquez l'autocompassion quand vous faites des erreurs." },
    { titre: "Accepter l'émotion", detail: "Vous réprimez vos émotions au profit du devoir. Autorisez-vous à ressentir colère, tristesse et joie sans jugement. Elles ne sont pas des faiblesses." },
    { titre: "Flexibilité et spontanéité", detail: "Vos règles internes vous rigidifient. Autorisez-vous l'imprévu, le jeu et la légèreté. La croissance mène au type 7 : savourez la vie." },
    { titre: "Relâcher le critique intérieur", detail: "Cette voix sévère n'est pas la vérité. Remplacez-la par une voix bienveillante, comme vous parleriez à un ami." },
  ],
  2: [
    { titre: "Reconnaître vos propres besoins", detail: "Vous donnez aux autres pour être aimé. Apprenez à identifier ce dont VOUS avez besoin et à le demander directement, sans passer par le don." },
    { titre: "Poser des limites saines", detail: "Dire 'non' n'est pas égoïste. Vous ne pouvez pas verser d'une carafe vide. Protéger votre énergie vous permet d'aider plus durablement." },
    { titre: "Distinguer amour véritable et dépendance", detail: "Demandez-vous : 'Est-ce que j'aide parce que je le veux, ou pour être apprécié ?' Le véritable amour n'attend rien en retour." },
    { titre: "Développer l'autonomie émotionnelle", detail: "Votre valeur ne dépend pas de ce que vous faites pour les autres. Cultivez votre identité propre, indépendamment du regard d'autrui." },
  ],
  3: [
    { titre: "Au-delà de l'image", detail: "Vous vous identifiez à vos réussites. Demandez-vous : 'Qui suis-je quand je ne performe pas ?' Pratiquez des moments sans but ni résultat à atteindre." },
    { titre: "Reconnecter avec vos émotions", detail: "Vous mettez vos sentiments de côté pour avancer. Autorisez-vous à ressentir la vulnérabilité, la peur, la tristesse — elles vous rendent plus humain." },
    { titre: "Lâcher le besoin de validation", detail: "Votre valeur ne se mesure pas aux applaudissements. Cultivez des activités que personne ne verra, uniquement pour vous." },
    { titre: "Ralentir et être présent", detail: "Vous courrez vers la prochaine étape. Pratiquez la pleine conscience : savourez le moment présent au lieu de viser le suivant." },
  ],
  4: [
    { titre: "Sortir de la comparaison", detail: "Vous vous sentez incompris et différent. Pratiquez la gratitude pour ce que vous avez en commun avec les autres plutôt que ce qui vous sépare." },
    { titre: "Ancrer dans l'action", detail: "Vos émotions peuvent vous paralyser. Créez des routines d'action indépendantes de votre humeur du moment." },
    { titre: "Apprécier l'ordinaire", detail: "Vous cherchez la profondeur et l'intensité. Apprenez à trouver la beauté dans les choses simples et quotidiennes." },
    { titre: "Relâcher la mélancolie identitaire", detail: "Votre identité de 'personne à part' vous isole. Autorisez-vous à être ordinaire et à appartenir." },
  ],
  5: [
    { titre: "Passer de la théorie à l'action", detail: "Vous accumulez le savoir pour vous sentir compétent. Fixez-vous des moments pour agir avant de tout savoir. L'expérience complète la connaissance." },
    { titre: "Sortir de l'isolement", detail: "Vous vous repliez sur vous-même pour préserver votre énergie. Pratiquez la connexion sociale régulière, même brève, pour ne pas vous couper des autres." },
    { titre: "Reconnecter avec le corps", detail: "Vous vivez dans votre tête. Pratiquez des activités corporelles : sport, marche, respiration, pour ancrer votre énergie." },
    { titre: "Partager vos pensées", detail: "Votre richesse intérieure reste invisible. Apprenez à exprimer vos idées et émotions au lieu de les réserver." },
  ],
  6: [
    { titre: "Faire confiance à votre intuition", detail: "Vous cherchez la sécurité externe. Pratiquez l'écoute de votre voix intérieure et osez décider seul, même dans l'incertitude." },
    { titre: "Distinguer peur réelle et projection", detail: "Votre mental anticipe les pires scénarios. Demandez-vous : 'Cette menace est-elle réelle ou imaginée ?' Ramenez-vous aux faits." },
    { titre: "Agir malgré le doute", detail: "L'attente de certitude paralyse. Acceptez que l'action précède parfois la confiance. Lancez-vous et ajustez en chemin." },
    { titre: "Cultiver la sérénité", detail: "Votre vigilance est épuisante. Pratiquez la méditation, la respiration et des activités qui apaisent le système nerveux." },
  ],
  7: [
    { titre: "Rester et approfondir", detail: "Vous fuyez la difficulté vers de nouvelles possibilités. Engagez-vous à rester avec une chose, même quand l'ennui ou la douleur apparaît." },
    { titre: "Affronter la douleur émotionnelle", detail: "Vous évitez les émotions difficiles par le plaisir et la distraction. Autorisez-vous à ressentir la tristesse et la peur — elles passent." },
    { titre: "Terminer avant de commencer", detail: "Finissez ce que vous avez commencé avant de lancer la prochaine idée. La constance mène à la vraie satisfaction." },
    { titre: "Pratiquer la modération", detail: "L'excès épuise. Apprenez à savourer moins pour apprécier plus pleinement. La croissance mène au type 5 : profondeur et focus." },
  ],
  8: [
    { titre: "Reconnaître votre vulnérabilité", detail: "Vous masquez votre sensibilité derrière la force. Autorisez-vous à montrer vos faiblesses — la vraie force inclut la tendresse." },
    { titre: "Lâcher le besoin de contrôle", detail: "Vous dominez pour vous sentir en sécurité. Pratiquez le lâcher-prise et la confiance en les autres. Vous n'avez pas besoin de tout piloter." },
    { titre: "Modérer l'intensité", detail: "Votre énergie peut écraser. Pratiquez la douceur et l'écoute. La force calme est plus puissante que la confrontation." },
    { titre: "Canaliser la colère", detail: "Votre colère est un signal, pas une arme. Apprenez à l'exprimer de manière constructive plutôt qu'explosive." },
  ],
  9: [
    { titre: "Reconnaître votre propre voix", detail: "Vous vous effacez pour maintenir l'harmonie. Pratiquez l'expression de vos opinions et désirs, même s'ils créent un conflit." },
    { titre: "Sortir de l'inertie", detail: "Vous vous endormez dans le confort. Fixez-vous des petits objectifs d'action et engagez-vous activement dans votre vie." },
    { titre: "Affronter les conflits", detail: "Vous évitez les tensions au prix de vous-même. Pratiquez d'aborder les difficultés directement plutôt que de les enfouir." },
    { titre: "Reconnecter avec votre vitalité", detail: "Vous vous déconnectez de vos émotions et de votre énergie. Pratiquez des activités qui réveillent votre passion et votre présence." },
  ],
};

export default function EnneagramImprovements({ selectedType }) {
  const data = ENNEAGRAM_IMPROVEMENTS[selectedType];
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/15 backdrop-blur rounded-2xl p-5 border border-amber-500/20">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-amber-400" />
        <h3 className="text-white font-semibold text-sm">
          Axes d'amélioration personnalisés
        </h3>
        <span className="text-amber-300 text-xs ml-1">— Type {selectedType}</span>
      </div>
      <p className="text-gray-400 text-xs mb-4">
        Basés sur les mécanismes de défense et les zones d'ombre de votre type — la croissance mène vers l'intégration.
      </p>
      <div className="space-y-2.5">
        {data.map((axe, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600/40 border border-amber-400/40 text-amber-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-white text-xs font-semibold">{axe.titre}</p>
                <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">{axe.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}