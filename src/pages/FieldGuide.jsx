import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import PageRail from "@/components/field/PageRail";
import NavBar from "@/components/brand/NavBar";
import { SOCIALS } from "@/data/brand";
import {
  PageSection,
  RunningHead,
  Reveal,
  Stamp,
  Rule,
  MarginNote,
  PullQuote,
  Mark,
  ManualList,
  TickList,
  Sheet,
  InkPanel,
  InkDivider,
} from "@/components/field/devices";
import {
  ValueChainDiagram,
  ParametersGrid,
  PriorityMatrix,
  ConversionJourneyExhibit,
  TrustExhibit,
  ClarityExhibit,
  PerformanceExhibit,
  BottleneckTree,
  FormPreviewExhibit,
  PlateImage,
} from "@/components/field/Exhibits";
import {
  LAYERS,
  LEAK_EXAMPLES,
  CLASSIFICATION,
  DELIVERABLES,
  PROCESS,
  FOR_WHOM,
  NOT_FOR_WHOM,
  BUSINESS_LEAK_CAUSES,
  TOTAL_PARAMS,
} from "@/data/guide";
import { cn } from "@/lib/utils";
import { GuidePdfCard } from "@/components/field/GuidePdfCard";
import "./FieldGuide.css";

const RULE = { borderColor: "rgb(var(--rule) / var(--rule-a))" };
const RULE_SOFT = { borderColor: "rgb(var(--rule) / var(--rule-soft-a))" };
const GUTTER = "mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-14";

