import "./app.css";
import { createIcons } from "lucide";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Copy,
  Cpu,
  Code,
  Download,
  ExternalLink,
  FolderGit2,
  Globe,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Shield,
  Sun,
  User,
} from "lucide";

const THEME_KEY = "pmt_theme";

const lucideIconMap = {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  Code,
  Globe,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Shield,
  Sun,
  User,
  // Kebab-case mappings
  activity: Activity,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  award: Award,
  "badge-check": BadgeCheck,
  briefcase: Briefcase,
  "chevron-down": ChevronDown,
  copy: Copy,
  cpu: Cpu,
  download: Download,
  "external-link": ExternalLink,
  "folder-git-2": FolderGit2,
  code: Code,
  globe: Globe,
  mail: Mail,
  "map-pin": MapPin,
  moon: Moon,
  phone: Phone,
  send: Send,
  shield: Shield,
  sun: Sun,
  user: User,
};

let _iconsInitialized = false;
function refreshIcons() {
  if (_iconsInitialized) return;
  createIcons({
    icons: lucideIconMap,
    attrs: {
      class: "lucide-icon shrink-0",
      "stroke-width": 1.75,
    },
  });
  _iconsInitialized = true;
}

/** Forced re-init for dynamic content */
function forceRefreshIcons() {
  _iconsInitialized = false;
  refreshIcons();
}

function setTheme(theme, options = {}) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme !== "light");
  localStorage.setItem(THEME_KEY, theme);

  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", theme === "light" ? "#f8fafc" : "#020617");
  });

  if (options.announce) {
    const live = document.getElementById("a11yLive");
    if (live) {
      live.textContent = theme === "light" ? "Light theme enabled." : "Dark theme enabled.";
    }
  }

  refreshIcons();
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  return prefersLight ? "light" : "dark";
}

function wireThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  let current = getInitialTheme();

  const syncThemeAria = (theme) => {
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };

  setTheme(current);
  syncThemeAria(current);

  btn.addEventListener("click", () => {
    current = current === "light" ? "dark" : "light";
    setTheme(current, { announce: true });
    syncThemeAria(current);
  });
}

function wireAppShell() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    document.body.classList.add("app-ready");
    return;
  }

  const done = () => {
    document.body.classList.add("app-ready");
    refreshIcons();
  };

  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  ]).then(() => {
    window.setTimeout(done, 220);
  });
}

function closeMobileNav() {
  document.body.classList.remove("nav-open");
  const toggle = document.getElementById("navToggle");
  const backdrop = document.getElementById("navBackdrop");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }
  if (backdrop) backdrop.hidden = true;
}

function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  const backdrop = document.getElementById("navBackdrop");
  if (!toggle || !mobile) return;

  const syncBackdrop = (opened) => {
    if (backdrop) backdrop.hidden = !opened;
  };

  toggle.addEventListener("click", () => {
    const opened = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", opened ? "true" : "false");
    toggle.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
    syncBackdrop(opened);
  });

  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  backdrop?.addEventListener("click", () => {
    closeMobileNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      closeMobileNav();
    }
  });
}

function wireYear() {
  const year = document.getElementById("year");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

function showToast(message) {
  const el = document.getElementById("appToast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("app-toast--visible");
  window.clearTimeout(el._hideT);
  el._hideT = window.setTimeout(() => {
    el.classList.remove("app-toast--visible");
  }, 2600);
}

function wireCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard.");
      } catch {
        showToast("Could not copy — select the text manually.");
      }
    });
  });
}

function wireContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (String(data.get("website") || "").trim() !== "") {
      return;
    }
    const subject = String(data.get("subject") || "").trim();
    const body = String(data.get("body") || "").trim();
    const to = "tinyly90891@gmail.com";

    const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    showToast("Opening your email app…");
  });
}

function wireTerminalTyping() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const el = document.getElementById("term");
  if (!el) return;

  const full = el.textContent || "";
  const trimmed = full.replace(/\s+$/g, "");
  el.textContent = "";

  const chars = [...trimmed];
  let i = 0;
  let raf = null;

  const step = () => {
    i += Math.max(1, Math.floor(chars.length / 220));
    el.textContent = chars.slice(0, i).join("");
    if (i < chars.length) raf = window.requestAnimationFrame(step);
  };

  window.setTimeout(() => {
    raf = window.requestAnimationFrame(step);
  }, 200);

  window.addEventListener("beforeunload", () => {
    if (raf) window.cancelAnimationFrame(raf);
  });
}

function wireCursorAmbient() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
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

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    if (raf) return;
    raf = window.requestAnimationFrame(apply);
  });
}

