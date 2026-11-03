# SITE: arfjdms

The site contract. Written by the `portfolio-home` preset once the home page
passed Step 5; read by `project-page` and `subpage`, which copy it exactly.
Changing a value here changes every page, so change it here first and then
rebuild the pages, never the other way round.

## Identity

- **Site:** arfjdms, https://arfjdms.me (GitHub Pages, `gh-pages` branch)
- **Owner:** Aarav Khemka
- **Grammar:** Chaptered editorial, chosen in `BRIEF.home.md`
- **The one action:** `Email me`, `mailto:aaravkhemka9@gmail.com`. Same label on
  every page. In running text it is set as "Email me at aaravkhemka9@gmail.com."

## Tokens

Loaded after `scroll-craft-kit/styles.css` on every page, from one file:
`src/styles/site.css`. No page overrides any of these.

```css
:root {
  --sc-canvas:      #0d0b0a;
  --sc-surface:     #171412;
  --sc-ink:         #f2ece4;
  --sc-ink-soft:    #a89d92;
  --sc-accent:      #ff6b35;
  --sc-accent-ink:  #140b07;
  --sc-font-display: "Archivo Variable", "Archivo", system-ui, sans-serif;
  --sc-font-text:    "Geist Variable", "Geist", system-ui, sans-serif;
  --sc-font-mono:    "Geist Mono Variable", "Geist Mono", ui-monospace, monospace;
  --sc-shadow-color: 20 30% 2%;

  /* Grounds. Chapters cut hard between these; nothing interpolates. */
  --ground-title: #0d0b0a;  /* title page, page heads */
  --ground-work:  #141110;  /* work chapters, alternate case studies */
  --ground-under: #080706;  /* the peak only */
  --ground-paper: #eee7dd;  /* the person: home chapter III and /about */
  --ground-ember: #ff6b35;  /* the colophon only */
}
```

Two derived ground classes, both in `site.css`:

- `.ground-paper` re-inks to `#17110d` / `#5c5249`, accent `#b4380f` (same hue,
  darker stop for the light ground), and restates `color`.
- `.colophon` inks `#140b07` / `#4a2414` on ember; its accent (links, focus
  ring) is the dark ink.

Measured on the render, 2 November 2026: every text element on `/`,
`/projects`, `/about` and the 404 clears WCAG AA. Lowest is the colophon's
small print at 4.77:1.

## Fonts

| Role | Family | Weights | Source |
|---|---|---|---|
| Display | Archivo (variable, `wdth` 62–125 and `wght`) | 640–780, stretch 106–125% | `@fontsource-variable/archivo/wdth.css` |
| Text | Geist (variable) | 400–600 | `@fontsource-variable/geist` |
| Data, code, labels | Geist Mono (variable) | 400–500 | `@fontsource-variable/geist-mono` |

Self-hosted through Fontsource, imported in `src/main.tsx`. Mono is for code,
program output, hex, figure captions and label keys only.

## Nav

One component, `src/components/Masthead.tsx`, rendered by `App.tsx` above
every page:

```html
<header class="masthead">
  <a class="masthead__mark" href="/" aria-label="arfjdms, home">arfjdms<span aria-hidden="true">.</span></a>
  <nav class="masthead__pages" aria-label="Pages">
    <a href="/" aria-current="page">Overview</a>
    <a href="/projects">Work</a>
    <a href="/about">About</a>
  </nav>
  <nav class="masthead__out" aria-label="Elsewhere">
    <a href="https://github.com/arfjdms1" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    <a class="masthead__cta" href="mailto:aaravkhemka9@gmail.com">Email me</a>
  </nav>
</header>
```

- **Behaviour:** static (not fixed), current page marked with `aria-current`
  and an ember underline. On a phone the page links drop to a second row; all
  five links stay visible, no menu button.
- **GitHub and contact** are in the nav, so they are inside the first viewport
  on every page. Measured: top 34px at 1440×900, top 22px at 390×844.
- **Folio:** `src/components/Folio.tsx`, fixed in the left margin from 1180px
  up. Any element with `data-folio="…"` names a chapter; a `data-tone`
  ancestor (`light`, `ember`) re-inks it. Every new section gets a
  `data-folio`.

## Footer

One component, `src/components/Colophon.tsx`, after every page. It is outside
the scroll stage because its copy button re-renders.

