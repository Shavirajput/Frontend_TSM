import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import { LogoLockup } from "./NavBar";
import { CONTACT_EMAIL, NAV, SOCIALS } from "@/data/brand";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-paper-sheet"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr,1fr]">
          <div>
            <LogoLockup size={40} />
            <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-white/55">
              Innovate. Optimize. Scale. We diagnose where websites lose attention,
              trust, leads and revenue &mdash; across 13 layers and 144 parameters.
            </p>
            <div className="brand-rule mt-6 w-32" />
            <div className="mt-6 flex items-center gap-3" data-testid="footer-socials">
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-white/10 text-white/55 transition-colors hover:border-[rgb(var(--brand-sky))] hover:text-white"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold tracking-[0.24em] uppercase text-white/40">
              Navigate
            </div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  data-testid="footer-admin-link"
                  className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/30 hover:text-white transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold tracking-[0.24em] uppercase text-white/40">
              Get in touch
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-testid="footer-email"
              className="mt-4 block font-mono text-[12px] tracking-[0.06em] text-[rgb(var(--brand-sky))] hover:underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase leading-relaxed text-white/35">
              Every application is routed here
            </p>
            <Link
              to="/apply"
              className="brand-btn mt-6 inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
            >
              Apply for the audit &#8594;
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/30">
            &copy; {new Date().getFullYear()} TSM Nexus &middot; Innovate. Optimize. Scale.
          </div>
          <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/30">
            13 Layers &middot; 144 Parameters &middot; 1 Business Objective
          </div>
        </div>
      </div>
    </footer>
  );
}
