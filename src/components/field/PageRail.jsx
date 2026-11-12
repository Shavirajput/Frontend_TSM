import React, { useEffect, useState, useCallback, useRef } from "react";
import { PAGES } from "@/data/guide";
import { cn } from "@/lib/utils";

export default function PageRail() {
  const [active, setActive] = useState("page-01");
  const [progress, setProgress] = useState(0);
  const [railProgressHeight, setRailProgressHeight] = useState(0);
  const railListRef = useRef(null);

  useEffect(() => {
    const sections = PAGES.map((p) => document.getElementById(p.id)).filter(Boolean);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);

        const activationLine = window.innerHeight * 0.15;
        const activeSection = [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= activationLine);
        setActive((activeSection || sections[0])?.id || PAGES[0].id);

        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const current = PAGES.find((p) => p.id === active) || PAGES[0];
  const currentIndex = PAGES.findIndex((p) => p.id === current.id);
  const pageProgress = Math.round(
    (currentIndex / Math.max(PAGES.length - 1, 1)) * 100
  );

  useEffect(() => {
    const list = railListRef.current;
    if (!list) return;

    const updateProgress = () => {
      const marker = list.querySelector(
        `[data-testid="page-rail-marker-${current.n}"]`
      );
      if (!marker) return;

      const listTop = list.getBoundingClientRect().top;
      const markerRect = marker.getBoundingClientRect();
      setRailProgressHeight(markerRect.top + markerRect.height / 2 - listTop);
    };

    updateProgress();
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, [current.n]);

  return (
    <>
      {/* ---------- mobile: sticky folio bar ---------- */}
      <div
        data-testid="reading-progress-mobile"
        className="lg:hidden sticky top-[var(--nav-h)] z-40 border-b bg-paper/92 backdrop-blur supports-[backdrop-filter]:bg-paper/80"
        style={{ borderColor: "rgb(var(--rule) / var(--rule-a))" }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2">
          <a
            href="/"
            className="font-mono text-[9.5px] font-semibold tracking-[0.26em] uppercase text-ink/75"
          >
            TSM NEXUS
          </a>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-nexus">
              PAGE {current.n}
            </span>
            <span className="font-mono text-[9.5px] text-ink/35">/ 20</span>
          </div>
        </div>
        <div className="h-[2px] bg-ink/[0.08]">
          <div
            className="h-full bg-nexus transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ---------- desktop: left rail ---------- */}
      <nav
        data-testid="page-rail"
        aria-label="Field guide pages"
        className="field-guide-rail hidden lg:flex fixed left-0 top-0 z-30 h-screen w-[var(--rail-w)] flex-col items-center border-r bg-paper/80 backdrop-blur-[2px] py-5"
        style={{ borderColor: "rgb(var(--rule) / var(--rule-a))" }}
      >
        <div className="flex-1 w-full flex flex-col items-center justify-start">
          <div
            ref={railListRef}
            className="field-guide-rail-list relative w-full flex flex-col items-center gap-[2px] py-1"
          >
            <div
              className="absolute left-[17px] top-0 bottom-0 w-px"
              aria-hidden="true"
              style={{ background: "rgb(var(--rule) / 0.24)" }}
            />
            <div
              data-testid="reading-progress"
              className="absolute left-[16px] top-0 w-[3px] bg-nexus"
              style={{ height: `${railProgressHeight}px` }}
              aria-hidden="true"
            />
            {PAGES.map((p) => {
              const isActive = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  data-testid={`page-rail-marker-${p.n}`}
                  onClick={() => go(p.id)}
                  title={`Page ${p.n} — ${p.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="field-guide-rail-marker group relative z-10 flex w-full items-center justify-end pr-3.5 py-[2px]"
                >
                  <span
                    className={cn(
                      "field-guide-rail-number font-mono text-[10px] tracking-[0.1em] transition-colors duration-200",
                      isActive
                        ? "text-nexus font-semibold"
                        : "text-ink/30 group-hover:text-ink/75"
                    )}
                  >
                    {p.n}
                  </span>
                  <span
                    className="pointer-events-none absolute left-[calc(100%+6px)] whitespace-nowrap rounded-[3px] border bg-paper-sheet px-2 py-1 font-mono text-[9px] tracking-[0.14em] uppercase text-ink/75 opacity-0 shadow-[var(--shadow-paper)] transition-opacity duration-150 group-hover:opacity-100"
                    style={{ borderColor: "rgb(var(--rule) / var(--rule-a))" }}
                  >
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex flex-col items-center">
            <div className="field-guide-rail-percentage font-mono text-[9px] tracking-[0.14em] text-ink/40">
              {String(pageProgress).padStart(2, "0")}%
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
