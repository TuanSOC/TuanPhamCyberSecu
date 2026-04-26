import { useMemo } from "react";

function buildParticles() {
  const shapes = ["circle", "square", "cross", "dash"];
  return Array.from({ length: 25 }, (_, index) => {
    const shape = shapes[index % shapes.length];
    const size = 2 + ((index * 7) % 5);
    return {
      id: index,
      shape,
      size,
      left: `${(index * 37) % 100}%`,
      top: `${(index * 53) % 100}%`,
      opacity: 0.05 + ((index % 5) * 0.035),
      duration: `${20 + ((index * 3) % 20)}s`,
      delay: `${-((index * 2) % 20)}s`,
      rotation: `rotate(${(index * 23) % 360}deg)`,
    };
  });
}

export function Ambient() {
  const particles = useMemo(buildParticles, []);

  return (
    <>
      <div className="page-ambient" aria-hidden="true">
        <div className="page-ambient__blob page-ambient__blob--a" />
        <div className="page-ambient__blob page-ambient__blob--b" />
        <div className="page-ambient__blob page-ambient__blob--c" />
        <div className="page-ambient__blob page-ambient__blob--d" />
        <div className="page-ambient__flow" />
        <div className="page-ambient__aurora" />
        <div className="page-ambient__grid" />
        <div className="page-ambient__noise" />
        <div className="page-ambient__vignette" />
        <div className="page-ambient__nodes" style={{ backgroundImage: "url('/assets/nodes.png')" }} />
        {particles.map((particle) => (
          <div
            className={`cyber-particle cyber-particle--${particle.shape}`}
            key={particle.id}
            style={{
              width: `${particle.size}px`,
              height: particle.shape === "dash" ? `${particle.size / 3}px` : `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              transform: particle.shape === "circle" ? undefined : particle.rotation,
            }}
          />
        ))}
      </div>
      <div className="cursorGlow" aria-hidden="true" />
    </>
  );
}
