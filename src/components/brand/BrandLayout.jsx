import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

/** Brand-black marketing shell with fixed nav + footer. */
export default function BrandLayout({ children, footer = true }) {
  return (
    <div className="brand-dark min-h-screen">
      <NavBar />
      <main className="pt-[var(--nav-h)]">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
