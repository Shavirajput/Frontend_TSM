import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BrandLayout from "@/components/brand/BrandLayout";
import { Rise, Eyebrow, SectionHead, CTA, Stat } from "@/components/brand/ui";
import { cn } from "@/lib/utils";
import "./Cohort.css";

/* ================================================================ content */

const STATS = [
  { value: "5", label: "Cohort slots — total" },
  { value: "144", label: "Parameters audited" },
  { value: "30d", label: "Fix sprint" },
  { value: "70d", label: "Measured, start to readout" },
];

const PHASES = [
  {
    phase: "Phase 1",
    when: "Days 1–7",
    tag: "144 PARAMETERS",
    title: "Website Revenue Diagnostic",
    body:
      "The full audit — every one of 13 layers, from technical performance and mobile experience to conversion architecture, trust, analytics and AI-era discoverability.",
    points: [
      "13-layer scorecard with your overall revenue-readiness score",
      "Top 10 revenue-impact opportunities, classified by severity and effort",
      "Evidence for every finding — screenshots, recordings, data",
      "Baseline across four levels: traffic, lead, sales and revenue efficiency",
      "60–90 minute findings call, founder to founder",
    ],
    promise: "Delivered within 7 business days of access.",
  },
  {
    phase: "Phase 2",
    when: "Days 8–10",
    tag: "SIGNED SCOPE",
    title: "Implementation Plan",
    body:
      "The findings become a 30-day plan: which fixes, in what order, who does what, and what each one is expected to move. You approve it before anything is built — so the sprint scope is yours, in writing.",
    points: [],
    promise:
      "A prioritized Now / Next / Later roadmap, converted into a signed 30-day scope within 3 business days of the findings call.",
  },
  {
    phase: "Phase 3",
    when: "Days 11–40",
    tag: "WE BUILD",
    title: "30-Day Fix Sprint",
    body:
      "We implement the highest-impact fixes ourselves — conversion architecture, trust assets, performance, mobile UX, analytics and tracking. Every change shipped is logged in a change register you keep.",
    points: [
      "The top 5 “Now”-tier fixes from your approved plan, implemented",
      "Weekly 20-minute progress call",
      "Full change register — what changed, where, and why",
    ],
    promise: "Five approved fixes live within 30 days of sprint start.",
  },
  {
    phase: "Phase 4",
    when: "Days 40–70",
    tag: "INCLUDED",
    title: "Measurement Readout",
    body:
      "Thirty days after the fixes ship, we compare your baseline against post-implementation data across all four efficiency levels. We'll tell you plainly what moved, what didn't, and what we'd do next — a directional readout on real data, not a statistical proof, and we'll never dress one up as the other.",
    points: [],
    promise:
      "A before/after readout across traffic, lead, sales and revenue efficiency, delivered by day 70.",
  },
];

const RECEIVE = [
  "The complete Diagnostic → Plan → Sprint → Measurement cycle",
  "A founding rate locked as your personal rate on the ongoing optimization retainer, if you continue",
  "Priority scheduling, in booking order",
  "The full report, plan, change register and readout — yours to keep",
  "The full-fee Findings Guarantee",
];

const GIVE = [
  "Case-study rights — named if you're comfortable, anonymized at minimum, with real numbers",
  "Analytics access held through day 70 so the before/after is honest",
  "A testimonial on completion and one 30-minute feedback call",
];

const NOT_INCLUDED = [
  "A full website rebuild or redesign",
  "New pages beyond the approved fix scope",
  "Ad account or paid media management",
  "Brand content writing — we edit conversion copy, we don't produce articles",
  "Anything not on the signed Phase 2 plan — new requests go to the “Next” list for a future conversation",
];

const STANDARD_VALUE = {
  usd: "$4,494",
  gbp: "£3,594",
  aud: "A$6,894",
  aed: "AED 16,494",
};
const FOUNDING_PRICE = {
  usd: "$2,997",
  gbp: "£2,397",
  aud: "A$4,497",
  aed: "AED 10,997",
};
const CURRENCIES = [
  { key: "usd", label: "US $" },
  { key: "gbp", label: "UK £" },
  { key: "aud", label: "AU $" },
  { key: "aed", label: "AED" },
];

