import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTerminalText(text) {
  const prefersReduced = usePrefersReducedMotion();
  const [output, setOutput] = useState(() => text.trimEnd());

  useEffect(() => {
    const fullText = text.trimEnd();
    if (prefersReduced) {
      setOutput(fullText);
      return;
    }

    setOutput("");
    const chars = [...fullText];
    let i = 0;
    let raf = null;
    let timer = null;

    const step = () => {
      i += Math.max(1, Math.floor(chars.length / 220));
      setOutput(chars.slice(0, i).join(""));
      if (i < chars.length) raf = window.requestAnimationFrame(step);
    };

    timer = window.setTimeout(() => {
      raf = window.requestAnimationFrame(step);
    }, 200);

    return () => {
      window.clearTimeout(timer);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [prefersReduced, text]);

  return output;
}
