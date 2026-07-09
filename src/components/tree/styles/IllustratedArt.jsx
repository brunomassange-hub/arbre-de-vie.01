import {
  cx, trunkTop, trunkBot,
  BRANCH_DEFS, getBranchGeometry, ROOT_DEFS, blobPath
} from "@/components/tree/treeStyles";

// ── Geometry helpers ──

function cubicPt(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  return {
    x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
    y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y
  };
}

function sampleCubic(p0, p1, p2, p3, n = 12) {
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(cubicPt(i / n, p0, p1, p2, p3));
  return pts;
}

function sampleQuad(p0, cp, p1, n = 8) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push({
      x: (1-t)*(1-t)*p0.x + 2*(1-t)*t*cp.x + t*t*p1.x,
      y: (1-t)*(1-t)*p0.y + 2*(1-t)*t*cp.y + t*t*p1.y
    });
  }
  return pts;
}

// Generate a tapered filled path from centerline points
function taperFill(pts, wStart, wEnd) {
  if (pts.length < 2) return "";
  const left = [], right = [];
  for (let i = 0; i < pts.length; i++) {
    const t = i / (pts.length - 1);
    const w = wStart + (wEnd - wStart) * t;
    let dx, dy;
    if (i === 0) { dx = pts[1].x - pts[0].x; dy = pts[1].y - pts[0].y; }
    else if (i === pts.length - 1) { dx = pts[i].x - pts[i-1].x; dy = pts[i].y - pts[i-1].y; }
    else { dx = pts[i+1].x - pts[i-1].x; dy = pts[i+1].y - pts[i-1].y; }
    const len = Math.sqrt(dx*dx + dy*dy) || 1;
    const nx = -dy / len, ny = dx / len;
    left.push({ x: pts[i].x + nx * w/2, y: pts[i].y + ny * w/2 });
    right.push({ x: pts[i].x - nx * w/2, y: pts[i].y - ny * w/2 });
  }
  let path = `M ${left[0].x.toFixed(1)} ${left[0].y.toFixed(1)}`;
  for (let i = 1; i < left.length; i++) path += ` L ${left[i].x.toFixed(1)} ${left[i].y.toFixed(1)}`;
  for (let i = right.length - 1; i >= 0; i--) path += ` L ${right[i].x.toFixed(1)} ${right[i].y.toFixed(1)}`;
  return path + " Z";
}

// ── Organic branch generation ──

function makeOrganicBranch(bd) {
  const { startX, startY, end } = getBranchGeometry(bd);
  const dir = bd.side === "left" ? -1 : 1;
  const lvl = bd.level;
  // S-curve via cubic bezier with perpendicular offsets
  const p0 = { x: startX, y: startY };
  const p1 = { x: startX + dir * (20 + lvl * 5), y: startY + 5 + lvl * 3 };
  const p2 = { x: end.x - dir * (15 + lvl * 3), y: end.y + 10 + lvl * 2 };
  const p3 = { x: end.x, y: end.y };
  const wStart = [12, 9, 6.5][lvl];
  const wEnd = [2.5, 2, 1.5][lvl];
  const subs = [
    { t: 0.38, angle: -38 - lvl * 8, len: 32 - lvl * 4, wStart: wStart * 0.35, wEnd: 1 },
    { t: 0.62, angle: 22, len: 24 - lvl * 3, wStart: wStart * 0.28, wEnd: 0.8 },
    { t: 0.5, angle: -65, len: 18, wStart: wStart * 0.22, wEnd: 0.7 },
  ];
  return { p0, p1, p2, p3, wStart, wEnd, subs, dir };
}

function subBranchPath(mainPts, sub) {
  const idx = Math.round(sub.t * (mainPts.length - 1));
  const start = mainPts[idx];
  const next = mainPts[Math.min(idx + 1, mainPts.length - 1)];
  const prev = mainPts[Math.max(idx - 1, 0)];
  const tx = next.x - prev.x, ty = next.y - prev.y;
  const tlen = Math.sqrt(tx*tx + ty*ty) || 1;
  const rad = sub.angle * Math.PI / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  const dx = (tx / tlen) * cos - (ty / tlen) * sin;
  const dy = (tx / tlen) * sin + (ty / tlen) * cos;
  const end = { x: start.x + dx * sub.len, y: start.y + dy * sub.len };
  const cpx = (start.x + end.x) / 2 + dx * 4;
  const cpy = (start.y + end.y) / 2 + dy * 4;
  const subPts = [];
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    subPts.push({
      x: (1-t)*(1-t)*start.x + 2*(1-t)*t*cpx + t*t*end.x,
      y: (1-t)*(1-t)*start.y + 2*(1-t)*t*cpy + t*t*end.y
    });
  }
  return subPts;
}

