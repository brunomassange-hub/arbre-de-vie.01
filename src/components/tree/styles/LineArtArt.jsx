import {
  cx, trunkTop, trunkBot, trunkMidY,
  BRANCH_DEFS, getBranchGeometry, ROOT_DEFS
} from "@/components/tree/treeStyles";

// Style 2: Pure line art, tree enclosed in a circle, black on white
export default function LineArtArt({ isWound }) {
  const stroke = "#1a1a1a";
  const sw = 2.5;
  const circleR = 245;
  const circleCy = 260;

  const leafClusters = [
    { x: cx, y: 68, r: 52 },
    { x: cx - 42, y: 85, r: 40 },
    { x: cx + 42, y: 85, r: 40 },
    { x: cx - 72, y: 100, r: 26 },
    { x: cx + 72, y: 100, r: 26 },
    { x: cx - 18, y: 42, r: 34 },
    { x: cx + 18, y: 42, r: 34 },
    { x: cx, y: 24, r: 26 },
    { x: cx - 58, y: 68, r: 24 },
    { x: cx + 58, y: 68, r: 24 },
    { x: cx - 88, y: 112, r: 20 },
    { x: cx + 88, y: 112, r: 20 },
    { x: cx - 28, y: 95, r: 22 },
    { x: cx + 28, y: 95, r: 22 },
  ];

  return (
    <g pointerEvents="none">
      {/* Circle border */}
      <circle cx={cx} cy={circleCy} r={circleR} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.4} />

      {/* Ground line */}
      <line x1="70" y1={trunkBot + 10} x2="330" y2={trunkBot + 10} stroke={stroke} strokeWidth={sw * 0.6} opacity={0.3} />

      {/* Roots - symmetric */}
      {ROOT_DEFS.map((r, i) => (
        <g key={`r-${i}`}>
          <path d={`M ${cx} ${trunkBot} Q ${cx + r.cp1x} ${trunkBot + r.cp1y} ${cx + r.dx} ${trunkBot + r.dy}`}
            stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" opacity={0.75} />
          {/* Root detail lines */}
          {i % 2 === 0 && (
            <path d={`M ${cx + r.cp1x * 0.5} ${trunkBot + r.cp1y * 0.5} Q ${cx + r.cp1x * 0.7} ${trunkBot + r.cp1y * 0.7 + 5} ${cx + r.dx * 0.8} ${trunkBot + r.dy * 0.85}`}
              stroke={stroke} strokeWidth={sw * 0.4} fill="none" strokeLinecap="round" opacity={0.3} />
          )}
        </g>
      ))}

      {/* Trunk - two outlined edges */}
      <path d={`M ${cx - 14} ${trunkTop} Q ${cx - 16} ${trunkMidY} ${cx - 14} ${trunkBot}`}
        stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
      <path d={`M ${cx + 14} ${trunkTop} Q ${cx + 16} ${trunkMidY} ${cx + 14} ${trunkBot}`}
        stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
      {/* Trunk texture lines */}
      <line x1={cx - 7} y1={trunkTop + 20} x2={cx - 8} y2={trunkBot - 15} stroke={stroke} strokeWidth={sw * 0.4} opacity={0.35} />
      <line x1={cx} y1={trunkTop + 15} x2={cx} y2={trunkBot - 10} stroke={stroke} strokeWidth={sw * 0.3} opacity={0.25} />
      <line x1={cx + 7} y1={trunkTop + 20} x2={cx + 8} y2={trunkBot - 15} stroke={stroke} strokeWidth={sw * 0.4} opacity={0.35} />
      {/* Trunk base flare */}
      <path d={`M ${cx - 18} ${trunkBot} Q ${cx - 14} ${trunkBot + 4} ${cx - 10} ${trunkBot + 8}`}
        stroke={stroke} strokeWidth={sw * 0.5} fill="none" strokeLinecap="round" opacity={0.4} />
      <path d={`M ${cx + 18} ${trunkBot} Q ${cx + 14} ${trunkBot + 4} ${cx + 10} ${trunkBot + 8}`}
        stroke={stroke} strokeWidth={sw * 0.5} fill="none" strokeLinecap="round" opacity={0.4} />

      {/* Branches */}
      {BRANCH_DEFS.map((bd) => {
        const { startX, startY, midX, midY, end } = getBranchGeometry(bd);
        const w = [sw, sw * 0.85, sw * 0.7][bd.level];
        return (
          <g key={bd.name}>
            <path d={`M ${startX} ${startY} Q ${midX} ${midY} ${end.x} ${end.y}`}
              stroke={stroke} strokeWidth={w} fill="none" strokeLinecap="round" />
            {/* Sub-branch */}
            {(() => {
              const t = 0.55;
              const p = {
                x: (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * end.x,
                y: (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * end.y
              };
              const dir = bd.side === "left" ? -1 : 1;
              return (
                <path d={`M ${p.x} ${p.y} Q ${p.x + dir * 12} ${p.y - 8} ${p.x + dir * 24} ${p.y - 20}`}
                  stroke={stroke} strokeWidth={w * 0.5} fill="none" strokeLinecap="round" opacity={0.6} />
              );
            })()}
          </g>
        );
      })}

      {/* Foliage - rounded leaf shapes, outlined circles */}
      {leafClusters.map((f, i) => (
        <g key={`l-${i}`}>
          <circle cx={f.x} cy={f.y} r={f.r} fill="none" stroke={stroke} strokeWidth={sw * 0.7} opacity={0.65} />
          {/* Inner leaf details */}
          <circle cx={f.x - f.r * 0.3} cy={f.y - f.r * 0.2} r={f.r * 0.18} fill="none" stroke={stroke} strokeWidth={sw * 0.3} opacity={0.3} />
          <circle cx={f.x + f.r * 0.25} cy={f.y + f.r * 0.3} r={f.r * 0.14} fill="none" stroke={stroke} strokeWidth={sw * 0.3} opacity={0.3} />
          {f.r > 30 && (
            <circle cx={f.x + f.r * 0.1} cy={f.y - f.r * 0.35} r={f.r * 0.12} fill="none" stroke={stroke} strokeWidth={sw * 0.3} opacity={0.25} />
          )}
        </g>
      ))}
    </g>
  );
}