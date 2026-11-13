import React, { useState } from "react";
import BrandLayout from "@/components/brand/BrandLayout";
import { Rise, Eyebrow, SectionHead, CTA, FeatureCard, GlowFrame } from "@/components/brand/ui";
import { LAYERS, CLASSIFICATION, TOTAL_PARAMS } from "@/data/guide";
import { cn } from "@/lib/utils";

export default function Method() {
  const [open, setOpen] = useState(0);
  return (
    <BrandLayout>
      <div className="method-page">
      <section className="method-hero relative -mt-[var(--nav-h)] overflow-hidden pt-[var(--nav-h)]">
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div>
              <Rise>
                <Eyebrow>The method</Eyebrow>
              </Rise>
              <Rise delay={90}>
                <h1 className="mt-6 max-w-[24ch] font-display font-semibold text-[2.4rem] leading-[1.03] sm:text-[3.4rem] lg:text-[4rem] text-white">
                  13 layers. <span className="brand-text"><br/>{TOTAL_PARAMS} parameters.</span> One business objective.
                </h1>
              </Rise>
              <Rise delay={170}>
                <p className="mt-7 max-w-[58ch] text-[1.0625rem] md:text-lg leading-relaxed text-white/60">
                  Websites don&rsquo;t fail in one dimension. Great design can sit on top of terrible
                  positioning; great traffic on top of terrible conversion. The 144 parameters exist so
                  the diagnosis is a measurement, not an opinion.
                </p>
              </Rise>
              <Rise delay={240}>
                <div className="mt-9 flex flex-wrap gap-3.5">
                  <CTA to="/apply" testid="method-apply-cta">Apply for the audit</CTA>
                  <CTA to="/guide" testid="method-guide-cta" variant="ghost">Read the field guide</CTA>
                </div>
              </Rise>
            </div>
            <Rise delay={200}>
              <GlowFrame
                src="/images/infographic-layers-method.png"
                alt="Isometric 3D infographic of thirteen stacked translucent diagnostic layers with a cyan scanning beam passing through one highlighted layer"
                caption="The 13-layer diagnostic stack"
                testid="method-layers-visual"
                width={1699}
                height={926}
                loading="eager"
              />
            </Rise>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- layer accordion */}
      <section className="method-layer-section border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="The 13 layers"
            title="Every layer answers one commercial question."
            className="method-layer-heading"
          />
          <div className="mt-12 grid gap-3 lg:grid-cols-2">
            {LAYERS.map((l, i) => {
              const isOpen = open === i;
              return (
                <Rise
                  key={l.n}
                  delay={(i % 2) * 60}
                  className={i === LAYERS.length - 1 ? "lg:col-span-2" : undefined}
                >
                  <button
                    type="button"
                    data-testid={`method-layer-${l.n}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "method-layer-card glass w-full text-left rounded-[10px] p-5 transition-colors",
                      isOpen
                        ? "border-[rgb(var(--brand-sky)_/_0.4)]"
                        : "hover:border-white/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[rgb(var(--brand-sky))]">
                          LAYER {l.n}
                        </div>
                        <h3 className="mt-2 font-display font-semibold text-[1.25rem] text-white">
                          {l.name}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/55">
                          {l.question}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-mono text-white/40 transition-transform duration-200",
                          isOpen && "rotate-45"
                        )}
                      >
                        +
                      </span>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2.5">
                        {l.params.length} parameters
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {l.params.map((p) => (
                          <span
                            key={p}
                            className="rounded-[4px] border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] text-white/60"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- classification */}
      <section className="method-ranking-section border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHead
            eyebrow="How findings are ranked"
            title="You don't get 73 problems. You get five priorities."
            sub="Every finding is classified before it reaches you, so the report is a decision document rather than a list of observations."
          />
          <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {CLASSIFICATION.map((c, i) => (
              <FeatureCard
                key={c.key}
                n={String(i + 1).padStart(2, "0")}
                title={c.key}
                body={c.q}
                delay={i * 60}
                tone={c.key === "PRIORITY" ? "green" : ["cyan", "violet", "magenta"][i % 3]}
                className={`classification-card classification-card-${c.key === "PRIORITY" ? "priority" : ["cyan", "violet", "magenta"][i % 3]}`}
              />
            ))}
          </div>
          <Rise delay={260}>
            <div className="mt-12 flex flex-wrap gap-3.5">
              <CTA to="/cohort" testid="method-cohort-cta">See the founding cohort</CTA>
            </div>
          </Rise>
        </div>
      </section>
      </div>
    </BrandLayout>
  );
}
