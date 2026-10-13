import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { PageMeta } from "@/components/PageMeta";
import { ProjectArtwork } from "@/components/Artwork";
import { projects } from "@/data/projects";

const filters = [
  { label: "All work", value: "all" },
  { label: "In development", value: "in-development" },
  { label: "Open source", value: "open-source" },
] as const;
type Filter = (typeof filters)[number]["value"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const { hash } = useLocation();
  const visible = projects.filter(
    (project) => filter === "all" || project.type === filter,
  );

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.slice(1);
    if (!projects.some((project) => project.slug === targetId)) return;
    setFilter("all");
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "instant", block: "start" }),
    );
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <PageMeta
        title="Selected Work — arfjdms"
        description="Explore Illatio, a self-hosted AI inference platform, Image Viewer in C++20, and EaglerXSkinBridge for Minecraft."
        path="/projects"
      />
      <section className="container page-intro">
        <span className="eyebrow">IDEAS MADE REAL</span>
        <h1>
          Things I’ve built.
          <br />
          <span>And things I’m building.</span>
        </h1>
        <p>
          From AI infrastructure to native software and Minecraft tooling.
          <br />A closer look at the work, the thinking, and the tools.
        </p>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                type="button"
                key={item.value}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
                <span>
                  {item.value === "all"
                    ? projects.length
                    : projects.filter((project) => project.type === item.value)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <span className="project-count" role="status">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </section>
      <div className="container case-studies">
        {visible.map((project) => (
          <article
            className="case-study"
            id={project.slug}
            key={project.slug}
            aria-labelledby={`${project.slug}-title`}
          >
            <div className="case-art">
              <ProjectArtwork slug={project.slug} />
              <div className="case-caption">
                <span>{project.category}</span>
                <span>
                  {project.type === "in-development"
                    ? "IN DEVELOPMENT"
                    : "OPEN SOURCE"}
                </span>
              </div>
            </div>
            <div className="case-copy">
              <span
                className={`project-type ${project.type === "in-development" ? "type-development" : ""}`}
              >
                <span />
                {project.type === "in-development"
                  ? "In development"
                  : "Open source"}
              </span>
              <h2 id={`${project.slug}-title`}>{project.title}</h2>
              <p className="case-tagline">{project.tagline}</p>
              <p className="case-description">{project.longDescription}</p>
              <dl className="project-highlights">
                {project.highlights.map((highlight) => (
                  <div key={highlight.title}>
                    <dt>{highlight.title}</dt>
                    <dd>{highlight.description}</dd>
                  </div>
                ))}
              </dl>
              <div className="tag-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="case-actions">
                <a
                  className="button button-primary"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={
                    project.linkNote ? `${project.slug}-link-note` : undefined
                  }
                >
                  {project.type === "in-development"
                    ? "Visit illatio.dev"
                    : "View on GitHub"}
                  <Icon
                    name={
                      project.type === "in-development" ? "external" : "github"
                    }
                  />
                </a>
                {project.linkNote ? (
                  <p className="link-note" id={`${project.slug}-link-note`}>
                    {project.linkNote}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
