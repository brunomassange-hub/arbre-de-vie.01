import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { useNavigate } from "react-router-dom";
import TreeVisual from "@/components/tree/TreeVisual";
import BranchDetailPanel from "@/components/tree/BranchDetailPanel";
import TrunkDetailPanel from "@/components/tree/TrunkDetailPanel";
import RootDetailPanel from "@/components/tree/RootDetailPanel";

export default function Home() {
  const [beliefs, setBeliefs] = useState([]);
  const [events, setEvents] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [showTrunkPanel, setShowTrunkPanel] = useState(false);
  const [showRootPanel, setShowRootPanel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      base44.entities.LimitingBelief.list(),
      base44.entities.TraumaticEvent.list(),
      base44.entities.Link.list(),
    ]).then(([b, e, l]) => {
      setBeliefs(b);
      setEvents([...e].sort((a, b) => a.age - b.age));
      setLinks(l);
    });
  }, []);

  const globalScore = 0;

  const handleBranchClick = (branch) => setSelectedBranch(branch);
  const handleTrunkClick = (event) => {
    setSelectedEvent(event);
    setShowTrunkPanel(true);
  };
  const handleRootClick = (link) => {
    setSelectedLink(link);
    setShowRootPanel(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a2818]">
      {/* Header */}
      <div className="text-center pt-8 pb-2 px-4">
        <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">🌳 Mon Arbre de Vie</h1>
        <p className="text-gray-400 text-sm">Cliquez sur les branches, le tronc ou les racines</p>
      </div>

      {/* Tree Visual */}
      <div className="flex justify-center px-2">
        <TreeVisual
          beliefs={beliefs}
          events={events}
          links={links}
          onBranchClick={handleBranchClick}
          onTrunkClick={handleTrunkClick}
          onRootClick={handleRootClick}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 px-4 pb-6 text-xs text-gray-400">
        <span>🟢 Nœuds = croyances limitantes</span>
        <span>🟤 Points tronc = événements marquants</span>
        <span>🔴 Points racines = liens</span>
      </div>

      {/* Branch panel */}
      {selectedBranch && (
        <BranchDetailPanel
          branch={selectedBranch}
          beliefs={beliefs.filter(b => b.branch === selectedBranch.name)}
          onClose={() => setSelectedBranch(null)}
          onNavigate={() => navigate(createPageUrl("Beliefs") + `?branch=${selectedBranch.name}`)}
        />
      )}

      {/* Trunk panel */}
      {showTrunkPanel && (
        <TrunkDetailPanel
          events={events}
          selectedEvent={selectedEvent}
          onClose={() => setShowTrunkPanel(false)}
          onNavigate={() => navigate(createPageUrl("Trunk"))}
        />
      )}

      {/* Root panel */}
      {showRootPanel && (
        <RootDetailPanel
          links={links}
          selectedLink={selectedLink}
          onClose={() => setShowRootPanel(false)}
          onNavigate={() => navigate(createPageUrl("Roots"))}
        />
      )}
    </div>
  );
}