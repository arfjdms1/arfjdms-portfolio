import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="font-bold text-white text-sm">arfjdms</span>
            </Link>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Developer, builder, and game hosting founder. Building things that work.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-neutral-400 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-sm text-neutral-400 hover:text-white transition-colors">Projects</Link>
              <Link to="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">About</Link>
              <a href="https://openember.host" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Open Ember</a>
              <a href="https://github.com/arfjdms1/arfjdms-portfolio" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Page Source</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/arfjdms1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://openember.host"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
                aria-label="Open Ember"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </a>
              <a
                href="mailto:aaravkhemka9@gmail.com"
                className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} arfjdms. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>Made with</span>
            <svg className="w-3.5 h-3.5 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>using React &amp; Tailwind CSS</span>
          </div>
          <p className="text-xs text-neutral-600">arfjdms.me</p>
        </div>
      </div>
    </footer>
  );
}
