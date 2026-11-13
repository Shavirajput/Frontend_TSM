import { LOGO_MARK, SOCIALS } from "../data/brand";

const SITE_URL = "https://tsmnexus.in";
const SOCIAL_IMAGE = `${SITE_URL}/images/hero-nexus.png`;
const SITE_NAME = "TSM Nexus";

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
    title: "Website Revenue Leak Diagnostic for Founders | TSM Nexus",
    description:
      "A forensic website revenue diagnostic for founders and CEOs. TSM Nexus evaluates 13 commercial layers and 144 parameters to identify the five fixes that matter most.",
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
      "Read the TSM Nexus Website Revenue Leak Field Guide: a practical framework for diagnosing 13 commercial layers and prioritizing website revenue improvements.",
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
    robots: "index, follow",
    canonical,
    image: SOCIAL_IMAGE,
    imageAlt: "TSM Nexus website revenue leak diagnostic",
    url: canonical,
    type: "website",
    siteName: SITE_NAME,
    twitterCard: "summary_large_image",
  };
}

export function getStructuredData(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const metadata = getPageMetadata(normalizedPath);

  if (!metadata.canonical) {
    return null;
  }

  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const pageId = `${metadata.canonical}#webpage`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${LOGO_MARK}`,
      },
      sameAs: SOCIALS.map(({ href }) => href),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": organizationId },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      inLanguage: "en",
    },
  ];

  if (normalizedPath === "/guide") {
    graph.push({
      "@type": "Article",
      "@id": `${metadata.canonical}#article`,
      headline: "The Website Revenue Leak Field Guide",
      description: metadata.description,
      image: `${SITE_URL}/images/guide-cover.png`,
      mainEntityOfPage: { "@id": pageId },
      publisher: { "@id": organizationId },
      inLanguage: "en",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
