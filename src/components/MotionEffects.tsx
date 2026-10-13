import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const tiltSelector = ".project-card, .case-art, .identity-card, .orbital-art";

export function MotionEffects() {
  const { pathname } = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("portfolio-motion-paused") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const shell = document.getElementById("top");
    shell?.classList.toggle("motion-paused", paused || reduced);
    try {
      localStorage.setItem("portfolio-motion-paused", String(paused));
    } catch {
      // The control still works if the browser disallows local storage.
    }
    return () => shell?.classList.remove("motion-paused");
  }, [paused, reduced]);

  useEffect(() => {
    const progress = progressRef.current;
    const halo = haloRef.current;
    if (!progress || !halo) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTarget: Element | null = null;
    let currentCard: HTMLElement | null = null;
    let pointerVisible = false;

    const resetCard = () => {
      if (!currentCard) return;
      currentCard.style.removeProperty("--tilt-x");
      currentCard.style.removeProperty("--tilt-y");
      currentCard.style.removeProperty("--spotlight-x");
      currentCard.style.removeProperty("--spotlight-y");
      currentCard = null;
    };

    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      progress.style.transform = `scaleX(${fraction})`;

      if (paused || reduced || !finePointer.matches || !pointerVisible) {
        halo.style.opacity = "0";
        resetCard();
        return;
      }
      halo.style.opacity = "1";
      halo.style.transform = `translate3d(${pointerX - 240}px, ${pointerY - 240}px, 0)`;
      const card = pointerTarget?.isConnected
        ? pointerTarget.closest<HTMLElement>(tiltSelector)
        : null;
      if (card !== currentCard) resetCard();
      currentCard = card;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (pointerX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (pointerY - rect.top) / rect.height));
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      card.style.setProperty("--spotlight-x", `${x * 100}%`);
      card.style.setProperty("--spotlight-y", `${y * 100}%`);
    };

    // One frame per input event; no render loop or React updates on pointer movement.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerTarget = event.target instanceof Element ? event.target : null;
      pointerVisible = true;
      schedule();
    };
    const onLeave = () => {
      pointerVisible = false;
      schedule();
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) onLeave();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    finePointer.addEventListener("change", schedule);
    if (!paused && !reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("blur", onLeave);
    }
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resetCard();
      halo.style.opacity = "0";
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onLeave);
      finePointer.removeEventListener("change", schedule);
    };
  }, [paused, reduced, pathname]);

  useEffect(() => {
    if (!window.IntersectionObserver || paused || reduced) return;
    const artwork = document.querySelectorAll(
      ".project-art, .orbital-art, .identity-card",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle(
            "motion-offscreen",
            !entry.isIntersecting,
          );
        }
      },
      { rootMargin: "100px" },
    );
    artwork.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      artwork.forEach((element) =>
        element.classList.remove("motion-offscreen"),
      );
    };
  }, [pathname, paused, reduced]);

  return (
    <>
      <div className="ambient-field" aria-hidden="true">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-orb ambient-orb-three" />
        <div className="ambient-grid" />
      </div>
      <div className="pointer-halo" ref={haloRef} aria-hidden="true" />
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
      <button
        className="motion-toggle"
        type="button"
        hidden={reduced}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          {paused ? (
            <path d="M3 1.5 10 6l-7 4.5Z" fill="currentColor" />
          ) : (
            <path d="M3 2v8m6-8v8" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
        {paused ? "Resume animations" : "Pause animations"}
      </button>
    </>
  );
}
