import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { TYPE_META } from "@/lib/enneagram-quiz-data";

// 9 axes disposés selon la roue classique de l'Ennéagramme :
// Type 9 au sommet (12h), puis 1 → 8 dans le sens horaire.
const N = 9;
const cx = 130, cy = 130, r = 95;
const angles = Array.from({ length: N }, (_, i) => (Math.PI * 2 * i) / N - Math.PI / 2);
const vertices = angles.map((a) => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }));
// Type affiché à chaque position (sens horaire depuis le sommet)
const wheelOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8];
const typeAtPos = (p) => wheelOrder[p];
const scoreIndexAtPos = (p) => wheelOrder[p] - 1;

const getAnchor = (x) => {
  if (x > cx + 12) return "start";
  if (x < cx - 12) return "end";
  return "middle";
};

export default function EnneagramRadar({ onStartTest }) {
  const [scores, setScores] = useState(null);
  const [dominant, setDominant] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const profiles = await base44.entities.CognitiveProfile.list();
        const p = profiles[0];
        const arr = p?.enneagram_scores;
        if (Array.isArray(arr) && arr.length === 9 && arr.some((v) => v > 0)) {
          setScores(arr);
          // Type dominant = pourcentage le plus élevé
          let best = 0;
          for (let i = 1; i < 9; i++) if (arr[i] > arr[best]) best = i;
          setDominant(best + 1);
        }
      } catch {
        /* ignore */
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // État neutre : questionnaire non complété
  if (loaded && !scores) {
    return (
      <div
        className="rounded-2xl p-5 mb-6 text-center"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <h2
          className="text-center text-lg font-semibold mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
        >
          ✦ Profil Ennéagramme complet
        </h2>
        <p className="text-center text-xs mb-4" style={{ color: "#6b7b94" }}>
          Visualisation radar de votre répartition sur les 9 types
        </p>
        <div className="py-6 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-sm mb-3" style={{ color: "#9ba8bc" }}>
            Completez le test Ennéagramme pour révéler votre profil radar complet.
          </p>
          {onStartTest ? (
            <button
              onClick={onStartTest}
              className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg transition"
              style={{ background: "rgba(250,204,46,0.15)", color: "#facc2e", border: "1px solid rgba(250,204,46,0.3)" }}
            >
              → Faire le test Ennéagramme
            </button>
          ) : (
            <Link
              to={createPageUrl("Cognitive")}
              className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg transition"
              style={{ background: "rgba(250,204,46,0.15)", color: "#facc2e", border: "1px solid rgba(250,204,46,0.3)" }}
            >
              → Faire le test sur la page Personnalité
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!scores) return null;

  // Points de données selon l'ordre de la roue (0-100 → 0-r)
  const dataPoints = angles.map((a, p) => {
    const raw = scores[scoreIndexAtPos(p)];
    const val = (Math.max(0, Math.min(100, raw)) / 100) * r;
    return { x: cx + val * Math.cos(a), y: cy + val * Math.sin(a) };
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const dominantPos = wheelOrder.indexOf(dominant);

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <h2
        className="text-center text-lg font-semibold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5c4" }}
      >
        ✦ Profil Ennéagramme complet
      </h2>
      <p className="text-center text-xs mb-4" style={{ color: "#6b7b94" }}>
        Répartition de vos 9 types (%) · type dominant : {dominant}
      </p>

      <div
        className="flex justify-center mb-3 rounded-xl p-2"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #f5f0e8 100%)", boxShadow: "inset 0 1px 4px rgba(141,110,99,0.15)" }}
      >
        <svg width="260" height="260" viewBox="0 0 260 260">
          <defs>
            <radialGradient id="enneaRadarFill" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#facc2e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.35" />
            </radialGradient>
          </defs>
          {/* Fond nonagone plein */}
          <polygon points={vertices.map((v) => `${v.x},${v.y}`).join(" ")} fill="#1a1a1a" />
          {/* Grilles concentriques */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <polygon
              key={f}
              points={vertices.map((v) => {
                const dx = v.x - cx, dy = v.y - cy;
                return `${cx + dx * f},${cy + dy * f}`;
              }).join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
            />
          ))}
          {/* Lignes radiales */}
          {vertices.map((v, i) => (
            <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          ))}
          {/* Zone remplie (données) : dégradé semi-transparent + contour marqué */}
          <polygon
            points={dataPolygon}
            fill="url(#enneaRadarFill)"
            stroke="#facc2e"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Points + anneau sur le type dominant */}
          {dataPoints.map((p, i) => {
            const t = typeAtPos(i);
            const isDom = dominantPos === i;
            const color = TYPE_META[t - 1].color;
            return (
              <g key={`d${i}`}>
                {isDom && <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#fff" strokeWidth="2" opacity="0.95" />}
                <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2.5" />
              </g>
            );
          })}
          {/* Étiquettes des types (numéro seul, ordre de la roue) */}
          {vertices.map((v, i) => {
            const dx = v.x - cx, dy = v.y - cy;
            const lx = cx + dx * 1.22, ly = cy + dy * 1.22;
            const t = typeAtPos(i);
            const meta = TYPE_META[t - 1];
            return (
              <text
                key={`l${i}`}
                x={lx}
                y={ly}
                textAnchor={getAnchor(lx)}
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="800"
                fill={meta.color}
              >
                {t}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Légende des pourcentages */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 mt-2">
        {TYPE_META.map((meta, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: meta.color }} />
            <span className="text-[10px]" style={{ color: dominant === meta.n ? "#e8d5c4" : "#6b7b94" }}>
              {meta.n} · {scores[i].toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}