const SITE_URL = "https://tsmnexus.in";
const SOCIAL_IMAGE = `${SITE_URL}/images/hero-nexus.png`;

export const PUBLIC_ROUTES = [
  "/",
  "/method",
  "/cohort",
  "/contact",
  "/guide",
  "/apply",
];

const pageMetadata = {
  "/": {
    title: "TSM Nexus — The Website Revenue Leak Field Guide",
    description:
      "The Website Revenue Leak Field Guide — a TSM Nexus diagnostic for founders. 13 Layers. 144 Parameters. 1 Business Objective.",
  },
  "/method": {
    title: "The Method | TSM Nexus",
    description:
      "A practical website revenue diagnostic built around 13 layers, 144 parameters and one business objective.",
  },
  "/cohort": {
    title: "Founding Cohort | TSM Nexus",
    description:
      "Five businesses. One full cycle. A documented, end-to-end TSM Nexus website revenue leak diagnostic.",
  },
  "/contact": {
    title: "Contact TSM Nexus",
    description:
      "Questions about the methodology, the founding cohort, or whether your business is a fit? Talk to TSM Nexus.",
  },
  "/guide": {
    title: "The Website Revenue Leak Field Guide | TSM Nexus",
    description:
      "The Website Revenue Leak Field Guide — a TSM Nexus diagnostic for founders. 13 Layers. 144 Parameters. 1 Business Objective.",
  },
  "/apply": {
    title: "Apply for a Website Audit | TSM Nexus",
    description:
      "Apply for a TSM Nexus website audit. Tell us about your business, website and objectives.",
  },
};

const adminMetadata = {
  title: "Admin login | TSM Nexus",
  description: "TSM Nexus back-office login.",
  robots: "noindex, nofollow",
};

const notFoundMetadata = {
  title: "Page not found | TSM Nexus",
  description: "This page isn't in the TSM Nexus field guide.",
  robots: "noindex, nofollow",
};

export function getPageMetadata(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/admin") {
    return { ...adminMetadata, canonical: null, image: null, url: null };
  }

  const page = pageMetadata[normalizedPath];
  if (!page) {
    return { ...notFoundMetadata, canonical: null, image: null, url: null };
  }

  const canonical = normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
  return {
    ...page,
    canonical,
    image: SOCIAL_IMAGE,
    url: canonical,
    type: "website",
  };
}
