import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const BRANCHES = [
  { name: "Corps", color: "#e74c3c", icon: "💪" },
  { name: "Esprit", color: "#3498db", icon: "🧠" },
  { name: "Âme", color: "#9b59b6", icon: "✨" },
  { name: "Social", color: "#f39c12", icon: "👥" },
  { name: "Professionnel", color: "#27ae60", icon: "💼" },
  { name: "Créativité", color: "#e91e63", icon: "🎨" },
];

export default function Progress() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    base44.entities.Goal.list().then(setGoals);
  }, []);

  const getBranchData = (branchName) => {
    const branchGoals = goals.filter((g) => g.branch === branchName);
    if (!branchGoals.length) return { score: 0, total: 0, done: 0 };
    const score = Math.round(branchGoals.reduce((s, g) => s + (g.progress || 0), 0) / branchGoals.length);
    const done = branchGoals.filter((g) => g.status === "terminé").length;
    return { score, total: branchGoals.length, done };
  };

  const radarData = BRANCHES.map((b) => ({
    subject: b.icon + " " + b.name,
    value: getBranchData(b.name).score,
    fullMark: 100,
  }));

  const globalScore = Math.round(BRANCHES.reduce((s, b) => s + getBranchData(b.name).score, 0) / BRANCHES.length);

  const getLevel = (score) => {
    if (score >= 80) return { label: "Épanoui 🌳", color: "text-green-400" };
    if (score >= 60) return { label: "En croissance 🌿", color: "text-lime-400" };
    if (score >= 40) return { label: "Semence 🌱", color: "text-yellow-400" };
    return { label: "Graine 🌰", color: "text-orange-400" };
  };

  const level = getLevel(globalScore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0a2818] px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-green-300 mb-6 hover:text-green-200 transition">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">🌿 Ma Progression</h1>
        <p className="text-gray-400 mb-6">Vue d'ensemble de votre épanouissement</p>

        {/* Global score */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6 text-center border border-white/20">
          <div className="text-6xl font-bold text-green-400 mb-2">{globalScore}%</div>
          <div className={`text-xl font-semibold ${level.color}`}>{level.label}</div>
          <p className="text-gray-400 text-sm mt-1">Score global d'épanouissement</p>
        </div>

        {/* Radar chart */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6 border border-white/20">
          <h3 className="text-white font-semibold mb-3 text-center">Carte de votre arbre de vie</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
              <Radar name="Score" dataKey="value" stroke="#4ade80" fill="#4ade80" fillOpacity={0.3} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "#1a2a1a", border: "1px solid #4ade80", borderRadius: 8, color: "white" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Branch details */}
        <div className="space-y-3">
          {BRANCHES.map((branch) => {
            const data = getBranchData(branch.name);
            return (
              <div key={branch.name} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{branch.icon}</span>
                    <span className="text-white font-medium">{branch.name}</span>
                    <span className="text-gray-500 text-xs">{data.done}/{data.total} objectifs</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: branch.color }}>{data.score}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${data.score}%`, backgroundColor: branch.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}