const FAQS = [
  {
    q: "Why is the cohort capped at five?",
    a: "Because delivery is real. A 30-day sprint is hands-on work, and our team can run two to three concurrently at the standard we hold ourselves to. Five slots with staggered starts is the honest maximum — the cap is operational, not promotional.",
  },
  {
    q: "When does my engagement start?",
    a: "Slots are scheduled in booking order, with starts staggered roughly two per fortnight. Your deposit fixes your place in the queue; we confirm your exact start date within 48 hours of booking.",
  },
  {
    q: "What do you need from us to begin?",
    a: "Four things: your website URL, read access to Google Analytics 4 and Search Console, your primary conversion goal, and approximate monthly revenue so the impact math is grounded. If session-recording isn't installed, we set up Microsoft Clarity (free) in the first week.",
  },
  {
    q: "Do you guarantee a revenue increase?",
    a: "No — and be wary of anyone who does. Revenue depends on your traffic, offer, pricing and market, and we won't claim control we don't have. What we guarantee is the diagnosis (fifteen-plus unknown issues or the full fee back), the delivery dates, and an honest before/after measurement of what our fixes moved.",
  },
  {
    q: "Who actually does the work?",
    a: "The founder runs your diagnosis and findings call personally; our audit analyst executes the framework and the fix sprint alongside him. No hand-offs to people you've never met — at five clients, there's nowhere to hide, which is rather the point.",
  },
  {
    q: "What happens after day 70?",
    a: "You keep everything — the report, the plan, the change register, the readout. If you want us to keep optimizing, your cohort rate locks in your founding pricing on the monthly Growth Partnership. If not, you have the full roadmap to execute with your own team. Either way it's yours.",
  },
];

/* ============================================================ 144 signature */

const TONES = ["cyan", "blue", "violet", "magenta"];
const TONE_RGB = {
  cyan: "34 211 238",
  blue: "59 130 246",
  violet: "124 58 237",
  magenta: "217 70 239",
};

function DotSignature() {
  const [lit, setLit] = useState(() => new Array(144).fill(false));
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLit(new Array(144).fill(true));
      setCount(144);
      return;
    }

    const order = [...Array(144).keys()].sort(() => Math.random() - 0.5);
    let n = 0;
    let timer;
    const tick = () => {
      if (n >= 144) return;
      const idx = order[n];
      setLit((prev) => {
        const next = prev.slice();
        next[idx] = true;
        return next;
      });
      n += 1;
      setCount(n);
      timer = setTimeout(tick, n < 30 ? 45 : n < 100 ? 24 : 40);
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass tilt-card mx-auto w-full max-w-[360px] rounded-[14px] p-6 text-center">
      <div
        className="mx-auto grid gap-[9px]"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", width: "min(288px, 66vw)" }}
        aria-hidden="true"
      >
        {lit.map((on, i) => {
          const rgb = TONE_RGB[TONES[i % 4]];
          return (
            <span
              key={i}
              className="rounded-full transition-[background,box-shadow] duration-500"
              style={{
                aspectRatio: "1 / 1",
                background: on ? `rgb(${rgb})` : "rgb(255 255 255 / 0.08)",
                boxShadow: on ? `0 0 8px rgb(${rgb} / 0.7)` : "none",
              }}
            />
          );
        })}
      </div>
      <div className="mt-6 font-display font-semibold text-[2rem] leading-none text-white">
        <span className="brand-text" data-testid="cohort-dot-count">
          {count}
        </span>
        <span className="text-white/45">/144</span>
      </div>
      <div className="mt-2 font-mono text-[9.5px] font-semibold tracking-[0.22em] uppercase text-white/45">
        Parameters · 13 layers
      </div>
    </div>
  );
}

/* ================================================================== phase */

