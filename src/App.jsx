import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Ambient } from "./components/Ambient";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About, Certifications, Contact, Experience, LabStack, Projects, Skills } from "./components/Sections";
import { navItems } from "./data/portfolio";
import { useActiveSection } from "./hooks/useActiveSection";
import { useCursorGlow } from "./hooks/useCursorGlow";
import { useScrollProgress } from "./hooks/useScrollProgress";

export default function App() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);
  useCursorGlow();

  useEffect(() => {
    const done = window.setTimeout(() => document.body.classList.add("app-ready"), 220);
    return () => {
      window.clearTimeout(done);
      document.body.classList.remove("app-ready");
    };
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  const copyText = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard.");
      } catch {
        showToast("Could not copy — select the text manually.");
      }
    },
    [showToast],
  );

  return (
    <>
      <Ambient />
      <a
        className="focus:ring-primary absolute left-4 top-4 z-[300] -translate-y-[200%] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow focus:translate-y-0 focus:outline-none focus:ring-2 dark:border-white/15 dark:bg-slate-900 dark:text-white"
        href="#main"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[80] h-[3px] bg-transparent" aria-hidden="true">
        <div className="scrollProgress__bar h-full" style={{ width: `${progress}%` }} />
      </div>
      <div id="a11yLive" className="sr-only" aria-live="polite" aria-atomic="true">
        {toast}
      </div>
      <div id="appToast" className={`app-toast ${toast ? "app-toast--visible" : ""}`} role="status" aria-live="polite" aria-atomic="true">
        {toast}
      </div>

      <div id="app-root">
        <Header activeId={activeId} />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <LabStack />
          <Experience />
          <Projects />
          <Certifications />
          <Contact onCopy={copyText} />
        </main>
        <Footer />
      </div>
    </>
  );
}
