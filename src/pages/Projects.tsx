import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Breakable } from "@/components/Breakable";
import { PageMeta } from "@/components/PageMeta";
import { pageMeta } from "@/data/meta";
import { Plate } from "@/components/Plate";
import { exhibits } from "@/data/exhibits";
import { projects } from "@/data/projects";

export function Projects() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.slice(1);
    if (!projects.some((project) => project.slug === targetId)) return;
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "instant", block: "start" }),
    );
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <PageMeta meta={pageMeta.work} />
      <section className="page-head" data-folio="Work" aria-labelledby="work-page-title">
        <div className="page-head__inner" data-reveal data-reveal-stagger="70">
          <h1 id="work-page-title" className="page-head__title">
            Things I’ve built. And the thing I’m building.
          </h1>
          <p className="page-head__dek">
            From AI infrastructure to native software and Minecraft tooling: what each
            project is, how it works, and where to find it.
          </p>
          <nav className="page-head__index" aria-label="Projects on this page">
            {projects.map((project) => (
              <a key={project.slug} href={`#${project.slug}`}>
                {project.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {projects.map((project, index) => (
        <article
          className="case"
          id={project.slug}
          key={project.slug}
          data-folio={project.title}
          aria-labelledby={`${project.slug}-title`}
        >
          <div className="case__grid">
            <header className="case__head sc-stack" data-reveal data-reveal-stagger="60">
              <h2 id={`${project.slug}-title`} className="case__title">
                <Breakable text={project.title} />
              </h2>
              <p className="case__tagline">{project.tagline}</p>
              <dl className="label">
                <div>
                  <dt>Kind</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.tech.join(", ")}</dd>
                </div>
              </dl>
              <p className="case__action">
                {project.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={project.linkNote ? `${project.slug}-link-note` : undefined}
                  >
                    {i === 0 ? (link.label === "GitHub" ? "View on GitHub" : `Visit ${link.label}`) : link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
                {project.linkNote ? (
                  <span className="case__note" id={`${project.slug}-link-note`}>
                    {project.linkNote}
                  </span>
                ) : null}
              </p>
            </header>
            <div className="case__body" data-reveal>
              <Plate exhibit={exhibits[project.slug]} figure={index + 1} />
              <p className="case__long">{project.longDescription}</p>
              <dl className="case__points">
                {project.highlights.map((highlight) => (
                  <div key={highlight.title}>
                    <dt>{highlight.title}</dt>
                    <dd>{highlight.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
