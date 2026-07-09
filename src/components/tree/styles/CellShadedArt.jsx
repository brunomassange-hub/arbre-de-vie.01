import {
  cx, trunkTop, trunkBot, trunkMidY,
  BRANCH_DEFS, getBranchGeometry, ROOT_DEFS, TRUNK_PATH, blobPath
} from "@/components/tree/treeStyles";

// Style 1: Cell-shaded with dark outlines, segmented color zones
// Wound = blue canopy (somber), Strength = green canopy (vibrant)
export default function CellShadedArt({ isWound }) {
  const outline = "#1a1a1a";

  const foliage = isWound
    ? { light: "#4a8ac7", mid: "#003366", dark: "#001a33" }
    : { light: "#8BC34A", mid: "#4CAF50", dark: "#2E7D32" };

  const trunkLight = "#d2b48c";
  const trunkMid = "#8b5a2b";
  const trunkDark = "#3e2723";

  const foliageClusters = [
    { x: cx, y: 68, r: 54, s: "light" },
    { x: cx - 42, y: 88, r: 42, s: "mid" },
    { x: cx + 42, y: 88, r: 42, s: "mid" },
    { x: cx - 75, y: 100, r: 28, s: "dark" },
    { x: cx + 75, y: 100, r: 28, s: "dark" },
    { x: cx - 18, y: 42, r: 35, s: "light" },
    { x: cx + 18, y: 42, r: 35, s: "light" },
    { x: cx, y: 22, r: 28, s: "mid" },
    { x: cx - 58, y: 68, r: 26, s: "mid" },
    { x: cx + 58, y: 68, r: 26, s: "mid" },
    { x: cx - 90, y: 112, r: 20, s: "dark" },
    { x: cx + 90, y: 112, r: 20, s: "dark" },
    { x: cx - 28, y: 95, r: 22, s: "light" },
    { x: cx + 28, y: 95, r: 22, s: "light" },
  ];

  return (
    <g pointerEvents="none">
      {/* Shadow */}
      <ellipse cx={cx} cy={trunkBot + 18} rx="82" ry="7" fill="#808080" opacity={0.25} />

      {/* Roots */}
      {ROOT_DEFS.map((r, i) => (
        <g key={`r-${i}`}>
          <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
            stroke={outline} strokeWidth={9 - i * 0.4} fill="none" strokeLinecap="round" opacity={0.35} />
          <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
            stroke={trunkMid} strokeWidth={6 - i * 0.3} fill="none" strokeLinecap="round" />
          <path d={`M ${cx - 2} ${trunkBot} Q ${cx + r.cp1x - 2} ${trunkBot + r.cp1y} ${cx + r.dx - 2} ${trunkBot + r.dy}`}
            stroke={trunkLight} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.5} />
        </g>
      ))}

      {/* Trunk */}
      <path d={TRUNK_PATH} fill={trunkLight} stroke={outline} strokeWidth="2.5" />
      {/* Shadow segment (left) */}
      <path d={`M ${cx - 16} ${trunkTop} Q ${cx - 18} ${trunkMidY} ${cx - 15} ${trunkBot} L ${cx - 5} ${trunkBot} Q ${cx - 6} ${trunkMidY} ${cx - 5} ${trunkTop} Z`}
        fill={trunkMid} opacity={0.45} />
      {/* Dark edge (right) */}
      <path d={`M ${cx + 10} ${trunkTop} Q ${cx + 14} ${trunkMidY} ${cx + 15} ${trunkBot} L ${cx + 16} ${trunkBot} Q ${cx + 18} ${trunkMidY} ${cx + 16} ${trunkTop} Z`}
        fill={trunkDark} opacity={0.3} />
      {/* Bark lines */}
      <line x1={cx - 8} y1={trunkTop + 15} x2={cx - 9} y2={trunkBot - 15} stroke={trunkDark} strokeWidth="1.2" opacity={0.35} />
      <line x1={cx} y1={trunkTop + 10} x2={cx - 1} y2={trunkBot - 10} stroke={trunkDark} strokeWidth="0.8" opacity={0.25} />
      <line x1={cx + 8} y1={trunkTop + 15} x2={cx + 9} y2={trunkBot - 15} stroke={trunkDark} strokeWidth="1.2" opacity={0.35} />

      {/* Branches */}
      {BRANCH_DEFS.map((bd) => {
        const { startX, startY, midX, midY, end } = getBranchGeometry(bd);
        const w = [8, 6, 4.5][bd.level];
        return (
          <g key={bd.name}>
            {/* Outline */}
            <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
              stroke={outline} strokeWidth={w + 2.5} fill="none" strokeLinecap="round" opacity={0.35} />
            {/* Fill */}
            <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
              stroke={trunkLight} strokeWidth={w} fill="none" strokeLinecap="round" />
            {/* Shadow half */}
            <path d={`M ${startX + (bd.side === "left" ? -1 : 1)} ${startY} Q ${midX + (bd.side === "left" ? -1 : 1)} ${midY + 2} ${end.x + (bd.side === "left" ? -1 : 1)} ${end.y}`}
              stroke={trunkMid} strokeWidth={w * 0.45} fill="none" strokeLinecap="round" opacity={0.4} />
            {/* Sub-branches */}
            {(() => {
              const p1 = { x: (1 - 0.5) * (1 - 0.5) * startX + 2 * 0.5 * 0.5 * midX + 0.5 * 0.5 * end.x,
                           y: (1 - 0.5) * (1 - 0.5) * startY + 2 * 0.5 * 0.5 * midY + 0.5 * 0.5 * end.y };
              const p2 = { x: (1 - 0.72) * (1 - 0.72) * startX + 2 * 0.72 * 0.28 * midX + 0.72 * 0.72 * end.x,
                           y: (1 - 0.72) * (1 - 0.72) * startY + 2 * 0.72 * 0.28 * midY + 0.72 * 0.72 * end.y };
              const dir = bd.side === "left" ? -1 : 1;
              return (
                <g opacity={0.4}>
                  <path d={`M ${p1.x} ${p1.y} Q ${p1.x + dir * 14} ${p1.y - 10} ${p1.x + dir * 28} ${p1.y - 22}`}
                    stroke={outline} strokeWidth={w * 0.5 + 1.5} fill="none" strokeLinecap="round" opacity={0.3} />
                  <path d={`M ${p1.x} ${p1.y} Q ${p1.x + dir * 14} ${p1.y - 10} ${p1.x + dir * 28} ${p1.y - 22}`}
                    stroke={trunkLight} strokeWidth={w * 0.5} fill="none" strokeLinecap="round" />
                  <path d={`M ${p2.x} ${p2.y} Q ${p2.x + dir * 10} ${p2.y - 12} ${p2.x + dir * 20} ${p2.y - 26}`}
                    stroke={trunkLight} strokeWidth={w * 0.4} fill="none" strokeLinecap="round" opacity={0.7} />
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* Foliage - cell-shaded blobs */}
      {foliageClusters.map((f, i) => {
        const fill = f.s === "light" ? foliage.light : f.s === "mid" ? foliage.mid : foliage.dark;
        return (
          <g key={`f-${i}`}>
            <path d={blobPath(f.x, f.y, f.r, 10, 0.25, i)} fill={fill} stroke={outline} strokeWidth="2" opacity={0.92} />
            {/* Highlight zone */}
            <ellipse cx={f.x - f.r * 0.3} cy={f.y - f.r * 0.3} rx={f.r * 0.35} ry={f.r * 0.22}
              fill={foliage.light} opacity={0.35} />
          </g>
        );
      })}
    </g>
  );
}