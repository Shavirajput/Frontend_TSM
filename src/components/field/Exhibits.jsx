import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal, useInView, Stamp } from "./devices";
import { LAYERS, VALUE_CHAIN } from "@/data/guide";

const RULE = { borderColor: "rgb(var(--rule) / var(--rule-a))" };
const RULE_SOFT = { borderColor: "rgb(var(--rule) / var(--rule-soft-a))" };

/* ============================================================ evidence plate */
export function Exhibit({
  label,
  caption,
  children,
  className,
  tone = "neutral",
  testid = "exhibit-wireframe",
}) {
  return (
    <figure className={cn("my-9 md:my-12", className)}>
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <figcaption className="label">{label}</figcaption>
        {tone === "neutral" && (
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
            Evidence plate
          </span>
        )}
      </div>
      <div className="relative">
        <div
          data-testid={testid}
          className="evidence-frame reg-marks rounded-[6px] overflow-hidden"
        >
          {children}
        </div>
        {tone === "leak" && (
          <div className="absolute -top-[18px] right-3 sm:right-6 z-10">
            <Stamp>Revenue Leak</Stamp>
          </div>
        )}
        {tone === "ok" && (
          <div className="absolute -top-[18px] right-3 sm:right-6 z-10">
            <Stamp tone="green">No Leak</Stamp>
          </div>
        )}
      </div>
      {caption && (
        <div className="mt-3.5 flex items-start gap-2.5">
          <svg
            aria-hidden="true"
            width="26"
            height="16"
            viewBox="0 0 26 16"
            className="mt-1.5 shrink-0 text-nexus/60"
          >
            <path
              d="M1 15 C 8 15, 10 4, 25 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M25 3 L20 1.5 M25 3 L20.5 6" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="font-hand text-[1.15rem] leading-snug text-navy">{caption}</div>
        </div>
      )}
    </figure>
  );
}

/* ============================================================ image plate */
export function PlateImage({ src, alt, label, caption, testid, className }) {
  return (
    <figure className={cn("my-9 md:my-12", className)} data-testid={testid}>
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <figcaption className="label">{label}</figcaption>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
          Illustration
        </span>
      </div>
      <div className="evidence-frame reg-marks rounded-[6px] overflow-hidden p-2 sm:p-2.5">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full rounded-[3px] object-cover"
        />
      </div>
      {caption && (
        <div className="mt-3.5 flex items-start gap-2.5">
          <svg
            aria-hidden="true"
            width="26"
            height="16"
            viewBox="0 0 26 16"
            className="mt-1.5 shrink-0 text-nexus/60"
          >
            <path
              d="M1 15 C 8 15, 10 4, 25 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M25 3 L20 1.5 M25 3 L20.5 6" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="font-hand text-[1.15rem] leading-snug text-navy">{caption}</div>
        </div>
      )}
    </figure>
  );
}

/* browser chrome bar */
function Chrome({ url = "yourcompany.com" }) {
  return (
    <div
      className="flex items-center gap-2 border-b bg-paper px-3 py-2.5"
      style={RULE}
    >
      <span className="h-[7px] w-[7px] rounded-full bg-ink/20" />
      <span className="h-[7px] w-[7px] rounded-full bg-ink/20" />
      <span className="h-[7px] w-[7px] rounded-full bg-ink/20" />
      <div
        className="ml-2 flex-1 rounded-[3px] bg-paper-sheet border px-2 py-1 font-mono text-[9.5px] text-ink/45 truncate"
        style={RULE_SOFT}
      >
        {url}
      </div>
    </div>
  );
}

