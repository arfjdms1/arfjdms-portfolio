import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { PageMeta } from "@/components/PageMeta";

export function NotFound() {
  return (
    <section className="container page-intro not-found">
      <PageMeta
        title="Page not found — arfjdms"
        description="This page could not be found. Explore Aarav Khemka’s portfolio and projects."
        noIndex
      />
      <span className="eyebrow">404 / A WRONG TURN</span>
      <h1>
        Nothing here.
        <br />
        <span>Plenty to explore.</span>
      </h1>
      <p>This page may have moved, or the link might be incomplete.</p>
      <Link viewTransition to="/" className="button button-primary">
        Back to the portfolio <Icon name="arrow" />
      </Link>
    </section>
  );
}
