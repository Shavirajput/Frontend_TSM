import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata } from "@/lib/seo";

function updateMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;

    updateMeta("name", "description", metadata.description);
    updateMeta("name", "robots", metadata.robots);
    updateMeta("property", "og:title", metadata.title);
    updateMeta("property", "og:description", metadata.description);
    updateMeta("property", "og:url", metadata.url);
    updateMeta("property", "og:image", metadata.image);
    updateMeta("property", "og:type", metadata.type);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (metadata.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = metadata.canonical;
    } else {
      canonical?.remove();
    }
  }, [pathname]);

  return null;
}
