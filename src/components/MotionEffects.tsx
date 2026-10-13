import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const tiltSelector =
  ".project-card, .case-art, .identity-card, .orbital-art, .capability, .lab-console";

export function MotionEffects() {
  const { pathname } = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const shell = document.getElementById("top");
    shell?.classList.toggle("motion-reduced", reduced);
    try {
      localStorage.removeItem("portfolio-motion-paused");
    } catch {
      // Reduced motion follows the system even when storage is unavailable.
    }
    return () => shell?.classList.remove("motion-reduced");
  }, [reduced]);

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
    let currentButton: HTMLElement | null = null;
    let pointerVisible = false;
    const scene = document.querySelector<HTMLElement>(".orbital-art");
    const header = document.querySelector<HTMLElement>(".site-header");

    const resetCard = () => {
      if (!currentCard) return;
      currentCard.style.removeProperty("--tilt-x");
      currentCard.style.removeProperty("--tilt-y");
      currentCard.style.removeProperty("--spotlight-x");
      currentCard.style.removeProperty("--spotlight-y");
      currentCard.style.removeProperty("--pointer-x");
      currentCard.style.removeProperty("--pointer-y");
      currentCard = null;
    };
    const resetButton = () => {
      currentButton?.style.removeProperty("--magnet-x");
      currentButton?.style.removeProperty("--magnet-y");
      currentButton = null;
    };

    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      progress.style.transform = `scaleX(${fraction})`;
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
      scene?.style.setProperty(
        "--scene-scroll",
        reduced ? "0px" : `${-Math.min(window.scrollY, 700) * 0.045}px`,
      );

      if (reduced || !finePointer.matches || !pointerVisible) {
        halo.style.opacity = "0";
        resetCard();
        resetButton();
        return;
      }
      halo.style.opacity = "1";
      halo.style.transform = `translate3d(${pointerX - 240}px, ${pointerY - 240}px, 0)`;
      const card = pointerTarget?.isConnected
        ? pointerTarget.closest<HTMLElement>(tiltSelector)
        : null;
      if (card !== currentCard) resetCard();
      currentCard = card;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (pointerX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (pointerY - rect.top) / rect.height));
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
        card.style.setProperty("--spotlight-x", `${x * 100}%`);
        card.style.setProperty("--spotlight-y", `${y * 100}%`);
        card.style.setProperty("--pointer-x", `${(x - 0.5) * 22}px`);
        card.style.setProperty("--pointer-y", `${(y - 0.5) * 22}px`);
      }
      const button = pointerTarget?.isConnected
        ? pointerTarget.closest<HTMLElement>(".button-primary, .nav-contact")
        : null;
      if (button !== currentButton) resetButton();
      currentButton = button;
      if (button) {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${(pointerX - rect.left - rect.width / 2) * 0.07}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${(pointerY - rect.top - rect.height / 2) * 0.12}px`,
        );
      }
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
    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("blur", onLeave);
    }
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resetCard();
      resetButton();
      scene?.style.removeProperty("--scene-scroll");
      halo.style.opacity = "0";
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onLeave);
      finePointer.removeEventListener("change", schedule);
    };
  }, [reduced, pathname]);

  useEffect(() => {
    if (!window.IntersectionObserver || reduced) return;
    const artwork = document.querySelectorAll(
      ".project-art, .orbital-art, .identity-card, .lab-console, .kinetic-band, .expertise-strip",
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
  }, [pathname, reduced]);

  return (
    <>
      <div className="ambient-field" aria-hidden="true">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-orb ambient-orb-three" />
        <div className="ambient-ribbon ambient-ribbon-one" />
        <div className="ambient-ribbon ambient-ribbon-two" />
        <div className="ambient-grid" />
      </div>
      <div className="pointer-halo" ref={haloRef} aria-hidden="true" />
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
    </>
  );
}
