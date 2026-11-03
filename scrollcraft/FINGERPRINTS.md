# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| arfjdms (portfolio, 2026-11-02) | Chaptered editorial | Static masthead (wordmark, 3 page links, GitHub, Email me) plus a fixed vertical margin folio naming the chapter | Title page: the name at poster scale beside a CSS-3D model of the sample skin that stands on the hairline and turns to the pointer and the scroll (revised before shipping, after owner feedback) | flow/in title > reveal plates ×3 > pin 2.1vh bespoke decode > count in prose on paper > static ember colophon; 5 chapters, 6.2vh at 1440×900 | Ember colophon plate, the action as a running-text email line plus copy button, holds | Bytes to skin: scroll runs EaglerXSkinBridge's ABGR8→ARGB loop over a hex dump, then the front faces assemble into the figure | Type-led warm black, deeper black for the peak, paper, ember; real screenshots and program output as captioned plates | vite preview :4173 |


---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Chaptered editorial** with a static masthead and a vertical margin folio (arfjdms).
- **Title page of the name at poster scale** as a hero (arfjdms).
- **Ember colophon plate with the CTA as a running-text email line** (arfjdms).
- **Real code run by the scroll wheel** as a signature move: a hex dump decoded by a ported loop (arfjdms).
- **Hard ground cuts black / deeper black / paper / ember** across chapters (arfjdms).

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
