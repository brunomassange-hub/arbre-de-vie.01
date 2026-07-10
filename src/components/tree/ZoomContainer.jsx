import React, { useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ZoomContainer({ children, className = "", style = {} }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const containerRef = useRef(null);
  const pinchRef = useRef(null);
  const dragRef = useRef(null);

  const clampScale = (s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

  const zoomBy = useCallback((factor, cx, cy) => {
    setScale(prev => {
      const next = clampScale(prev * factor);
      if (next === prev) return prev;
      const ratio = next / prev;
      // Keep focal point stable
      setTx(prevTx => cx !== undefined ? cx - (cx - prevTx) * ratio : prevTx);
      setTy(prevTy => cy !== undefined ? cy - (cy - prevTy) * ratio : prevTy);
      return next;
    });
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    zoomBy(e.deltaY > 0 ? 0.9 : 1.1, cx, cy);
  }, [zoomBy]);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = { dist: Math.sqrt(dx * dx + dy * dy), scale };
    } else if (e.touches.length === 1 && scale > 1) {
      dragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx, ty };
    }
  }, [scale, tx, ty]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = dist / pinchRef.current.dist;
      setScale(clampScale(pinchRef.current.scale * ratio));
    } else if (e.touches.length === 1 && dragRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - dragRef.current.x;
      const dy = e.touches[0].clientY - dragRef.current.y;
      setTx(dragRef.current.tx + dx);
      setTy(dragRef.current.ty + dy);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
    dragRef.current = null;
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return;
    dragRef.current = { x: e.clientX, y: e.clientY, tx, ty };
  }, [scale, tx, ty]);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setTx(dragRef.current.tx + dx);
    setTy(dragRef.current.ty + dy);
  }, []);

  const handleMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          touchAction: "none",
          cursor: scale > 1 ? "grab" : "default",
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: dragRef.current ? "none" : "transform 0.15s ease-out",
        }}>
          {children}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-2 right-2 z-30 flex flex-col gap-1.5">
        <button onClick={() => zoomBy(1.25)}
          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-[#3e2723] hover:bg-white transition"
          title="Zoomer">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => zoomBy(0.8)}
          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-[#3e2723] hover:bg-white transition"
          title="Dézoomer">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={reset}
          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-[#3e2723] hover:bg-white transition"
          title="Réinitialiser">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}