/* ============================================ 08 — the conversion leak journey */
export function ConversionJourneyExhibit() {
  const steps = [
    { t: "HOMEPAGE", note: 'CTA reads “Learn More”', body: "hero" },
    { t: "GENERIC PAGE", note: "No obvious next step", body: "blocks" },
    { t: "ANOTHER PAGE", note: "Visitor is now navigating for you", body: "blocks" },
    { t: "FORM", note: "11 fields", body: "form" },
  ];
  return (
    <Exhibit
      label="Exhibit A · Conversion path"
      tone="leak"
      caption="Nothing is technically broken. The journey is leaking intent."
    >
      <Chrome url="yourcompany.com/solutions" />
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <div
                className="relative rounded-[4px] border bg-paper p-3"
                style={RULE}
              >
                <div className="font-mono text-[8.5px] tracking-[0.2em] text-ink/45 mb-2">
                  {String(i + 1).padStart(2, "0")} · {s.t}
                </div>
                {s.body === "hero" && (
                  <div className="space-y-1.5">
                    <div className="wire h-2 w-3/4" />
                    <div className="wire h-2 w-full" />
                    <div className="wire h-2 w-2/3" />
                    <div
                      className="mt-3 h-5 w-24 rounded-[3px] border flex items-center justify-center font-mono text-[7.5px] text-nexus tracking-wider"
                      style={{
                        background: "rgb(var(--nexus) / 0.14)",
                        borderColor: "rgb(var(--nexus) / 0.35)",
                      }}
                    >
                      LEARN MORE
                    </div>
                  </div>
                )}
                {s.body === "blocks" && (
                  <div className="space-y-1.5">
                    <div className="wire h-2 w-2/3" />
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="wire h-8" />
                      <div className="wire h-8" />
                      <div className="wire h-8" />
                    </div>
                    <div className="wire h-2 w-1/2" />
                  </div>
                )}
                {s.body === "form" && (
                  <div className="space-y-[5px]">
                    {Array.from({ length: 8 }).map((_, k) => (
                      <div key={k} className="wire-dark h-[7px] w-full" />
                    ))}
                    <div className="wire-dark h-[7px] w-2/3" />
                    <div className="h-4 w-16 rounded-[2px] bg-ink/70 mt-1.5" />
                  </div>
                )}
                <div className="mt-3 font-hand text-[1.05rem] leading-tight text-leak">
                  {s.note}
                </div>
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-[13px] font-mono text-ink/25 text-sm"
                  >
                    &#8594;
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <div
          className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4"
          style={RULE}
        >
          <span className="label">Intent remaining</span>
          <div className="flex-1 min-w-[140px] h-2 bg-ink/[0.08] overflow-hidden rounded-[2px]">
            <div className="h-full w-[22%]" style={{ background: "rgb(var(--leak) / 0.75)" }} />
          </div>
          <span className="font-mono text-[11px] text-leak">~22%</span>
        </div>
      </div>
    </Exhibit>
  );
}

