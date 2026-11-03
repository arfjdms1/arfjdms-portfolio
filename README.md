# arfjdms portfolio

Personal portfolio for Aarav Khemka at [arfjdms.me](https://arfjdms.me).
Built with React, TypeScript and Vite, with scroll driven by
[scroll-craft-kit](https://github.com/arfjdms1/scroll-craft-kit). The three
main pages are Overview, Work, and About.

## Development

Use Node.js 22+ and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

The build creates directory entry documents for `/projects/` and `/about/`,
plus a helpful 404 page, so direct links work on GitHub Pages without rewrite
rules. The source workflow validates updates to `main` and uploads a Pages
artifact. The repository's Pages environment permits the `gh-pages` branch.
Publish the built site through the configured Git remote with:

```sh
pnpm deploy
```

This preserves the publishing branch's commit history, includes `.nojekyll`,
and triggers GitHub's existing branch-based Pages deployment.

On Windows, a checkout under a very long path can push esbuild's binary past
the 260-character limit during install. Install with a short virtual store if
that happens: `pnpm install --virtual-store-dir C:/pnpm-vs`.

## scroll-craft-kit

`vendor/scroll-craft-kit` is the runtime part of scroll-craft-kit v0.2.0
(`dist/`, its license and the pinned upstream record), installed as
`"scroll-craft-kit": "file:vendor/scroll-craft-kit"`. The kit's repository is
private, so a `github:` dependency would fail in CI without a token; the
vendored copy keeps `pnpm install --frozen-lockfile` working anywhere. Its
`prepare` script is removed because `dist/` is already built. To update it,
build and `npm pack` the kit, unpack the tarball over this folder, and keep only
`dist/`, `LICENSE`, `upstream.json` and the trimmed `package.json`.

Every route renders inside one `<ScrollStage>` (`src/App.tsx`), keyed by path
so each page gets a fresh engine mount. Markup inside the stage stays static;
anything that re-renders (the colophon's copy button) lives outside it.

## Design

`SITE.md` is the site contract: tokens, fonts, nav, footer, motion rules and
asset conventions. `BRIEF.home.md` explains the home page: the grammar
(chaptered editorial), the feeling curve, and the signature move. Read both
before adding a page.

- `src/styles/site.css` holds the tokens and all layout. Chapters cut hard
  between four grounds: warm black, a deeper black for the peak, paper, and the
  ember colophon.
- Type is Archivo (display, with its width axis), Geist (text) and Geist Mono
  (data, code, labels), self-hosted through Fontsource.
- `src/components/SkinDecode.tsx` is the home page's "Underneath" chapter:
  EaglerXSkinBridge's ABGR8 to ARGB loop, ported line for line, decodes a
  sample skin as you scroll. `src/components/SkinFigure.tsx` is the same skin
  as a CSS-3D model on the title page. `scripts/make-sample-skin.mjs` draws the
  skin and regenerates both `src/data/sampleSkin.ts` and
  `public/skin/sample.png`.

## Content

Edit personal information, project copy, links, and tool groups in
`src/data/projects.ts`. The figures shown with each project live in
`src/data/exhibits.ts`, and each one records where it came from: a screenshot
of illatio.dev, Image Viewer's real output, and a quote of
`SkinConversionAgent.kt`. Illatio is an inference project in development; it
links to its live site, `illatio.dev`. Its repositories are private and are not
linked from this portfolio. A project can still carry a short note under its
link with the optional `linkNote` field.

Motion honours the system reduced-motion setting: reveals fade without moving,
and the skin figure fades in place instead of assembling. There are no tracking
scripts or contact-form services; contact uses email links and a copy-address
button.
