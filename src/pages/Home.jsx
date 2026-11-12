import React from "react";
import { Link } from "react-router-dom";
import BrandLayout from "@/components/brand/BrandLayout";
import {
  Rise,
  Eyebrow,
  SectionHead,
  CTA,
} from "@/components/brand/ui";
import ChooseNextStep from "@/components/brand/ChooseNextStep";
import { LAYERS, VALUE_CHAIN, PROCESS, TOTAL_PARAMS } from "@/data/guide";

const LEAKS = [
  {
    n: "01",
    tone: "cyan",
    title: "The Clarity Leak",
    body: "Your headline sounds impressive but the visitor still can't tell what you do, who it's for, or why you.",
  },
  {
    n: "02",
    tone: "violet",
    title: "The Trust Leak",
    body: "They understand the offer but don't believe the company. No proof, no specifics, no authority. Uncertainty kills action.",
  },
  {
    n: "03",
    tone: "magenta",
    title: "The Conversion Leak",
    body: "“Learn More” → generic page → another page → an eleven-field form. Nothing is broken. The journey is leaking intent.",
  },
  {
    n: "04",
    tone: "cyan",
    title: "The Performance Leak",
    body: "Visually impressive, technically expensive, and still making people wait. Technology in the way of the objective.",
  },
  {
    n: "05",
    tone: "violet",
    title: "The Qualification Leak",
    body: "You generate leads — the wrong ones. Sales burns cycles on people who were never going to buy.",
  },
  {
    n: "06",
    tone: "magenta",
    title: "The Business Leak",
    body: "Sometimes the website isn't the problem. If it isn't the bottleneck, we'll tell you. That's part of the audit.",
  },
];

const OFFERS = [
  {
    step: "01",
    tone: "cyan",
    name: "Website Revenue Audit",
    forWhom: "For founders, CEOs & growth teams needing unbiased truth",
    deliverables: [
      "Full 144-parameter / 13-layer diagnostic",
      "Prioritized opportunity matrix",
      "Recommended fixes + implementation roadmap",
      "Personal findings walkthrough",
    ],
    timeline: "72 hours",
    price: "$750",
    priceNote: "Standard working price",
    scopeBased: false,
    hidePrice: true,
    crosssell: "Leads into the Website Revenue Fix Sprint.",
  },
  {
    step: "02",
    tone: "violet",
    name: "Website Revenue Fix Sprint",
    forWhom: "Teams ready to implement solutions and rapidly recover lost yield",
    deliverables: [
      "Implements the highest-priority audit findings",
      "Across conversion, UX, messaging & trust",
      "Performance + measurement, in agreed scope",
    ],
    timeline: "30 days",
    price: "$1,500–$3,000",
    priceNote: "Depending on scope",
    scopeBased: false,
    hidePrice: true,
    crosssell: "Leads into a Growth / Revenue Engagement.",
  },
  {
    step: "03",
    tone: "magenta",
    name: "Growth / Revenue Engagement",
    forWhom: "Continuous optimization and strategic commercial engineering.",
    deliverables: [
      "Longer-term implementation & experimentation",
      "Ongoing measurement & optimization",
      "Scoped around what the audit and sprint surfaced",
    ],
    timeline: "3–6 months",
    price: "Scope-based",
    priceNote: "Typically $2,500+/mo · available after audit",
    scopeBased: true,
    crosssell: "Available after your audit & sprint, when it's the right next step.",
  },
];

const TONE_BAR = {
  cyan: "rgb(var(--brand-cyan))",
  violet: "rgb(var(--brand-violet))",
  magenta: "rgb(var(--brand-magenta))",
};

