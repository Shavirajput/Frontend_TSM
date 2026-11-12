import React, { useState } from "react";
import { toast } from "sonner";
import { requestGuidePdf, GUIDE_PDF_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Email-gated download card for the PDF edition of the Field Guide.
 * Uses the editorial token system and adapts to InkPanel contexts.
 */
export function GuidePdfCard({ className, compact = false, idSuffix = "main" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = GUIDE_PDF_URL;
    a.download = "TSM-Nexus-Website-Revenue-Leak-Field-Guide.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid work email");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await requestGuidePdf({ name, email, company_fax: hp });
      setDone(true);
      triggerDownload();
      toast.success("Your PDF is downloading.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not start the download. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      data-testid={`guide-pdf-card-${idSuffix}`}
      className={cn("sheet rounded-[6px] p-5 sm:p-6", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="label">PDF edition &middot; Free download</div>
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink/35">
          11 pages &middot; A4
        </div>
      </div>
      <h3
        className={cn(
          "mt-3 font-display font-semibold text-ink leading-snug",
          compact ? "text-[1.2rem]" : "text-[1.45rem] sm:text-[1.7rem]"
        )}
      >
        Take the Field Guide with you.
      </h3>
      {!compact && (
        <p className="mt-2 text-[15px] leading-relaxed text-ink/65 max-w-[52ch]">
          The complete 13-layer / 144-parameter framework as a branded PDF &mdash; ready for your
          leadership team, your next board deck, or the flight home.
        </p>
      )}

      {done ? (
        <div className="mt-5" data-testid={`guide-pdf-success-${idSuffix}`}>
          <div className="flex items-center gap-2.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase text-growth">
            <span aria-hidden="true">&#10003;</span> Download started
          </div>
          <p className="mt-2 text-[14px] text-ink/60">
            Didn&rsquo;t start?{" "}
            <button
              type="button"
              data-testid={`guide-pdf-retry-${idSuffix}`}
              onClick={triggerDownload}
              className="underline text-nexus hover:opacity-80"
            >
              Download again
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5" data-testid={`guide-pdf-form-${idSuffix}`}>
          <div className={cn("grid gap-2.5", compact ? "sm:grid-cols-[1fr,auto]" : "sm:grid-cols-[1fr,1.2fr,auto]")}>
            {!compact && (
              <input
                type="text"
                value={name}
                data-testid={`guide-pdf-name-${idSuffix}`}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 text-[14.5px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-nexus"
                style={{ borderColor: "rgb(var(--rule) / 0.3)" }}
              />
            )}
            <input
              type="email"
              required
              value={email}
              data-testid={`guide-pdf-email-${idSuffix}`}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@company.com"
              aria-invalid={!!error}
              className={cn(
                "w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 text-[14.5px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-nexus",
                error && "!border-leak"
              )}
              style={{ borderColor: "rgb(var(--rule) / 0.3)" }}
            />
            <button
              type="submit"
              disabled={busy}
              data-testid={`guide-pdf-submit-${idSuffix}`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-[4px] bg-ink px-5 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-paper transition-colors hover:bg-nexus hover:text-white disabled:opacity-50"
            >
              {busy ? "Preparing…" : "Get the PDF"}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-[2px]">
                &#8595;
              </span>
            </button>
          </div>
          {error && (
            <div
              data-testid={`guide-pdf-error-${idSuffix}`}
              className="mt-2 font-mono text-[9.5px] tracking-[0.12em] uppercase text-leak"
            >
              {error}
            </div>
          )}
          <input
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <p className="mt-3 font-mono text-[8.5px] tracking-[0.14em] uppercase text-ink/40">
            No spam. One email confirms your copy &mdash; that&rsquo;s it.
          </p>
        </form>
      )}
    </div>
  );
}