/* ================================================ 09 — the trust leak exhibit */
export function TrustExhibit() {
  const missing = [
    "No meaningful case studies",
    "No specific results",
    "No customer proof",
    "No credible authority",
    "No demonstration of expertise",
  ];
  return (
    <Exhibit
      label="Exhibit B · Evidence inventory"
      tone="leak"
      caption="They aren’t thinking “this company is bad.” They’re thinking “I’m not sure.”"
    >
      <Chrome url="yourcompany.com/about" />
      <div className="grid md:grid-cols-2">
        <div className="p-5 sm:p-7 border-b md:border-b-0 md:border-r" style={RULE}>
          <div className="label mb-3">The claim</div>
          <p className="font-display font-semibold text-xl sm:text-2xl leading-tight text-ink">
            “We’re the best solution for your business.”
          </p>
          <div className="mt-6 space-y-2">
            <div className="wire h-2 w-full" />
            <div className="wire h-2 w-11/12" />
            <div className="wire h-2 w-4/5" />
          </div>
          <div className="mt-6 font-hand text-[1.2rem] text-leak">
            But where&rsquo;s the evidence?
          </div>
        </div>
        <div className="p-5 sm:p-7 bg-paper">
          <div className="label mb-3">The evidence</div>
          <ul className="space-y-0">
            {missing.map((m, i) => (
              <Reveal as="li" key={m} delay={i * 70}>
                <div className="flex items-center gap-3 py-2.5 border-b" style={RULE_SOFT}>
                  <span aria-hidden="true" className="font-mono text-leak text-sm leading-none w-3">
                    &#215;
                  </span>
                  <span className="relative text-[15px] text-ink/70">
                    {m}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 top-1/2 h-[7px] -translate-y-1/2"
                      style={{ background: "rgb(var(--leak) / 0.14)" }}
                    />
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase text-leak">
            Uncertainty kills action
          </div>
        </div>
      </div>
    </Exhibit>
  );
}

/* =============================================== 10 — clarity compare exhibit */
export function ClarityExhibit() {
  const questions = [
    "What do you actually do?",
    "Who is it for?",
    "Why should I care?",
    "Why you?",
  ];
  return (
    <Exhibit
      label="Exhibit C · Headline comprehension"
      tone="leak"
      caption="If the visitor has to solve these questions themselves, you’re creating cognitive friction."
    >
      <div className="grid md:grid-cols-2">
        <div className="p-5 sm:p-7 border-b md:border-b-0 md:border-r" style={RULE}>
          <div className="font-mono text-[9.5px] font-semibold tracking-[0.22em] uppercase text-leak mb-3">
            What the page says
          </div>
          <p className="font-display font-semibold text-xl sm:text-[1.6rem] leading-[1.16] text-ink">
            “Empowering businesses through innovative digital transformation.”
          </p>
          <div className="mt-5 label">It sounds impressive.</div>
        </div>
        <div className="p-5 sm:p-7 bg-paper">
          <div className="font-mono text-[9.5px] font-semibold tracking-[0.22em] uppercase text-ink/50 mb-3">
            What the visitor asks
          </div>
          <ul>
            {questions.map((q, i) => (
              <Reveal as="li" key={q} delay={i * 80}>
                <div
                  className="py-2.5 border-b font-hand text-[1.25rem] leading-snug text-navy"
                  style={RULE_SOFT}
                >
                  {q}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Exhibit>
  );
}

/* ============================================ 11 — performance waterfall bars */
export function PerformanceExhibit() {
  const bars = [
    { name: "document", w: 12, offset: 0, tone: "ok" },
    { name: "hero-image.png (3.4 MB)", w: 46, offset: 12, tone: "bad" },
    { name: "webfonts (6 weights)", w: 18, offset: 14, tone: "warn" },
    { name: "analytics + 4 tags", w: 26, offset: 20, tone: "warn" },
    { name: "carousel.js", w: 22, offset: 34, tone: "bad" },
    { name: "chat widget", w: 30, offset: 46, tone: "bad" },
  ];
  const color = (t) =>
    t === "bad"
      ? "rgb(var(--leak) / 0.7)"
      : t === "warn"
        ? "rgb(var(--nexus) / 0.5)"
        : "rgb(var(--growth) / 0.6)";
  const [ref, seen] = useInView({ threshold: 0.3 });
  return (
    <Exhibit
      label="Exhibit D · Load waterfall"
      tone="leak"
      caption="The question isn’t “is your PageSpeed score 87?” It’s whether technology is getting in the way."
    >
      <div ref={ref} className="p-5 sm:p-7">
        <div className="space-y-2.5">
          {bars.map((b, i) => (
            <div
              key={b.name}
              className="grid grid-cols-[1fr] sm:grid-cols-[215px,1fr] gap-1 sm:gap-4 items-center"
            >
              <div className="font-mono text-[9.5px] tracking-[0.06em] text-ink/55 truncate">
                {b.name}
              </div>
              <div
                className="relative h-3 bg-ink/[0.05] overflow-hidden rounded-[2px]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgb(var(--rule) / 0.09) 0 1px, transparent 1px 10%)",
                }}
              >
                <div
                  className="absolute top-0 h-full rounded-[2px] transition-[width] duration-700 ease-out"
                  style={{
                    left: `${b.offset}%`,
                    width: seen ? `${b.w}%` : "0%",
                    transitionDelay: `${i * 100}ms`,
                    background: color(b.tone),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-9 gap-y-2 border-t pt-4" style={RULE}>
          {[
            ["LCP", "6.1 s"],
            ["INP", "420 ms"],
            ["CLS", "0.31"],
            ["Mobile abandon", "~38%"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="label">{k}</div>
              <div className="font-mono text-sm text-leak mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Exhibit>
  );
}

/* ================================================= 03 — value chain diagram */
export function ValueChainDiagram() {
  const [active, setActive] = useState(null);
  return (
    <div
      data-testid="value-chain-diagram"
      role="group"
      aria-label="The commercial chain: Demand, Attention, Understanding, Trust, Intent, Conversion, Lead, Customer, Revenue. A failure anywhere creates a leak."
      className="my-10 md:my-12"
    >
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <div className="label">The chain</div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
          Schematic
        </span>
      </div>
      <div className="evidence-frame reg-marks rounded-[6px] p-4 sm:p-7">
        <ol className="space-y-0">
          {VALUE_CHAIN.map((node, i) => {
            const isActive = active === i;
            return (
              <li key={node.label}>
                <Reveal delay={i * 55}>
                  <button
                    type="button"
                    data-testid={`chain-node-${i}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(isActive ? null : i)}
                    aria-expanded={isActive}
                    className={cn(
                      "group w-full text-left grid grid-cols-[2.4rem,1fr] items-start gap-3 sm:gap-5 rounded-[4px] px-2 py-3 transition-colors",
                      isActive ? "bg-nexus/[0.09]" : "hover:bg-ink/[0.04]"
                    )}
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink/35 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "font-display font-semibold text-lg sm:text-xl transition-colors",
                          isActive ? "text-nexus" : "text-ink"
                        )}
                      >
                        {node.label}
                      </span>
                      <span
                        className={cn(
                          "block overflow-hidden transition-all duration-300 font-hand text-[1.1rem] leading-snug text-leak",
                          isActive ? "max-h-16 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                        )}
                      >
                        {node.leak}
                      </span>
                    </span>
                  </button>
                </Reveal>
                {i < VALUE_CHAIN.length - 1 && (
                  <div aria-hidden="true" className="pl-[1.1rem]">
                    <svg width="14" height="18" viewBox="0 0 14 18" className="text-ink/25">
                      <line x1="7" y1="0" x2="7" y2="13" stroke="currentColor" strokeWidth="1" />
                      <path d="M3.5 11.5 7 16l3.5-4.5" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div
          className="mt-5 border-t pt-4 font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink/50"
          style={RULE}
        >
          Hover or tap a stage to see how it leaks
        </div>
      </div>
    </div>
  );
}

/* ================================================= 06 — 144 parameter grid */
export function ParametersGrid() {
  const flat = LAYERS.flatMap((l) => l.params.map((p) => ({ p, layer: l.name, n: l.n })));
  const [hover, setHover] = useState(null);
  const current = hover !== null ? flat[hover] : null;
  const dotTones = ["34 211 238", "59 130 246", "124 58 237", "217 70 239"];
  return (
    <div className="my-9 md:my-12">
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <div className="label">The parameter matrix</div>
        <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
          {flat.length} parameters
        </div>
      </div>
      <div className="evidence-frame reg-marks rounded-[6px] p-4 sm:p-6">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <div
            data-testid="parameters-grid"
            className="grid w-full max-w-[460px] grid-cols-12 gap-2 sm:gap-[8px]"
          >
            {flat.map((item, i) => (
              <button
                key={i}
                type="button"
                data-testid={`param-cell-${i}`}
                aria-label={`${item.n} ${item.layer}: ${item.p}`}
                aria-pressed={hover === i}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onBlur={() => setHover(null)}
                className={cn(
                  "aspect-square rounded-full transition-[transform,background,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nexus",
                  hover === i ? "scale-125" : "hover:scale-110"
                )}
                style={{
                  background: `rgb(${dotTones[i % dotTones.length]} / ${hover === i ? 1 : 0.4})`,
                  boxShadow:
                    hover === i
                      ? `0 0 14px rgb(${dotTones[i % dotTones.length]} / 0.8)`
                      : `0 0 7px rgb(${dotTones[i % dotTones.length]} / 0.25)`,
                }}
              />
            ))}
          </div>
          <div className="min-h-[64px] border-t pt-4 md:mt-0 md:border-t-0 md:border-l md:pl-8 md:pt-0" style={RULE}>
          {current ? (
            <div>
              <div className="label">
                Layer {current.n} &middot; {current.layer}
              </div>
              <div
                data-testid="param-readout"
                className="font-display font-semibold text-lg sm:text-xl mt-1.5 text-ink"
              >
                {current.p}
              </div>
            </div>
          ) : (
            <div>
              <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink/45">
                Hover, focus, or tap any dot to read the parameter
              </div>
              <div className="mt-3 font-display font-semibold text-lg text-ink/80">
                THE PARAMETER MATRIX
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= 07 — priority matrix */
export function PriorityMatrix() {
  const points = [
    { x: 22, y: 82, label: "Homepage headline", tone: "leak" },
    { x: 30, y: 66, label: "Demo form: 11 fields", tone: "leak" },
    { x: 48, y: 76, label: "No case studies", tone: "leak" },
    { x: 74, y: 62, label: "Analytics rebuild", tone: "nexus" },
    { x: 60, y: 32, label: "Blog taxonomy", tone: "muted" },
    { x: 85, y: 20, label: "Full redesign", tone: "muted" },
    { x: 17, y: 36, label: "Footer links", tone: "muted" },
  ];
  const dot = (t) =>
    t === "leak"
      ? "rgb(var(--leak))"
      : t === "nexus"
        ? "rgb(var(--nexus))"
        : "rgb(var(--ink) / 0.35)";
  const [ref, seen] = useInView({ threshold: 0.25 });
  return (
    <div className="my-9 md:my-12">
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <div className="label">Priority matrix</div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
          Impact × Effort
        </span>
      </div>
      <div ref={ref} className="evidence-frame reg-marks rounded-[6px] p-5 sm:p-7">
        <div className="relative">
          <div className="absolute -left-1 top-0 bottom-8 flex items-center">
            <span className="label whitespace-nowrap -rotate-90 origin-center translate-x-[-1.7rem]">
              Impact &#8594;
            </span>
          </div>
          <div className="ml-7">
            <div
              className="relative aspect-[16/10] sm:aspect-[16/8] rounded-[3px] border overflow-hidden"
              style={{
                ...RULE,
                backgroundImage:
                  "repeating-linear-gradient(to right, rgb(var(--rule) / 0.07) 0 1px, transparent 1px 10%), repeating-linear-gradient(to bottom, rgb(var(--rule) / 0.07) 0 1px, transparent 1px 20%)",
              }}
            >
              <div className="absolute inset-y-0 left-1/2 w-px" style={{ background: "rgb(var(--rule) / 0.2)" }} />
              <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "rgb(var(--rule) / 0.2)" }} />
              <div className="absolute top-2 left-2 font-mono text-[8.5px] font-semibold tracking-[0.18em] uppercase text-nexus">
                Fix first
              </div>
              <div className="absolute top-2 right-2 font-mono text-[8.5px] tracking-[0.18em] uppercase text-ink/40">
                Plan
              </div>
              <div className="absolute bottom-2 left-2 font-mono text-[8.5px] tracking-[0.18em] uppercase text-ink/40">
                Quick wins
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[8.5px] tracking-[0.18em] uppercase text-ink/40">
                Not at all
              </div>
              {points.map((p, i) => (
                <div
                  key={p.label}
                  className="absolute -translate-x-1/2 translate-y-1/2 transition-[opacity,transform] duration-500"
                  style={{
                    left: `${p.x}%`,
                    bottom: `${p.y}%`,
                    opacity: seen ? 1 : 0,
                    transform: seen ? undefined : "translate(-50%, 50%) scale(0.4)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span
                    className="block h-2.5 w-2.5 rounded-full"
                    style={{
                      background: dot(p.tone),
                      boxShadow: "0 0 0 4px rgb(var(--paper-2) / 0.9)",
                    }}
                  />
                  <span className="pointer-events-none absolute left-4 top-[-7px] whitespace-nowrap font-mono text-[9px] sm:text-[9.5px] tracking-[0.04em] text-ink/65 px-1 rounded-[2px] bg-paper-sheet/85">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 label text-right">Effort &#8594;</div>
          </div>
        </div>
        <div className="mt-4 border-t pt-4 flex flex-wrap gap-x-7 gap-y-2" style={RULE}>
          {[
            ["leak", "High impact leak"],
            ["nexus", "Structural work"],
            ["muted", "Deprioritised"],
          ].map(([t, l]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: dot(t) }} />
              <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink/55">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================= 12 — decision tree */
export function BottleneckTree({ causes }) {
  return (
    <div className="my-9 md:my-12">
      <div className="label mb-2.5">Is the website the bottleneck?</div>
      <div className="evidence-frame reg-marks rounded-[6px] p-5 sm:p-7">
        <div className="font-display font-semibold text-xl sm:text-2xl text-ink">
          Demand exists. Revenue doesn&rsquo;t follow.
        </div>
        <div aria-hidden="true" className="my-4 h-6 w-px bg-ink/20 ml-1" />
        <div className="grid md:grid-cols-2 gap-4">
          <Reveal
            className="rounded-[4px] border p-4"
            style={{ borderColor: "rgb(var(--nexus) / 0.3)" }}
          >
            <div
              className="rounded-[2px]"
              style={{ background: "rgb(var(--nexus) / 0.06)", margin: "-1rem", padding: "1rem" }}
            >
              <div className="font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-nexus">
                Website is the bottleneck
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                We identify the leaks, rank them, and tell you what to fix first.
              </p>
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="rounded-[4px] border p-4"
            style={{ borderColor: "rgb(var(--leak) / 0.3)" }}
          >
            <div
              className="rounded-[2px]"
              style={{ background: "rgb(var(--leak) / 0.05)", margin: "-1rem", padding: "1rem" }}
            >
              <div className="font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-leak">
                Website is not the bottleneck
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                We say so &mdash; and point at what actually is:
              </p>
              <ul className="mt-3 space-y-1.5">
                {causes.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2 font-mono text-[10.5px] tracking-[0.04em] text-ink/65"
                  >
                    <span aria-hidden="true" className="text-leak">
                      &#8212;
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="mt-6 font-hand text-[1.2rem] text-navy">
          We don&rsquo;t want to redesign a website to hide a business problem.
        </div>
      </div>
    </div>
  );
}

/* ================================================= 18 — intake form plate */
export function FormPreviewExhibit() {
  const sections = [
    { t: "YOUR DETAILS", f: ["Name", "Company", "Role", "Email", "LinkedIn", "Website"] },
    {
      t: "YOUR BUSINESS",
      f: [
        "What do you sell?",
        "Who is your ideal customer?",
        "What is your primary offer?",
        "How does your website currently contribute?",
        "What do you think is currently wrong?",
        "What would you most like us to investigate?",
        "What is your primary website conversion?",
        "Approximate average customer value",
        "Approximate monthly website leads",
        "Approximate website-generated customers",
        "Any additional context",
      ],
    },
  ];
  return (
    <div data-testid="form-preview-exhibit" className="my-9 md:my-12">
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <div className="label">Form 18-A · Application</div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/30">
          Intake sheet
        </span>
      </div>
      <div className="evidence-frame reg-marks rounded-[6px] overflow-hidden">
        <div className="perf-top" aria-hidden="true" />
        <div>
          {sections.map((s, i) => (
            <Reveal
              key={s.t}
              delay={i * 80}
              className={cn("p-5 sm:p-6", i === 0 && "border-b")}
            >
              <div className="font-mono text-[9.5px] font-semibold tracking-[0.22em] uppercase text-nexus mb-3">
                {String.fromCharCode(65 + i)} · {s.t}
              </div>
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {s.f.map((f) => (
                  <li key={f}>
                    <div className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink/45">
                      {f}
                    </div>
                    <div className="mt-1 h-[1px] w-full" style={{ background: "rgb(var(--rule) / 0.24)" }} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
