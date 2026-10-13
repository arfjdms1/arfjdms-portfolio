# arfjdms portfolio

Personal portfolio for Aarav Khemka at [arfjdms.me](https://arfjdms.me).
Built with React, TypeScript, Vite, and Tailwind CSS. The three main pages are
Overview, Work, and About.

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
rules. The existing Pages workflow builds and deploys updates to `main`.

## Content

Edit personal information, project copy, links, and tool groups in
`src/data/projects.ts`. Illatio is an inference project in development; its
`illatio.dev` link is intentionally accompanied by an availability note.
Its repositories are private and are not linked from this portfolio.

The visual system uses black, ember red, and orange. `src/index.css` contains
the layout, `src/motion.css` supplies shared effects, and `src/forge.css` styles
the final palette and interactive architecture explorer.

Project visuals are illustrative vector/CSS artwork. The hero's torus is
projected from 3D geometry onto a canvas, with an SVG fallback. Motion includes
an animated background, orbiting details, staggered entrances, kinetic text,
scrolling technology strip, pointer-reactive cards, and animated illustrations.
The architecture explorer is keyboard accessible and explains the real projects.
Motion honors reduced-motion settings and has a persistent pause control.
Pointer effects use event-driven animation frames; the canvas draws at up to
30 frames per second and pauses offscreen, in hidden tabs, or when motion is
disabled. There are no tracking scripts or
contact-form services; contact uses email links and a copy-address button.