function wireReveal() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const targets = document.querySelectorAll(
    ".hero__copy, .hero__panel, .section__head, .card:not(.timeline__item):not(.cert), .meta, .signal, .footer__inner"
  );
  if (!targets.length) return;

  targets.forEach((el, idx) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(idx * 70, 420)}ms`;
  });

  if (prefersReduced) {
    targets.forEach((el) => {
      el.classList.add("is-visible");
      el.style.transitionDelay = "0ms";
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
}

function wireCardGlow() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  cards.forEach((card) => {
    let raf = null;
    let tx = 20;
    let ty = 0;

    card.style.setProperty("--mx", "20%");
    card.style.setProperty("--my", "0%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");

    const apply = () => {
      card.style.setProperty("--mx", `${tx}%`);
      card.style.setProperty("--my", `${ty}%`);
      raf = null;
    };

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const rw = Math.max(1, rect.width);
      const rh = Math.max(1, rect.height);
      const x = ((e.clientX - rect.left) / rw) * 100;
      const y = ((e.clientY - rect.top) / rh) * 100;
      tx = Math.max(0, Math.min(100, x));
      ty = Math.max(0, Math.min(100, y));

      const px = (e.clientX - rect.left) / rw - 0.5;
      const py = (e.clientY - rect.top) / rh - 0.5;
      card.style.setProperty("--tilt-x", `${py * -5.5}deg`);
      card.style.setProperty("--tilt-y", `${px * 6.5}deg`);

      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--mx", "20%");
      card.style.setProperty("--my", "0%");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function wireHeroMouseGlow() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const hero = document.querySelector(".hero-section");
  if (prefersReduced || !hero) return;

  let raf = null;
  const apply = (clientX, clientY) => {
    const r = hero.getBoundingClientRect();
    const x = ((clientX - r.left) / Math.max(1, r.width)) * 100;
    const y = ((clientY - r.top) / Math.max(1, r.height)) * 100;
    hero.style.setProperty("--hx", `${Math.max(0, Math.min(100, x))}%`);
    hero.style.setProperty("--hy", `${Math.max(0, Math.min(100, y))}%`);
    raf = null;
  };

  hero.addEventListener("mousemove", (e) => {
    if (raf) return;
    const cx = e.clientX;
    const cy = e.clientY;
    raf = window.requestAnimationFrame(() => apply(cx, cy));
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--hx", "50%");
    hero.style.setProperty("--hy", "34%");
  });
}

function wireHeroParallax() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const hero = document.querySelector(".hero-section");
  if (prefersReduced || !hero) return;

  const layers = hero.querySelectorAll("[data-parallax]");
  if (!layers.length) return;

  let raf = null;
  const run = () => {
    raf = null;
    const r = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const visible = r.bottom > 0 && r.top < vh;
    if (!visible) return;

    const t = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / (vh + r.height * 0.35)));

    layers.forEach((el) => {
      const f = Number(el.getAttribute("data-parallax") || "0");
      const y = (t - 0.5) * 80 * f;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  };

  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(run);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  run();
}

function wireActiveNav() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  /** @type {Map<string, HTMLElement[]>} */
  const idToLinks = new Map();

  navLinks.forEach((a) => {
    const id = a.getAttribute("href")?.slice(1);
    if (!id) return;
    const list = idToLinks.get(id);
    if (list) list.push(a);
    else idToLinks.set(id, [a]);
  });

  const sections = [...document.querySelectorAll("section[id]")];
  if (!sections.length) return;

  const activeClass = "navLink--active";

  const clear = () => {
    navLinks.forEach((link) => link.classList.remove(activeClass));
  };

  const pickActiveSection = () => {
    const vh = window.innerHeight || 1;
    const bandTop = vh * 0.35;
    const bandBottom = vh * 0.45;
    const bandMid = vh * 0.4;

    let best = null;
    let bestScore = -Infinity;

    for (const section of sections) {
      const r = section.getBoundingClientRect();
      const overlapTop = Math.max(r.top, bandTop);
      const overlapBottom = Math.min(r.bottom, bandBottom);
      const bandOverlap = Math.max(0, overlapBottom - overlapTop);
      const inViewport = r.bottom > 0 && r.top < vh;
      const center = (r.top + r.bottom) / 2;
      const dist = Math.abs(center - bandMid);

      const score =
        bandOverlap > 0 ? bandOverlap * 1000 - dist : inViewport ? vh - dist : -Infinity;

      if (score > bestScore) {
        bestScore = score;
        best = section;
      }
    }

    clear();
    if (!best || bestScore === -Infinity) return;

    const id = best.getAttribute("id");
    const links = id ? idToLinks.get(id) : null;
    if (links) links.forEach((link) => link.classList.add(activeClass));
  };

  let navRaf = null;
  const schedulePick = () => {
    if (navRaf) return;
    navRaf = window.requestAnimationFrame(() => {
      navRaf = null;
      pickActiveSection();
    });
  };

  const io = new IntersectionObserver(schedulePick, {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
  });

  sections.forEach((s) => io.observe(s));
  window.addEventListener("scroll", schedulePick, { passive: true });
  window.addEventListener("resize", schedulePick, { passive: true });
  pickActiveSection();
}

function wireScrollProgress() {
  const bar = document.querySelector(".scrollProgress__bar");
  if (!bar) return;

  let raf = null;
  const apply = () => {
    raf = null;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
    bar.style.width = `${pct}%`;
  };

  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(apply);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  apply();
}

function wireTopbarScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let raf = null;
  const apply = () => {
    raf = null;
    topbar.classList.toggle("topbar--scrolled", window.scrollY > 20);
  };

  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(apply);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  apply();
}

function wireSectionInView() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const sections = document.querySelectorAll("section.section");
  if (!sections.length) return;

  if (prefersReduced) {
    sections.forEach((s) => s.classList.add("section--inview"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--inview");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach((s) => io.observe(s));
}

function wireProjectDetails() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const toggles = document.querySelectorAll(".project__toggle");
  if (!toggles.length) return;

  toggles.forEach((btn) => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    panel.style.maxHeight = "0px";

    if (prefersReduced) panel.style.transition = "none";

    btn.addEventListener("click", () => {
      const opened = btn.getAttribute("aria-expanded") === "true";
      const next = !opened;

      btn.setAttribute("aria-expanded", next ? "true" : "false");
      panel.classList.toggle("is-open", next);

      panel.style.maxHeight = next ? `${panel.scrollHeight}px` : "0px";
    });
  });

  const syncOpenPanels = () => {
    toggles.forEach((btn) => {
      if (btn.getAttribute("aria-expanded") !== "true") return;
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel?.classList.contains("is-open")) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  };

  window.addEventListener("resize", syncOpenPanels, { passive: true });
}

function wireCardEffects() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    // Inject scanline div if not present
    if (!card.querySelector(".card-scanline")) {
      const scanline = document.createElement("div");
      scanline.className = "card-scanline";
      card.appendChild(scanline);
    }

    // Interactive depth on click
    card.addEventListener("mousedown", () => {
      card.style.transform = "scale(0.98) translateY(2px)";
    });
    card.addEventListener("mouseup", () => {
      card.style.transform = "";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupCyberParticles() {
  const container = document.querySelector(".page-ambient");
  if (!container) return;

  const particleCount = 25;
  const shapes = ["circle", "square", "cross", "dash"];
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    p.className = `cyber-particle cyber-particle--${shape}`;
    
    const size = Math.random() * 5 + 2;
    p.style.width = `${size}px`;
    p.style.height = shape === "dash" ? `${size / 3}px` : `${size}px`;
    
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.opacity = Math.random() * 0.2 + 0.05;
    
    const duration = Math.random() * 20 + 20;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${Math.random() * -20}s`;
    
    // Add a slight rotation for non-circles
    if (shape !== "circle") {
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
    }
    
    container.appendChild(p);
  }
}

