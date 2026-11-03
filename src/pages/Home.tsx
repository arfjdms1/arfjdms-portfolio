import { Link } from "react-router-dom";
import { Breakable } from "@/components/Breakable";
import { PageMeta } from "@/components/PageMeta";
import { Plate } from "@/components/Plate";
import { RepoTimeline } from "@/components/RepoTimeline";
import { SkinDecode } from "@/components/SkinDecode";
import { SkinFigure } from "@/components/SkinFigure";
import { repoCounts } from "@/data/activity";
import { exhibits } from "@/data/exhibits";
import { pageMeta } from "@/data/meta";
import { projects, skillGroups, type Project } from "@/data/projects";

function Entry({ project, figure, lead = false }: { project: Project; figure: number; lead?: boolean }) {
  return (
    <article className={`entry${lead ? " entry--lead" : ""}`} aria-labelledby={`${project.slug}-home-title`}>
      <div className="entry__text sc-stack" data-reveal data-reveal-stagger="60">
        <h3 id={`${project.slug}-home-title`} className="entry__title">
          <Breakable text={project.title} />
        </h3>
        <p className="entry__tagline">{project.tagline}</p>
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
        {lead ? <p className="entry__desc">{project.description}</p> : null}
        <p className="entry__links">
          <Link viewTransition to={`/projects#${project.slug}`}>
            Case study<span aria-hidden="true"> →</span>
          </Link>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </p>
      </div>
      <Plate
        exhibit={exhibits[project.slug]}
        figure={figure}
        reveal
        runsBelow={project.slug === "eaglerx-skinbridge"}
      />
    </article>
  );
}

export function Home() {
  const [lead, ...rest] = projects;
  return (
    <>
      <PageMeta meta={pageMeta.home} />

      <section className="title" data-folio="Overview" aria-labelledby="title-name">
        <div className="title__inner" data-reveal data-reveal-stagger="80">
          <div className="title__top">
            <h1 id="title-name" className="title__name">
              <span>Aarav</span> <span>Khemka</span>
            </h1>
            <SkinFigure />
          </div>
          <div className="title__imprint">
            <p className="title__lede">
              I build across the stack, from the interface you see to the bytes
              underneath it.
            </p>
            <p className="title__now">
              Now building{" "}
              <Link viewTransition to="/projects#illatio">
                The Guild Inference Project
              </Link>
              : open inference systems for the hardware people already own. Also known as
              arfjdms.
            </p>
          </div>
        </div>
      </section>

      <section className="ch ch--work" id="work" data-folio="I  Work" aria-labelledby="work-title">
        <header className="intertitle" data-reveal data-reveal-stagger="60">
          <p className="ch__num" aria-hidden="true">
            I
          </p>
          <h2 id="work-title" className="intertitle__title">
            Work
          </h2>
          <p className="intertitle__dek">
            Three projects at three depths of the stack: a platform, a native program,
            and a bridge between two games’ skin formats.
          </p>
        </header>
        <Entry project={lead} figure={1} lead />
        <div className="entry-pair">
          {rest.map((project, index) => (
            <Entry key={project.slug} project={project} figure={index + 2} />
          ))}
        </div>
      </section>

      <SkinDecode />

      <section
        className="ch ch--person ground-paper"
        data-tone="light"
        id="person"
        data-folio="III  Person"
        aria-labelledby="person-title"
      >
        <div className="person">
          <header className="person__head" data-reveal data-reveal-stagger="60">
            <p className="ch__num" aria-hidden="true">
              III
            </p>
            <h2 id="person-title" className="person__title">
              Curious by default. Builder by choice.
            </h2>
            <RepoTimeline />
          </header>
          <div className="person__body sc-stack" data-reveal data-reveal-stagger="60">
            <p className="person__lede">
              I’m Aarav, also known as <strong>arfjdms</strong>. I like understanding how
              things work, then building something useful with what I learn.
            </p>
            <p>
              That curiosity takes me from pixels and native C++ to Minecraft tooling and
              self-hosted AI. Since March 2025 my GitHub has gathered{" "}
              <span className="person__count" data-count-to={repoCounts.publicTotal}>
                {repoCounts.publicTotal}
              </span>{" "}
              public repositories: {repoCounts.started} I started and {repoCounts.forks} forks.
              Right now I’m bringing it together in{" "}
              <Link viewTransition to="/projects#illatio">
                The Guild Inference Project
              </Link>
              .
            </p>
            <p>
              The tools follow the work: {skillGroups.flatMap((group) => group.skills.slice(0, 3)).join(", ")}, and whatever the next problem needs.
            </p>
            <p className="person__more">
              <Link viewTransition to="/about">
                More about me<span aria-hidden="true"> →</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
