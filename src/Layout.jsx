import React from "react";
import { Link, Navigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import { Home, Sprout, Flower2, ScanSearch, Sparkles, Brain, BookOpen, Video, Users, HelpCircle } from "lucide-react";

const NAV = [
  { label: "Arbre", icon: Home, page: "Home" },
  { label: "Blessure", icon: Sprout, page: "Garden" },
  { label: "Force", icon: Flower2, page: "Growth" },
  { label: "Analyse", icon: ScanSearch, page: "Analysis" },
  { label: "Archétype", icon: Sparkles, page: "Archetype" },
  { label: "Personnalité", icon: Brain, page: "Cognitive" },
  { label: "Journal", icon: BookOpen, page: "Journal" },
];

export default function Layout({ children, currentPageName }) {
  const { user } = useAuth();

  if (user && user.onboarding_completed === false) {
    return <Navigate to="/Onboarding" replace />;
  }

  const navItems = user?.role === "admin" ? [...NAV, { label: "Vidéos", icon: Video, page: "VideoManager" }, { label: "Users", icon: Users, page: "UserManagement" }] : NAV;
  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #2d5a27; border-radius: 3px; }
        nav .overflow-x-auto::-webkit-scrollbar { display: none; }
        nav .overflow-x-auto { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* Help button — revisit onboarding */}
      <Link to="/Onboarding" className="fixed top-4 right-4 z-40 w-9 h-9 rounded-full flex items-center justify-center transition hover:scale-110"
        style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <HelpCircle className="w-4 h-4 text-gray-400" />
      </Link>

      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0d1f0d]/95 backdrop-blur border-t border-green-900/40 z-50">
        <div className="flex max-w-lg mx-auto overflow-x-auto">
          {navItems.map(({ label, icon: Icon, page }) => {
            const active = currentPageName === page;
            return (
              <Link
                key={page}
                to={createPageUrl(page)}
                className={`flex flex-col items-center py-3 px-3 flex-shrink-0 transition-all ${
                  active ? "text-green-400" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? "drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]" : ""}`} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}