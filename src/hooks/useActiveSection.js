import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    let raf = null;
    const pick = () => {
      raf = null;
      const vh = window.innerHeight || 1;
      const bandTop = vh * 0.35;
      const bandBottom = vh * 0.45;
      const bandMid = vh * 0.4;

      let best = null;
      let bestScore = -Infinity;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const overlapTop = Math.max(rect.top, bandTop);
        const overlapBottom = Math.min(rect.bottom, bandBottom);
        const bandOverlap = Math.max(0, overlapBottom - overlapTop);
        const inViewport = rect.bottom > 0 && rect.top < vh;
        const center = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(center - bandMid);
        const score = bandOverlap > 0 ? bandOverlap * 1000 - dist : inViewport ? vh - dist : -Infinity;

        if (score > bestScore) {
          best = section;
          bestScore = score;
        }
      }

      if (best?.id) setActiveId(best.id);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(pick);
    };

    const observer = new IntersectionObserver(schedule, {
      threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    pick();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sectionIds]);

  return activeId;
}
