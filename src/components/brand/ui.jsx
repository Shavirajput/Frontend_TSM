import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LOGO_MARK, CALENDLY_URL } from "@/data/brand";
import { openCalendly } from "@/lib/calendly";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- reveal */
export function Rise({ children, className, delay = 0, as: As = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.seen = "true";
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <As
      ref={ref}
      data-seen="false"
      className={cn(
        "opacity-0 translate-y-5 transition-[opacity,transform] duration-[700ms] ease-out data-[seen=true]:opacity-100 data-[seen=true]:translate-y-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

/* ---------------------------------------------------------------- eyebrow */
export function Eyebrow({ children, className, signal = false }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5",
        className
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: signal ? "rgb(248 113 113)" : "rgb(var(--brand-cyan))" }}
        aria-hidden="true"
      />
      <span className="font-mono text-[9.5px] font-semibold tracking-[0.24em] uppercase text-white/70">
        {children}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- headings */
export function SectionHead({ eyebrow, title, sub, center = false, className }) {
  return (
    <div className={cn(center && "text-center mx-auto", "max-w-[46rem]", className)}>
      {eyebrow && (
        <Rise>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Rise>
      )}
      <Rise delay={80}>
        <h2 className="mt-5 font-display font-semibold text-[1.9rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.06] text-white">
          {title}
        </h2>
      </Rise>
      {sub && (
        <Rise delay={150}>
          <p className="mt-4 text-[1.0625rem] md:text-lg leading-relaxed text-white/55">
            {sub}
          </p>
        </Rise>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- buttons */
export function CTA({ to, href, calendly, children, testid, variant = "primary", className }) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-[7px] px-6 py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer";
  const classes = cn(
    base,
    variant === "primary" && "brand-btn",
    variant === "ghost" &&
      "border border-white/18 text-white/80 hover:border-[rgb(var(--brand-sky))] hover:text-white",
    className
  );
  const inner = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &#8594;
      </span>
    </>
  );

  /* Calendly booking — popup scheduler, falls back to a new tab */
  if (calendly) {
    const url = typeof calendly === "string" ? calendly : CALENDLY_URL;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testid}
        data-calendly="true"
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          openCalendly(url);
        }}
      >
        {inner}
      </a>
    );
  }

  /* plain external link */
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testid} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} data-testid={testid} className={classes}>
      {inner}
    </Link>
  );
}

/* ---------------------------------------------------------------- 3D logo */
export function Logo3D({ size = 260, className }) {
  return (
    <div className={cn("scene-3d relative", className)} style={{ width: size, height: size }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--brand-indigo) / 0.5), rgb(var(--brand-magenta) / 0.18) 55%, transparent 72%)",
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="ring-orbit absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="tsmRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(34 211 238)" />
            <stop offset="55%" stopColor="rgb(79 70 229)" />
            <stop offset="100%" stopColor="rgb(217 70 239)" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="93"
          fill="none"
          stroke="url(#tsmRing)"
          strokeWidth="0.9"
          strokeDasharray="3 9"
          opacity="0.75"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="url(#tsmRing)"
          strokeWidth="0.6"
          strokeDasharray="1 14"
          opacity="0.5"
        />
      </svg>
      <div
        className="spin-3d float-3d absolute inset-[13%] flex items-center justify-center"
        style={{
          mixBlendMode: "screen",
          maskImage: "radial-gradient(circle at 50% 50%, #000 52%, rgba(0,0,0,0) 76%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 52%, rgba(0,0,0,0) 76%)",
        }}
      >
        <img
          src={LOGO_MARK}
          alt="TSM Nexus"
          className="h-full w-full object-contain"
          style={{ transform: "scale(1.42)" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ glow frame */
export function GlowFrame({ src, alt, caption, testid, className, imgClassName }) {
  return (
    <figure
      data-testid={testid}
      className={cn(
        "glass tilt-card relative overflow-hidden rounded-[14px] p-2",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[10px]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("block h-auto w-full object-cover", imgClassName)}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px]"
          style={{
            boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)",
            background:
              "linear-gradient(180deg, rgb(255 255 255 / 0.05), transparent 22%)",
          }}
        />
      </div>
      {caption && (
        <figcaption className="flex items-center gap-2.5 px-3 py-2.5">
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full"
            style={{ background: "rgb(var(--brand-cyan))" }}
          />
          <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/45">
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------- stat */
export function Stat({ value, label, delay = 0 }) {
  return (
    <Rise delay={delay}>
      <div className="glass tilt-card rounded-[10px] p-5">
        <div className="font-display font-semibold text-[2.4rem] leading-none brand-text">
          {value}
        </div>
        <div className="mt-3 font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-white/55">
          {label}
        </div>
      </div>
    </Rise>
  );
}

/* ---------------------------------------------------------------- card */
export function FeatureCard({ n, title, body, delay = 0, tone = "cyan", className }) {
  const bar =
    tone === "magenta"
      ? "rgb(var(--brand-magenta))"
      : tone === "violet"
        ? "rgb(var(--brand-violet))"
        : "rgb(var(--brand-cyan))";
  return (
    <Rise delay={delay} className="h-full">
      <div className={cn("glass tilt-card relative h-full overflow-hidden rounded-[10px] p-6", className)}>
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[2px]"
          style={{ background: bar }}
        />
        {n && (
          <div className="font-mono text-[10px] font-semibold tracking-[0.22em] text-white/40">
            {n}
          </div>
        )}
        <h3 className="mt-3 font-display font-semibold text-[1.2rem] leading-snug text-white">
          {title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-white/55">{body}</p>
      </div>
    </Rise>
  );
}
