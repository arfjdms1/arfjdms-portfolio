import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { pageMeta } from "@/data/meta";

export function NotFound() {
  return (
    <section className="page-head page-head--lost" data-folio="Not found" aria-labelledby="lost-title">
      <PageMeta meta={pageMeta.notFound} />
      <div className="page-head__inner" data-reveal data-reveal-stagger="70">
        <h1 id="lost-title" className="page-head__title">
          Nothing here. Plenty to explore.
        </h1>
        <p className="page-head__dek">
          This page may have moved, or the link might be incomplete.
        </p>
        <p className="page-head__index">
          <Link viewTransition to="/">
            Overview
          </Link>
          <Link viewTransition to="/projects">
            Work
          </Link>
          <Link viewTransition to="/about">
            About
          </Link>
        </p>
      </div>
    </section>
  );
}
