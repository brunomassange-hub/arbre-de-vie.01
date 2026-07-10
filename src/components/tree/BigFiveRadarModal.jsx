import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Save } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

const BIG5 = [
  { key: "ouverture", label: "Ouverture", desc: "Curiosité, imagination, créativité", color: "#8b5cf6" },
  { key: "agreabilite", label: "Agréabilité", desc: "Coopération, confiance, empathie", color: "#22c55e" },
  { key: "conscience", label: "Conscience", desc: "Organisation, discipline, fiabilité", color: "#3b82f6" },
  { key: "nervosite", label: "Nervosité", desc: "Anxiété, instabilité émotionnelle", color: "#ef4444" },
  { key: "extraversion", label: "Extraversion", desc: "Sociabilité, assertivité, énergie", color: "#f59e0b" },
];

export default function BigFiveRadarModal({ profile, onClose, onSaved }) {
  const [scores, setScores] = useState({
    ouverture: 50, agreabilite: 50, conscience: 50, nervosite: 50, extraversion: 50,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setScores({
        ouverture: profile.ouverture ?? 50,
        agreabilite: profile.agreabilite ?? 50,
        conscience: profile.conscience ?? 50,
        nervosite: profile.nervosite ?? 50,
        extraversion: profile.extraversion ?? 50,
      });
    }
  }, [profile]);

  const handleChange = (key, val) => {
    setScores(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (profile?.id) {
        await base44.entities.BigFiveProfile.update(profile.id, { ...scores });
      } else {
        await base44.entities.BigFiveProfile.create({ ...scores });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  // Radar geometry
  const cxR = 130, cyR = 130, r = 95;
  const n = 5;
  const angles = BIG5.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
  const vertices = angles.map(a => ({ x: cxR + r * Math.cos(a), y: cyR + r * Math.sin(a) }));
  const dataPoints = BIG5.map((d, i) => {
    const val = (scores[d.key] / 100) * r;
    return { x: cxR + val * Math.cos(angles[i]), y: cyR + val * Math.sin(angles[i]) };
  });
  const polygon = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(62,39,35,0.45)" }} onClick={onClose}>
      <div className="rounded-t-3xl p-6 w-full max-w-lg border-t-2 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ borderColor: "#7fae7e", background: "#faf6f0", fontFamily: SERIF }}
        onClick={e => e.stopPropagation()}>

        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs" style={{ color: "#7fae7e" }}>Profil Big Five</p>
            <h2 className="text-lg font-bold" style={{ color: "#3e2723" }}>🧬 Mon profil psychologique</h2>
          </div>
          <button onClick={onClose} style={{ color: "#8d6e63" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Radar chart */}
        <div className="flex justify-center mb-4 rounded-xl p-2" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f5f0e8 100%)", boxShadow: "inset 0 1px 4px rgba(141,110,99,0.15)" }}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            {[0.25, 0.5, 0.75, 1].map(f => (
              <polygon key={f} points={vertices.map(v => {
                const dx = v.x - cxR, dy = v.y - cyR;
                return `${cxR + dx * f},${cyR + dy * f}`;
              }).join(" ")} fill="none" stroke="rgba(141,110,99,0.35)" strokeWidth="1" />
            ))}
            {vertices.map((v, i) => (
              <line key={i} x1={cxR} y1={cyR} x2={v.x} y2={v.y} stroke="rgba(141,110,99,0.3)" strokeWidth="1" />
            ))}
            {/* Outer wedges (score→100%) in dark */}
            {BIG5.map((_, i) => {
              const ni = (i + 1) % n;
              const pts = `${dataPoints[i].x},${dataPoints[i].y} ${vertices[i].x},${vertices[i].y} ${vertices[ni].x},${vertices[ni].y} ${dataPoints[ni].x},${dataPoints[ni].y}`;
              return <polygon key={`o${i}`} points={pts} fill="#1a1a1a" opacity="0.85" />;
            })}
            {/* Inner wedges (0→score%) colored per trait */}
            {BIG5.map((d, i) => {
              const ni = (i + 1) % n;
              const pts = `${cxR},${cyR} ${dataPoints[i].x},${dataPoints[i].y} ${dataPoints[ni].x},${dataPoints[ni].y}`;
              return <polygon key={`i${i}`} points={pts} fill={d.color} fillOpacity="0.75" stroke={d.color} strokeWidth="1.5" />;
            })}
            {/* Data point dots */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke={BIG5[i].color} strokeWidth="2.5" />
            ))}
            {vertices.map((v, i) => {
              const dx = v.x - cxR, dy = v.y - cyR;
              const lx = cxR + dx * 1.22, ly = cyR + dy * 1.22;
              return (
                <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontWeight="600" fill={BIG5[i].color}>{BIG5[i].label}</text>
              );
            })}
          </svg>
        </div>

        {/* Sliders */}
        <div className="space-y-3 mb-4">
          {BIG5.map(d => (
            <div key={d.key}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: d.color }} className="font-semibold">{d.label}</span>
                <span style={{ color: "#8d6e63" }}>{scores[d.key]}%</span>
              </div>
              <input type="range" min={0} max={100} value={scores[d.key]}
                onChange={e => handleChange(d.key, Number(e.target.value))}
                className="w-full h-1.5 rounded-full cursor-pointer"
                style={{ accentColor: d.color }} />
              <p className="text-xs mt-0.5" style={{ color: "#a1887f" }}>{d.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition flex items-center justify-center gap-2"
          style={{ background: "#5d7a3a", fontFamily: SERIF }}>
          <Save className="w-4 h-4" />
          {saving ? "..." : saved ? "✓ Sauvegardé !" : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}