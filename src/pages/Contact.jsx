import React, { useState } from "react";
import { toast } from "sonner";
import BrandLayout from "@/components/brand/BrandLayout";
import { Rise, Eyebrow, CTA } from "@/components/brand/ui";
import { CONTACT_EMAIL } from "@/data/brand";
import { sendContact } from "@/lib/api";
import { cn } from "@/lib/utils";
import "./Contact.css";

const FIELDS = [
  { name: "name", label: "Your name", req: true, ph: "Aarav Mehta" },
  { name: "email", label: "Work email", req: true, type: "email", ph: "you@company.com" },
  { name: "company", label: "Company", req: false, ph: "Northwind" },
  { name: "website", label: "Website", req: false, ph: "yourcompany.com" },
  { name: "subject", label: "Subject", req: true, ph: "Question about the audit", full: true },
];

const EMPTY = {
  name: "",
  email: "",
  company: "",
  website: "",
  subject: "",
  message: "",
  company_fax: "",
};

const INPUT =
  "w-full rounded-[6px] border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/25 transition-colors focus:outline-none focus:border-[rgb(var(--brand-sky))] focus:ring-2 focus:ring-[rgb(var(--brand-sky)_/_0.25)]";

export default function Contact() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k, v) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    FIELDS.filter((f) => f.req).forEach((f) => {
      if (!data[f.name].trim()) errs[f.name] = "Required";
    });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))
      errs.email = "Enter a valid email address";
    if (data.message.trim().length < 5) errs.message = "Please add a little more detail";
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Some fields need attention.");
      return;
    }
    setBusy(true);
    try {
      const res = await sendContact(data);
      setDone(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="contact-page">
      <BrandLayout>
      <section className="contact-hero relative -mt-[var(--nav-h)] overflow-hidden pt-[var(--nav-h)]">
        <div className="aurora" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr]">
            {/* ------------------------------------------------ left */}
            <div>
              <Rise>
                <Eyebrow>Contact</Eyebrow>
              </Rise>
              <Rise delay={90}>
                <h1 className="mt-6 font-display font-semibold text-[2.3rem] leading-[1.04] sm:text-[3.1rem] text-white">
                  Talk to us before <span className="brand-text">you apply.</span>
                </h1>
              </Rise>
              <Rise delay={160}>
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/60">
                  Questions about the methodology, the cohort, or whether your business is a fit?
                  Send a note. Everything submitted here is routed straight to our inbox.
                </p>
              </Rise>
              <Rise delay={360}>
                <div className="mt-8">
                  <CTA to="/apply" testid="contact-apply-cta" variant="ghost">
                    Skip ahead and apply
                  </CTA>
                </div>
              </Rise>
            </div>

            {/* ------------------------------------------------ right */}
            <Rise delay={140}>
              {done ? (
                <div
                  data-testid="contact-success"
                  className="contact-form contact-success glass rounded-[12px] p-7 sm:p-9"
                >
                  <Eyebrow>Message received</Eyebrow>
                  <h2 className="mt-5 font-display font-semibold text-[1.8rem] leading-snug text-white">
                    Thank you &mdash; it&rsquo;s on its way.
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/40">
                        Reference
                      </div>
                      <div
                        data-testid="contact-reference"
                        className="mt-1.5 font-mono text-[15px] text-[rgb(var(--brand-sky))]"
                      >
                        {done.reference}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/40">
                        Routed to
                      </div>
                      <div className="mt-1.5 font-mono text-[13px] text-white/70 break-all">
                        {done.routed_to}
                      </div>
                    </div>
                  </div>
                  <p className="mt-7 text-[15px] leading-relaxed text-white/55">
                    We read every message individually. If you&rsquo;d like to move faster, submit a
                    full application and we&rsquo;ll review it against the founding cohort.
                  </p>
                  <div className="mt-8">
                    <CTA to="/apply" testid="contact-success-apply-cta">
                      Apply for the audit
                    </CTA>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  data-testid="contact-form"
                  className="contact-form glass rounded-[12px] p-6 sm:p-8"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.name} className={cn(f.full && "sm:col-span-2")}>
                        <label
                          htmlFor={`contact-${f.name}`}
                          className="block font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white/55"
                        >
                          {f.label}
                          {f.req && (
                            <span className="ml-1.5" style={{ color: "rgb(var(--brand-magenta))" }}>
                              *
                            </span>
                          )}
                        </label>
                        <input
                          id={`contact-${f.name}`}
                          data-testid={`contact-field-${f.name}`}
                          type={f.type || "text"}
                          value={data[f.name]}
                          placeholder={f.ph}
                          onChange={(e) => set(f.name, e.target.value)}
                          className={cn(INPUT, "mt-2", errors[f.name] && "border-leak")}
                          aria-invalid={!!errors[f.name]}
                        />
                        {errors[f.name] && (
                          <div
                            data-testid={`contact-field-${f.name}-error`}
                            className="mt-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-leak"
                          >
                            {errors[f.name]}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white/55"
                      >
                        Message
                        <span className="ml-1.5" style={{ color: "rgb(var(--brand-magenta))" }}>
                          *
                        </span>
                      </label>
                      <textarea
                        id="contact-message"
                        data-testid="contact-field-message"
                        rows={5}
                        value={data.message}
                        placeholder="What would you like us to look at, and why now?"
                        onChange={(e) => set("message", e.target.value)}
                        className={cn(INPUT, "mt-2 resize-y", errors.message && "border-leak")}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <div
                          data-testid="contact-field-message-error"
                          className="mt-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-leak"
                        >
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="company_fax"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    value={data.company_fax}
                    onChange={(e) => set("company_fax", e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/35">
                      Delivered to {CONTACT_EMAIL}
                    </p>
                    <button
                      type="submit"
                      data-testid="contact-submit"
                      disabled={busy}
                      className="brand-btn inline-flex items-center gap-2.5 rounded-[7px] px-6 py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase disabled:opacity-50"
                    >
                      {busy ? "Sending…" : "Send message"}
                      <span aria-hidden="true">&#8594;</span>
                    </button>
                  </div>
                </form>
              )}
            </Rise>
          </div>
        </div>
      </section>
      </BrandLayout>
    </div>
  );
}
