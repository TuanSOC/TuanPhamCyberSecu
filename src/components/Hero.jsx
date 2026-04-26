import { useRef } from "react";
import { commandCenter, heroChips, heroMetrics, heroStatus, heroTerminal, profile } from "../data/portfolio";
import { useTerminalText } from "../hooks/useTerminalText";
import { Reveal } from "./Primitives";
import { Icon } from "./icons";

export function Hero() {
  const terminalText = useTerminalText(heroTerminal);
  const heroRef = useRef(null);

  const handleMouseMove = (event) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    hero.style.setProperty("--hx", `${Math.max(0, Math.min(100, x))}%`);
    hero.style.setProperty("--hy", `${Math.max(0, Math.min(100, y))}%`);
  };

  return (
    <section
      className="hero-section relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-28"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        heroRef.current?.style.setProperty("--hx", "50%");
        heroRef.current?.style.setProperty("--hy", "34%");
      }}
    >
      <div className="hero-mouse-glow" aria-hidden="true" />
      <div className="orb-pulse pointer-events-none absolute -right-24 top-0 h-72 w-72" aria-hidden="true">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/25 to-accent/20 blur-3xl will-change-transform dark:from-primary/30 dark:to-accent/15" />
      </div>
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64" aria-hidden="true">
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-indigo-500/15 to-transparent blur-3xl will-change-transform" />
      </div>

      <div className="container-app relative">
        <div className="hero-status-strip mb-8">
          <div className="hero-status-strip__identity">
            <span className="hero-status-strip__pulse" aria-hidden="true" />
            <span>Command Center / {profile.focus}</span>
          </div>
          <div className="hero-status-strip__items">
            {heroStatus.map((item) => (
              <span key={item.label}>
                <strong>{item.label}</strong>
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app relative grid gap-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-start lg:gap-12">
        <Reveal className="hero__copy" delay={40}>
          <p className="hero-kicker mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary dark:border-accent/25 dark:bg-accent/10 dark:text-accent">
            <Icon name="Activity" className="size-3.5" />
            {profile.badge}
          </p>
          <h1 className="hero-title mb-6">
            Blue Team mindset, <br />
            <span className="hero-gradient-text">log-driven</span> detection.
          </h1>
          <p className="hero-lead mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-200">
            {profile.lead}
          </p>
          <div className="hero-availability mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-primary/35 dark:bg-primary/15 dark:text-blue-200">
            <Icon name="Shield" className="size-4" />
            {profile.availability}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn--primary" href="#projects">
              View projects
              <Icon name="ArrowRight" className="size-4" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Icon name="Mail" className="size-4" />
              Contact
            </a>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="Download" className="size-4" />
              View Resume
            </a>
          </div>

          <ul className="hero-metrics mt-10 grid gap-3 sm:grid-cols-2">
            {heroMetrics.map((item) => (
              <li className="hero-metric meta-tile" key={item.label}>
                <span className="hero-metric__label">{item.label}</span>
                <span className="hero-metric__value">{item.value}</span>
              </li>
            ))}
            <li className="hero-metric meta-tile">
              <span className="hero-metric__label flex items-center gap-2">
                <Icon name="MapPin" className="size-3.5" />
                Location
              </span>
              <span className="hero-metric__value">{profile.location}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal className="hero__panel hero-panel-wrap relative" delay={120}>
          <div className="hero-portrait-container mb-8 lg:mb-12">
            <div className="hero-portrait-frame">
              <div className="hero-portrait-glow" />
              <img src={profile.portrait} alt={profile.name} className="hero-portrait-img" loading="eager" decoding="async" />
              <div className="hero-portrait-overlay" />
              <div className="hero-portrait-scanner" />
              <div className="hero-portrait-grid" />
            </div>
          </div>

          <div className="hero-float hero-panel hero-command-panel relative z-[1] rounded-2xl border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/12 dark:bg-slate-900/50 dark:shadow-black/40">
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
              <div className="dots flex gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </div>
              <div className="font-mono text-xs font-medium text-slate-500 dark:text-slate-200">analyst /triage</div>
              <span className="rounded-full border border-accent/30 bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                dark only
              </span>
            </div>
            <div className="relative p-4">
              <div className="terminal-scanline" />
              <pre className="terminal terminal--glow max-h-[min(52vh,380px)] overflow-auto rounded-xl border border-slate-200/60 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100 dark:border-white/10" aria-label="Simulated terminal">
                <code className="font-mono">{terminalText}</code>
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <span className="chip-hero" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
              <div className="hero-threat-panel mt-4">
                <div className="hero-threat-panel__header">
                  <span>Threat signal queue</span>
                  <small>simulated lab data</small>
                </div>
                {commandCenter.alertQueue.slice(0, 2).map((alert) => (
                  <div className="hero-threat-row" key={alert.title}>
                    <span className={`severity-dot severity-dot--${alert.severity.toLowerCase()}`} />
                    <div>
                      <strong>{alert.title}</strong>
                      <small>{alert.source}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="signal z-[2]" aria-hidden="true">
            <div className="signal__bar" />
            <div className="signal__bar" />
            <div className="signal__bar" />
            <div className="signal__bar" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
