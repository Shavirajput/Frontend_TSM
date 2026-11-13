import React, { useState } from "react";
import { toast } from "sonner";
import { sendContact } from "@/lib/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  website: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const FIELDS = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "website", label: "Website", type: "text", autoComplete: "url" },
  { name: "preferredDate", label: "Preferred date", type: "date" },
  { name: "preferredTime", label: "Preferred time (local)", type: "time" },
];

const INPUT =
  "mt-2 w-full rounded-[6px] border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/25 transition-colors focus:outline-none focus:border-[rgb(var(--brand-sky))] focus:ring-2 focus:ring-[rgb(var(--brand-sky)_/_0.25)]";

const getLocalDate = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

export default function FitCallDialog({ trigger }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const today = getLocalDate();

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setForm(EMPTY_FORM);
      setErrors({});
      setReference("");
      setSubmitted(false);
    }
  };

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (form.message.trim().length < 5) {
      nextErrors.message = "Please add a little more detail";
    }
    if (form.preferredDate && form.preferredDate < today) {
      nextErrors.preferredDate = "Choose today or a future date";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true);
    try {
      const { preferredDate, preferredTime, ...contactFields } = form;
      const message = [
        form.message.trim(),
        preferredDate && `Preferred date: ${preferredDate}`,
        preferredTime && `Preferred time (local): ${preferredTime}`,
      ]
        .filter(Boolean)
        .join("\n\n");
      const response = await sendContact({
        ...contactFields,
        message,
        subject: "Fit call request",
        company_fax: "",
      });
      setReference(response?.reference || "");
      setSubmitted(true);
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[620px] overflow-y-auto border-white/10 bg-[#080b12] p-6 text-white shadow-2xl sm:rounded-[12px] sm:p-8">
        <DialogTitle className="font-display text-[1.7rem] font-semibold text-white sm:text-[2rem]">
          {submitted ? "Fit call request received." : "Book a Fit Call"}
        </DialogTitle>
        <DialogDescription className="max-w-[54ch] text-[15px] leading-relaxed text-white/60">
          {submitted
            ? "Thanks for getting in touch. We’ll contact you to confirm availability and arrange a time."
            : "Tell us about your business and optionally suggest a date and time. We’ll follow up to confirm availability."}
        </DialogDescription>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-2 rounded-[8px] border border-white/10 bg-white/[0.04] p-4"
          >
            {reference && (
              <>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
                  Reference
                </p>
                <p className="mt-1.5 font-mono text-[15px] text-[rgb(var(--brand-sky))]">
                  {reference}
                </p>
              </>
            )}
            <DialogClose asChild>
              <button
                type="button"
                className="brand-btn mt-5 inline-flex min-h-11 items-center justify-center rounded-[6px] px-5 py-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
              >
                Done
              </button>
            </DialogClose>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((field) => {
                const id = `fit-call-${field.name}`;
                const errorId = `${id}-error`;
                return (
                  <div key={field.name}>
                    <label
                      htmlFor={id}
                      className="block font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white/60"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-1.5 text-leak" aria-hidden="true">
                          *
                        </span>
                      )}
                    </label>
                    <input
                      id={id}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      min={field.name === "preferredDate" ? today : undefined}
                      required={field.required}
                      value={form[field.name]}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      className={cn(INPUT, errors[field.name] && "border-leak")}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={errors[field.name] ? errorId : undefined}
                    />
                    {errors[field.name] && (
                      <p
                        id={errorId}
                        role="alert"
                        className="mt-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-leak"
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <label
                htmlFor="fit-call-message"
                className="block font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white/60"
              >
                What would you like to discuss?
                <span className="ml-1.5 text-leak" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="fit-call-message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Tell us about the main question or bottleneck on your mind."
                className={cn(INPUT, "resize-y", errors.message && "border-leak")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "fit-call-message-error" : undefined}
              />
              {errors.message && (
                <p
                  id="fit-call-message-error"
                  role="alert"
                  className="mt-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-leak"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/35">
                Fields marked * are required.
              </p>
              <button
                type="submit"
                disabled={busy}
                className="brand-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] px-5 py-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? "Sending request…" : "Request a fit call"}
                <span aria-hidden="true">&#8594;</span>
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
