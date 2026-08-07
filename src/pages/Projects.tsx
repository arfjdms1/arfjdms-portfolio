import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects | arfjdms</title>
      </Helmet>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Projects</h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
              Things I&apos;ve built, shipped, and maintain.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <div id={project.slug} className="scroll-mt-24">
                <TiltCard>
                  <div className="card-border card-glow p-8 sm:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            project.type === "business" ? "bg-orange-500/10 text-orange-400" : "bg-green-500/10 text-green-400"
                          }`}>
                            {project.type === "business" ? "Business" : "Open Source"}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">{project.title}</h2>
                        <p className="mt-1.5 text-neutral-500 font-medium text-lg">{project.tagline}</p>
                        <p className="mt-5 text-neutral-300 leading-relaxed max-w-3xl">{project.longDescription}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.03] text-neutral-400 text-xs font-medium border border-white/[0.05]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg ${
                              project.type === "business"
                                ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-500/20 gradient-btn"
                                : "bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700"
                            }`}
                          >
                            {project.type === "business" ? "Visit Site" : "View Project"}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] text-neutral-300 text-sm font-medium hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03] transition-all duration-200"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="lg:w-56 flex-shrink-0">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                          <h4 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-4">Stats</h4>
                          <div className="flex flex-col gap-3.5">
                            {project.stats.map((stat) => (
                              <div key={stat.label}>
                                <p className="text-[10px] font-medium text-neutral-600 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-sm font-semibold text-white mt-0.5">{stat.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
