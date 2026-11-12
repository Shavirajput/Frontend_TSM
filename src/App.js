import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import RouteMetadata from "@/components/RouteMetadata";
import Home from "@/pages/Home";
import Method from "@/pages/Method";
import Cohort from "@/pages/Cohort";
import Contact from "@/pages/Contact";
import FieldGuide from "@/pages/FieldGuide";
import Apply from "@/pages/Apply";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 240);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      data-testid="back-to-top"
      className={`back-to-top-button fixed bottom-6 right-6 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-xl p-0 shadow-xl transition-[opacity,transform] duration-200 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
      onClick={scrollToTop}
      disabled={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

export function AppRoutes() {
  return (
    <>
      <RouteMetadata />
      <ScrollToTop />
      <div className="paper-grain" aria-hidden="true" />
      <div className="guide-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/method" element={<Method />} />
          <Route path="/cohort" element={<Cohort />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guide" element={<FieldGuide />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BackToTop />
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