const DELIVERABLE_CARD_DETAILS = [
  {
    n: "01",
    category: "AUDIT",
    title: "12-Layer Diagnostic",
    body: "A structured evaluation across all 144 commercial parameters.",
    footer: "COMPLETE DOSSIER",
  },
  {
    n: "02",
    category: "REPORT",
    title: "Revenue Leak Matrix",
    body: "The highest-priority friction points ranked by financial downside.",
    footer: "RANKED FRICTION",
  },
  {
    n: "03",
    category: "ACTION",
    title: "Priority Matrix",
    body: "Exactly what to fix now, what to change later, and what to ignore.",
    footer: "ACTION PLAN",
  },
  {
    n: "04",
    category: "PROOF",
    title: "Concrete Evidence",
    body: "Screenshots, user flow examples, and forensic observations.",
    footer: "VISUAL PROOF",
  },
  {
    n: "05",
    category: "BLUEPRINT",
    title: "Implementation Roadmap",
    body: "Prioritized actionable steps to correct the high-impact gaps.",
    footer: "SPRINT READY",
  },
  {
    n: "06",
    category: "FINANCIALS",
    title: "Revenue Impact Model",
    body: "Modeled commercial upside using realistic transparent projections.",
    footer: "UPSIDE ESTIMATE",
  },
  {
    n: "07",
    category: "BRIEFING",
    title: "Personal Executive Walkthrough",
    body: "A private video debrief explaining what we uncovered and why it directly affects your growth economics.",
    footer: "30-MIN DEBRIEF",
  },
];

