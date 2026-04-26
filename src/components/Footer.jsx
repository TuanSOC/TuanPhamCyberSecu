import { profile } from "../data/portfolio";
import { Icon } from "./icons";

export function Footer() {
  return (
    <footer className="footer-premium relative border-t border-slate-200/80 py-10 dark:border-white/10">
      <div className="container-app footer__inner flex flex-wrap items-center justify-between gap-4">
        <div className="footer__left flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-muted text-sm">© {new Date().getFullYear()} {profile.name}</span>
          <a className="text-muted text-sm font-medium text-primary hover:underline dark:text-accent" href={profile.github} target="_blank" rel="noreferrer me">
            GitHub
          </a>
          <a className="text-muted text-sm font-medium text-primary hover:underline dark:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer me">
            LinkedIn
          </a>
        </div>
        <div className="footer__right">
          <a className="link-pill text-sm" href="#main">
            <Icon name="ArrowUp" className="size-4" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