// ── Component ──

export default function IllustratedArt({ isWound }) {
  const greens = isWound
    ? { light: "#7fa067", mid: "#5a8040", dark: "#3d5a28", edge: "#2d4020" }
    : { light: "#8BC34A", mid: "#4CAF50", dark: "#2E7D32", edge: "#1B5E20" };

  const browns = { light: "#A1887F", mid: "#795548", dark: "#4E342E" };

  // Trunk centerline — slight natural curve, wider at base
  const trunkPts = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const y = trunkTop + (trunkBot + 6 - trunkTop) * t;
    const x = cx + Math.sin(t * Math.PI * 0.9) * 1.5;
    trunkPts.push({ x, y });
  }

  // Bark texture — curved segments, not straight lines
  const barkLines = [
    { x: cx - 8, y1: trunkTop + 20, y2: trunkBot - 30, curve: 2, w: 1 },
    { x: cx, y1: trunkTop + 15, y2: trunkBot - 20, curve: -1.5, w: 0.8 },
    { x: cx + 8, y1: trunkTop + 25, y2: trunkBot - 25, curve: 2, w: 1 },
    { x: cx - 4, y1: trunkTop + 50, y2: trunkTop + 80, curve: -2, w: 0.8 },
    { x: cx + 5, y1: trunkTop + 70, y2: trunkTop + 100, curve: 1.5, w: 0.8 },
    { x: cx - 3, y1: trunkTop + 120, y2: trunkTop + 150, curve: -1, w: 0.8 },
    { x: cx + 6, y1: trunkTop + 140, y2: trunkTop + 170, curve: 2, w: 0.8 },
    { x: cx - 7, y1: trunkTop + 180, y2: trunkTop + 210, curve: -1.5, w: 0.8 },
    { x: cx + 3, y1: trunkTop + 200, y2: trunkTop + 230, curve: 1, w: 0.8 },
    { x: cx - 4, y1: trunkTop + 240, y2: trunkTop + 270, curve: -2, w: 0.8 },
    { x: cx + 7, y1: trunkTop + 260, y2: trunkTop + 290, curve: 1.5, w: 0.8 },
  ];

  // Foliage — irregular organic blobs, layered for depth
  const foliageClusters = [
    { x: cx, y: 68, r: 50 },
    { x: cx - 40, y: 85, r: 38 },
    { x: cx + 40, y: 85, r: 38 },
    { x: cx - 65, y: 100, r: 26 },
    { x: cx + 65, y: 100, r: 26 },
    { x: cx - 15, y: 42, r: 33 },
    { x: cx + 15, y: 42, r: 33 },
    { x: cx, y: 22, r: 25 },
    { x: cx - 55, y: 65, r: 22 },
    { x: cx + 55, y: 65, r: 22 },
    { x: cx - 28, y: 95, r: 20 },
    { x: cx + 28, y: 95, r: 20 },
    { x: cx - 125, y: 295, r: 24 },
    { x: cx + 125, y: 295, r: 24 },
    { x: cx - 113, y: 168, r: 22 },
    { x: cx + 113, y: 168, r: 22 },
    { x: cx - 98, y: 95, r: 22 },
    { x: cx + 98, y: 95, r: 22 },
  ];

  // Individual leaf shapes scattered on canopy edges
  const edgeLeaves = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const r = 48 + (i % 3) * 12;
    const lx = cx + Math.cos(angle) * r * 1.15;
    const ly = 65 + Math.sin(angle) * r * 0.75;
    if (ly > 5 && ly < 120) {
      edgeLeaves.push({ x: lx, y: ly, angle: (angle * 180 / Math.PI) + 90 });
    }
  }

  const organicBranches = BRANCH_DEFS.map(makeOrganicBranch);

  return (
    <g pointerEvents="none">
      {/* Ground shadow */}
      <ellipse cx={cx} cy={trunkBot + 18} rx="88" ry="7" fill={browns.dark} opacity={0.1} />

      {/* Roots — tapered filled with sub-roots */}
      {ROOT_DEFS.map((r, i) => {
        const start = { x: cx, y: trunkBot + 2 };
        const cp = { x: cx + r.cp1x, y: trunkBot + r.cp1y };
        const end = { x: cx + r.dx, y: trunkBot + r.dy };
        const pts = sampleQuad(start, cp, end, 8);
        const wStart = 10 - i * 0.5;
        const wEnd = 1.5;
        const midPt = pts[4];
        const subEnd = { x: end.x + (i % 2 === 0 ? -8 : 8), y: end.y + 8 };
        const subCp = { x: (midPt.x + subEnd.x)/2, y: (midPt.y + subEnd.y)/2 + 3 };
        const subPts = sampleQuad(midPt, subCp, subEnd, 5);
        return (
          <g key={`r-${i}`}>
            <path d={taperFill(pts, wStart + 2, wEnd + 1)} fill={browns.dark} opacity={0.55} />
            <path d={taperFill(pts, wStart, wEnd)} fill={browns.mid} opacity={0.8} />
            {i < 4 && (
              <path d={taperFill(subPts, 3, 0.8)} fill={browns.dark} opacity={0.5} />
            )}
          </g>
        );
      })}

      {/* Trunk — tapered filled with natural curve and root flare */}
      <path d={taperFill(trunkPts, 28, 42)} fill={browns.dark} opacity={0.5} />
      <path d={taperFill(trunkPts, 26, 38)} fill={browns.mid} />
      {/* Highlight (offset left) */}
      <path d={taperFill(trunkPts.map(p => ({ x: p.x - 2, y: p.y })), 12, 18)} fill={browns.light} opacity={0.45} />

      {/* Bark texture — curved organic cracks */}
      {barkLines.map((b, i) => (
        <path key={`b-${i}`} d={`M ${b.x} ${b.y1} Q ${b.x + b.curve} ${(b.y1+b.y2)/2} ${b.x + b.curve * 0.5} ${b.y2}`}
          stroke={browns.dark} strokeWidth={b.w} fill="none" opacity={0.3} strokeLinecap="round" />
      ))}

      {/* Branches — tapered filled with S-curves and sub-branches */}
      {organicBranches.map((br, bi) => {
        const pts = sampleCubic(br.p0, br.p1, br.p2, br.p3, 12);
        return (
          <g key={bi}>
            <path d={taperFill(pts, br.wStart + 2, br.wEnd + 1)} fill={browns.dark} opacity={0.6} />
            <path d={taperFill(pts, br.wStart, br.wEnd)} fill={browns.mid} />
            <path d={taperFill(pts.map(p => ({ x: p.x + br.dir, y: p.y - 1 })), br.wStart * 0.4, br.wEnd * 0.3)} fill={browns.light} opacity={0.35} />
            {br.subs.map((sub, si) => {
              const subPts = subBranchPath(pts, sub);
              return (
                <g key={si}>
                  <path d={taperFill(subPts, sub.wStart + 1, sub.wEnd + 0.5)} fill={browns.dark} opacity={0.5} />
                  <path d={taperFill(subPts, sub.wStart, sub.wEnd)} fill={browns.mid} opacity={0.75} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Foliage — 4-layer organic blobs for depth */}
      {foliageClusters.map((f, i) => (
        <g key={`f-${i}`}>
          <path d={blobPath(f.x + 1, f.y + 2, f.r, 14, 0.28, i)} fill={greens.edge} opacity={0.5} />
          <path d={blobPath(f.x, f.y, f.r * 0.9, 12, 0.22, i + 5)} fill={greens.dark} opacity={0.7} />
          <path d={blobPath(f.x - 2, f.y - 2, f.r * 0.72, 11, 0.18, i + 9)} fill={greens.mid} opacity={0.8} />
          <ellipse cx={f.x - f.r * 0.25} cy={f.y - f.r * 0.25} rx={f.r * 0.35} ry={f.r * 0.22}
            fill={greens.light} opacity={0.4} />
        </g>
      ))}

      {/* Scattered edge leaves */}
      {edgeLeaves.map((l, i) => (
        <ellipse key={`el-${i}`} cx={l.x} cy={l.y} rx={3} ry={5.5} fill={greens.mid} opacity={0.5}
          transform={`rotate(${l.angle} ${l.x} ${l.y})`} />
      ))}
    </g>
  );
}