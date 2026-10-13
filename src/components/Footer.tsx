import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { profile } from "@/data/projects";

export function Footer() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
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
    <footer className="site-footer" id="contact">
      <div className="container contact-section">
        <div className="contact-intro">
          <span className="eyebrow">
            <span className="status-dot" /> OPEN FOR COLLABORATION
          </span>
          <h2>
            Have something
            <br />
            in <span>mind?</span>
          </h2>
          <p>
            A web app, a Minecraft plugin, or the infrastructure behind it.
            Let’s make it happen.
          </p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${profile.email}`}>
            Say hello <Icon name="external" />
          </a>
          <div className="email-row">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              className="copy-email"
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              <Icon name={copyStatus === "copied" ? "check" : "copy"} />
            </button>
          </div>
          <span className="copy-status" role="status">
            {copyStatus === "copied"
              ? "Email copied."
              : copyStatus === "failed"
                ? "Please select and copy the email address."
                : ""}
          </span>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" /> Find me on GitHub <Icon name="external" />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <Link viewTransition to="/" className="footer-brand">
          arfjdms<span>.</span>
        </Link>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <Link viewTransition to="/projects#illatio">
            Illatio <Icon name="arrow" />
          </Link>
          <a
            href="https://github.com/arfjdms1/arfjdms-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source <Icon name="external" />
          </a>
          <a href="#top" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
