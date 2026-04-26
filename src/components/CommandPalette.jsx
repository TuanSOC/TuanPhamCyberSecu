import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, profile } from "../data/portfolio";
import { Icon } from "./icons";

function buildActions() {
  return [
    ...navItems.map((item) => ({
      id: item.id,
      label: `Go to ${item.label}`,
      hint: `#${item.id}`,
      icon: item.icon,
      run: () => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    })),
    {
      id: "resume",
      label: "Open resume",
      hint: "resume.html",
      icon: "Download",
      run: () => window.open(profile.resume, "_blank", "noopener,noreferrer"),
    },
    {
      id: "email",
      label: "Start email",
      hint: profile.email,
      icon: "Mail",
      run: () => {
        window.location.href = `mailto:${profile.email}?subject=SOC%20Role%20-%20Portfolio%20Contact`;
      },
    },
  ];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const actions = useMemo(buildActions, []);

  const filteredActions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) => `${action.label} ${action.hint}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const typing = target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

      if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [open]);

  const runAction = (action) => {
    action.run();
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button className="command-trigger" type="button" onClick={() => setOpen(true)} aria-label="Open command palette">
        <Icon name="Code" className="size-4" />
        <span>Press /</span>
      </button>
      {open ? (
        <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
          <button className="command-palette__backdrop" type="button" aria-label="Close command palette" onClick={() => setOpen(false)} />
          <div className="command-palette__panel">
            <div className="command-palette__search">
              <Icon name="Activity" className="size-4" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump to a section, resume, or contact..."
              />
              <kbd>Esc</kbd>
            </div>
            <div className="command-palette__list">
              {filteredActions.map((action) => (
                <button type="button" className="command-palette__item" key={action.id} onClick={() => runAction(action)}>
                  <Icon name={action.icon} className="size-4" />
                  <span>{action.label}</span>
                  <small>{action.hint}</small>
                </button>
              ))}
              {!filteredActions.length ? <p className="command-palette__empty">No command found.</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
