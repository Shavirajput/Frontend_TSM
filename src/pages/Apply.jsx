import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { submitApplication } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Reveal, Rule, RunningHead } from "@/components/field/devices";
import NavBar from "@/components/brand/NavBar";
import "./Apply.css";

const STORAGE_KEY = "tsm_application_draft";

const SECTIONS = [
  {
    letter: "A",
    title: "Your details",
    note: "Who we'd be talking to.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, ph: "Aarav Mehta" },
      { name: "email", label: "Email", type: "email", required: true, ph: "you@company.com" },
      { name: "company", label: "Company", type: "text", required: true, ph: "Northwind" },
      { name: "website", label: "Website", type: "text", required: true, ph: "yourcompany.com" },
      { name: "role", label: "Role", type: "text", required: true, ph: "Founder & CEO" },
      { name: "linkedin", label: "LinkedIn", type: "text", required: false, ph: "linkedin.com/in/…" },
    ],
  },
  {
    letter: "B",
    title: "Your business",
    note: "A website can't be evaluated without the business behind it.",
    fields: [
      {
        name: "what_you_sell",
        label: "What do you sell?",
        type: "textarea",
        required: true,
        ph: "Be specific — product, service, delivery model.",
      },
      {
        name: "ideal_customer",
        label: "Who is your ideal customer?",
        type: "textarea",
        required: true,
        ph: "Role, company size, industry, situation.",
      },
      {
        name: "primary_offer",
        label: "What is your primary offer?",
        type: "textarea",
        required: true,
        ph: "The commercial proposition, including rough pricing if you're comfortable.",
      },
      {
        name: "website_contribution",
        label: "How does your website currently contribute to customer acquisition and the business?",
        type: "textarea",
        required: true,
        ph: "e.g. ~30% of pipeline starts on the site; sales sends it before calls.",
      },
    ],
  },
  {
    letter: "C",
    title: "Your website",
    note: "Be honest. Tell us what you actually think is wrong.",
    fields: [
      {
        name: "whats_wrong",
        label: "What is your biggest growth challenge with the website right now?",
        type: "textarea",
        required: true,
        ph: "Your instinct is useful data, even if it turns out to be wrong.",
      },
      {
        name: "investigate_most",
        label: "What would you most like us to investigate?",
        type: "textarea",
        required: true,
        ph: "e.g. why demo requests dropped after the redesign.",
      },
      {
        name: "primary_conversion",
        label: "What is your primary website conversion?",
        type: "text",
        required: true,
        ph: "Book a demo / Request a quote / Start trial",
      },
    ],
  },
  {
    letter: "D",
    title: "Your economics",
    note: "Approximations are fine. This lets us model commercial exposure honestly.",
    fields: [
      {
        name: "avg_customer_value",
        label: "Approximate average customer value",
        type: "text",
        required: false,
        ph: "e.g. ₹8,00,000 / $18,000 per year",
      },
      {
        name: "monthly_leads",
        label: "Approximate monthly website leads",
        type: "text",
        required: false,
        ph: "e.g. 40–50",
      },
      {
        name: "website_customers",
        label: "Approximate website-generated customers",
        type: "text",
        required: false,
        ph: "e.g. 6 per quarter",
      },
      {
        name: "additional_context",
        label: "Any additional context",
        type: "textarea",
        required: false,
        ph: "Anything else we should know before we start looking.",
      },
    ],
  },
];

const AGREEMENTS = [
  { name: "agree_honest", label: "I'll be honest about what I think is wrong." },
  { name: "agree_context", label: "I've given enough context about the business." },
  {
    name: "agree_findings",
    label: "I'm open to uncomfortable findings — including “this isn't a website problem.”",
  },
];

const STEPS = [
  {
    title: "Your details",
    note: "Who we'd be talking to.",
    sections: [SECTIONS[0]],
  },
  {
    title: "Your business",
    note: "Tell us about the business, website, and the context behind its growth.",
    sections: SECTIONS.slice(1),
  },
];

const EMPTY = SECTIONS.flatMap((s) => s.fields).reduce(
  (a, f) => ({ ...a, [f.name]: "" }),
  { agree_honest: false, agree_context: false, agree_findings: false, company_fax: "" }
);

