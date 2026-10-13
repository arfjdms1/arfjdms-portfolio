import { Link } from "react-router-dom";
import { OrbitalArtwork } from "@/components/Artwork";
import { Icon } from "@/components/Icon";
import { PageMeta } from "@/components/PageMeta";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BuildLab } from "@/components/BuildLab";
import { profile, projects, skillGroups } from "@/data/projects";

export function Home() {
  return (
    <>
      <PageMeta
        title="arfjdms — Aarav Khemka, Developer & Builder"
        description="Aarav Khemka builds software, inference infrastructure, and open-source tools. Explore Illatio, native C++ projects, and Minecraft tooling."
      />
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability">
            <span className="status-dot" /> Available for projects
          </div>
          <p className="eyebrow hero-eyebrow">
            AARAV KHEMKA / DEVELOPER & BUILDER
          </p>
          <h1 id="hero-title">
            <span className="hero-line">Ideas in.</span>
            <span className="hero-line hero-accent">Software out.</span>
          </h1>
          <p className="hero-description">
            I build across the stack, from the interface you see to the systems
            behind it. Software, inference infrastructure, and tools that solve
            real problems.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#selected-work">
              Explore my work <Icon name="arrow" />
            </a>
            <a
              className="button button-secondary"
              href={`mailto:${profile.email}`}
            >
              Get in touch <Icon name="external" />
            </a>
          </div>
          <div className="hero-current">
            <span className="current-icon">
              <Icon name="layers" />
            </span>
            <span>
              Currently building{" "}
              <Link to="/projects#illatio">
                Illatio <Icon name="external" />
              </Link>
            </span>
            <span className="mini-label">AI INFERENCE</span>
          </div>
        </div>
        <OrbitalArtwork />
        <a
          className="hero-scroll"
          href="#selected-work"
          aria-label="Scroll to selected work"
        >
          <span className="scroll-orbit">
            <span />
          </span>{" "}
          SCROLL TO EXPLORE
        </a>
      </section>
      <div className="expertise-strip">
        <div className="container">
          <span className="eyebrow">A FEW THINGS I WORK WITH</span>
          <div className="skills-marquee">
            <div className="skills-track">
              {[0, 1].map((copy) => (
                <div
                  className="skills-set"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {["TypeScript", "React", "Go", "C++", "Linux", "Docker"].map(
                    (skill) => (
                      <span key={skill}>{skill}</span>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section
        className="container work-section section"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <h2 id="work-title">
                Built with purpose.
                <br />
                <span>Down to the details.</span>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Different problems. Different tools.
                <br />
                The same curiosity to make things work.
              </p>
              <Link className="text-link" to="/projects">
                All projects <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              className={index === 0 ? "featured-wrapper" : ""}
              delay={index ? 0.06 : 0}
            >
              <ProjectCard
                project={project}
                featured={index === 0}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <BuildLab />

      <section className="about-preview" aria-labelledby="about-preview-title">
        <div className="container about-preview-grid">
          <ScrollReveal>
            <span className="eyebrow">03 / THE PERSON BEHIND THE CODE</span>
            <h2 id="about-preview-title">
              Curious by default.
              <br />
              Builder by choice.
            </h2>
            <Link className="text-link" to="/about">
              A little more about me <Icon name="arrow" />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p>
              I’m Aarav, also known as <strong>arfjdms</strong>. I like
              understanding how things work, then building something useful with
              what I learn.
            </p>
            <p>
              That curiosity takes me from pixels and native C++ applications to
              Minecraft tooling and self-hosted AI. Right now, I’m bringing it
              together in <Link to="/projects#illatio">Illatio</Link>.
            </p>
            <div className="about-signature">
              Aarav Khemka<span>DEVELOPER / BUILDER / ALWAYS LEARNING</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="container section capabilities-section"
        aria-labelledby="capabilities-title"
      >
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">04 / WHAT I BRING</span>
              <h2 id="capabilities-title">
                Across the stack.
                <br />
                <span>Close to the problem.</span>
              </h2>
            </div>
            <p className="section-heading-aside">
              I choose tools around the work,
              <br />
              and care about how the pieces fit.
            </p>
          </div>
        </ScrollReveal>
        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.05}>
              <div className="capability">
                <Icon name={group.icon} />
                <h3>{group.title}</h3>
                <p>
                  {
                    [
                      "Interfaces that make complex systems easier to use.",
                      "The foundations that keep software running.",
                      "Tools that connect players and ecosystems.",
                    ][index]
                  }
                </p>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <div className="kinetic-band" aria-hidden="true">
        <div className="kinetic-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              BUILD. <i>EXPLORE.</i> REPEAT. <b>✳</b>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
