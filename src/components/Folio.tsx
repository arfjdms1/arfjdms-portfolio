import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// The running folio in the left margin: the chapter you are in, the way a
// printed book carries its section title. Any element with data-folio names a
// chapter; the one crossing the middle of the viewport wins.
export function Folio() {
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chapters = [...document.querySelectorAll<HTMLElement>("[data-folio]")];
    const out = label.current;
    const folio = root.current;
    if (!out || !folio || chapters.length === 0) return;
    // The folio sits over every ground, so it takes the tone of the chapter
    // under it: light ink on dark, dark ink on paper and on the ember plate.
    const show = (chapter: HTMLElement) => {
      out.textContent = chapter.dataset.folio ?? "";
      folio.dataset.tone = chapter.closest("[data-tone]")?.getAttribute("data-tone") ?? "dark";
    };
    show(chapters[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="folio" aria-hidden="true" ref={root} data-tone="dark">
      <span className="folio__mark">arfjdms</span>
      <span className="folio__rule" />
      <span className="folio__label" ref={label} />
    </div>
  );
}
