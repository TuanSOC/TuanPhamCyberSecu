import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useCursorGlow() {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const glow = document.querySelector(".cursorGlow");
    if (!glow) return;

    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const apply = () => {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      raf = null;
    };

    const onMouseMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMouseMove);
    apply();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);
}