function Phase({ item, index }) {
  const phaseNumber = String(index + 1).padStart(2, "0");
  return (
    <div className="cohort-phase-card">
      <header className="cohort-phase-card-header">
        <span className="cohort-phase-card-overline">FOUNDING COHORT / {phaseNumber}</span>
        <span className="cohort-phase-card-when">{item.when}</span>
      </header>
      <div className="cohort-phase-card-content">
        <section className="cohort-phase-card-identity">
          <span className="cohort-phase-card-number" aria-hidden="true">{phaseNumber}</span>
          <span className="cohort-phase-card-tag">{item.tag}</span>
          <h3>{item.title}</h3>
          <span className="cohort-phase-card-phase">{item.phase}</span>
        </section>
        <section className="cohort-phase-card-details">
          <p className="cohort-phase-card-description">{item.body}</p>
          {item.points.length > 0 && (
            <div className="cohort-phase-card-deliverables">
              <span className="cohort-phase-card-section-label">WHAT YOU RECEIVE</span>
              <ul>
                {item.points.map((point, pointIndex) => (
                  <li key={point}>
                    <span aria-hidden="true">{String(pointIndex + 1).padStart(2, "0")}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
      <footer className="cohort-phase-card-promise">
        <span className="cohort-phase-card-section-label">OUR COMMITMENT</span>
        <p>{item.promise}</p>
      </footer>
    </div>
  );
}

function RollingPhaseStack({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 639px)").matches
  );
  const totalCards = items.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateDevice = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", updateDevice);
    return () => mediaQuery.removeEventListener("change", updateDevice);
  }, []);

  const goTo = (index) => {
    if (totalCards === 0) return;
    setActiveIndex((index + totalCards) % totalCards);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  const offsets = [0, 50, 100, 150];
  const widths = isMobile ? [100, 92, 84, 76] : [100, 90, 80, 70];
  const spring = { type: "spring", stiffness: 380, damping: 30, mass: 0.75 };

  return (
    <div
      className="cohort-phase-stack"
      data-testid="cohort-phases"
      role="region"
      aria-label="Cohort phases"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="cohort-phase-stack-stage">
        {items.map((item, index) => {
          const position = (index - activeIndex + totalCards) % totalCards;
          const isActive = position === 0;

          return (
            <motion.div
              key={item.phase}
              className="cohort-phase-stack-layer"
              onClick={() => goTo(index)}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDrag={(_, info) => {
                if (isActive) setDragOffset(info.offset.x);
              }}
              onDragEnd={(_, info) => {
                setDragOffset(0);
                if (info.offset.x < -80 || info.velocity.x < -400) {
                  goTo(activeIndex + 1);
                } else if (info.offset.x > 80 || info.velocity.x > 400) {
                  goTo(activeIndex - 1);
                }
              }}
              layout="position"
              initial={false}
              animate={{
                y: -offsets[position],
                width: `${widths[position]}%`,
                rotate: isActive ? dragOffset * 0.04 : 0,
                zIndex: totalCards - position,
              }}
              whileHover={!isActive ? { y: -offsets[position] - 8 } : undefined}
              whileTap={{ scale: isActive ? 0.99 : 0.98 }}
              transition={spring}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                margin: "0 auto",
                transformOrigin: "bottom center",
                willChange: "transform, width",
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${item.phase} of ${totalCards}: ${item.title}`}
              aria-current={isActive ? "true" : undefined}
              data-testid={`cohort-phase-${index + 1}`}
            >
              <Phase item={item} index={index} />
            </motion.div>
          );
        })}
      </div>
      <div className="cohort-phase-stack-controls">
        <div className="cohort-phase-stack-pagination" aria-label="Choose a phase">
          {items.map((item, index) => (
            <button
              key={item.phase}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${item.phase}`}
              aria-current={index === activeIndex ? "step" : undefined}
              className={index === activeIndex ? "is-active" : ""}
            />
          ))}
        </div>
        <div className="cohort-phase-stack-nav">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous phase">
            <span aria-hidden="true">&#8592;</span>
            Previous
          </button>
          <span aria-live="polite">
            {activeIndex + 1} / {totalCards}
          </span>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next phase">
            Next
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =================================================================== FAQ */

function FaqItem({ item, open, onToggle, testid }) {
  return (
    <div className="border-t border-white/[0.08] last:border-b">
      <button
        data-testid={testid}
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display font-semibold text-[16.5px] text-white">
          {item.q}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "font-mono text-[20px] leading-none text-[rgb(var(--brand-cyan))] transition-transform duration-200",
            open && "rotate-45"
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[64ch] pb-5 text-[15px] leading-relaxed text-white/60">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== page */

export default function Cohort() {
  const [cur, setCur] = useState("usd");
  const [openFaq, setOpenFaq] = useState(0);
  const phasesRef = useRef(null);

  const scrollToPhases = () => {
    phasesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cohort-page">
    <BrandLayout>
      {/* ============================================ HERO */}
      <section className="cohort-hero relative -mt-[var(--nav-h)] overflow-hidden pt-[var(--nav-h)]">
        <div className="aurora" aria-hidden="true" />
        <div className="persp-grid" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 sm:px-8 pt-16 pb-16 md:pt-24 md:pb-20 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <Rise>
              <Eyebrow signal>Founding Cohort 01 · 5 slots - LEFT</Eyebrow>
            </Rise>
            <Rise delay={90}>
              <h1 className="mt-6 max-w-[20ch] font-display font-semibold text-[2.4rem] leading-[1.04] sm:text-[3.2rem] lg:text-[3.7rem] text-white">
                Five businesses. One full cycle.{" "}
                <span className="brand-text">Documented end to end.</span>
              </h1>
            </Rise>
            <Rise delay={170}>
              <p className="mt-7 max-w-[54ch] text-[1.0625rem] md:text-lg leading-relaxed text-white/60">
                The complete 144-parameter Website Revenue Diagnostic, a signed implementation
                plan, and 30 days of us fixing your highest-impact revenue leaks — at a founding
                rate, in exchange for becoming our documented proof.
              </p>
            </Rise>
            <Rise delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <CTA calendly testid="cohort-apply-cta">
                  Book your diagnostic call
                </CTA>
                <button
                  type="button"
                  onClick={scrollToPhases}
                  data-testid="cohort-see-included"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-[7px] border border-white/18 px-6 py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white/80 transition-colors hover:border-[rgb(var(--brand-sky))] hover:text-white"
                >
                  See what&rsquo;s included
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    &#8595;
                  </span>
                </button>
              </div>
            </Rise>
            <Rise delay={310}>
              <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-[rgb(var(--brand-cyan))]">
                SLOTS SCHEDULED IN BOOKING ORDER · STAGGERED STARTS
              </p>
            </Rise>
          </div>
          <Rise delay={200}>
            <DotSignature />
          </Rise>
        </div>
      </section>

      {/* ============================================ STAT STRIP */}
      <section className="cohort-stats border-t border-white/[0.07] py-10 md:py-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 px-5 sm:px-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* ============================================ WHO IT'S FOR */}
      <section className="cohort-who border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="Who this is for"
            title="Businesses with traffic that isn't converting."
            sub="The Founding Cohort accepts B2B/SaaS, professional-services, and ecommerce/DTC businesses, subject to fit. It's built for businesses with measurable website traffic and visible conversion or revenue leakage — where the site is a real acquisition channel and every point of conversion is money. This is the whole engagement, compressed and documented, at a founding rate because you're early."
          />
        </div>
      </section>

      {/* ============================================ PHASES */}
      <section ref={phasesRef} className="cohort-timeline border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="What you get"
            title="Four phases. Every promise in writing."
            sub="We separate what we control from what we can't guarantee. Each phase states exactly what you receive and when."
          />
          <RollingPhaseStack items={PHASES} />
        </div>
      </section>

      {/* ============================================ FINDINGS GUARANTEE */}
      <section className="cohort-guarantee relative overflow-hidden border-t border-white/[0.07] py-16 md:py-24">
        <div className="persp-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
          <Rise>
            <div className="glass mx-auto grid max-w-[880px] items-center gap-8 rounded-[16px] p-8 sm:p-10 md:grid-cols-[auto,1fr] md:gap-12">
              <div className="font-display font-semibold leading-none brand-text text-[4.5rem] md:text-[6.5rem]">
                15+
              </div>
              <div>
                <h2 className="font-display font-semibold text-[1.6rem] sm:text-[2rem] leading-tight text-white">
                  The Findings Guarantee
                </h2>
                <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-white/70">
                  If the Diagnostic doesn&rsquo;t surface at least fifteen issues you didn&rsquo;t
                  already know about, you get the entire cohort fee back. Not the audit portion —
                  all of it.
                </p>
                <p className="mt-4 max-w-[56ch] text-[13.5px] leading-relaxed text-white/45">
                  We can make this promise because the framework has never surfaced fewer. It exists
                  so that your risk in trusting an early-stage firm is ours, not yours.
                </p>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ============================================ THE EXCHANGE */}
      <section className="cohort-exchange border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="Why this price exists"
            title="An exchange, not a discount."
            sub="The cohort rate is roughly a third below what this engagement will cost after Cohort 01. That's not generosity and it's not a flinch — it's a trade, and here are both sides of it."
          />
          <div className="mt-12 grid gap-3.5 lg:grid-cols-2">
            <Rise>
              <div className="glass tilt-card relative h-full overflow-hidden rounded-[12px] p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ background: "rgb(var(--brand-cyan))" }}
                />
                <h3 className="font-display font-semibold text-[1.2rem] text-white">You receive</h3>
                <ul className="mt-5 space-y-3" data-testid="cohort-receive-list">
                  {RECEIVE.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "rgb(var(--growth))" }}
                      />
                      <span className="text-[15px] text-white/75">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
            <Rise delay={120}>
              <div className="glass tilt-card relative h-full overflow-hidden rounded-[12px] p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ background: "rgb(var(--brand-magenta))" }}
                />
                <h3 className="font-display font-semibold text-[1.2rem] text-white">You give</h3>
                <ul className="mt-5 space-y-3" data-testid="cohort-give-list">
                  {GIVE.map((g) => (
                    <li key={g} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "rgb(var(--brand-magenta))" }}
                      />
                      <span className="text-[15px] text-white/75">{g}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/[0.08] pt-4 text-[14px] leading-relaxed text-white/50">
                  Your documented result is what lets us charge the next client full rate. That&rsquo;s
                  the entire deal.
                </p>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ============================================ VALUE / NO FEE */}
      <section className="cohort-pricing border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="Cohort pricing"
            title="One rate. Five slots. Booking order."
          />
          <Rise delay={80}>
            <div
              className="mt-8 inline-flex overflow-hidden rounded-[8px] border border-white/12"
              role="tablist"
              aria-label="Choose your currency"
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={cur === c.key}
                  data-testid={`cohort-currency-${c.key}`}
                  onClick={() => setCur(c.key)}
                  className={cn(
                    "border-l border-white/12 px-5 py-2.5 font-mono text-[12px] font-medium transition-colors first:border-l-0",
                    cur === c.key
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white/80"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Rise>

          <Rise delay={140}>
            <div className="glass relative mt-8 max-w-[760px] overflow-hidden rounded-[16px] p-8 sm:p-11">
              <span aria-hidden="true" className="brand-rule absolute left-0 right-0 top-0 h-[3px]" />
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="font-display font-semibold text-[1.35rem] text-white">
                    Founding Cohort 01
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-white/45">
                    DIAGNOSTIC + PLAN + 30-DAY SPRINT + MEASUREMENT
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[15px] text-white/40 line-through" data-testid="cohort-anchor-price">
                    {STANDARD_VALUE[cur]}
                  </div>
                  <div className="font-display font-semibold text-[2.6rem] leading-none brand-text" data-testid="cohort-founding-price">
                    {FOUNDING_PRICE[cur]}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-white/45">complete engagement</div>
                </div>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-[10px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
                {[
                  ["To reserve a slot", "50% deposit"],
                  ["Balance", "At sprint start (day 11)"],
                  ["Payment", "Stripe / Wise, in your currency"],
                ].map(([l, v]) => (
                  <div key={l} className="bg-paper-sheet/60 p-4">
                    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/45">
                      {l}
                    </div>
                    <div className="mt-1.5 font-medium text-white">{v}</div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-white/55">
                The struck-through figure is the combined standard price of the Diagnostic and a
                scoped 30-day sprint — it&rsquo;s where this engagement is priced once the founding
                cohort closes.{" "}
                <span className="text-white/80">
                  The cohort rate ends when five slots fill or enrollment closes, whichever comes
                  first.
                </span>{" "}
                No extensions, no exceptions — the next cohort, if there is one, prices higher.
              </p>

              <div className="mt-7">
                <CTA calendly testid="cohort-price-apply-cta">
                  Book your diagnostic call
                </CTA>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ============================================ SCOPE WALL */}
      <section className="cohort-scope border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="Scope, stated plainly"
            title="What this deliberately isn't."
            sub="Clear edges are part of the promise. The sprint fixes the highest-value problems first — it is not a rebuild."
          />
          <Rise delay={80}>
            <div className="glass mt-10 max-w-[760px] rounded-[12px] p-6 sm:p-8">
              <h3 className="font-display font-semibold text-[1.15rem] text-white">
                Not included in Cohort 01
              </h3>
              <ul className="mt-5 space-y-3" data-testid="cohort-not-included-list">
                {NOT_INCLUDED.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.1rem] font-mono text-[15px] text-leak">
                      &#215;
                    </span>
                    <span className="text-[15px] text-white/70">{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/[0.08] pt-4 text-[14px] leading-relaxed text-white/50">
                If the Diagnostic reveals your site&rsquo;s architecture is fundamentally broken,
                we&rsquo;ll say so, scope it separately, and you&rsquo;ll decide with full
                information — we won&rsquo;t quietly stretch a 30-day sprint into something it
                can&rsquo;t be.
              </p>
            </div>
          </Rise>
        </div>
      </section>

      {/* ============================================ FAQ */}
      <section className="cohort-faq border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead eyebrow="Questions founders ask" title="Asked and answered." />
          <div className="mt-10 max-w-[820px]" data-testid="cohort-faq">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                item={f}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                testid={`cohort-faq-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ FINAL CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.07] py-20 md:py-28">
        <div className="aurora" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 text-center">
          <Rise>
            <div className="mx-auto flex w-fit">
              <Eyebrow>Founding Cohort 01</Eyebrow>
            </div>
          </Rise>
          <Rise delay={90}>
            <h2 className="mx-auto mt-6 max-w-[20ch] font-display font-semibold text-[2rem] sm:text-[2.8rem] leading-[1.06] text-white">
              Five slots. Booking order. <span className="brand-text">Documented proof.</span>
            </h2>
          </Rise>
          <Rise delay={160}>
            <p className="mx-auto mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/60">
              A 20-minute call to confirm fit — we&rsquo;ll bring two or three things we&rsquo;ve
              already noticed on your site. If it&rsquo;s not a fit, we&rsquo;ll say so on the call.
            </p>
          </Rise>
          <Rise delay={230}>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <CTA calendly testid="cohort-final-apply-cta">
                Book your diagnostic call
              </CTA>
              <CTA to="/contact" testid="cohort-final-contact-cta" variant="ghost">
                Ask a question first
              </CTA>
            </div>
          </Rise>
          <Rise delay={300}>
            <p className="mt-7 font-mono text-[11px] tracking-[0.14em] text-[rgb(var(--brand-cyan))]">
              NO EXTENSIONS · 50% DEPOSIT RESERVES YOUR SLOT · FULL-FEE FINDINGS GUARANTEE
            </p>
          </Rise>
        </div>
      </section>
    </BrandLayout>
    </div>
  );
}
