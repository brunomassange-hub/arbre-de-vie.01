import {
  cx, trunkTop, trunkBot, trunkMidY,
  BRANCH_DEFS, getBranchGeometry, ROOT_DEFS, blobPath
} from "@/components/tree/treeStyles";

// Style 3: Illustrated with vibrant green canopy, warm trunk, flat gradients
// Wound = darker/muted greens, Strength = vibrant greens
export default function IllustratedArt({ isWound }) {
  const greens = isWound
    ? { light: "#7fa067", mid: "#5a8040", dark: "#3d5a28" }
    : { light: "#8BC34A", mid: "#4CAF50", dark: "#2E7D32" };

  const browns = { light: "#A1887F", mid: "#795548", dark: "#4E342E" };

  const foliageClusters = [
    { x: cx, y: 68, r: 52 },
    { x: cx - 42, y: 88, r: 40 },
    { x: cx + 42, y: 88, r: 40 },
    { x: cx - 18, y: 42, r: 34 },
    { x: cx + 18, y: 42, r: 34 },
    { x: cx, y: 24, r: 26 },
    { x: cx - 58, y: 68, r: 24 },
    { x: cx + 58, y: 68, r: 24 },
    { x: cx - 75, y: 98, r: 22 },
    { x: cx + 75, y: 98, r: 22 },
    { x: cx - 28, y: 95, r: 20 },
    { x: cx + 28, y: 95, r: 20 },
    { x: cx - 88, y: 110, r: 18 },
    { x: cx + 88, y: 110, r: 18 },
  ];

  return (
    <g pointerEvents="none">
      {/* Ground shadow */}
      <ellipse cx={cx} cy={trunkBot + 16} rx="85" ry="8" fill={browns.dark} opacity={0.12} />

      {/* Roots */}
      {ROOT_DEFS.map((r, i) => (
        <g key={`r-${i}`}>
          <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
            stroke={browns.dark} strokeWidth={9 - i * 0.4} fill="none" strokeLinecap="round" opacity={0.65} />
          <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
            stroke={browns.mid} strokeWidth={6 - i * 0.3} fill="none" strokeLinecap="round" opacity={0.8} />
          <path d={`M ${cx - 2} ${trunkBot} Q ${cx + r.cp1x - 2} ${trunkBot + r.cp1y} ${cx + r.dx - 2} ${trunkBot + r.dy}`}
            stroke={browns.light} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.4} />
        </g>
      ))}

      {/* Trunk */}
      <path d={`M ${cx - 16} ${trunkTop} Q ${cx - 18} ${trunkMidY} ${cx - 15} ${trunkBot} L ${cx + 15} ${trunkBot} Q ${cx + 18} ${trunkMidY} ${cx + 16} ${trunkTop} Z`}
        fill={browns.mid} />
      {/* Highlight (left) */}
      <path d={`M ${cx - 16} ${trunkTop} Q ${cx - 18} ${trunkMidY} ${cx - 15} ${trunkBot} L ${cx - 8} ${trunkBot} Q ${cx - 9} ${trunkMidY} ${cx - 10} ${trunkTop} Z`}
        fill={browns.light} opacity={0.55} />
      {/* Shadow (right edge) */}
      <path d={`M ${cx + 8} ${trunkTop} Q ${cx + 12} ${trunkMidY} ${cx + 13} ${trunkBot} L ${cx + 16} ${trunkBot} Q ${cx + 18} ${trunkMidY} ${cx + 16} ${trunkTop} Z`}
        fill={browns.dark} opacity={0.45} />
      {/* Bark texture - brush strokes */}
      <line x1={cx - 8} y1={trunkTop + 15} x2={cx - 9} y2={trunkBot - 15} stroke={browns.dark} strokeWidth="1.2" opacity={0.3} />
      <line x1={cx} y1={trunkTop + 10} x2={cx - 1} y2={trunkBot - 10} stroke={browns.dark} strokeWidth="0.8" opacity={0.2} />
      <line x1={cx + 8} y1={trunkTop + 15} x2={cx + 9} y2={trunkBot - 15} stroke={browns.dark} strokeWidth="1.2" opacity={0.3} />
      <line x1={cx - 4} y1={trunkTop + 50} x2={cx - 5} y2={trunkBot - 40} stroke={browns.light} strokeWidth="0.8" opacity={0.25} />
      <line x1={cx + 4} y1={trunkTop + 60} x2={cx + 3} y2={trunkBot - 30} stroke={browns.light} strokeWidth="0.8" opacity={0.25} />

      {/* Branches */}
      {BRANCH_DEFS.map((bd) => {
        const { startX, startY, midX, midY, end } = getBranchGeometry(bd);
        const w = [8, 6, 4.5][bd.level];
        return (
          <g key={bd.name}>
            <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
              stroke={browns.dark} strokeWidth={w} fill="none" strokeLinecap="round" opacity={0.75} />
            <path d={`M ${startX} ${startY} Q ${midX - 1} ${midY - 1} ${end.x} ${end.y}`}
              stroke={browns.mid} strokeWidth={w * 0.6} fill="none" strokeLinecap="round" opacity={0.85} />
            <path d={`M ${startX} ${startY} Q ${midX - 2} ${midY - 2} ${end.x} ${end.y}`}
              stroke={browns.light} strokeWidth={w * 0.25} fill="none" strokeLinecap="round" opacity={0.4} />
            {/* Sub-branches */}
            {(() => {
              const t1 = 0.5, t2 = 0.72;
              const p1 = { x: (1-t1)*(1-t1)*startX + 2*(1-t1)*t1*midX + t1*t1*end.x,
                           y: (1-t1)*(1-t1)*startY + 2*(1-t1)*t1*midY + t1*t1*end.y };
              const p2 = { x: (1-t2)*(1-t2)*startX + 2*(1-t2)*t2*midX + t2*t2*end.x,
                           y: (1-t2)*(1-t2)*startY + 2*(1-t2)*t2*midY + t2*t2*end.y };
              const dir = bd.side === "left" ? -1 : 1;
              return (
                <g opacity={0.6}>
                  <path d={`M ${p1.x} ${p1.y} Q ${p1.x + dir * 14} ${p1.y - 10} ${p1.x + dir * 28} ${p1.y - 22}`}
                    stroke={browns.dark} strokeWidth={w * 0.5} fill="none" strokeLinecap="round" />
                  <path d={`M ${p2.x} ${p2.y} Q ${p2.x + dir * 10} ${p2.y - 12} ${p2.x + dir * 20} ${p2.y - 26}`}
                    stroke={browns.dark} strokeWidth={w * 0.4} fill="none" strokeLinecap="round" />
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* Foliage - rounded clusters with shading */}
      {foliageClusters.map((f, i) => (
        <g key={`f-${i}`}>
          {/* Dark base */}
          <path d={blobPath(f.x + 1, f.y + 1, f.r, 10, 0.2, i)} fill={greens.dark} opacity={0.65} />
          {/* Mid tone */}
          <path d={blobPath(f.x, f.y, f.r * 0.88, 9, 0.16, i + 3)} fill={greens.mid} opacity={0.8} />
          {/* Light highlight */}
          <ellipse cx={f.x - f.r * 0.25} cy={f.y - f.r * 0.25} rx={f.r * 0.4} ry={f.r * 0.25}
            fill={greens.light} opacity={0.55} />
        </g>
      ))}
    </g>
  );
}