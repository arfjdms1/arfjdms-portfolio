import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { projects, skills } from "@/data/projects";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const easeOut = [0.22, 0.1, 0.22, 1] as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: easeOut } },
};

export function Home() {
  return (
    <>
      <Helmet>
        <title>arfjdms — Developer & Builder</title>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/15 bg-orange-500/[0.04] mb-10"
          >
            <span className="pulse-dot" />
            <span className="text-xs font-medium text-orange-400/80">Available for projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.1, 0.22, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.95]"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">arfjdms</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.1, 0.22, 1] }}
            className="mt-8 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            I build software, run infrastructure, and ship products that people use.
            Founder of Open Ember game hosting, open-source contributor, and full-stack developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 text-center"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/arfjdms1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/[0.08] text-neutral-300 font-medium text-sm hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03] transition-all duration-200 text-center"
            >
              GitHub Profile
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-14 flex items-center justify-center gap-8 text-neutral-600 text-sm"
          >
            {["C++", "React", "TypeScript", "Kotlin"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
                {t}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Preview */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              What I Build
            </h2>
            <p className="mt-3 text-neutral-400 text-lg">
              From hosting platforms to proxy plugins — things that run reliably.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.22, 1] }}
              >
                <Link to={`/projects#${project.slug}`} className="block h-full">
                  <div className="card-border card-glow h-full p-6">
                    <div className="flex items-start mb-4">
                      {project.type === "business" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-semibold uppercase tracking-wider">
                          Business
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      {project.tagline}
                    </p>
                    <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-white/[0.03] text-neutral-500 text-[11px] font-medium border border-white/[0.04]">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.03] text-neutral-600 text-[11px] font-medium border border-white/[0.04]">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors link-underline">
              View all projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Skills */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-white/[0.04]">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tech Stack
            </h2>
            <p className="mt-3 text-neutral-400">Technologies I work with daily.</p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                className="px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm font-medium text-neutral-300 hover:text-orange-300 hover:border-orange-500/20 hover:bg-orange-500/[0.04] transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32 text-center">
          <div className="card-border card-glow p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Got a project in mind? Whether it&apos;s a Minecraft plugin, game server setup,
              a web app, or something custom — reach out and let&apos;s build it.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:aaravkhemka9@gmail.com"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20 text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
              <a
                href="https://github.com/arfjdms1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/[0.08] text-neutral-300 font-medium text-sm hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03] transition-all duration-200 text-center"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
