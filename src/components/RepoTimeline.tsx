import { activity } from "@/data/activity";

// One block per public repository, stacked in the month it was started.
// Ember blocks are the projects this site shows as work.
export function RepoTimeline() {
  const total = activity.reduce((n, month) => n + month.repos.length, 0);
  const summary = activity
    .filter((month) => month.repos.length)
    .map((month) => `${month.label} ${month.month.slice(0, 4)}: ${month.repos.map((r) => r.name).join(", ")}`)
    .join("; ");
  return (
    <figure className="timeline">
      <div
        className="timeline__plot"
        role="img"
        aria-label={`${total} public repositories by month started. ${summary}.`}
        data-sc-in
        data-sc-stagger="30"
      >
        {activity.map((month) => (
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
            <span className="timeline__label">
              {month.label === "Jan" || month === activity[0] ? (
                <>
                  {month.label}
                  <b>{month.month.slice(2, 4)}</b>
                </>
              ) : (
                month.label.slice(0, 1)
              )}
            </span>
          </div>
        ))}
      </div>
      <figcaption>
        <span className="timeline__key" aria-hidden="true" /> Image Viewer, EaglerXSkinBridge
        and this site. {total} public repositories I started, by month; forks left out. From
        the GitHub API, 2 November 2026.
      </figcaption>
    </figure>
  );
}
