import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { skills } from "@/data/projects";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const easeOut = [0.22, 0.1, 0.22, 1] as const;

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { ease: easeOut } },
};

export function About() {
  return (
    <>
      <Helmet>
        <title>About — arfjdms</title>
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              About Me
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Developer, founder, and open-source contributor.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div className="card-border card-glow p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                  <span className="text-3xl font-extrabold font-mono text-black">a</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Aarav Khemka
                  </h2>
                  <p className="text-orange-400 font-mono text-sm mt-1">@arfjdms</p>
                  <p className="mt-5 text-neutral-300 leading-relaxed max-w-2xl">
                    I&apos;m a developer and builder who loves creating things that people
                    actually use. From running a game hosting business to writing proxy
                    plugins and native C++ applications, I enjoy working across the entire
                    stack — from kernel to cloud.
                  </p>
                  <p className="mt-3 text-neutral-300 leading-relaxed max-w-2xl">
                    I founded Open Ember to provide premium Minecraft hosting on enterprise
                    hardware without the typical overselling and misleading specs. When I&apos;m
                    not managing infrastructure, I&apos;m writing open-source tools for the
                    Minecraft community and exploring low-level programming.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal delay={0.2}>
            <div className="card-border card-glow p-8 sm:p-10">
              <h3 className="text-xl font-bold text-white mb-6">
                Skills &amp; Tools
              </h3>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
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
            </div>
          </ScrollReveal>

          {/* Commissions */}
          <ScrollReveal delay={0.35}>
            <div className="card-border card-glow p-8 sm:p-10">
              <h3 className="text-xl font-bold text-white mb-2">
                Commissions
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                Interested in working together? I&apos;m available for freelance development —
                Minecraft plugins, hosting setup, web apps, and more.
              </p>
              <a
                href="mailto:aaravkhemka9@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                aaravkhemka9@gmail.com
              </a>
            </div>
          </ScrollReveal>

          {/* Connect */}
          <ScrollReveal delay={0.4}>
            <div className="card-border card-glow p-8 sm:p-10">
              <h3 className="text-xl font-bold text-white mb-6">
                Let&apos;s Connect
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/arfjdms1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/[0.08] text-neutral-300 text-sm font-medium hover:border-orange-500/20 hover:text-orange-400 hover:bg-orange-500/[0.04] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub @arfjdms1
                </a>
                <a
                  href="https://openember.host"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/20"
                >
                  Open Ember Hosting
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
