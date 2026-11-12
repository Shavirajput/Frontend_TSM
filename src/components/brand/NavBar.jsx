import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LOGO_MARK, NAV } from "@/data/brand";
import { cn } from "@/lib/utils";

export function LogoLockup({ size = 34, showWord = true, className }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative inline-block shrink-0"
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src={LOGO_MARK}
          alt="TSM Nexus"
          width={size}
          height={size}
          className="h-full w-full object-contain"
        />
      </span>
      {showWord && (
        <span className="leading-none">
          <span className="block font-mono text-[10px] font-semibold tracking-[0.3em] text-white/90">
            TSM
          </span>
          <span className="block font-mono text-[13px] font-semibold tracking-[0.22em] brand-text">
            NEXUS
          </span>
        </span>
      )}
    </span>
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      data-scrolled={scrolled}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300",
        scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-3 pt-2 sm:px-4 sm:pt-3"
      )}
    >
      <div
        className={cn(
          "mx-auto transition-[max-width] duration-300",
          scrolled ? "max-w-[1120px]" : "max-w-[1280px]"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl backdrop-blur-2xl backdrop-saturate-200 transition-[background-color,border-color,box-shadow,padding] duration-300",
            scrolled
              ? "border border-white/10 bg-[rgb(10_14_24_/_0.6)] shadow-[0_12px_36px_-16px_rgba(0,0,0,0.48)] px-5 sm:px-6"
              : "border border-white/10 bg-white/[0.08] shadow-[0_10px_30px_-16px_rgba(0,0,0,0.38)] px-5 sm:px-6"
          )}
        >
          {/* liquid-glass sheen */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent"
          />

          <div className="relative flex h-[var(--nav-h)] items-center justify-between gap-6">
            <Link to="/" data-testid="nav-logo" aria-label="TSM Nexus home">
              <LogoLockup />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3.5 py-2 rounded-[6px] font-mono text-[10.5px] font-medium tracking-[0.16em] uppercase transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white hover:bg-white/[0.06]"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="brand-rule absolute left-3 right-3 -bottom-[1px]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                to="/apply"
                data-testid="nav-apply-cta"
                className="brand-btn hidden sm:inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
              >
                Apply for audit
                <span aria-hidden="true">&#8594;</span>
              </Link>
              <button
                type="button"
                data-testid="nav-mobile-toggle"
                aria-label="Toggle navigation"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/15 text-white/80 hover:border-white/40 transition-colors"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {open && (
            <div
              data-testid="nav-mobile-menu"
              className="lg:hidden relative border-t border-white/10"
            >
              <nav className="py-3" aria-label="Mobile">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 border-b border-white/[0.07] font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
                        isActive ? "text-white" : "text-white/55"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/apply"
                  className="brand-btn mt-4 flex items-center justify-center gap-2 rounded-[6px] px-4 py-3 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase"
                >
                  Apply for audit &#8594;
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
