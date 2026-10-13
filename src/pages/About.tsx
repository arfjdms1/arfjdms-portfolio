import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { PageMeta } from "@/components/PageMeta";
import { ScrollReveal } from "@/components/ScrollReveal";
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
    <>
      <PageMeta
        title="About Aarav Khemka — arfjdms"
        description="Meet Aarav Khemka, the developer behind arfjdms. Building Illatio, native applications, and open-source Minecraft tools."
        path="/about"
      />
      <section className="container page-intro about-intro">
        <span className="eyebrow">A LITTLE ABOUT ME</span>
        <h1>
          Always curious.
          <br />
          <span>Usually building.</span>
        </h1>
        <p>Developer, systems enthusiast, and the person behind arfjdms.</p>
      </section>
      <section
        className="container about-story section"
        aria-labelledby="story-title"
      >
        <div className="identity-card">
          <div className="identity-monogram" aria-hidden="true">
            ak<span>.</span>
          </div>
          <div>
            <h2>Aarav Khemka</h2>
            <p>@arfjdms</p>
          </div>
          <span className="identity-status">
            <span className="status-dot" /> Available for projects
          </span>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" /> GitHub profile <Icon name="external" />
          </a>
        </div>
        <div className="story-copy">
          <span className="eyebrow">THE SHORT VERSION</span>
          <h2 id="story-title">
            I like making things
            <br />
            and knowing how they work.
          </h2>
          <p>
            I’m a developer who enjoys working across the whole stack. Some days
            that means building a web interface. Other days it means rendering
            pixels in C++, writing a Minecraft plugin, or figuring out how to
            run a model across a cluster.
          </p>
          <p>
            I’m currently building{" "}
            <Link viewTransition to="/projects#illatio">
              Illatio
            </Link>
            , a self-hosted inference platform with a Go manager, an operator
            CLI, and a web console. It brings together the parts I enjoy most:
            systems, infrastructure, and making complicated things
            understandable.
          </p>
          <p>
            Along the way, I’ve built open-source tools like Image Viewer and
            EaglerXSkinBridge. I’m happiest when a project gives me something
            new to learn and something useful to ship.
          </p>
        </div>
      </section>
      <section className="approach-section">
        <div className="container section">
          <span className="eyebrow">HOW I THINK ABOUT THE WORK</span>
          <h2>
            Care in the details.
            <br />
            Clarity in the bigger picture.
          </h2>
          <div className="approach-grid">
            {approach.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.04}>
                <div className="approach-item">
                  <span className="approach-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container section" aria-labelledby="toolkit-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MY TOOLKIT</span>
            <h2 id="toolkit-title">
              A range of tools.
              <br />
              <span>One hands-on approach.</span>
            </h2>
          </div>
        </div>
        <div className="toolkit-grid">
          {skillGroups.map((group) => (
            <div className="toolkit-group" key={group.title}>
              <Icon name={group.icon} />
              <h3>{group.title}</h3>
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="commission-note">
          <span className="status-dot" />
          <p>
            <strong>Have a project in mind?</strong> I’m available for web apps,
            Minecraft plugins, hosting setup, and custom development.
          </p>
          <a className="text-link" href="#contact">
            Let’s talk <Icon name="arrow" />
          </a>
        </div>
      </section>
    </>
  );
}
