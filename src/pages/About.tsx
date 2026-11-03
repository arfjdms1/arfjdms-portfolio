import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { pageMeta } from "@/data/meta";
import { profile, skillGroups } from "@/data/projects";

const approach = [
  {
    title: "Understand the whole thing.",
    description:
      "I like knowing what happens behind the interface: how data moves, how systems connect, and where the constraints really are.",
  },
  {
    title: "Make the complex usable.",
    description:
      "Good tooling should help you understand a system. Clear interfaces and thoughtful defaults matter as much as the code underneath.",
  },
  {
    title: "Build, learn, improve.",
    description:
      "Every project is a chance to go a little deeper. I work hands-on, stay curious, and keep refining what I make.",
  },
];

export function About() {
  return (
    <div className="ground-paper about" data-tone="light">
      <PageMeta meta={pageMeta.about} />
      <section className="page-head" data-folio="About" aria-labelledby="about-title">
        <div className="page-head__inner" data-reveal data-reveal-stagger="70">
          <h1 id="about-title" className="page-head__title">
            Always curious. Usually building.
          </h1>
          <p className="page-head__dek">
            Developer, systems enthusiast, and the person behind arfjdms.
          </p>
        </div>
      </section>

      <section className="story" data-folio="The short version" aria-labelledby="story-title">
        <div className="story__grid">
          <h2 id="story-title" className="story__title" data-reveal>
            I like making things and knowing how they work.
          </h2>
          <div className="story__body sc-stack" data-reveal data-reveal-stagger="60">
            <p>
              I’m a developer who enjoys working across the whole stack. Some days that
              means building a web interface. Other days it means rendering pixels in C++,
              writing a Minecraft plugin, or figuring out how to run a model across a
              cluster.
            </p>
            <p>
              I’m currently building{" "}
              <Link viewTransition to="/projects#illatio">
                Illatio
              </Link>
              , a self-hosted inference platform with a Go manager, an operator CLI, and a
              web console. It brings together the parts I enjoy most: systems,
              infrastructure, and making complicated things understandable.
            </p>
            <p>
              Along the way, I’ve built open-source tools like Image Viewer and
              EaglerXSkinBridge. I’m happiest when a project gives me something new to
              learn and something useful to ship.
            </p>
            <p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                github.com/arfjdms1<span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="approach" data-folio="How I work" aria-labelledby="approach-title">
        <h2 id="approach-title" className="approach__title" data-reveal>
          Care in the details. Clarity in the bigger picture.
        </h2>
        <dl className="approach__list" data-reveal data-reveal-stagger="70">
          {approach.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="toolkit" data-folio="Toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit__grid">
          <h2 id="toolkit-title" className="toolkit__title" data-reveal>
            A range of tools. One hands‑on approach.
          </h2>
          <div className="sc-stack" data-reveal data-reveal-stagger="60">
            <dl className="label label--wide">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <dt>{group.title}</dt>
                  <dd>{group.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
            <p className="toolkit__offer">
              Have a project in mind? I’m available for web apps, Minecraft plugins,
              hosting setup, and custom development.{" "}
              <a href={`mailto:${profile.email}`}>Email me</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
