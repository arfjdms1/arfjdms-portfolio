// Reveal-on-scroll as a progressive enhancement.
//
// Every page is prerendered with its content visible. Nothing is hidden by the
// stylesheet on its own: an element only becomes hidden when this script marks
// it `rv-wait`, and it only does that for elements that are still below the
// fold at the moment it runs, so nothing the visitor can see ever blinks out.
// Those elements start revealing a fifth of a viewport before they reach the
// screen (the engine's own reveal waited until they were 12% inside it). If a fast
// scroll still gets there first, the element appears at once instead of
// fading in late, so the page never shows a blank band. Anything scrolled past
// (a jump to the footer, a hash link) is revealed too. Under reduced motion
// nothing is hidden at all, and a script error anywhere reveals everything.
//
//   data-reveal                  fade and rise, the site's flow reveal
//   data-reveal="wipe"           a clip-path wipe from the left, for plates
//   data-reveal-stagger="60"     children enter 60ms apart
//   data-count-to="23"           the number already in the markup counts up
//                                from 0 as it is revealed

const AHEAD = 0.2; // viewports below the screen at which reveals start
const LATE = 0.85; // a top already this far up the screen is a missed reveal
const FAST = 2.5; // viewports per second; scrolling faster reveals instantly
const STAGGER_CAP = 240; // ms; a long list never takes longer than this to land
const COUNT_MS = 1400;

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.countTo);
  const final = el.dataset.countFinal ?? String(target);
  if (!Number.isFinite(target)) return;
  let t0 = 0;
  const frame = (now: number) => {
    if (!t0) t0 = now;
    const t = Math.min((now - t0) / COUNT_MS, 1);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = t < 1 ? String(Math.round(target * eased)) : final;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function reveal(el: HTMLElement, instant: boolean) {
  if (!el.classList.contains("rv-wait")) return;
  const counters = el.querySelectorAll<HTMLElement>("[data-count-to]");
  if (instant) {
    // Too late to animate: show it now, final values and all.
    el.classList.add("rv-instant");
    el.classList.remove("rv-wait");
    counters.forEach((n) => (n.textContent = n.dataset.countFinal ?? n.textContent));
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("rv-instant")));
    return;
  }
  const stagger = Number(el.dataset.revealStagger);
  const kids = Array.from(el.children) as HTMLElement[];
  if (Number.isFinite(stagger) && stagger > 0 && kids.length > 1) {
    const step = Math.min(stagger, STAGGER_CAP / (kids.length - 1));
    kids.forEach((kid, i) => (kid.style.transitionDelay = `${Math.round(i * step)}ms`));
  }
  el.classList.remove("rv-wait");
  counters.forEach(countUp);
}

/** Marks below-the-fold reveals and watches them. Returns a cleanup. */
export function startReveals(root: ParentNode = document): () => void {
  const all = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (reduceMotion() || !all.length) return () => {};

  const fold = window.innerHeight;
  const waiting = new Set<HTMLElement>();
  for (const el of all) {
    // Only what is safely out of sight is hidden, so the swap is never seen.
    if (el.getBoundingClientRect().top > fold * 1.05) {
      el.classList.add("rv-wait");
      el.querySelectorAll<HTMLElement>("[data-count-to]").forEach((n) => {
        n.dataset.countFinal = n.textContent ?? "";
        n.textContent = "0";
      });
      waiting.add(el);
    }
  }
  if (!waiting.size) return () => {};

  let raf = 0;
  // Scroll speed, measured per scroll event over at most 100ms, so the first
  // event of a flick after a pause already reads as fast.
  let lastY = window.scrollY;
  let lastT = performance.now();
  let speed = 0;
  const measure = () => {
    const now = performance.now();
    const dt = Math.min(Math.max(now - lastT, 16), 100) / 1000;
    speed = Math.abs(window.scrollY - lastY) / window.innerHeight / dt;
    lastY = window.scrollY;
    lastT = now;
  };
  const check = () => {
    raf = 0;
    const vh = window.innerHeight;
    // A flick would outrun a 620ms fade and show half-faded blocks, so skip it.
    const fast = speed > FAST;
    for (const el of waiting) {
      const top = el.getBoundingClientRect().top;
      if (top < vh * (1 + AHEAD)) {
        waiting.delete(el);
        reveal(el, fast || top < vh * LATE);
      }
    }
    if (!waiting.size) stop();
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(check);
  };
  const onScroll = () => {
    measure();
    schedule();
  };
  const revealAll = () => {
    for (const el of waiting) reveal(el, true);
    waiting.clear();
    stop();
  };
  // Tab and hash jumps can land inside hidden content; show it at once.
  const onFocus = (event: FocusEvent) => {
    for (const el of waiting) {
      if (el.contains(event.target as Node)) {
        waiting.delete(el);
        reveal(el, true);
      }
    }
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("error", revealAll);
    document.removeEventListener("focusin", onFocus);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("error", revealAll);
  document.addEventListener("focusin", onFocus);
  schedule();

  // Leave nothing hidden behind on route change or unmount.
  return revealAll;
}
