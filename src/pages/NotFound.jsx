import React from "react";
import { Link } from "react-router-dom";
import BrandLayout from "@/components/brand/BrandLayout";

export default function NotFound() {
  return (
    <BrandLayout><div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md">
        <div className="label mb-4">TSM Nexus &middot; Page not found</div>
        <h1 className="font-display font-semibold text-4xl leading-tight text-ink">
          This page isn&rsquo;t in the guide.
        </h1>
        <p className="mt-4 text-ink/70 leading-relaxed">
          A dead end is a small revenue leak of its own. Let&rsquo;s get you back to
          something useful.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/"
            data-testid="notfound-home-link"
            className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase hover:bg-nexus hover:text-white transition-colors"
          >
            Back home
          </Link>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase hover:border-nexus hover:text-nexus transition-colors"
          >
            Apply
          </Link>
        </div>
      </div>
    </div></BrandLayout>
  );
}