export default function Home() {
  const diagnosticConsoleRef = React.useRef(null);
  const [diagnosticProgress, setDiagnosticProgress] = React.useState(0);

  React.useEffect(() => {
    const consoleElement = diagnosticConsoleRef.current;
    if (!consoleElement) return undefined;

    let animationFrame;
    let observer;
    let started = false;

    const startAnimation = () => {
      if (started) return;
      started = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDiagnosticProgress(1);
        return;
      }

      const duration = 1600;
      let startTime;
      const animate = (time) => {
        if (startTime === undefined) startTime = time;
        const linearProgress = Math.min((time - startTime) / duration, 1);
        setDiagnosticProgress(1 - (1 - linearProgress) ** 3);

        if (linearProgress < 1) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      };

      animationFrame = window.requestAnimationFrame(animate);
    };

    if (!("IntersectionObserver" in window)) {
      startAnimation();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(consoleElement);
    }

    return () => {
      observer?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <BrandLayout>
      {/* ============================================================ HERO */}
      <section
        className="relative overflow-hidden -mt-[var(--nav-h)] pt-[var(--nav-h)]"
        data-testid="home-hero"
      >
        <div className="aurora" aria-hidden="true" />
        <div className="persp-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 pt-10 pb-12 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <div>
              <Rise>
                <Eyebrow>
                  13 Layers &middot; {TOTAL_PARAMS} Parameters &middot; 1 Objective
                </Eyebrow>
              </Rise>
              <Rise delay={90}>
                <h1 className="mt-4 font-display font-semibold text-[2.25rem] leading-[1.02] sm:mt-6 sm:text-[3.6rem] lg:text-[4.4rem] lg:leading-[0.98] text-white">
                  Your website is <span className="brand-text doctor-glitch whitespace-nowrap font-normal">leaking revenue</span>
                  <br />
                  We find out where.
                </h1>
              </Rise>
              <Rise delay={170}>
                <p className="home-hero-copy mx-auto mt-5 max-w-[52ch] text-base md:mt-7 md:text-lg leading-relaxed text-white/60">
                  A forensic diagnostic for founders and CEOs. We evaluate your website as a
                  commercial system &mdash; not a design &mdash; across 13 layers and{" "}
                  {TOTAL_PARAMS} parameters, then tell you the five things to fix first.
                </p>
              </Rise>
              <Rise delay={250}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:mt-9">
                  <CTA to="/apply" testid="hero-apply-cta">
                    Claim a founding slot
                  </CTA>
                  <CTA to="/guide" testid="hero-guide-cta" variant="ghost">
                    Read the field guide
                  </CTA>
                </div>
              </Rise>
              <Rise delay={320}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/40 sm:mt-8">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                    <span><strong className="font-bold text-white">5</strong> founding cohort slots left</span>
                  </span>
                  <span className="hidden sm:inline">&middot;</span>
                  <span>Founding rate &middot; booking order</span>
                  <span className="hidden sm:inline">&middot;</span>
                  <span>Ecommerce &amp; DTC &middot; B2B &amp; SaaS &middot; Professional services</span>
                </div>
              </Rise>
            </div>
          </div>

          <Rise delay={360}>
            <section
              ref={diagnosticConsoleRef}
              className="home-diagnostic-console mx-auto mt-12 max-w-[1180px] text-left md:mt-16"
              data-testid="home-diagnostic-console"
              aria-label="Illustrative diagnostic console preview, not live audit data"
            >
              <header className="diagnostic-console-header">
                <div className="diagnostic-console-brand">
                  <span className="diagnostic-console-lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>DIAGNOSTIC_SYS_v4.2 // TELEMETRY CONSOLE</span>
                  <span className="diagnostic-preview-tag">Illustrative preview</span>
                </div>
                <div className="diagnostic-console-status">
                  <span className="diagnostic-live-badge">STATUS: PREVIEW MODE</span>
                  <span>{Math.round(TOTAL_PARAMS * diagnosticProgress)}/{TOTAL_PARAMS} NODES ACTIVE</span>
                </div>
              </header>

              <div className="diagnostic-metrics">
                <article className="diagnostic-metric">
                  <div className="diagnostic-metric-topline">
                    <span>UNSEEN FRICTION SCORE</span>
                    <span className="diagnostic-critical">CRITICAL</span>
                  </div>
                  <div className="diagnostic-metric-value">
                    {(72.4 * diagnosticProgress).toFixed(1)}<span>/100</span>
                  </div>
                  <div
                    className="diagnostic-meter diagnostic-meter-risk"
                    role="progressbar"
                    aria-label="Unseen friction score"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={(72.4 * diagnosticProgress).toFixed(1)}
                  >
                    <span style={{ width: `${(72.4 * diagnosticProgress).toFixed(2)}%` }} />
                  </div>
                </article>

                <article className="diagnostic-metric">
                  <div className="diagnostic-metric-topline">
                    <span>LEAK CONVERSION RATE</span>
                    <span className="diagnostic-cyan">{(-3.42 * diagnosticProgress).toFixed(2)}%</span>
                  </div>
                  <div className="diagnostic-metric-value">
                    <span className="diagnostic-amount">
                      ${Math.round(142800 * diagnosticProgress).toLocaleString("en-US")}
                    </span>
                    <span className="diagnostic-period">/mo</span>
                    <span className="diagnostic-estimate-label">estimated</span>
                  </div>
                  <div
                    className="diagnostic-meter diagnostic-meter-flow"
                    role="progressbar"
                    aria-label="Leak conversion rate indicator"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={(64 * diagnosticProgress).toFixed(1)}
                  >
                    <span style={{ width: `${(64 * diagnosticProgress).toFixed(2)}%` }} />
                  </div>
                </article>

                <article className="diagnostic-metric">
                  <div className="diagnostic-metric-topline">
                    <span>PARAMETER INTEGRITY</span>
                    <span className="diagnostic-green">INDEXED</span>
                  </div>
                  <div className="diagnostic-metric-value">
                    {Math.round(TOTAL_PARAMS * diagnosticProgress)}<span>/{TOTAL_PARAMS} parameters</span>
                  </div>
                  <div
                    className="diagnostic-meter diagnostic-meter-complete"
                    role="progressbar"
                    aria-label="Parameter integrity"
                    aria-valuemin="0"
                    aria-valuemax={TOTAL_PARAMS}
                    aria-valuenow={Math.round(TOTAL_PARAMS * diagnosticProgress)}
                  >
                    <span style={{ width: `${(100 * diagnosticProgress).toFixed(2)}%` }} />
                  </div>
                </article>
              </div>

              <div className="diagnostic-traffic-panel">
                <div className="diagnostic-traffic-copy">
                  <div className="diagnostic-traffic-label">LIVE TRAFFIC DIAGNOSTIC</div>
                  <p>
                    Evaluating multi-funnel intent fidelity across 14 discrete touchpoints. Top
                    detected friction: <strong>Checkout Trust Disparity (#02).</strong>
                  </p>
                </div>
                <div className="diagnostic-signals" aria-label="Illustrative diagnostic indicators">
                  <span><i className="signal-cyan" />Clarity: 88%</span>
                  <span><i className="signal-violet" />Friction: 34%</span>
                  <span><i className="signal-pink" />Economics: 61%</span>
                </div>
              </div>
            </section>
          </Rise>

        </div>
      </section>

      {/* ==================================================== VALUE CHAIN */}
      <section className="relative border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <SectionHead
        className="home-belief-heading"
        eyebrow="The belief"
        title={
          <>
            <span className="whitespace-nowrap">
              Websites don't exist just to{" "}
              <span className="brand-text doctor-glitch text-[0.75em] font-normal">look good</span>.
            </span>
            <br />
            They exist to <span className="brand-text doctor-glitch text font-black uppercase">PERFORM</span>
          </>
        }
        sub="Your website sits inside a larger commercial chain. A failure anywhere in that chain creates a leak — and leaks compound quietly."
      />
          <div className="value-chain-marquee mt-12 space-y-3">
            {[VALUE_CHAIN.slice(0, 5), VALUE_CHAIN.slice(5)].map((row, rowIndex) => (
              <div
                key={`value-chain-row-${rowIndex}`}
                className={`marquee-track gap-3${rowIndex === 1 ? " marquee-track-reverse" : ""}`}
              >
                {[...row, ...row].map((n, i) => (
                  <div
                    key={`${n.label}-${i}`}
                    aria-hidden={i >= row.length ? "true" : undefined}
                    className="glass shrink-0 rounded-[8px] px-5 py-4 min-w-[210px]"
                  >
                    <div className="font-mono text-[9px] tracking-[0.2em] text-white/35">
                      {String(rowIndex * 5 + (i % row.length) + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1.5 font-display font-semibold text-lg text-white">
                      {n.label}
                    </div>
                    <div className="mt-1 text-[13px] leading-snug text-white/45">{n.leak}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================== LEAKS */}
      <section className="relative border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <SectionHead
              eyebrow="What we find"
              title="Six leaks we see again and again."
              sub="None of them look broken. All of them cost money. Revenue enters the top of your funnel — and drips out through cracks nobody is watching."
              className="max-w-none"
            />
            <Rise delay={140}>
              <figure data-testid="home-funnel-visual" className="mx-auto max-w-[360px]">
                <img
                  src="/images/infographic-leaks.png"
                  alt="Six glowing layers showing where website revenue intent leaks: clarity, trust, conversion, performance, qualification, and business"
                  loading="lazy"
                  className="block h-auto w-full rounded-[10px]"
                />
                <figcaption className="mt-3 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40">
                  Six layers where intent leaks out
                </figcaption>
              </figure>
            </Rise>
          </div>
          <div className="home-leaks-grid mt-12 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {LEAKS.map((l, i) => (
              <Rise key={l.n} delay={i * 60} className="h-full">
                <article className={`leak-card leak-card-${l.tone} h-full`}>
                  <div className="leak-card-kicker">
                    <span>{l.n}</span> &middot; WHAT WE FIND
                  </div>
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= LAYERS */}
      <section className="home-method-section relative py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
            <SectionHead
              eyebrow="The method"
              title="A 13-layer system, not an opinion."
              sub="Aesthetics are one parameter of 144. We examine business context, positioning, offer, messaging, UX, architecture, conversion, trust, content, SEO, performance, analytics and revenue."
              className="max-w-none"
            />
            <Rise delay={140}>
              <div className="glass rounded-[12px] p-5 sm:p-7">
                <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-2">
                  {LAYERS.map((l) => (
                    <div
                      key={l.n}
                      className="flex items-baseline gap-3 border-b border-white/[0.07] py-2.5"
                    >
                      <span className="font-mono text-[10px] tracking-[0.14em] text-[rgb(var(--brand-sky))]">
                        {l.n}
                      </span>
                      <span className="text-[14px] text-white/70">{l.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <CTA to="/method" testid="layers-method-cta" variant="ghost">
                    Explore the method
                  </CTA>
                </div>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* =================================================== DELIVERABLES */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="What you receive"
            title="Seven deliverables. Zero generic advice."
            center
          />
          <div className="deliverables-grid mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
            {DELIVERABLE_CARD_DETAILS.map((d, i) => (
              <Rise
                key={d.n}
                delay={i * 55}
                className={`h-full ${i < 4 ? "lg:col-span-3" : i === 6 ? "lg:col-span-6" : "lg:col-span-3"}`}
              >
                <article className={`deliverable-card deliverable-card-${i + 1} h-full`}>
                  <div className="deliverable-card-kicker">
                    <span>{d.n}</span> &middot; {d.category}
                  </div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                  <div className="deliverable-card-footer">{d.footer}</div>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <div
        className="home-process-pathway"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
          event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
          event.currentTarget.dataset.pointerActive = "true";
        }}
        onPointerLeave={(event) => {
          event.currentTarget.dataset.pointerActive = "false";
        }}
      >
        {/* ======================================================== PROCESS */}
        <section className="home-process-section relative border-t border-white/[0.07] py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <SectionHead eyebrow="The process" title="From application to diagnosis in seven steps." />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
              {PROCESS.map((p, i) => (
                <Rise
                  key={p.n}
                  delay={i * 55}
                  className={`h-full ${i < 4 ? "lg:col-span-3" : "lg:col-span-4"}`}
                >
                  <div className="glass tilt-card h-full rounded-[10px] p-5">
                    <div className="font-display font-semibold text-2xl brand-text">{p.n}</div>
                    <div className="mt-2.5 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-white">
                      {p.title}
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/55">{p.body}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================ OFFER ARCHITECTURE */}
        <section
          className="offer-architecture-section relative py-20 md:py-28"
          data-testid="offer-architecture"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <SectionHead
              eyebrow="The pathway"
              title="One audit. A clear path to growth."
              sub="Most engagements start with the audit, then move into a fix sprint, then — when it's the right next step — a longer growth engagement. You choose how far to go; each stage stands on its own."
              center
              className="offer-section-heading"
            />

            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3" data-testid="offer-cards">
              {OFFERS.map((o, i) => (
              <Rise key={o.step} delay={i * 80} className="h-full">
                <div
                  className={`offer-card relative flex h-full flex-col rounded-[12px] p-6 sm:p-7 ${
                    i === 1 ? "offer-card-featured" : ""
                  }`}
                  data-testid={`offer-card-${o.step}`}
                >
                  {i === 1 && <span className="offer-featured-badge">Most popular</span>}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-white/40">
                      STEP {o.step}
                    </span>
                    {o.scopeBased && (
                      <span className="rounded-[4px] border border-white/12 bg-white/[0.05] px-2.5 py-1 font-mono text-[8.5px] font-semibold tracking-[0.16em] uppercase text-white/60">
                        Scope-based
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display font-semibold text-[1.35rem] leading-snug text-white">
                    {o.name}
                  </h3>

                  
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">{o.forWhom}</p>

                  
                  
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">{o.problem}</p>

                  <div className="offer-card-rule mt-5" />
                  <div className="mt-5 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-[rgb(var(--brand-sky))]">
                    What you get
                  </div>
                  <ul className="mt-2 space-y-2">
                    {o.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="offer-card-check" style={{ color: TONE_BAR[o.tone] }}>
                          &#10003;
                        </span>
                        <span className="text-[13.5px] leading-relaxed text-white/70">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="offer-card-rule mb-4" />
                    <div
                      className={`grid gap-px overflow-hidden rounded-[8px] border border-white/[0.08] bg-white/[0.06] ${
                        o.hidePrice ? "grid-cols-1" : "grid-cols-2"
                      }`}
                    >
                      <div className="bg-paper-sheet/60 p-3.5">
                        <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-white/45">
                          Timeline
                        </div>
                        <div className="mt-1 font-medium text-[14px] text-white">{o.timeline}</div>
                      </div>
                      {!o.hidePrice && (
                        <div className="bg-paper-sheet/60 p-3.5">
                          <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-white/45">
                            {o.scopeBased ? "Investment" : "Working price"}
                          </div>
                          <div
                            className="mt-1 font-display font-semibold text-[15px] brand-text"
                            data-testid={`offer-price-${o.step}`}
                          >
                            {o.price}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </Rise>
              ))}
            </div>

            <Rise delay={260}>
              <p className="mt-10 text-center font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/35">
                Every pathway begins with the audit &middot; later stages are scoped to what it finds
              </p>
            </Rise>
          </div>
        </section>
      </div>

      {/* ============================================================ NEXT STEP */}
      <ChooseNextStep
        eyebrow="Founding cohort now active"
        eyebrowSignal
        intro="We're running the TSM Nexus methodology through a founding cohort of five select businesses. Secure priority evaluation now."
      />
    </BrandLayout>
  );
}
