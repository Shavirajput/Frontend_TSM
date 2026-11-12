/* Calendly popup helper — loads the widget once, falls back to a new tab. */

const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";
const JS_SRC = "https://assets.calendly.com/assets/external/widget.js";

let loadPromise = null;

export function loadCalendly() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = JS_SRC;
    script.async = true;
    script.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error("Calendly missing")));
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });
  return loadPromise;
}

/**
 * Open the Calendly scheduler as a popup overlay. If the widget cannot load
 * (ad blocker / offline), open the booking page in a new tab instead.
 */
export async function openCalendly(url) {
  const withTheme =
    url +
    (url.includes("?") ? "&" : "?") +
    "hide_gdpr_banner=1&background_color=06070b&text_color=f2f4f8&primary_color=38bdf8";
  try {
    const Calendly = await loadCalendly();
    Calendly.initPopupWidget({ url: withTheme });
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