/* ------------------------------------------------------------------ CTA */
function ApplyButton({
  children = "Apply for the audit",
  testid = "apply-cta",
  className,
  invert = false,
}) {
  return (
    <Link
      to="/apply"
      data-testid={testid}
      className={cn(
        "group inline-flex items-center gap-3 px-6 py-3.5 rounded-[4px] font-mono text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 hover:-translate-y-[1px] active:translate-y-0",
        invert
          ? "bg-paper-sheet text-ink hover:bg-nexus hover:text-white"
          : "bg-ink text-paper hover:bg-nexus hover:text-white",
        className
      )}
      style={{ transitionProperty: "background-color, color, transform, box-shadow" }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &#8594;
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ page 01 */
function Cover() {
  return (
    <InkPanel
      id="page-01"
      testid="section-page-01"
      className="masthead-wash -mt-[var(--nav-h)] pt-[var(--nav-h)]"
    >
      <div className={cn(GUTTER, "pt-9 pb-16 md:pt-14 md:pb-24")} data-page="01">
        <RunningHead
          left="TSM Nexus · Confidential diagnostic"
          right="Publication No. 01"
          className="mb-9 md:mb-12"
        />

        <Reveal>
          <div className="font-mono text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.34em] uppercase text-nexus">
            TSM NEXUS
          </div>
          <h1
            id="page-01-title"
            className="mt-5 font-display font-semibold text-[2.55rem] leading-[0.99] sm:text-[4.1rem] lg:text-[5.4rem] lg:leading-[0.94] text-ink"
          >
            The Website
            <br />
            Revenue Leak
            <br />
            Field Guide
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 h-px w-full max-w-[42rem]" style={{ background: "rgb(var(--rule) / 0.26)" }} />
          <p className="mt-7 font-display font-semibold text-xl sm:text-2xl lg:text-[1.85rem] leading-snug text-ink/90 max-w-[32ch]">
            Is your website actually helping you make money?
          </p>
          <p className="mt-5 measure text-[1.0625rem] md:text-lg leading-relaxed text-ink/65">
            A practical framework for understanding where websites lose attention, trust,
            leads and revenue.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div
            className="mt-10 grid grid-cols-3 max-w-xl border-t"
            style={{ borderColor: "rgb(var(--rule) / 0.26)" }}
          >
            {[
              ["13", "Layers"],
              [String(TOTAL_PARAMS), "Parameters"],
              ["1", "Business objective"],
            ].map(([n, l]) => (
              <div key={l} className="pt-4 pr-4">
                <div className="font-display font-semibold text-3xl sm:text-[2.6rem] leading-none text-ink">
                  {n}
                </div>
                <div className="label mt-2.5">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#page-02"
              data-testid="start-reading-link"
              className="group inline-flex items-center gap-3 border px-5 py-3 rounded-[4px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase text-ink hover:border-nexus hover:text-nexus transition-colors"
              style={{ borderColor: "rgb(var(--rule) / 0.3)" }}
            >
              Start reading
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-y-[2px]"
              >
                &#8595;
              </span>
            </a>
            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-ink/45">
              20 pages &middot; approx. 9 minutes
            </span>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <PlateImage
            src="/images/guide-cover.png"
            alt="A website wireframe blueprint examined under a magnifying lens on a dark forensic desk"
            label="Frontispiece · The investigation"
            testid="guide-cover-plate"
            className="!mt-12 md:!mt-16 !mb-0 max-w-[52rem]"
          />
        </Reveal>

        <Reveal delay={420}>
          <GuidePdfCard compact idSuffix="cover" className="mt-10 max-w-[42rem]" />
        </Reveal>

        <div className="mt-16 md:mt-24 flex flex-wrap items-center gap-5">
          <Stamp>Revenue Leak Investigation</Stamp>
          <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-ink/40">
            Prepared for founders
          </span>
        </div>
      </div>
    </InkPanel>
  );
}

/* ------------------------------------------------------------------ page 05 */
function LayerIndex() {
  const [open, setOpen] = useState(null);
  return (
    <div data-testid="layer-index" className="mt-2">
      {LAYERS.map((l, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={l.n} delay={i * 26}>
            <div className="border-t" style={RULE_SOFT}>
              <button
                type="button"
                data-testid={`layer-row-${l.n}`}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group w-full text-left grid grid-cols-[2.6rem,1fr,1.2rem] items-start gap-3 sm:gap-5 py-4 hover:bg-ink/[0.03] transition-colors px-1"
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-nexus pt-[7px]">
                  {l.n}
                </span>
                <span>
                  <span className="font-display font-semibold text-lg sm:text-xl text-ink">
                    {l.name}
                  </span>
                  <span className="block mt-1 text-[15px] md:text-base leading-relaxed text-ink/65">
                    {l.question}
                  </span>
                  <span
                    className={cn(
                      "block overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-[420px] opacity-100 mt-3" : "max-h-0 opacity-0"
                    )}
                  >
                    <span className="label block mb-2">
                      {l.params.length} parameters in this layer
                    </span>
                    <span className="flex flex-wrap gap-1.5">
                      {l.params.map((p) => (
                        <span
                          key={p}
                          className="inline-block rounded-[2px] border px-2 py-1 font-mono text-[9.5px] tracking-[0.04em] text-ink/65"
                          style={{
                            borderColor: "rgb(var(--rule) / 0.2)",
                            background: "rgb(var(--ink) / 0.03)",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-ink/35 pt-1 transition-transform duration-200",
                    isOpen && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
            </div>
          </Reveal>
        );
      })}
      <div className="border-t" style={RULE_SOFT} />
    </div>
  );
}

/* ------------------------------------------------------------------ guide */
export default function FieldGuide() {
  return (
    <main className="field-guide relative">
      <a
        href="#page-02"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:left-4 focus:top-4 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded font-mono text-xs"
      >
        Skip to Page 02
      </a>

      <NavBar />
      <div className="h-[var(--nav-h)]" />
      <PageRail />

      <div className="lg:pl-[var(--rail-w)]">
        {/* ================================================== 01 — INK PANEL */}
        <Cover />

        {/* ================================================== broadsheet body */}
        <div className={cn(GUTTER, "broadsheet-rules")}>
          {/* ---------------------------------------------- 02 */}
          <PageSection id="page-02" n="02" kicker="The Question" title="Your website looks fine. But is it working?">
            <div className="grid lg:grid-cols-[1fr,250px] gap-8 xl:gap-14">
              <div className="measure prose-field">
                <p className="dropcap">
                  Most companies evaluate their website through questions like: Does it look
                  professional? Is it mobile responsive? Is the branding good? Does Google
                  like it?
                </p>
                <p>Those questions matter. But they&rsquo;re incomplete.</p>
                <p className="font-display font-semibold !text-[1.35rem] sm:!text-[1.65rem] !leading-snug !text-ink !mt-8">
                  The more important question is:{" "}
                  <Mark>what is your website doing for the business?</Mark>
                </p>
                <ul className="mt-7 space-y-0">
                  {[
                    "Is it helping someone understand your offer?",
                    "Is it building enough trust to make them consider you?",
                    "Is it moving them toward action?",
                    "Is it capturing demand?",
                    "Is it helping your sales team?",
                    "Is it converting the attention you're already paying to acquire?",
                  ].map((q, i) => (
                    <Reveal as="li" key={q} delay={i * 45}>
                      <div className="flex gap-4 py-3 border-b" style={RULE_SOFT}>
                        <span className="font-mono text-[9.5px] text-ink/35 pt-[8px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[1.0625rem] md:text-lg leading-relaxed text-ink/80">
                          {q}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <p className="!mt-9">
                  Because a website can be beautiful, fast, SEO-friendly, technically
                  excellent&hellip; and still be a poor business asset.
                </p>
              </div>
              <div className="lg:pt-3">
                <MarginNote>
                  &ldquo;It looks great&rdquo; and &ldquo;it works&rdquo; are two entirely
                  different findings.
                </MarginNote>
                <div className="mt-8">
                  <Stamp>Poor business asset</Stamp>
                </div>
              </div>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 03 */}
          <PageSection id="page-03" n="03" kicker="The TSM Nexus Belief" title="Websites don't exist to look good." wide>
            <div className="measure prose-field">
              <p className="dropcap">
                They exist to perform a function inside a business. Your website sits
                somewhere inside a larger system &mdash; and a failure anywhere in that
                chain can create a leak.
              </p>
            </div>
            <ValueChainDiagram />
            <div className="measure prose-field">
              <p>
                We don&rsquo;t start with the design. We start with the chain, and ask where
                it breaks. <Mark>That&rsquo;s what we investigate.</Mark>
              </p>
            </div>
          </PageSection>
        </div>

        {/* ============================================ ink divider */}
        <InkDivider testid="ink-divider-1" stamp="Finding">
          A revenue leak is rarely dramatic. It is almost always a quiet, reasonable-looking
          decision.
        </InkDivider>

        <div className={cn(GUTTER, "broadsheet-rules")}>
          {/* ---------------------------------------------- 04 */}
          <PageSection id="page-04" n="04" kicker="Definition" title="What is a revenue leak?" wide>
            <div className="grid lg:grid-cols-[1fr,250px] gap-8 xl:gap-14">
              <div>
                <div className="relative">
                  <Sheet plate className="p-5 sm:p-7" testid="leak-definition">
                    <div className="label mb-3">Definition</div>
                    <p className="font-display font-semibold text-lg sm:text-[1.35rem] leading-snug text-ink">
                      A revenue leak is a point of friction, confusion, mistrust or failure
                      that prevents existing demand from moving further through the business.
                    </p>
                  </Sheet>
                </div>
                <div className="measure prose-field mt-8">
                  <p>
                    It doesn&rsquo;t necessarily mean &ldquo;your website is losing exactly
                    &#8377;X.&rdquo; That would be dishonest without the underlying data.
                  </p>
                  <p>
                    Instead, we ask:{" "}
                    <Mark>where is the website creating measurable or plausible commercial exposure?</Mark>
                  </p>
                </div>

                <div className="mt-9">
                  <div className="label mb-2.5">Table 04-A &middot; Five common leaks</div>
                  <div className="evidence-frame reg-marks rounded-[6px]">
                    {LEAK_EXAMPLES.map((e, i) => (
                      <Reveal key={e.title} delay={i * 55}>
                        <div
                          className={cn(
                            "grid sm:grid-cols-[195px,1fr] gap-2 sm:gap-5 p-4 sm:p-5",
                            i > 0 && "border-t"
                          )}
                          style={RULE_SOFT}
                        >
                          <div className="font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-leak">
                            {e.title}
                          </div>
                          <div>
                            <p className="text-[15px] md:text-base leading-relaxed text-ink/80">
                              {e.cause}
                            </p>
                            <div className="mt-2 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink/50">
                              <span aria-hidden="true">&#8595;</span>
                              {e.effect}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <PlateImage
                  src="/images/guide-leak.png"
                  alt="A translucent pipeline carrying a bright stream of energy, leaking glowing droplets through fine cracks"
                  label="Plate 04-B · A leak in cross-section"
                  caption="Nothing looks broken. The pressure is still dropping."
                  testid="guide-leak-plate"
                />
              </div>
              <div className="lg:pt-6">
                <MarginNote>
                  We look for commercial exposure, not aesthetic opinions.
                </MarginNote>
              </div>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 05 */}
          <PageSection id="page-05" n="05" kicker="The System" title="The 13-Layer System" wide>
            <div className="measure prose-field">
              <p>
                We look at the website as a system. Instead of asking &ldquo;does this website
                look good?&rdquo;, we investigate thirteen layers &mdash; and{" "}
                <Mark>{TOTAL_PARAMS} parameters</Mark> beneath them.
              </p>
            </div>
            <PlateImage
              src="/images/infographic-layers.png"
              alt="Isometric stack of thirteen translucent diagnostic layers with a cyan scanning beam passing through one highlighted layer"
              label="Plate 05-A · The 13-layer diagnostic stack"
              caption="Each layer is examined on its own — then as a system."
              testid="guide-layers-plate"
            />
            <div className="mt-8">
              <LayerIndex />
            </div>
            <div className="mt-5 font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink/45">
              Open any layer to see its parameters
            </div>
          </PageSection>

          {/* ---------------------------------------------- 06 */}
          <PageSection id="page-06" n="06" kicker="Why 144" title="The 144-parameter idea" wide>
            <div className="measure prose-field">
              <p className="dropcap">Why 144? Because websites don&rsquo;t fail in one dimension.</p>
            </div>
            <div className="my-8 grid sm:grid-cols-2 gap-2.5">
              {[
                ["great design", "terrible positioning"],
                ["great traffic", "terrible conversion"],
                ["great conversion", "terrible lead quality"],
                ["great messaging", "terrible trust"],
                ["great technology", "no demand"],
              ].map(([a, b], i) => (
                <Reveal key={a} delay={i * 55}>
                  <div className="sheet rounded-[4px] p-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-growth">
                      {a}
                    </span>
                    <span aria-hidden="true" className="text-ink/30 font-mono text-xs">
                      +
                    </span>
                    <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-leak">
                      {b}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="measure prose-field">
              <p>
                The 144 parameters let us look at the website from multiple angles rather than
                making a subjective judgment based on aesthetics.
              </p>
            </div>
            <ParametersGrid />
            <PullQuote cite="Important">
              We don&rsquo;t give you 144 problems to fix. We identify the problems that
              matter most.
            </PullQuote>
          </PageSection>

          {/* ---------------------------------------------- 07 */}
          <PageSection
            id="page-07"
            n="07"
            kicker="The Founder's Question"
            title="“Okay. But what is actually wrong with my website?”"
            wide
          >
            <div className="measure prose-field">
              <p>
                That&rsquo;s where the audit becomes useful. Instead of dumping observations
                on you, we classify every finding.
              </p>
            </div>
            <div className="my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CLASSIFICATION.map((c, i) => (
                <Reveal key={c.key} delay={i * 65}>
                  <div className="sheet sheet-hover rounded-[4px] p-5 h-full">
                    <div className="font-mono text-[10.5px] font-semibold tracking-[0.22em] uppercase text-nexus">
                      {c.key}
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{c.q}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <PriorityMatrix />
            <div className="grid sm:grid-cols-2 gap-3">
              <div
                className="rounded-[4px] border p-5"
                style={{
                  borderColor: "rgb(var(--leak) / 0.3)",
                  background: "rgb(var(--leak) / 0.05)",
                }}
              >
                <div className="label mb-2">You don&rsquo;t walk away with</div>
                <p className="font-display font-semibold text-lg text-ink/85">
                  &ldquo;Here&rsquo;s 73 things wrong with your website.&rdquo;
                </p>
              </div>
              <div
                className="rounded-[4px] border p-5"
                style={{
                  borderColor: "rgb(var(--nexus) / 0.3)",
                  background: "rgb(var(--nexus) / 0.06)",
                }}
              >
                <div className="label mb-2">You walk away with</div>
                <p className="font-display font-semibold text-lg text-ink/85">
                  &ldquo;Here are the 5 things I&rsquo;d fix first.&rdquo;
                </p>
              </div>
            </div>
          </PageSection>
        </div>

        {/* ============================================ ink divider */}
        <InkDivider testid="ink-divider-2" stamp="Exhibits 08–12">
          What follows are five leaks we find again and again. None of them look broken.
        </InkDivider>

        <div className={cn(GUTTER, "broadsheet-rules")}>
          {/* ---------------------------------------------- 08 */}
          <PageSection id="page-08" n="08" kicker="What We Look For" title="The Conversion Leak" wide>
            <div className="measure prose-field">
              <p>
                Imagine a visitor arrives on your website. They understand the offer.
                They&rsquo;re interested. They&rsquo;re ready to explore. Then&hellip;
              </p>
            </div>
            <ConversionJourneyExhibit />
            <div className="measure prose-field">
              <p>
                Nothing is technically &ldquo;broken.&rdquo; But the journey is{" "}
                <Mark tone="red">leaking intent</Mark>. That&rsquo;s a TSM Nexus finding.
              </p>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 09 */}
          <PageSection id="page-09" n="09" kicker="What We Look For" title="The Trust Leak" wide>
            <div className="measure prose-field">
              <p>
                Your website says: &ldquo;We&rsquo;re the best solution for your
                business.&rdquo; But where&rsquo;s the evidence?
              </p>
            </div>
            <TrustExhibit />
            <div className="measure prose-field">
              <p>
                The visitor isn&rsquo;t necessarily thinking &ldquo;this company is
                bad.&rdquo; They&rsquo;re thinking &ldquo;I&rsquo;m not sure.&rdquo;
              </p>
            </div>
            <PullQuote>And uncertainty kills action.</PullQuote>
          </PageSection>

          {/* ---------------------------------------------- 10 */}
          <PageSection id="page-10" n="10" kicker="What We Look For" title="The Clarity Leak" wide>
            <div className="measure prose-field">
              <p>
                Your headline says: &ldquo;Empowering businesses through innovative digital
                transformation.&rdquo; It sounds impressive. But&hellip;
              </p>
            </div>
            <ClarityExhibit />
            <div className="measure prose-field">
              <p>
                If the visitor has to solve those questions themselves, you&rsquo;re creating{" "}
                <Mark tone="red">cognitive friction</Mark>.
              </p>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 11 */}
          <PageSection id="page-11" n="11" kicker="What We Look For" title="The Performance Leak" wide>
            <div className="measure prose-field">
              <p>
                A website can be visually impressive and technically expensive&hellip; while
                making someone wait. Slow pages. Heavy images. Unnecessary scripts. Poor
                mobile performance. Broken interactions.
              </p>
            </div>
            <PerformanceExhibit />
            <div className="grid sm:grid-cols-2 gap-3">
              <div
                className="rounded-[4px] border p-5"
                style={{ ...RULE, background: "rgb(var(--ink) / 0.02)" }}
              >
                <div className="label mb-2">The question isn&rsquo;t</div>
                <p className="font-display font-semibold text-lg text-ink/55">
                  &ldquo;Is your PageSpeed score 87?&rdquo;
                </p>
              </div>
              <div
                className="rounded-[4px] border p-5"
                style={{
                  borderColor: "rgb(var(--nexus) / 0.3)",
                  background: "rgb(var(--nexus) / 0.06)",
                }}
              >
                <div className="label mb-2">The question is</div>
                <p className="font-display font-semibold text-lg text-ink">
                  &ldquo;Is technology getting in the way of the business objective?&rdquo;
                </p>
              </div>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 12 */}
          <PageSection id="page-12" n="12" kicker="What We Look For" title="The Business Leak" wide>
            <div className="grid lg:grid-cols-[1fr,250px] gap-8 xl:gap-14">
              <div className="measure prose-field">
                <p className="dropcap">
                  And sometimes&hellip; the website isn&rsquo;t the problem. This is one of the
                  most important things TSM Nexus can tell a founder.
                </p>
              </div>
              <div className="lg:pt-3">
                <MarginNote>
                  Usually the most uncomfortable page of any audit &mdash; and the most
                  valuable.
                </MarginNote>
              </div>
            </div>
            <BottleneckTree causes={BUSINESS_LEAK_CAUSES} />
            <PullQuote cite="Part of the audit">
              If the website isn&rsquo;t the bottleneck, we&rsquo;ll tell you.
            </PullQuote>
          </PageSection>

          {/* ---------------------------------------------- 13 */}
          <PageSection id="page-13" n="13" kicker="Deliverables" title="What you receive" wide>
            <div className="label mb-5">The TSM Nexus Revenue Leak Audit</div>
            <div className="evidence-frame reg-marks rounded-[6px]" data-testid="deliverables-list">
              {DELIVERABLES.map((d, i) => (
                <Reveal key={d.n} delay={i * 50}>
                  <div
                    className={cn(
                      "grid grid-cols-[2.8rem,1fr] gap-3 sm:gap-6 p-4 sm:p-6",
                      i > 0 && "border-t"
                    )}
                    style={RULE_SOFT}
                  >
                    <div className="font-mono text-sm tracking-[0.14em] text-nexus pt-[4px]">
                      {d.n}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-lg sm:text-xl text-ink">
                        {d.title}
                      </div>
                      <p className="mt-1.5 text-[15px] md:text-base leading-relaxed text-ink/70">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </PageSection>
        </div>

        {/* ================================================== 14 — INK PANEL */}
        <InkPanel id="page-14" testid="section-page-14">
          <div className={cn(GUTTER, "section-pad")} data-page="14">
            <RunningHead left="TSM Nexus · The invitation" right="Page 14 / 20" />
            <div className="grid lg:grid-cols-[1fr,320px] gap-10 xl:gap-16">
              <div>
                <div className="label mb-3">The Founding Cohort</div>
                <h2
                  id="page-14-title"
                  className="font-display font-semibold text-[1.85rem] leading-[1.08] sm:text-[2.4rem] lg:text-[3.1rem] text-ink"
                >
                  We&rsquo;re opening 5 founding cohort slots.
                </h2>
                <div className="measure prose-field mt-8">
                  <p>
                    We&rsquo;re putting the TSM Nexus methodology through a real-world founding
                    cohort. Five businesses. One full cycle &mdash; Diagnostic, Plan, 30-day Fix
                    Sprint and Measurement. One objective: find where their websites are creating
                    commercial leakage, then fix it.
                  </p>
                  <p>
                    You receive the complete engagement at a founding rate &mdash; roughly a third
                    below its standard price. In return, we ask for:
                  </p>
                </div>
                <ul className="mt-4 space-y-0 max-w-[46rem]">
                  {[
                    "Case-study rights — named or anonymized, with real numbers",
                    "Analytics access held through day 70",
                    "A testimonial on completion, if the work earns it",
                  ].map((t, i) => (
                    <Reveal as="li" key={t} delay={i * 55}>
                      <div className="flex items-start gap-3 py-2.5 border-b" style={RULE_SOFT}>
                        <span
                          aria-hidden="true"
                          className="mt-[0.65rem] h-[6px] w-[6px] shrink-0"
                          style={{ background: "rgb(var(--growth))" }}
                        />
                        <span className="text-[1.0625rem] leading-relaxed text-ink/80">{t}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <p className="mt-7 font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink/55">
                  50% deposit reserves your slot &middot; full-fee Findings Guarantee.
                </p>
              </div>

              <div>
                <div
                  className="rounded-[6px] border p-6"
                  style={{
                    borderColor: "rgb(var(--rule) / 0.24)",
                    background: "rgb(var(--paper-2))",
                  }}
                  data-testid="cohort-slots-card"
                >
                  <div className="font-display font-semibold text-[4.2rem] leading-none text-ink">
                    5
                  </div>
                  <div className="label mt-3">Founding cohort slots</div>
                  <Rule className="my-5" />
                  <p className="text-[15px] leading-relaxed text-ink/70">
                    Applications are reviewed individually. Five businesses will be selected
                    for the founding cohort.
                  </p>
                  <div className="mt-6">
                    <ApplyButton
                      testid="apply-cta-cohort"
                      invert
                      className="w-full justify-between"
                    />
                  </div>
                </div>
              </div>
            </div>

            <PlateImage
              src="/images/cohort-executive.png"
              alt="Founders and executives in a boardroom at night reviewing a large holographic analytics dashboard against a city skyline"
              label="Plate 14-A · The founding cohort"
              caption="Ten leadership teams. One shared diagnostic."
              testid="guide-cohort-plate"
              className="!mb-0"
            />
          </div>
        </InkPanel>

        <div className={cn(GUTTER, "broadsheet-rules")}>
          {/* ---------------------------------------------- 15 */}
          <PageSection id="page-15" n="15" kicker="Eligibility" title="Who is this for?" wide>
            <div className="measure prose-field">
              <p>This is designed for businesses where the website matters. Particularly:</p>
            </div>
            <div className="mt-7">
              <TickList items={FOR_WHOM} tone="green" testid="for-whom-list" />
            </div>
            <div className="mt-9 measure prose-field">
              <p>
                We&rsquo;re most interested in businesses where improving the website could
                have a meaningful relationship with{" "}
                <Mark>leads &#8594; sales &#8594; revenue</Mark>.
              </p>
            </div>
          </PageSection>

          {/* ---------------------------------------------- 16 */}
          <PageSection id="page-16" n="16" kicker="Exclusions" title="Who shouldn't apply?" wide>
            <div className="measure prose-field">
              <p>This probably isn&rsquo;t for you if&hellip;</p>
            </div>
            <div className="mt-7">
              <TickList items={NOT_FOR_WHOM} tone="red" testid="not-for-whom-list" />
            </div>
            <div className="mt-8">
              <Stamp>Not a fit</Stamp>
            </div>
            <PullQuote>
              We&rsquo;re not here to tell you your website is great. We&rsquo;re here to find
              out where it isn&rsquo;t.
            </PullQuote>
          </PageSection>

          {/* ---------------------------------------------- 17 */}
          <PageSection id="page-17" n="17" kicker="The Process" title="From application to diagnosis." wide>
            <ManualList items={PROCESS} arrows className="mt-4" />
            <div className="border-t" style={RULE_SOFT} />
          </PageSection>

          {/* ---------------------------------------------- 18 */}
          <PageSection id="page-18" n="18" kicker="The Application" title="Tell us about your business." wide>
            <div className="measure prose-field">
              <p>
                Two sections: first your details, then your business, website and growth context.
                It takes about eight minutes, and your answers are saved as you go.
              </p>
            </div>
            <FormPreviewExhibit />
            <ApplyButton testid="apply-cta-form-preview">Open the application</ApplyButton>
          </PageSection>

          {/* ---------------------------------------------- 19 */}
          <PageSection id="page-19" n="19" kicker="Before You Apply" title="Three things we ask from you" wide>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {[
                ["01", "Be honest.", "Tell us what you actually think is wrong."],
                [
                  "02",
                  "Give us context.",
                  "A website can't be evaluated properly without understanding the business behind it.",
                ],
                [
                  "03",
                  "Be open to uncomfortable findings.",
                  "Sometimes the most valuable conclusion is: “This isn't a website problem.”",
                ],
              ].map(([n, t, b], i) => (
                <Reveal key={n} delay={i * 75}>
                  <div className="evidence-frame reg-marks rounded-[6px] p-5 sm:p-6 h-full">
                    <div className="font-mono text-[10.5px] tracking-[0.2em] text-nexus">{n}</div>
                    <div className="mt-3 font-display font-semibold text-xl leading-snug text-ink">
                      {t}
                    </div>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </PageSection>

          {/* ---------------------------------------------- 20 */}
          <PageSection id="page-20" n="20" kicker="The Final Page" title="Your website is already doing something." wide>
            <div className="grid lg:grid-cols-[1fr,250px] gap-8 xl:gap-14">
              <div className="measure prose-field">
                <p className="dropcap">
                  The question is: is it doing enough? You already spend money getting people
                  to your business.
                </p>
                <div className="my-7 flex flex-wrap gap-2">
                  {["Marketing", "Sales", "Content", "Advertising", "People", "Technology"].map(
                    (t, i) => (
                      <Reveal key={t} delay={i * 40} as="span">
                        <span
                          className="inline-block rounded-[2px] border px-3 py-1.5 font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.16em] uppercase text-ink/65"
                          style={{ borderColor: "rgb(var(--rule) / 0.22)" }}
                        >
                          {t}
                        </span>
                      </Reveal>
                    )
                  )}
                </div>
                <p>
                  Your website sits somewhere in the middle of all of it. So we think it
                  deserves to be treated like <Mark>a business asset</Mark>.
                </p>
                <div className="mt-7 space-y-0">
                  {[
                    "Not a brochure.",
                    "Not a vanity project.",
                    "Not something you redesign every three years because it looks outdated.",
                  ].map((t, i) => (
                    <Reveal key={t} delay={i * 55}>
                      <div className="flex items-start gap-3 py-2.5 border-b" style={RULE_SOFT}>
                        <span aria-hidden="true" className="font-mono text-leak text-sm pt-1">
                          &#215;
                        </span>
                        <span className="text-[1.0625rem] text-ink/70">{t}</span>
                      </div>
                    </Reveal>
                  ))}
                  <Reveal delay={190}>
                    <div className="flex items-start gap-3 py-2.5 border-b" style={RULE_SOFT}>
                      <span aria-hidden="true" className="font-mono text-growth text-sm pt-1">
                        &#10003;
                      </span>
                      <span className="text-[1.0625rem] text-ink font-medium">
                        A system that should contribute to growth.
                      </span>
                    </div>
                  </Reveal>
                </div>
              </div>
              <div className="lg:pt-3">
                <MarginNote>
                  Every page you&rsquo;ve just read is a question we&rsquo;ll ask about your
                  website specifically.
                </MarginNote>
              </div>
            </div>
          </PageSection>
        </div>

        {/* ================================================== closing — INK PANEL */}
        <InkPanel testid="closing-cta">
          <div className={cn(GUTTER, "section-pad")}>
            <Reveal>
              <div className="font-mono text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.34em] uppercase text-nexus">
                TSM NEXUS
              </div>
              <div className="mt-6 space-y-1">
                {["Find the leaks.", "Fix what matters.", "Measure the impact."].map((t, i) => (
                  <div
                    key={t}
                    className="font-display font-semibold text-[1.8rem] sm:text-[2.6rem] lg:text-[3.3rem] leading-[1.06] text-ink"
                    style={{ opacity: 1 - i * 0.18 }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="my-10 h-px" style={{ background: "rgb(var(--rule) / 0.24)" }} />

            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-end">
              <div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-display font-semibold text-[3.4rem] sm:text-[4.2rem] leading-none text-ink">
                    5
                  </span>
                  <div className="label leading-relaxed">
                    Founding
                    <br />
                    cohort slots
                  </div>
                </div>
                <p className="mt-5 measure text-[1.0625rem] md:text-lg leading-relaxed text-ink/70">
                  Apply for the TSM Nexus founding cohort. Applications are
                  reviewed individually. Five businesses will be selected for the founding
                  cohort.
                </p>
              </div>
              <ApplyButton testid="apply-cta-footer" invert />
            </div>

            <Reveal>
              <GuidePdfCard idSuffix="closing" className="mt-12" />
            </Reveal>
          </div>

          <footer
            className="border-t"
            style={{ borderColor: "rgb(var(--rule) / 0.18)" }}
          >
            <div
              className={cn(
                GUTTER,
                "py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              )}
            >
              <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-ink/45">
                TSM Nexus &middot; Diagnostic Publication No. 01 &middot; 13 Layers &middot;{" "}
                {TOTAL_PARAMS} Parameters
              </div>
              <div className="flex items-center gap-5">
                {SOCIALS.map((s) => {
                  const Icon = s.icon === "instagram" ? Instagram : Linkedin;
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="text-ink/45 hover:text-nexus transition-colors"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  );
                })}
                <Link
                  to="/apply"
                  className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-ink/60 hover:text-nexus transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          </footer>
        </InkPanel>
      </div>
    </main>
  );
}
