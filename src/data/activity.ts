// Public repositories Aarav started on GitHub, by the month each was created.
// Forks are left out. Read from `gh repo list arfjdms1 --visibility public`
// (createdAt, isFork) on 2 November 2026. `featured` marks the ones this site
// shows as work.
export type Repo = { name: string; featured?: boolean };

export const activity: { month: string; label: string; repos: Repo[] }[] = [
  { month: "2025-07", label: "Jul", repos: [{ name: "Echo" }, { name: "aichat" }, { name: "Youtube-Pro" }] },
  { month: "2025-08", label: "Aug", repos: [] },
  { month: "2025-09", label: "Sep", repos: [{ name: "StartedPyrodactle" }, { name: "Visually-Intresting-With-AI" }] },
  { month: "2025-10", label: "Oct", repos: [] },
  { month: "2025-11", label: "Nov", repos: [] },
  { month: "2025-12", label: "Dec", repos: [{ name: "test" }] },
  { month: "2026-01", label: "Jan", repos: [] },
  { month: "2026-02", label: "Feb", repos: [{ name: "coledge-c--" }, { name: "Bridge" }] },
  { month: "2026-03", label: "Mar", repos: [] },
  {
    month: "2026-04",
    label: "Apr",
    repos: [{ name: "EaglerXSkinBridge", featured: true }, { name: "archoss-skinbridge" }],
  },
  { month: "2026-05", label: "May", repos: [] },
  {
    month: "2026-06",
    label: "Jun",
    repos: [{ name: "Image-Viewer", featured: true }, { name: "basic-support-test" }],
  },
  { month: "2026-07", label: "Jul", repos: [{ name: "discord-next.js" }] },
  {
    month: "2026-08",
    label: "Aug",
    repos: [{ name: "arfjdms-portfolio", featured: true }, { name: "sixty-four-cursed-edition" }],
  },
  { month: "2026-09", label: "Sep", repos: [{ name: "std-reimplimentation" }] },
  { month: "2026-10", label: "Oct", repos: [{ name: ".github" }] },
  { month: "2026-11", label: "Nov", repos: [] },
];
