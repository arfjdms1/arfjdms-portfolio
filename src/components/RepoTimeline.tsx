import { activity, repoCounts } from "@/data/activity";

// One block per public repository Aarav started, stacked in the month it was
// created. Ember blocks are the projects this site shows as work. Month labels
// are one letter each; the year sits on its own row under its first month, so
// no label is ever wider than its column's neighbours allow.
export function RepoTimeline() {
  const summary = activity
    .filter((month) => month.repos.length)
    .map((month) => `${month.label} ${month.month.slice(0, 4)}: ${month.repos.map((r) => r.name).join(", ")}`)
    .join("; ");
  return (
    <figure className="timeline">
      <div
        className="timeline__plot"
        role="img"
        aria-label={`${repoCounts.started} public repositories started, by month. ${summary}.`}
        data-reveal
        data-reveal-stagger="30"
      >
        {activity.map((month, i) => {
          const firstOfYear = i === 0 || month.label === "Jan";
          return (
            <div className="timeline__month" key={month.month}>
              <div className="timeline__stack">
                {month.repos.map((repo) => (
                  <span
                    key={repo.name}
                    className={repo.featured ? "timeline__block is-featured" : "timeline__block"}
                    title={`${repo.name}, ${month.label} ${month.month.slice(0, 4)}`}
                  />
                ))}
              </div>
              <span className="timeline__label" aria-hidden="true">
                {month.label.slice(0, 1)}
              </span>
              <span className={firstOfYear ? "timeline__year is-start" : "timeline__year"} aria-hidden="true">
                {firstOfYear ? month.month.slice(0, 4) : ""}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption>
        The {repoCounts.started} public repositories I started, by month. The other{" "}
        {repoCounts.forks} of my {repoCounts.publicTotal} are forks and are left out.{" "}
        <span className="timeline__key" aria-hidden="true" />
        Ember: Image Viewer, EaglerXSkinBridge and this site. From the GitHub API, 2 November
        2026.
      </figcaption>
    </figure>
  );
}
