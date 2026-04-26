import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { navItems, profile } from "../data/portfolio";

function NavLink({ item, activeId, onClick }) {
  const active = activeId === item.id;
  return (
    <a className={`nav-link ${active ? "navLink--active" : ""}`} href={`#${item.id}`} onClick={onClick}>
      <Icon name={item.icon} className="mr-1 inline size-3.5 opacity-70" />
      {item.label}
    </a>
  );
}

export function Header({ activeId }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    return () => document.body.classList.remove("nav-open");
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        type="button"
        className="nav-backdrop"
        id="navBackdrop"
        tabIndex={-1}
        aria-label="Close navigation menu"
        hidden={!mobileOpen}
        onClick={closeMobile}
      />
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <div className="container-app flex flex-wrap items-center justify-between gap-4 py-3 md:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="brand-mark h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-100 shadow-md transition-transform duration-300 ease-in-out hover:scale-110 dark:border-white/20 dark:bg-slate-800"
              aria-hidden="true"
            >
              <img src={profile.portrait} alt="" className="h-full w-full object-cover" decoding="async" />
            </div>
            <div className="min-w-0">
              <div className="brand-display truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
                {profile.name}
              </div>
              <div className="truncate text-xs text-slate-500 dark:text-slate-200">
                {profile.role} • {profile.focus}
              </div>
            </div>
          </div>

          <nav className="nav nav--desktop hidden flex-wrap items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink item={item} activeId={activeId} key={item.id} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="navToggle flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/80 md:hidden dark:border-white/12 dark:bg-white/5"
              id="navToggle"
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
            <a className="btn btn--primary hidden sm:inline-flex" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="Download" className="size-4" />
              View Resume
            </a>
          </div>
        </div>

        <nav
          className="nav nav--mobile border-t border-slate-200/80 px-4 dark:border-white/10 md:hidden"
          id="navMobile"
          aria-label="Main navigation (mobile)"
        >
          <div className="container-app flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <NavLink item={item} activeId={activeId} onClick={closeMobile} key={item.id} />
            ))}
            <a className="btn btn--primary mt-2 justify-center sm:hidden" href={profile.resume} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
