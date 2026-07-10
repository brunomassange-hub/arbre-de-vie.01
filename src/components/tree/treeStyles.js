// Shared tree geometry constants and helpers

export const cx = 200;
export const trunkTop = 110;
export const trunkBot = 380;
export const trunkMidY = (trunkTop + trunkBot) / 2;

// Branches aligned with Sephirot levels
// Level 0 = Gloire/Victoire (bottom), Level 1 = Désir/Amour (mid), Level 2 = Compréhension/Sagesse (top)
export const BRANCH_DEFS = [
  { name: "Physique", side: "left", level: 0 },
  { name: "Émotionnel", side: "right", level: 0 },
  { name: "Social", side: "left", level: 1 },
  { name: "Artistique", side: "right", level: 1 },
  { name: "Intellectuel", side: "left", level: 2 },
  { name: "Spirituel", side: "right", level: 2 },
];

export const BRANCH_COLORS = {
  Social: "#7c9cb0",
  Physique: "#7fae7e",
  Intellectuel: "#8b93c7",
  Émotionnel: "#d4847a",
  Artistique: "#d4a559",
  Spirituel: "#b88bb8"
};

const BRANCH_START_Y = [340, 215, 140];
const BRANCH_END_Y = [305, 175, 100];
const BRANCH_SPREAD = [128, 116, 102];

export const ROOT_DEFS = [
  { dx: -110, dy: 75, cp1x: -55, cp1y: 25 },
  { dx: -65, dy: 85, cp1x: -35, cp1y: 38 },
  { dx: -18, dy: 90, cp1x: -8, cp1y: 48 },
  { dx: 18, dy: 90, cp1x: 8, cp1y: 48 },
  { dx: 65, dy: 85, cp1x: 35, cp1y: 38 },
  { dx: 110, dy: 75, cp1x: 55, cp1y: 25 },
];

export const ROOT_CATEGORIES = ["Famille", "Ami(e)", "Partenaire", "Mentor", "Collègue", "Autre"];

export const ROOT_DOT_POSITIONS = {
  wound: [
    { x: -110, y: 75 }, { x: -65, y: 85 }, { x: -18, y: 90 },
    { x: 18, y: 90 }, { x: 65, y: 85 }, { x: 110, y: 75 },
  ],
  strength: [
    { x: -100, y: 68 }, { x: -60, y: 78 }, { x: -15, y: 85 },
    { x: 15, y: 85 }, { x: 60, y: 78 }, { x: 100, y: 68 },
  ],
};

export const TRUNK_PATH = `M ${cx - 16} ${trunkTop} Q ${cx - 18} ${trunkMidY} ${cx - 15} ${trunkBot} L ${cx + 15} ${trunkBot} Q ${cx + 18} ${trunkMidY} ${cx + 16} ${trunkTop} Z`;

export function getBranchEnd(side, level) {
  return {
    x: side === "left" ? cx - BRANCH_SPREAD[level] : cx + BRANCH_SPREAD[level],
    y: BRANCH_END_Y[level]
  };
}

export function getBranchGeometry(bd) {
  const end = getBranchEnd(bd.side, bd.level);
  const startX = bd.side === "left" ? cx - 13 : cx + 13;
  const startY = BRANCH_START_Y[bd.level];
  const midX = bd.side === "left" ? cx - 55 - bd.level * 8 : cx + 55 + bd.level * 8;
  const midY = (startY + end.y) / 2 + (bd.side === "left" ? -10 : 10);
  return { startX, startY, midX, midY, end };
}

export function bezier(t, startX, startY, midX, midY, endX, endY) {
  const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
  const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;
  return { x: bx, y: by };
}

// Organic blob path generator for foliage
export function blobPath(centerX, centerY, radius, bumps = 10, variation = 0.22, seed = 0) {
  const pts = [];
  for (let i = 0; i < bumps; i++) {
    const angle = (i / bumps) * Math.PI * 2;
    const r = radius * (1 + Math.sin(i * 2.7 + seed) * variation);
    pts.push({ x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r });
  }
  let path = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < bumps; i++) {
    const next = pts[(i + 1) % bumps];
    const curr = pts[i];
    const mx = (curr.x + next.x) / 2;
    const my = (curr.y + next.y) / 2;
    path += ` Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  return path + " Z";
}