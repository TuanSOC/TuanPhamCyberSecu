import { useRef } from "react";
import { useInView } from "../hooks/useInView";

export function Section({ id, title, intro, eyebrow, children, className = "" }) {
  const [ref, isInView] = useInView({ threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`section scroll-mt-24 py-16 md:py-20 ${isInView ? "section--inview" : ""} ${className}`}
    >
      <div className="container-app">
        <div className="section-rule" aria-hidden="true" />
        <div className="section__head mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
            <h2 className="section-title text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          </div>
          {intro ? <p className="section__intro max-w-xl text-slate-600 dark:text-slate-200">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Reveal({ as: Tag = "div", className = "", children, delay = 0, disabled = false, ...props }) {
  const [ref, isInView] = useInView({ threshold: 0.12 });
  const style = disabled ? props.style : { ...props.style, transitionDelay: `${Math.min(delay, 420)}ms` };

  return (
    <Tag
      ref={ref}
      className={`${disabled ? "" : "reveal"} ${isInView || disabled ? "is-visible" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Card({ as: Tag = "div", className = "", children, reveal = true, delay = 0, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    card.style.setProperty("--mx", `${Math.max(0, Math.min(100, x))}%`);
    card.style.setProperty("--my", `${Math.max(0, Math.min(100, y))}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--mx", "20%");
    card.style.setProperty("--my", "0%");
  };

  const content = (
    <Tag
      ref={cardRef}
      className={`card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      <div className="card-scanline" aria-hidden="true" />
    </Tag>
  );

  if (!reveal) return content;

  return (
    <Reveal as="div" delay={delay} className="h-full">
      {content}
    </Reveal>
  );
}

export function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
