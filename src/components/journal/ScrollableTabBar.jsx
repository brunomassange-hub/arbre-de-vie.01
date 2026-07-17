import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollableTabBar({ children, className = "" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener("resize", checkScroll);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("resize", checkScroll);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <style>{`
        .scrollable-tabbar::-webkit-scrollbar { display: none; }
        .scrollable-tabbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-[#f5f0e8] border border-[#e0d6c8] text-[#8d6e63] hover:bg-[#e0d6c8] transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={`scrollable-tabbar flex gap-1.5 overflow-x-auto pb-1 ${className}`}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-[#f5f0e8] border border-[#e0d6c8] text-[#8d6e63] hover:bg-[#e0d6c8] transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}