import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { profile } from "@/data/projects";

const links = [
  { label: "Overview", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onEscape);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link
          to="/"
          className="brand"
          aria-label="arfjdms, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span>
            arfjdms<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="github-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
          >
            <Icon name="github" />
          </a>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Icon name="external" />
          </a>
        </div>
        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          ref={buttonRef}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <Icon name="arrow" />
          </NavLink>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Let’s talk
          <Icon name="external" />
        </a>
      </nav>
    </header>
  );
}