function setupProjectImages() {
  const projects = document.querySelectorAll(".card.project");
  projects.forEach((card) => {
    const title = card.querySelector("h3")?.textContent || "";
    // Assign unique images based on project title
    let imgSrc = "assets/dashboard.png"; // Default
    if (title.includes("Barracuda")) imgSrc = "assets/project-waf.png";
    if (title.includes("AI-based") || title.includes("Threat Detection")) imgSrc = "assets/project-ml.png";
    if (title.includes("Oracle") || title.includes("Database")) imgSrc = "assets/project-db.png";

    if (title.includes("AI-based") || title.includes("Barracuda") || title.includes("Oracle")) {
      // Prevent duplicates
      if (card.querySelector(".project-image-preview")) return;

      const imgContainer = document.createElement("div");
      imgContainer.className = "project-image-preview mb-4 overflow-hidden rounded-xl border border-white/10 bg-slate-900/50";
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `${title} Preview`;
      img.loading = "lazy";
      img.className = "w-full aspect-video object-cover transition-transform duration-500 hover:scale-110 opacity-0 transition-opacity duration-300";
      img.onload = () => img.classList.remove("opacity-0");
      imgContainer.appendChild(img);
      card.prepend(imgContainer);
    }
  });
}

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-70">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function wireScramble() {
  const titles = document.querySelectorAll(".section-title, .hero-title");
  titles.forEach((el) => {
    const original = el.innerText;
    const fx = new TextScramble(el);
    let isScrambling = false;

    const run = () => {
      if (isScrambling) return;
      isScrambling = true;
      fx.setText(original).then(() => {
        isScrambling = false;
      });
    };

    el.addEventListener("mouseenter", run);

    // Also run once when it comes into view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        run();
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

wireAppShell();
wireThemeToggle();
wireMobileNav();
wireActiveNav();
wireScrollProgress();
wireTopbarScroll();
wireSectionInView();
wireYear();
wireContactForm();
wireTerminalTyping();
wireReveal();
wireCardGlow();
wireHeroMouseGlow();
wireHeroParallax();
wireCursorAmbient();
wireProjectDetails();
wireCopyButtons();
wireCardEffects();
setupCyberParticles();
setupProjectImages();
wireScramble();
refreshIcons();
