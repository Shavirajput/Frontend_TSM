import React from "react";
import { CTA, Eyebrow, Rise } from "@/components/brand/ui";

const CHOICES = [
  {
    number: "01",
    title: "Apply for Audit",
    description: "If you are ready for a structured review of your revenue leaks.",
    buttonLabel: "Apply for Audit",
    to: "/apply",
    variant: "primary",
    testid: "next-step-audit",
  },
  {
    number: "02",
    title: "Book a Fit Call",
    description: "If you want to talk through your current bottleneck first.",
    buttonLabel: "Book a Fit Call",
    fitCall: true,
    variant: "ghost",
    testid: "next-step-fit-call",
  },
  {
    number: "03",
    title: "Read Field Guide",
    description: "Understand the mechanics of 144 parameters before reaching out.",
    buttonLabel: "Explore Guide",
    to: "/guide",
    variant: "ghost",
    testid: "next-step-field-guide",
  },
];

export default function ChooseNextStep({ eyebrow, intro, eyebrowSignal = false }) {
  return (
    <section
      aria-labelledby="choose-next-step-heading"
      className="choose-next-step-section relative overflow-hidden py-12 sm:py-16 md:py-20"
      data-testid="choose-next-step"
    >
      <div className="choose-next-step-grid" aria-hidden="true" />
      <div className="choose-next-step-panel relative mx-auto max-w-[1280px] px-5 py-9 sm:px-8 sm:py-12 lg:px-[70px] lg:py-[72px]">
        <Rise className="choose-next-step-heading text-center">
          {eyebrow && (
            <Eyebrow signal={eyebrowSignal} className="choose-next-step-eyebrow">
              {eyebrow}
            </Eyebrow>
          )}
          <h2
            id="choose-next-step-heading"
            className="mx-auto mt-5 font-display font-semibold text-[1.9rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.06] text-white"
          >
            Choose your next step
          </h2>
          {intro && (
            <p className="mx-auto mt-4 max-w-[58ch] text-[1rem] md:text-lg leading-relaxed text-white/55">
              {intro}
            </p>
          )}
        </Rise>

        <div className="choose-next-step-cards mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          {CHOICES.map((choice, index) => (
            <Rise key={choice.number} delay={index * 70} className="h-full">
              <article className={`choose-next-step-card choose-next-step-card-${index + 1} flex h-full flex-col rounded-[16px] border p-5 sm:p-6`}>
                <div className="font-mono text-[10px] font-semibold tracking-[0.22em]">
                  {choice.number}
                </div>
                <h3 className="mt-3 font-display font-semibold text-xl leading-snug text-white">
                  {choice.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-white/60">
                  {choice.description}
                </p>
                <div className="mt-6">
                  <CTA
                    to={choice.to}
                    fitCall={choice.fitCall}
                    variant={choice.variant}
                    testid={choice.testid}
                    className="choose-next-step-cta min-h-12 w-full"
                  >
                    {choice.buttonLabel}
                  </CTA>
                </div>
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
