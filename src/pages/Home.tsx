import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ScrambleText";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TiltCard } from "@/components/TiltCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { projects, skills } from "@/data/projects";

const marqueeSkills = [
  "TypeScript", "React", "C++", "Kotlin", "Docker",
  "Minecraft Dev", "Linux", "CMake", "Tailwind CSS", "Python",
  "Velocity API", "Game Hosting", "Node.js", "Java",
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const easeOut = [0.22, 0.1, 0.22, 1] as const;
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: easeOut } },
};

const whyCards = [
  {
    title: "Full-Stack Expert",
    desc: "From kernel-level C++ to React frontends, I build across the entire stack with production-grade quality.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Business Owner",
    desc: "I run Open Ember, a game hosting company with real enterprise hardware and paying customers. I understand production.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "Open Source",
    desc: "My projects are public and MIT-licensed. EaglerXSkinBridge bridges Minecraft ecosystems, used on real servers.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    desc: "I ship quickly without sacrificing quality. Most projects go from idea to deployed in days, not weeks.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

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
            <ScrambleText
              text="arfjdms"
              speed={35}
              className="text-gradient"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 0.1, 0.22, 1] }}
            className="mt-8 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            I build software, run infrastructure, and ship products that people use.
            Founder of Open Ember game hosting, open-source contributor, and full-stack developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <MagneticButton>
              <Link
                to="/projects"
                className="block w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 text-center"
              >
                View Projects
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:aaravkhemka9@gmail.com"
                className="block w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/[0.08] text-neutral-300 font-medium text-sm hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03] transition-all duration-200 text-center"
              >
                Get in Touch
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 text-neutral-600 text-sm"
          >
            {["C++", "React", "TypeScript", "Kotlin"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
                {t}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { end: 2, suffix: "+", label: "Years Coding" },
            { end: 3, suffix: "+", label: "Major Projects" },
            { end: 7, suffix: "+", label: "GitHub Stars" },
            { end: 18, suffix: "+", label: "Repositories" },
          ].map((stat) => (
            <ScrollReveal key={stat.label}>
              <div className="text-center p-6 rounded-2xl glass">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={2000}
                  className="text-3xl sm:text-4xl font-extrabold text-gradient"
                />
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Why Choose Me */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why Work With Me
            </h2>
            <p className="mt-3 text-neutral-400 text-lg">
              More than just code — I bring experience and execution.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {whyCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <TiltCard>
                <div className="card-border card-glow p-7 h-full shine-overlay">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center text-orange-400 mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{card.desc}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Tech Marquee */}
      <section className="py-20 lg:py-24 overflow-hidden">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Tech I Use</h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="marquee-track py-4">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="px-5 py-2.5 mx-2 rounded-xl border border-white/[0.05] bg-white/[0.01] text-sm font-medium text-neutral-300 whitespace-nowrap hover:text-orange-300 hover:border-orange-500/20 transition-colors inline-block"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 text-neutral-400 text-lg">
              From hosting platforms to proxy plugins — things that run reliably.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.22, 1] }}
            >
              <TiltCard>
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
                    <p className="mt-1 text-sm font-medium text-neutral-500">{project.tagline}</p>
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
              </TiltCard>
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

      {/* Skills Grid */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Stack
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
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 text-center">
          <div className="card-border card-glow p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-neutral-300 leading-relaxed max-w-lg mx-auto">
              Got a project in mind? Whether it&apos;s a Minecraft plugin, game server setup, a web app, or something custom — reach out.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:aaravkhemka9@gmail.com"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20 text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                aaravkhemka9@gmail.com
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
