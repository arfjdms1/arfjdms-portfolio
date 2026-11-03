import { Link, NavLink } from "react-router-dom";
import { profile } from "@/data/projects";

const pages = [
  { label: "Overview", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
];

// Static, not fixed: the editorial grammar has no bar that follows the reader.
// Five links, so nothing hides behind a menu button on a phone.
export function Masthead() {
  return (
    <header className="masthead">
      <Link viewTransition to="/" className="masthead__mark" aria-label="arfjdms, home">
        arfjdms<span aria-hidden="true">.</span>
      </Link>
      <nav className="masthead__pages" aria-label="Pages">
        {pages.map((page) => (
          <NavLink viewTransition key={page.to} to={page.to} end={page.to === "/"}>
            {page.label}
          </NavLink>
        ))}
      </nav>
      <nav className="masthead__out" aria-label="Elsewhere">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub<span aria-hidden="true"> ↗</span>
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a className="masthead__cta" href={`mailto:${profile.email}`}>
          Email me
        </a>
      </nav>
    </header>
  );
}