/* ------------------------------------------------------------------ fields */
function Field({ f, value, error, onChange }) {
  const id = `field-${f.name}`;
  const base =
    "w-full bg-paper border rounded-[3px] px-3.5 py-2.5 text-[15px] leading-relaxed text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:border-nexus focus:ring-2 focus:ring-nexus/25";
  return (
    <div className={cn("apply-field py-4 border-b", f.type === "textarea" && "sm:col-span-2")} style={{ borderColor: "rgb(var(--rule) / var(--rule-soft-a))" }}>
      <label htmlFor={id} className="block">
        <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink/60">
          {f.label}
          {f.required && <span className="text-leak ml-1.5">*</span>}
        </span>
      </label>
      <div className="mt-2">
        {f.type === "textarea" ? (
          <textarea
            id={id}
            data-testid={id}
            rows={3}
            value={value}
            placeholder={f.ph}
            required={f.required}
            onChange={(e) => onChange(f.name, e.target.value)}
            className={cn(base, "resize-y min-h-[86px]", error ? "border-leak" : "border-ink/25")}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        ) : (
          <input
            id={id}
            data-testid={id}
            type={f.type}
            value={value}
            placeholder={f.ph}
            required={f.required}
            onChange={(e) => onChange(f.name, e.target.value)}
            className={cn(base, error ? "border-leak" : "border-ink/25")}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}
      </div>
      {error && (
        <div
          id={`${id}-error`}
          data-testid={`${id}-error`}
          role="alert"
          className="mt-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-leak"
        >
          {error}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ page */
export default function Apply() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);
  const topRef = useRef(null);
  const timer = useRef(null);

  /* restore draft */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...EMPTY, ...parsed.data });
        if (typeof parsed.step === "number") setStep(Math.min(parsed.step, STEPS.length - 1));
      }
    } catch (e) {
      /* ignore corrupt draft */
    }
  }, []);

  /* autosave */
  useEffect(() => {
    if (done) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
      } catch (e) {
        /* storage full / disabled */
      }
    }, 500);
    return () => clearTimeout(timer.current);
  }, [data, step, done]);

  const setField = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const validateStep = (i) => {
    const errs = {};
    STEPS[i].sections.flatMap((section) => section.fields).forEach((f) => {
      const v = (data[f.name] || "").toString().trim();
      if (f.required && !v) errs[f.name] = "Required";
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        errs[f.name] = "Enter a valid email address";
      else if (f.name === "website" && v && v.length < 4) errs[f.name] = "Enter a valid website";
      else if (f.required && v.length < 2) errs[f.name] = "Please add a little more detail";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = () => {
    if (!validateStep(step)) {
      toast.error("Some answers need attention before continuing.");
      requestAnimationFrame(() => {
        const firstError = document.querySelector('[aria-invalid="true"]');
        firstError?.focus();
      });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  };

  const submit = async () => {
    for (let i = 0; i < STEPS.length; i++) {
      if (!validateStep(i)) {
        setStep(i);
        scrollTop();
        toast.error(`Step ${i + 1} is incomplete.`);
        requestAnimationFrame(() => {
          const firstError = document.querySelector('[aria-invalid="true"]');
          firstError?.focus();
        });
        return;
      }
    }
    setSubmitting(true);
    try {
      const res = await submitApplication(data);
      localStorage.removeItem(STORAGE_KEY);
      setDone(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d) => `${d.loc?.slice(-1)[0]}: ${d.msg}`).join(", ")
        : detail || "Submission failed. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  /* ------------------------------------------------- submitted state */
  if (done) {
    return (
      <main className="apply-page min-h-screen">
        <NavBar />
        <div className="h-[calc(var(--nav-h)+20px)]" />
        <TopBar />
        <div className="apply-content mx-auto max-w-[820px] px-5 sm:px-8 py-14 md:py-20">
          <Reveal>
            <div className="label mb-4">TSM Nexus &middot; Application received</div>
            <h1 className="font-display font-semibold text-[2.1rem] sm:text-5xl leading-[1.02] text-ink">
              Application received.
            </h1>
          </Reveal>
          <Rule className="my-8" />
          <div className="application-card evidence-frame rounded-[14px] overflow-hidden" data-testid="application-success">
            <div className="perf-top" aria-hidden="true" />
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="max-w-[60ch] text-[16px] sm:text-lg leading-relaxed text-ink/75">
                We review applications within one business day. If there is a fit, we will share
                the next step for a Fit Call.
              </p>
              {done.reference && (
                <div className="mt-6">
                  <div className="label">Reference</div>
                  <div
                    data-testid="application-reference"
                    className="font-mono text-lg text-nexus mt-1.5"
                  >
                    {done.reference}
                  </div>
                </div>
              )}
              <div className="mt-7">
                <Link
                  to="/guide"
                  data-testid="success-back-link"
                  className="apply-primary-button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[9px] bg-ink px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-paper transition-colors hover:bg-nexus hover:text-white sm:w-auto"
                >
                  Explore the Field Guide
                  <span aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------- form */
  return (
    <main className="apply-page min-h-screen">
      <NavBar />
      <div className="h-[calc(var(--nav-h)+20px)]" />
      <TopBar />
      <div ref={topRef} className="apply-content mx-auto max-w-[980px] px-5 sm:px-8 py-10 md:py-14 lg:py-16">
        <div className="apply-heading flex items-start justify-between gap-6">
          <div>
            <div className="label mb-3">Page 18 &middot; The Application</div>
            <h1 className="font-display font-semibold text-[1.9rem] sm:text-4xl lg:text-[2.9rem] leading-[1.06] text-ink">
              Tell us about your business.
            </h1>
          </div>
          <div aria-hidden="true" className="apply-folio font-mono text-2xl sm:text-4xl tracking-[0.1em] text-ink/25 pt-1">
            18
          </div>
        </div>

        {/* progress */}
        <div className="apply-progress mt-8 sm:mt-10">
          <div className="mb-2 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
            <span data-testid="application-step-label" aria-live="polite">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div
            className="h-1.5 rounded-full bg-ink/[0.09]"
            role="progressbar"
            aria-label="Application progress"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
            aria-valuetext={`Step ${step + 1} of ${STEPS.length}`}
          >
            <div
              data-testid="application-progress"
              className="h-full rounded-full bg-nexus transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* sheet */}
        <div className="application-card mt-8 evidence-frame rounded-[14px] overflow-hidden" data-testid="application-form">
          <div className="perf-top" aria-hidden="true" />
          <div className="p-5 sm:p-8 lg:p-10">
            {/* honeypot */}
            <input
              type="text"
              name="company_fax"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={data.company_fax}
              onChange={(e) => setField("company_fax", e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="space-y-10">
              {STEPS[step].sections.map((section) => (
                <section className="apply-section" key={section.letter} aria-labelledby={`section-${section.letter}`}>
                  <div className="apply-section-heading flex items-start gap-3 pb-4 border-b border-ink/20">
                    <span className="apply-section-number" aria-hidden="true">{section.letter}</span>
                    <div>
                    <h2
                      id={`section-${section.letter}`}
                      className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-nexus"
                    >
                      {section.title}
                    </h2>
                    <p className="mt-2 text-[15px] text-ink/60 leading-relaxed">
                      {section.note}
                    </p>
                    </div>
                  </div>
                  <div className="apply-field-grid grid sm:grid-cols-2 gap-x-6">
                    {section.fields.map((f) => (
                      <Field
                        key={f.name}
                        f={f}
                        value={data[f.name] || ""}
                        error={errors[f.name]}
                        onChange={setField}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {step === STEPS.length - 1 && (
              <section className="mt-8" aria-labelledby="application-agreements">
                <div className="apply-section-heading pb-4 border-b border-ink/20">
                  <h2
                    id="application-agreements"
                    className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-nexus"
                  >
                    Before you submit
                  </h2>
                  <p className="mt-2 text-[15px] text-ink/60 leading-relaxed">
                    Three things we ask from you.
                  </p>
                </div>
                <div className="py-2">
                  {AGREEMENTS.map((a) => (
                    <label
                      key={a.name}
                      htmlFor={a.name}
                      className="apply-agreement flex min-h-12 items-start gap-3 py-3.5 border-b border-ink/[0.09] cursor-pointer group"
                    >
                      <input
                        id={a.name}
                        data-testid={`agree-${a.name}`}
                        type="checkbox"
                        checked={!!data[a.name]}
                        onChange={(e) => setField(a.name, e.target.checked)}
                        className="mt-1 h-5 w-5 accent-[rgb(var(--nexus))] shrink-0"
                      />
                      <span className="text-[15px] leading-relaxed text-ink/80 group-hover:text-ink transition-colors">
                        {a.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {/* actions */}
            <div className="apply-actions mt-7 border-t border-ink/20 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span
                  data-testid="application-autosave-status"
                  className={cn(
                    "font-mono text-[10px] tracking-[0.16em] uppercase transition-opacity duration-300",
                    saved ? "text-growth opacity-100" : "text-ink/30 opacity-70"
                  )}
                  aria-live="polite"
                >
                  {saved ? "Draft saved" : "Autosaves as you type"}
                </span>
                <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center">
                  {step > 0 && (
                    <button
                      type="button"
                      data-testid="application-back-button"
                      onClick={back}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ink/25 px-4 py-3 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase text-ink/70 hover:border-nexus hover:text-nexus transition-colors sm:w-auto"
                    >
                      &#8592; Back
                    </button>
                  )}
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      data-testid="application-next-button"
                      onClick={next}
                      className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ink text-paper px-6 py-3 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase hover:bg-nexus hover:text-white transition-colors sm:w-auto"
                    >
                      Continue
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        &#8594;
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-testid="application-submit-button"
                      onClick={submit}
                      disabled={submitting}
                      className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ink text-paper px-6 py-3 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase hover:bg-nexus hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                    >
                      {submitting ? "Submitting…" : "Submit application"}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        &#8594;
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="apply-footnote mt-6 font-mono text-[10px] tracking-[0.14em] uppercase text-ink/40 leading-relaxed">
          Applications are reviewed individually. Five businesses will be selected for the
          founding cohort. A 50% deposit reserves your slot.
        </p>
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <div className="sticky top-[calc(var(--nav-h)+20px)] z-40 border-b border-ink/[0.14] bg-paper/92 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          data-testid="apply-home-link"
          className="font-mono text-[9.5px] font-semibold tracking-[0.26em] uppercase text-ink/75 hover:text-nexus transition-colors"
        >
          &#8592; TSM NEXUS
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-[9.5px] tracking-[0.18em] uppercase text-ink/45">
            5 founding cohort slots-LEFT
          </span>
        </div>
      </div>
    </div>
  );
}
