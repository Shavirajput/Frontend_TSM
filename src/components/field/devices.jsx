import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ reveal */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(true);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    setSeen(false);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px", ...optionsRef.current }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function Reveal({ children, className, delay = 0, as: As = "div", style }) {
  const [ref, seen] = useInView();
  return (
    <As
      ref={ref}
      className={cn(
        "opacity-100 transition-[opacity,transform] duration-[600ms] ease-out",
        seen ? "translate-y-0" : "translate-y-3",
        className
      )}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

/* ------------------------------------------------- running head + folio */
export function RunningHead({ left, right, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b pb-2.5 mb-7",
        className
      )}
      style={{ borderColor: "rgb(var(--rule) / var(--rule-a))" }}
    >
      <span className="font-mono text-[9.5px] tracking-[0.24em] uppercase text-ink/50 truncate">
        {left}
      </span>
      <span className="font-mono text-[9.5px] tracking-[0.24em] uppercase text-ink/35 shrink-0">
        {right}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ section */
export function PageSection({
  n,
  title,
  kicker,
  id,
  children,
  className,
  runningHead = "TSM Nexus · Revenue Leak Field Guide",
  wide = false,
}) {
  return (
    <section
      id={id}
      data-page={n}
      data-testid={`section-${id}`}
      className={cn("relative scroll-mt-24 section-pad", className)}
      aria-labelledby={`${id}-title`}
    >
      <RunningHead left={runningHead} right={`Page ${n} / 20`} />

      <div className="relative">
        {/* oversized cropped numeral — graphic weight only */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-[0.34em] right-[-0.06em] font-display font-semibold leading-none text-ink/[0.055] text-[7rem] sm:text-[11rem] lg:text-[15rem]"
        >
          {n}
        </span>

        <div className={cn("relative", !wide && "max-w-[46rem]")}>
          {kicker && <div className="label mb-3">{kicker}</div>}
          <h2
            id={`${id}-title`}
            className="font-display font-semibold text-[1.85rem] leading-[1.08] sm:text-[2.4rem] lg:text-[3.1rem] text-ink"
          >
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ stamp */
export function Stamp({ children = "Revenue Leak", tone = "red", className }) {
  const [ref, seen] = useInView({ threshold: 0.6 });
  return (
    <span
      ref={ref}
      data-testid="revenue-leak-stamp"
      className={cn(
        "stamp select-none",
        tone === "blue" && "stamp-blue",
        tone === "green" && "stamp-green",
        seen ? "stamp-in" : "opacity-0",
        className
      )}
      style={{ transform: "rotate(-8deg)" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ rules */
export function Rule({ className }) {
  return <div className={cn("rule-thin my-8", className)} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ marginalia */
export function MarginNote({ children, className }) {
  return (
    <aside
      data-testid="annotation-callout"
      className={cn("margin-leader my-7 border-l pl-4 md:pl-5", className)}
      style={{ borderColor: "rgb(var(--nexus) / 0.45)" }}
    >
      <div className="font-hand text-[1.2rem] md:text-[1.35rem] leading-snug text-navy">
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ pull quote */
export function PullQuote({ children, cite, className }) {
  return (
    <Reveal className={cn("my-11 md:my-14", className)}>
      <div
        className="pullquote border-l pl-6 md:pl-8"
        style={{ borderColor: "rgb(var(--rule) / 0.3)" }}
      >
        <p className="relative font-display font-semibold text-[1.45rem] sm:text-[2rem] lg:text-[2.35rem] leading-[1.12] text-ink">
          {children}
        </p>
        {cite && <div className="label mt-4">{cite}</div>}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ mark */
export const Mark = ({ children, tone = "blue" }) => (
  <span className={tone === "red" ? "mark-red" : "mark-blue"}>{children}</span>
);

/* ------------------------------------------------------------------ ink panel */
export function InkPanel({ children, className, id, testid, grid = true }) {
  return (
    <section
      id={id}
      data-testid={testid}
      className={cn("ink-panel relative overflow-hidden", className)}
    >
      {grid && (
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-70"
          style={{
            maskImage:
              "radial-gradient(120% 100% at 50% 0%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(120% 100% at 50% 0%, black 0%, transparent 75%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

/* ------------------------------------------- short ink divider (rhythm break) */
export function InkDivider({ children, stamp, testid }) {
  return (
    <InkPanel testid={testid} className="my-0" grid={false}>
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-14 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-display font-semibold text-[1.35rem] sm:text-[1.75rem] lg:text-[2.05rem] leading-[1.15] text-ink max-w-[38ch]">
            {children}
          </p>
          {stamp && <Stamp className="shrink-0">{stamp}</Stamp>}
        </div>
      </div>
    </InkPanel>
  );
}

/* ------------------------------------------------------------------ manual list */
export function ManualList({ items, className, arrows = false }) {
  return (
    <ol className={cn("mt-2", className)}>
      {items.map((it, i) => (
        <li key={it.n || i}>
          <Reveal
            delay={i * 45}
            className="grid grid-cols-[3rem,1fr] gap-3 sm:gap-6 py-4 md:py-5 border-t"
          >
            <div
              className="font-mono text-xs sm:text-sm tracking-[0.16em] text-nexus pt-[3px]"
              style={{ borderColor: "rgb(var(--rule) / var(--rule-soft-a))" }}
            >
              {it.n}
            </div>
            <div>
              <div className="font-mono text-[11px] sm:text-[12.5px] tracking-[0.22em] uppercase text-ink font-semibold">
                {it.title}
              </div>
              <p className="mt-2 text-[15px] md:text-base leading-relaxed text-ink/72">
                {it.body}
              </p>
            </div>
          </Reveal>
          {arrows && i < items.length - 1 && (
            <div
              aria-hidden="true"
              className="pl-[0.95rem] text-ink/25 font-mono text-sm leading-none"
            >
              &#8595;
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ ticks */
export function TickList({ items, tone = "green", testid }) {
  const color =
    tone === "red"
      ? "rgb(var(--leak))"
      : tone === "blue"
        ? "rgb(var(--nexus))"
        : "rgb(var(--growth))";
  return (
    <ul data-testid={testid} className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
      {items.map((t, i) => (
        <li
          key={i}
          className="flex items-start gap-3 py-2.5 border-b"
          style={{ borderColor: "rgb(var(--rule) / var(--rule-soft-a))" }}
        >
          <span
            aria-hidden="true"
            className="mt-[0.6rem] h-[6px] w-[6px] shrink-0"
            style={{ background: color }}
          />
          <span className="text-[15px] md:text-base leading-relaxed text-ink/80">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ sheet */
export function Sheet({ children, className, hover = false, testid, plate = false }) {
  return (
    <div
      data-testid={testid}
      className={cn(
        plate ? "evidence-frame reg-marks" : "sheet",
        !plate && hover && "sheet-hover",
        "rounded-[6px]",
        className
      )}
    >
      {children}
    </div>
  );
}
