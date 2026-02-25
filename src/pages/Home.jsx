import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";
import TreeVisual from "@/components/tree/TreeVisual";
import { Leaf, BookOpen, Target, User } from "lucide-react";

const BRANCHES = [
  { name: "Corps", color: "#e74c3c", icon: "💪" },
  { name: "Esprit", color: "#3498db", icon: "🧠" },
  { name: "Âme", color: "#9b59b6", icon: "✨" },
  { name: "Social", color: "#f39c12", icon: "👥" },
  { name: "Professionnel", color: "#27ae60", icon: "💼" },
  { name: "Créativité", color: "#e91e63", icon: "🎨" },
];

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [goalsData, profileData] = await Promise.all([
      base44.entities.Goal.list(),
      base44.entities.TreeProfile.list(),
    ]);
    setGoals(goalsData);
    setProfile(profileData[0] || null);
    setLoading(false);
  };

  const getBranchScore = (branchName) => {
    const branchGoals = goals.filter((g) => g.branch === branchName);
    if (!branchGoals.length) return 0;
    const avg =
      branchGoals.reduce((sum, g) => sum + (g.progress || 0), 0) /
      branchGoals.length;
    return Math.round(avg);
  };

  const branchesWithScores = BRANCHES.map((b) => ({
    ...b,
    score: getBranchScore(b.name),
  }));

  const globalScore = branchesWithScores.length
    ? Math.round(
        branchesWithScores.reduce((s, b) => s + b.score, 0) /
          branchesWithScores.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a2818]">
      {/* Header */}
      <div className="text-center pt-10 pb-4 px-4">
        <h1 className="text-4xl font-bold text-white mb-1 tracking-wide">
          🌳 Mon Arbre de Vie
        </h1>
        {profile?.identity && (
          <p className="text-green-300 text-lg italic">"{profile.identity}"</p>
        )}
        <div className="mt-3 inline-block bg-white/10 backdrop-blur rounded-full px-6 py-2">
          <span className="text-white font-semibold text-lg">
            Épanouissement global :{" "}
            <span className="text-green-400">{globalScore}%</span>
          </span>
        </div>
      </div>

      {/* Tree Visual */}
      <div className="flex justify-center px-4">
        <TreeVisual branches={branchesWithScores} profile={profile} />
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto px-4 pb-10 mt-4">
        <Link to={createPageUrl("Profile")}>
          <div className="bg-white/10 backdrop-blur hover:bg-white/20 transition rounded-xl p-4 text-center text-white cursor-pointer">
            <User className="mx-auto mb-1 text-yellow-300" />
            <div className="text-sm font-medium">Mon Identité</div>
            <div className="text-xs text-gray-300">Tronc & Racines</div>
          </div>
        </Link>
        <Link to={createPageUrl("Goals")}>
          <div className="bg-white/10 backdrop-blur hover:bg-white/20 transition rounded-xl p-4 text-center text-white cursor-pointer">
            <Target className="mx-auto mb-1 text-green-300" />
            <div className="text-sm font-medium">Mes Objectifs</div>
            <div className="text-xs text-gray-300">Par branche</div>
          </div>
        </Link>
        <Link to={createPageUrl("Journal")}>
          <div className="bg-white/10 backdrop-blur hover:bg-white/20 transition rounded-xl p-4 text-center text-white cursor-pointer">
            <BookOpen className="mx-auto mb-1 text-blue-300" />
            <div className="text-sm font-medium">Mon Journal</div>
            <div className="text-xs text-gray-300">Réflexions</div>
          </div>
        </Link>
        <Link to={createPageUrl("Progress")}>
          <div className="bg-white/10 backdrop-blur hover:bg-white/20 transition rounded-xl p-4 text-center text-white cursor-pointer">
            <Leaf className="mx-auto mb-1 text-emerald-300" />
            <div className="text-sm font-medium">Ma Progression</div>
            <div className="text-xs text-gray-300">Scores</div>
          </div>
        </Link>
      </div>
    </div>
  );
}