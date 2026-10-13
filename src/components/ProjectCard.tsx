import { Link } from "react-router-dom";
import { ProjectArtwork } from "@/components/Artwork";
import { Icon } from "@/components/Icon";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  featured = false,
  index,
}: {
  project: Project;
  featured?: boolean;
  index: number;
}) {
  return (
    <Link
      to={`/projects#${project.slug}`}
      className={`project-card ${featured ? "featured-project" : ""}`}
    >
      <ProjectArtwork slug={project.slug} />
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>0{index + 1}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-arrow">
            <Icon name="external" />
          </span>
        </div>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        {featured ? (
          <span className="text-link">
            Explore the project <Icon name="arrow" />
          </span>
        ) : null}
      </div>
    </Link>
  );
}
