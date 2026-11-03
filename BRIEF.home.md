# BRIEF: home (`/`)

**Preset:** `portfolio-home` (scroll-craft-kit 0.2.0)

**Self-authored under explicit creative delegation.** The request was "Edit my
portfolio site … make it look great, editing everything to look good, and use
the lib." No interview answers were given; every decision below is authored
and labelled. Facts about the work come from the existing site's data
(`src/data/projects.ts`), the public repositories, and illatio.dev.

## The eight topics

1. **Vibe.** *Authored:* printed, exact, warm-dark. A technical monograph
   with an ember plate at the back. References: a Swiss type specimen, a
   hex editor's offset column, the colophon page of a well-made book.
2. **Journey.** *Set by the portfolio-home preset:* the work first and fast,
   then the one moment of motion, then the person, then how to reach him.
3. **Energy curve.** *Authored:* calm title, brisk work, the peak held long,
   then quiet and quieter.
4. **Feeling, and the one moment.** See the feeling curve and peak below.
5. **The one thing no other site does (Q5).** *Authored:* the visitor runs
   Aarav's real code with their scroll wheel. EaglerXSkinBridge's ABGR8 to
   ARGB conversion loop, ported line for line from `SkinConversionAgent.kt`,
   decodes a hex dump into a Minecraft skin texture as they scroll.
6. **Distance from premium-minimal.** *Authored:* editorial with dense,
   brutalist edges (the "Dense" and "Editorial" families). Earned by a
   systems developer whose work is C++, Go, Kotlin and byte layouts.
7. **One world or distinct scenes.** *Set by the portfolio-home preset:*
   distinct scenes. Each chapter lands on its own ground with a hard cut.
8. **Existing assets (Q8).** *Found, not supplied:* no photography or
   footage. Real artifacts gathered on 2 November 2026:
   - `public/shots/illatio-dev-2026-11-02.webp`: screenshot of
     https://illatio.dev at 1440×900, retaken after the site's rework (it
     replaced the first capture, `illatio-home.webp`, the same day).
   - Image Viewer's real stdout: `source/main.cpp` from
     `arfjdms1/Image-Viewer@2b2d021`, compiled with `g++ -std=c++23 -static`
     (only the hard-coded `/home/ubuntu/…` path changed to `image1.png`) and
     run against the repo's own `image1.png`.
   - `SkinConversionAgent.kt` (`generatePNGBytes`) from
     `arfjdms1/EaglerXSkinBridge`, quoted and ported.
   - A sample skin drawn for this page by `scripts/make-sample-skin.mjs`.
     It is labelled as a sample on the page. No Mojang skin is used.

**The one action:** `Email me` → `mailto:aaravkhemka9@gmail.com`. One label,
everywhere (nav, colophon). The old site used three labels for it.

## Measured numbers

| Number | Where it came from |
|---|---|
| 16,384 bytes | 64 × 64 pixels × 4 bytes (ABGR8). Defined by the skin format |
| 23 public repositories, since March 2025 | `gh api users/arfjdms1` → `public_repos: 23`, `created_at: 2025-03-20`, read 2 Nov 2026 |
| `Got 15005 bytes of data.` and the other Image Viewer lines | stdout of the real program, see above |
| PNG byte count at the end of the peak | computed live in the visitor's browser by `canvas.toBlob`; labelled as the browser's encoder, not Java's |

## Feeling curve

```
1  Poise       the name at poster scale on a bare ground, nothing moving
2  Curiosity   three real artifacts wipe in: a live site, real program output, real source
3  Wonder      a still wall of hex starts decoding under the hand; a figure steps off the texture
4  Warmth      a hard cut to paper; a person speaks plainly; one real number ticks inside a sentence
5  Resolve     an ember plate, an email address set as a sentence, nothing moving
```

## The peak

> "I scrolled through a wall of raw bytes and they turned into a little hooded
> guy, pixel by pixel. It's his actual plugin code running."