```html
<footer class="colophon" id="contact" data-folio="Colophon" data-tone="ember">
  <p class="colophon__ask">Have a web app, a Minecraft plugin, or the infrastructure behind it in mind?
    <span class="colophon__line">Email me at <a href="mailto:aaravkhemka9@gmail.com">aaravkhemka9@gmail.com</a>.</span></p>
  <!-- availability note, "Copy the address" button with a role=status line -->
  <!-- small print: arfjdms. · © year · GitHub ↗ · Source ↗ · typefaces · Back to top -->
</footer>
```

## Motion rules

| Page type | Acts allowed | Devices | Max span |
|---|---|---|---|
| Home (`portfolio-home`) | 5 chapters | `data-reveal` rises, a `data-reveal="wipe"` on plates, one pin (the peak), a `data-count-to` in prose | total about 6vh at 1440×900; peak 2.1vh |
| Project (`project-page`) | ≤ 1 | `pin` of a real artifact, or none | motion section ≤ 3vh |
| Other (`subpage`) | 0 | `data-reveal` only | as long as the text |

- **Prerendered:** every page is rendered to HTML at build time
  (`src/entry-server.tsx`, `scripts/postbuild.mjs`) and hydrated in the
  browser. Content must read correctly with JavaScript off: anything that only
  makes sense live (the decode readout, the copy button) hides under
  `html:not(.js)` or until its script marks it live.
- **Reveals:** `src/reveal.ts`, not the engine's `data-sc-in`. Visible by
  default; only elements still below the fold are hidden, they start a fifth
  of a viewport early, appear instantly on a fast scroll or a missed reveal,
  never hide under reduced motion, and a script error reveals everything.
  Focus inside a hidden block reveals it at once.

- **Signature move:** Bytes to skin (`src/components/SkinDecode.tsx`). Lives on
  the home page only.
- **Hero figure:** `src/components/SkinFigure.tsx`, the same skin as a CSS-3D
  model (`public/skin/sample.png`). Head follows a fine pointer, the body turns
  as the title page scrolls away; still under reduced motion. Home only.
- **Person chapter:** `src/components/RepoTimeline.tsx`, public repositories
  by month from `src/data/activity.ts` (GitHub API, forks left out).
- **Drift:** none. Grounds are painted per section and change on a hard edge.
- **No** scrub, spotlight, magnet, kinetic stacks or scroll cues anywhere.
- **Reduced motion:** nothing is hidden and nothing reveals; the counter shows
  its final number; the peak's decode still follows scroll (it is state, not
  movement) and the figure fades in place instead of assembling.
- Markup inside `<ScrollStage>` is static. Anything that re-renders goes
  outside it, like the colophon.

## Asset conventions

- **Screenshots:** `public/shots/<slug>-<view>.webp`, real captures only, with
  the capture date in the caption.
- **Program output and code:** quoted as text in `src/data/exhibits.ts`, with
  the repository, commit and line range in a comment and in the caption.
- **Recordings (none yet):** `public/clips/<slug>.mp4` and `<slug>-m.mp4`,
  encoded with the skill's `encode.sh`; poster `<slug>-poster.webp`.
- **Numbers:** measured, with the source noted in the page's brief. No number,
  no counter.
- Figures are numbered per page (`Fig. 1`), captioned under the plate, and
  never sit under type.

## Pages

| Page | Preset | Path | Brief |
|---|---|---|---|
| Home | portfolio-home | `/` | `BRIEF.home.md` |
| Work | subpage | `/projects` | `BRIEF.work.md` |
| About | subpage | `/about` | `BRIEF.about.md` |
| Not found | subpage | `*` | `BRIEF.about.md` (same rules, no content of its own) |

## Fingerprint row

The site's single row, also appended once to `scrollcraft/FINGERPRINTS.md`.
Pages added with `project-page` or `subpage` share it and add none.

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| arfjdms (portfolio) | Chaptered editorial | Static masthead (wordmark, 3 page links, GitHub, Email me) plus a fixed vertical margin folio naming the chapter | Title page: the name at poster scale beside a CSS-3D model of the sample skin that stands on the hairline and turns to the pointer and the scroll | flow/in title > reveal plates ×3 > pin 2.1vh bespoke decode > count in prose on paper > static ember colophon; 5 chapters, about 6.2vh at 1440×900 | Ember colophon plate, the action as a running-text email line plus copy button, holds | Bytes to skin: scroll runs EaglerXSkinBridge's ABGR8→ARGB loop over a hex dump, then the front faces assemble into the figure | Type-led warm black, deeper black for the peak, paper, ember; real screenshots and program output as captioned plates | vite preview :4173 |
