import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "@/data/projects";

// The close of every page. An ember plate, small type, and the one action set
// as a sentence rather than a button. It sits outside the scroll stage because
// the copy button re-renders.
export function Colophon() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    timer.current = setTimeout(() => setCopyStatus("idle"), 3500);
  }

  return (
    <footer className="colophon" id="contact" data-folio="Colophon" data-tone="ember">
      <div className="colophon__inner">
        <p className="colophon__ask">
          Have a web app, a Minecraft plugin, or the infrastructure behind it in mind?{" "}
          <span className="colophon__line">
            Email me at{" "}
            <a className="colophon__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </span>
        </p>
        <div className="colophon__row">
          <p className="colophon__note">
            I’m available for web apps, Minecraft plugins, hosting setup, and custom
            development.
          </p>
          <div className="colophon__copy">
            <button type="button" onClick={copyEmail}>
              {copyStatus === "copied" ? "Copied" : "Copy the address"}
            </button>
            <span role="status">
              {copyStatus === "copied"
                ? "Email address copied."
                : copyStatus === "failed"
                  ? "Copying is blocked here. Select the address above instead."
                  : ""}
            </span>
          </div>
        </div>
        <div className="colophon__print">
          <Link viewTransition to="/" className="colophon__mark">
            arfjdms<span aria-hidden="true">.</span>
          </Link>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub<span aria-hidden="true"> ↗</span>
          </a>
          <a
            href="https://github.com/arfjdms1/arfjdms-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source<span aria-hidden="true"> ↗</span>
          </a>
          <span>Set in Archivo, Geist and Geist Mono. Scroll by scroll-craft.</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