Lives in act 3, **Underneath**. It gets the only pinned span on the page
(2.1 viewport-heights, the largest act; first planned at 2.3 and cut to fit
the length budget), the darkest ground, and every bit of the
bespoke JS.

**Authored silence:** the Underneath stage arrives with its hex wall already
filled and completely still. Nothing decodes until act progress 0.08. That
held, unmoving wall is deliberate; it is the quiet before the decode.

## Tell-someone sentence

> It's the site where you scroll through a hex dump and it turns into a
> Minecraft skin, decoded by the same loop his plugin runs.

## Grammar

**Chaptered editorial** (uniqueness.md §2.2). The preset allows only this and
Live surface. Live surface lost because it needs the page to *be* one product,
with app chrome as the nav and an input as the ending; a person with three
unrelated projects would have to fake a product to use it, and a fake IDE
portfolio is costume. Chaptered editorial fits a person's site that reads, and
its single allowed pinned chapter is exactly where the peak lives. The other
six grammars are excluded by the preset.

Constraints held: no fixed bar (static masthead plus a margin folio), title
page with no media above the fold, hard ground cuts (no drift), media in its
own column with a caption, colophon close with the CTA as running text, no
spotlight, no magnet, no scrub.

## Signature move

**Bytes to skin.** The Underneath chapter pins a hex dump of a 64×64 ABGR8
skin beside an empty 64×64 canvas. Act progress (`--sc-p`) is the decode
cursor: for every pixel it reads `a, b, g, r` and packs
`(a shl 24) or (r shl 16) or (g shl 8) or b`, exactly as `generatePNGBytes`
does, then paints it. The hex panel follows the cursor and highlights the four
bytes being read. When the texture is complete, its front faces lift off the
atlas and assemble into the standing figure. Real logic on labelled sample
data.

## Score

| Beat | Act | Device | Why this one |
|---|---|---|---|
| Poise | Title page | `flow` + `in` | A title page is already there; a staggered settle, nothing held |
| Curiosity | I. Work | `reveal` | Each plate is uncovered like evidence; a wipe is a change of state from blank to proof |
| Wonder | II. Underneath | `pin` + bespoke `--sc-p` decode | The frame must hold still so the bytes can change under the hand |
| Warmth | III. Person | `count` inside prose | One real number ticking in a sentence makes the person concrete |
| Resolve | Colophon | static flow, holds | The ending stands still on the ember ground |

Families: flow/in, reveal, pin, count (four). No family twice in a row. No
scrub (none allowed beyond one chapter; none used). Grid reachable without
passing a pinned act: Work comes before Underneath.

Length target: about 5.5 to 6 viewport-heights on desktop; the peak's 2.1 is
the largest act span by a visible margin (the next largest act is 0.86).

## Fingerprint gate

The registry at `scrollcraft/FINGERPRINTS.md` was empty: this is the first
build, so there is nothing to clear. The site's row is appended after Step 5.

## Revision after owner feedback, 2 November 2026

The owner's response to the first build was "Make it actually look good
please." Their request outranks the preset, so these changes override the
editorial grammar's "no media above the fold" for the title page:

- **Title page:** a CSS-3D model of the sample skin stands on the imprint's
  hairline beside the name, lit by one low ember light. Its head turns toward
  a fine pointer and the body rotates as the title page scrolls away. This is
  the hero's depth: ground light (far), the name (mid), the figure (near),
  with a contact shadow on the rule. It also sets up the peak: the same figure
  is what the bytes decode into.
- **Skin:** brighter palette (warm charcoal hoodie, ember sleeve bands and hood
  lining, indigo trousers, bone soles) so it reads on the dark grounds.
- **Work figures:** every plate has a label row; Fig. 2 is now a to-scale byte
  map of image1.png (chunk offsets parsed from the file) above the real
  output, with numbers and chunk names highlighted; Fig. 3 is syntax
  highlighted with line 357 marked.
- **Peak:** the readout is a panel directly under the copy with a decode
  meter; a low ember light behind the texture brightens as the figure
  assembles.
- **Person:** a pixel-block timeline of the 17 public repositories Aarav
  started, by month (GitHub API, forks left out), with the three featured
  projects in ember.

