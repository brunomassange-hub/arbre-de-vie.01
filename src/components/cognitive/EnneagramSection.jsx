import React from "react";

const ENNEAGRAM_TYPES = [
  { num: 1, name: "Le Réformateur", center: "Instinctif", color: "#ef4444", desc: "Principe, intégrité, perfectionnisme. Consciencieux et idéaliste.", wings: [9, 2], stress: 4, growth: 7 },
  { num: 2, name: "L'Altruiste", center: "Sentiment", color: "#f59e0b", desc: "Générosité, relations, amour. Aime aider et être apprécié.", wings: [1, 3], stress: 8, growth: 4 },
  { num: 3, name: "Le Battant", center: "Sentiment", color: "#eab308", desc: "Succès, image, efficacité. Ambitieux et adaptable.", wings: [2, 4], stress: 9, growth: 6 },
  { num: 4, name: "L'Individualiste", center: "Sentiment", color: "#a855f7", desc: "Identité, authenticité, émotions. Créatif et sensible.", wings: [3, 5], stress: 2, growth: 1 },
  { num: 5, name: "L'Observateur", center: "Mental", color: "#3b82f6", desc: "Savoir, compétence, autonomie. Analytique et curieux.", wings: [4, 6], stress: 7, growth: 8 },
  { num: 6, name: "Le Loyaliste", center: "Mental", color: "#06b6d4", desc: "Sécurité, soutien, certitude. Loyal et vigilant.", wings: [5, 7], stress: 3, growth: 9 },
  { num: 7, name: "L'Épicurien", center: "Mental", color: "#22c55e", desc: "Plaisir, liberté, variété. Optimiste et spontané.", wings: [6, 8], stress: 1, growth: 5 },
  { num: 8, name: "Le Protecteur", center: "Instinctif", color: "#dc2626", desc: "Pouvoir, justice, contrôle. Franc et protecteur.", wings: [7, 9], stress: 5, growth: 2 },
  { num: 9, name: "Le Médiateur", center: "Instinctif", color: "#14b8a6", desc: "Paix, harmonie, union. Doux et accommodant.", wings: [8, 1], stress: 6, growth: 3 },
];

const CENTERS = {
  Instinctif: { color: "#dc2626", label: "Instinctif (Ventre)" },
  Sentiment: { color: "#f59e0b", label: "Sentiment (Cœur)" },
  Mental: { color: "#3b82f6", label: "Mental (Tête)" },
};

export default function EnneagramSection({ selected, onSelect }) {
  const selectedType = ENNEAGRAM_TYPES.find(t => t.num === selected);

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 border border-white/20">
      <h2 className="text-white font-semibold mb-1">🔮 Ennéagramme</h2>
      <p className="text-gray-400 text-xs mb-4">9 types de personnalité — centres, ailes et dynamiques</p>

      {/* Type selector grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {ENNEAGRAM_TYPES.map(t => (
          <button
            key={t.num}
            onClick={() => onSelect(t.num)}
            className={`flex flex-col items-center py-2 rounded-lg transition-all ${
              selected === t.num
                ? "bg-white/15 ring-2"
                : "bg-white/5 hover:bg-white/10"
            }`}
            style={selected === t.num ? { boxShadow: `0 0 0 2px ${t.color}` } : {}}
          >
            <span className="text-lg font-black" style={{ color: t.color }}>{t.num}</span>
            <span className="text-[10px] text-gray-400 leading-tight text-center">{t.name}</span>
          </button>
        ))}
      </div>

      {/* Selected type details */}
      {selectedType ? (
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg"
              style={{ backgroundColor: selectedType.color }}>
              {selectedType.num}
            </div>
            <div>
              <h3 className="text-white font-bold">{selectedType.name}</h3>
              <span className="text-xs" style={{ color: CENTERS[selectedType.center].color }}>
                Centre {CENTERS[selectedType.center].label}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-3">{selectedType.desc}</p>

          <div className="flex gap-4 text-xs">
            <div className="flex-1">
              <p className="text-gray-500 mb-1">🪽 Ailes</p>
              <div className="flex gap-1.5">
                {selectedType.wings.map(w => {
                  const wt = ENNEAGRAM_TYPES.find(t => t.num === w);
                  return (
                    <span key={w} className="px-2 py-0.5 rounded-full text-xs"
                      style={{ color: wt.color, backgroundColor: wt.color + "20" }}>
                      {w} — {wt.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-3 pt-3 border-t border-white/10">
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">📈 Croissance</p>
              <span className="text-sm font-bold text-green-400">→ Type {selectedType.growth}</span>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">📉 Stress</p>
              <span className="text-sm font-bold text-red-400">→ Type {selectedType.stress}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center py-4">Sélectionnez votre type pour voir les détails</p>
      )}

      {/* Center legend */}
      <div className="flex gap-3 mt-4 justify-center">
        {Object.entries(CENTERS).map(([key, c]) => (
          <span key={key} className="flex items-center gap-1 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}