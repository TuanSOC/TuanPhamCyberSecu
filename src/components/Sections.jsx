import { useState } from "react";
import { aboutCards, certifications, experience, labStack, profile, projects, recruiterHighlights, skillGroups } from "../data/portfolio";
import { Card, Section, TagList } from "./Primitives";
import { Icon } from "./icons";

export function About() {
  return (
    <Section
      id="about"
      title="About"
      eyebrow="Profile"
      intro="Focused on SOC/Blue Team with a hands-on workflow: log → triage → investigation → action."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {aboutCards.map((card, index) => (
          <Card key={card.title} delay={index * 70}>
            <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="text-muted leading-relaxed">{card.body}</p>
            {card.items ? (
              <ul className="list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        ))}
        </div>
        <Card className="recruiter-snapshot" delay={160}>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary dark:text-blue-300">
              <Icon name="Shield" className="size-6" />
            </div>
            <div>
              <p className="section__eyebrow mb-1">Recruiter snapshot</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Why this profile is useful</h3>
            </div>
          </div>
          <div className="grid gap-4">
            {recruiterHighlights.map((item) => (
              <div className="snapshot-item" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      eyebrow="Capabilities"
      intro="Blue Team focused: SIEM, log investigation, network security, and lightweight automation with Python."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Card key={group.title} delay={index * 70}>
            <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">{group.title}</h3>
            <TagList items={group.skills} />
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function LabStack() {
  return (
    <Section
      id="lab-stack"
      title="Security Lab Stack"
      eyebrow="Hands-on environment"
      intro="The tools and lab environments I use to practice monitoring, detection, hardening, and incident investigation."
    >
      <div className="lab-stack-grid grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {labStack.map((group, index) => (
          <Card className="lab-stack-card" key={group.title} delay={index * 70}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="section__eyebrow mb-1">Lab layer {index + 1}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{group.title}</h3>
              </div>
              <div className="lab-stack-card__icon">
                <Icon name={index === 0 ? "Cpu" : index === 1 ? "Shield" : index === 2 ? "Globe" : "Code"} className="size-5" />
              </div>
            </div>
            <p className="text-muted mb-4 leading-relaxed">{group.description}</p>
            <TagList items={group.tools} />
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      eyebrow="Timeline"
      intro="Internships in SOC operations, security research, and system administration with a secure-by-default mindset."
    >
      <div className="timeline grid gap-4">
        {experience.map((item) => (
          <article className="timeline__item card" key={item.title}>
            <div className="timeline__when">{item.when}</div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <ul className="list">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const detailsId = `proj-${project.id}-details`;

  return (
    <Card as="article" className={`project ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`} delay={index * 70}>
      <div className="project-image-preview mb-4 overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="project__top mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`severity-badge severity-badge--${project.severity.toLowerCase()}`}>{project.severity}</span>
            <span className="project-intel__meta">{project.meta}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
        </div>
      </div>
      <p className="text-muted mb-4 leading-relaxed">{project.summary}</p>
      <div className="project-intel mb-4">
        <div>
          <span>Signal</span>
          <strong>{project.signal}</strong>
        </div>
        <div>
          <span>Environment</span>
          <strong>{project.environment}</strong>
        </div>
        <div>
          <span>Outcome</span>
          <strong>{project.outcome}</strong>
        </div>
      </div>
      <div className="project-impact mb-4">
        {project.impact.map((item) => (
          <span className="impact-pill" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="mb-4">
        <TagList items={project.tags} />
      </div>
      <button
        className="project__toggle btn btn--ghost w-full justify-between sm:w-auto"
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
      >
        Case study
        <Icon name="ChevronDown" className={`size-4 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`project__details ${open ? "is-open" : ""}`} id={detailsId} style={{ maxHeight: open ? "1200px" : "0px" }}>
        <div className="case-study mt-4">
          <div className="case-study__row">
            <span>Problem</span>
            <p>{project.caseStudy.problem}</p>
          </div>
          <div className="case-study__row">
            <span>Environment</span>
            <ul>
              {project.caseStudy.environment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="case-study__row">
            <span>What I did</span>
            <ul>
              {project.caseStudy.actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="case-study__row">
            <span>Result</span>
            <p>{project.caseStudy.result}</p>
          </div>
          <div className="case-study__row">
            <span>Learning</span>
            <p>{project.caseStudy.learned}</p>
          </div>
        </div>
      </div>
      {project.source ? (
        <div className="project__links mt-4">
          <a className="link-pill" href={project.source} target="_blank" rel="noreferrer">
            <Icon name="Code" className="size-4" />
            Source code
          </a>
        </div>
      ) : null}
    </Card>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      eyebrow="Case-study ready"
      intro="Hands-on projects: WAF labs, unsupervised threat detection, and database security hardening."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.id} />
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section
      id="certs"
      title="Certifications"
      eyebrow="Validation"
      intro="Networking foundations and SOC operations training from Cisco Networking Academy."
    >
      <div className="grid-certs grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div className="card cert" key={cert.title}>
            <div className="flex items-start justify-between">
              <Icon name="BadgeCheck" className="mb-3 size-8 text-primary dark:text-accent" />
              <img src={cert.image} alt="" loading="lazy" decoding="async" className="size-12 object-contain opacity-80" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
            {cert.id ? <div className="text-muted text-sm font-mono text-[10px] mb-1">{cert.id}</div> : null}
            <div className="text-muted text-sm mb-4">{cert.issuer}</div>
            <a href={cert.verify} target="_blank" rel="noreferrer" className="link-pill text-xs py-1 px-3">
              <Icon name="ExternalLink" className="size-3" />
              Verify
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Contact({ onCopy }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (website.trim()) return;
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body.trim())}`;
    window.location.href = url;
  };

  return (
    <Section
      id="contact"
      title="Contact"
      eyebrow="Next step"
      intro="If you need a SOC Tier 1 / Blue Team fresher, I reply quickly via email."
      className="section--contact"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card reveal={false} className="contact-callout">
          <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 p-4 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-semibold text-primary dark:text-blue-200">Best fit</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              SOC Tier 1, Blue Team fresher, security monitoring, log triage, WAF/firewall support, or security automation internship.
            </p>
          </div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Details</h3>
          <ul className="list">
            <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <strong className="text-slate-800 dark:text-slate-200">Email:</strong>
              <a className="text-primary hover:underline dark:text-accent" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button type="button" className="copy-chip" onClick={() => onCopy(profile.email)} aria-label="Copy email address">
                <Icon name="Copy" className="size-3.5" />
                Copy
              </button>
            </li>
            <li>
              <strong className="text-slate-800 dark:text-slate-200">Phone:</strong>{" "}
              <a className="text-primary hover:underline dark:text-accent" href={`tel:${profile.phoneHref}`}>
                {profile.phone}
              </a>
            </li>
            <li>
              <strong className="text-slate-800 dark:text-slate-200">Location:</strong> {profile.location}
            </li>
            <li>
              <strong className="text-slate-800 dark:text-slate-200">LinkedIn:</strong>{" "}
              <a className="text-primary hover:underline dark:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedinLabel}
              </a>
            </li>
          </ul>
          <div className="contact__actions mt-6 flex flex-wrap gap-3">
            <a className="btn btn--primary" href={`mailto:${profile.email}?subject=SOC%20Role%20-%20Portfolio%20Contact`}>
              <Icon name="Send" className="size-4" />
              Send email
            </a>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="Download" className="size-4" />
              View Resume
            </a>
          </div>
        </Card>

        <form className="card form relative grid gap-2" id="contactForm" aria-label="Contact form (opens email draft)" onSubmit={handleSubmit}>
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Send a message (opens email draft)</h3>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="form-honeypot"
            aria-hidden="true"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-200">Subject</span>
            <input
              name="subject"
              type="text"
              placeholder="e.g., SOC Tier 1 application"
              required
              className="w-full rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2.5 font-mono text-sm text-slate-900 outline-none transition-all duration-300 ease-in-out placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-accent dark:focus:ring-accent/20"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-200">Message</span>
            <textarea
              name="body"
              rows="6"
              placeholder="Briefly describe the role, requirements, and interview timeframe..."
              required
              className="w-full resize-y rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2.5 font-mono text-sm text-slate-900 outline-none transition-all duration-300 ease-in-out placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-accent dark:focus:ring-accent/20"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </label>
          <button className="btn btn--primary mt-2 w-fit" type="submit">
            <Icon name="Mail" className="size-4" />
            Open email
          </button>
          <p className="text-muted mt-2 text-sm">This form does not send data to a server; it opens your email app with your message.</p>
        </form>
      </div>
    </Section>
  );
}