## Verification (Step 5), 2 November 2026

Against `vite preview` of the production build, with Edge (real h264 decoder;
no clips on this page anyway). Evidence is in `scrollcraft/lab/` (git-ignored
locally); `round1/` is the first pass, kept.

| Check | Result |
|---|---|
| `shoot.mjs` desktop 1440×900 | 6.2vh, acts flow > flow > flow > pin, no dead scroll, no console errors |
| `shoot.mjs` phone 390×844 | 7.5vh, no dead scroll |
| `shoot.mjs` reduced motion | 6.2vh, no dead scroll; reveals fade only, figure fades in place |
| Contrast (own pass, all text on `/`, `/projects`, `/about`, 404) | all clear AA; lowest 4.77:1 (colophon small print). The harness cannot grade this page: it has no engine cues |
| GitHub and Email me bounding boxes | inside the first viewport: top 34px at 1440×900, top 22px at 390×844 |
| Grid before any pinned act | yes: Work precedes the only pin |
| Peak is the largest act | 2.1vh; next largest act 0.86vh. Whole Work chapter 1.9vh at 1440 |
| Keyboard | order matches the page; first pass found focus landing on links still at opacity 0; fixed in `App.tsx` (reveal on focusin); second pass every focused element visible |
| Lint, typecheck, build | `oxlint` clean, `tsc -b` clean, `vite build` clean |

**Fixed between rounds:** hex lane labels overlapping the row above (removed);
peak headline breaking as "in. One"; a Work hairline overrunning the gutters;
Work running longer than the peak (7.6vh page, now 6.2); the phone peak's hex
column overlapping the texture; the 1024px peak's hex overlapping the readout;
the peak's copy column off the site grid; focus on invisible links.

**Not verified:** a real phone (iOS Safari, touch scrolling); Firefox and
Safari rendering of Archivo's width axis; the deployed GitHub Pages build.

**Length vs the preset:** 6.2vh at 1440×900 (5.6 before the colophon), 6.6 at
1280×800, 5.7 at 1920×1080. The phone is 7.5 because the plates stack.

### Round 3, after the revision

| Check | Result |
|---|---|
| `shoot.mjs` desktop / phone / reduced | 6.5vh / 8.2vh / 6.5vh, no dead scroll in any (`scrollcraft/lab/`; rounds 1 and 2 kept) |
| Overflow sweep, `/`, `/projects`, `/about` at 390, 768, 1024, 1180, 1254, 1366, 1440, 1920 | clean after two fixes below |
| Contrast | all text AA. The byte map's dark-on-ember labels measure about 4.9:1 by hand (the automated pass cannot read gradient fills) |
| Hero figure | head follows a fine pointer, body turns on scroll, still under reduced motion (checked by screenshot) |

**Owner-reported bug, fixed:** on `/projects` the "EaglerXSkinBridge" heading
was wider than its column at every desktop width, and the figure beside it
covered it. Long CamelCase names now carry break points (EaglerX / Skin /
Bridge) and the case-study heading size fits the column. Also fixed in the
sweep: the home Work pair's figures shrank to their content instead of filling
the column (an inherited `align-items: start`), the byte-map axis labels were
2.7:1, and the 3D figure and peak texture were undersized on tablets.

The page is now longer than the preset's 6vh (6.5 at 1440×900) because of the
timeline and the byte map; the peak is still the largest act.

## Feel check

Scrolled cold at reading pace, one word per chapter, then diffed:

| Chapter | Intended | Felt | Action |
|---|---|---|---|
| Title | Poise | Poise | none |
| I. Work | Curiosity | Trust | Fig. 3's caption now hands off: "The next chapter runs these lines on your screen. Watch it run ↓" |
| II. Underneath | Wonder | Delight | kept; the figure stepping off the texture is the largest change on the sheet |
| III. Person | Warmth | Relief, then warmth | kept; the paper cut does the work |
| Colophon | Resolve | Resolve | holds with content on the last screen |
