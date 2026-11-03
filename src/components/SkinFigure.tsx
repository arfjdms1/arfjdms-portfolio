import { useEffect, useRef, type CSSProperties } from "react";

// The sample skin as a 3D model, built from CSS boxes the way a skin viewer
// builds it: every part is a box, and each face shows its own patch of the
// 64x64 texture in the standard skin layout. It turns toward the pointer and
// rotates away as the title page scrolls off.

type Box = {
  name: string;
  u: number; // texture origin of the box's UV net
  v: number;
  w: number; // size in texels
  h: number;
  d: number;
  x: number; // centre, in texels, from the figure's centre (y points down)
  y: number;
  k?: number; // inflation, for the hood layer
};

const BODY: Box[] = [
  { name: "right-leg", u: 0, v: 16, w: 4, h: 12, d: 4, x: -2, y: 10 },
  { name: "left-leg", u: 16, v: 48, w: 4, h: 12, d: 4, x: 2, y: 10 },
  { name: "right-arm", u: 40, v: 16, w: 4, h: 12, d: 4, x: -6, y: -2 },
  { name: "left-arm", u: 32, v: 48, w: 4, h: 12, d: 4, x: 6, y: -2 },
  { name: "body", u: 16, v: 16, w: 8, h: 12, d: 4, x: 0, y: -2 },
];
const HEAD: Box[] = [
  { name: "head", u: 0, v: 0, w: 8, h: 8, d: 8, x: 0, y: 0 },
  { name: "hood", u: 32, v: 0, w: 8, h: 8, d: 8, x: 0, y: 0, k: 1.125 },
];

function faces({ u, v, w, h, d }: Box) {
  return [
    { side: "front", bx: u + d, by: v + d, fw: w, fh: h, tz: d / 2 },
    { side: "back", bx: u + d + w + d, by: v + d, fw: w, fh: h, tz: d / 2 },
    { side: "right", bx: u, by: v + d, fw: d, fh: h, tz: w / 2 },
    { side: "left", bx: u + d + w, by: v + d, fw: d, fh: h, tz: w / 2 },
    { side: "top", bx: u + d, by: v, fw: w, fh: d, tz: h / 2 },
    { side: "bottom", bx: u + d + w, by: v, fw: w, fh: d, tz: h / 2 },
  ];
}

const vars = (values: Record<string, number>) =>
  Object.fromEntries(Object.entries(values).map(([k, n]) => [`--${k}`, n])) as CSSProperties;

function BoxModel({ box }: { box: Box }) {
  return (
    <span className="fig__box" style={vars({ x: box.x, y: box.y, k: box.k ?? 1 })}>
      {faces(box).map((face) => (
        <span
          key={face.side}
          className={`fig__face fig__face--${face.side}`}
          style={vars({ bx: face.bx, by: face.by, fw: face.fw, fh: face.fh, tz: face.tz })}
        />
      ))}
    </span>
  );
}

const ease = (from: number, to: number, rate: number) => from + (to - from) * rate;

export function SkinFigure() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const target = { px: 0, py: 0, scroll: 0 };
    const now = { px: 0, py: 0, scroll: 0 };
    let raf = 0;
    let visible = true;

    const paint = () => {
      el.style.setProperty("--ry", `${-26 + now.px * 24 + now.scroll * 70}deg`);
      el.style.setProperty("--rx", `${8 - now.py * 4}deg`);
      el.style.setProperty("--hy", `${now.px * 20}deg`);
      el.style.setProperty("--hx", `${-now.py * 12}deg`);
      el.style.setProperty("--lift", `${now.scroll * -14}%`);
    };
    const tick = () => {
      raf = 0;
      const rate = 0.09;
      now.px = ease(now.px, target.px, rate);
      now.py = ease(now.py, target.py, rate);
      now.scroll = ease(now.scroll, target.scroll, 0.2);
      paint();
      const moving =
        Math.abs(now.px - target.px) + Math.abs(now.py - target.py) + Math.abs(now.scroll - target.scroll) >
        0.0005;
      if (moving && visible) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible && !reduce.matches) raf = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height * 0.3;
      target.px = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth * 0.5)));
      target.py = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight * 0.6)));
      kick();
    };
    const onScroll = () => {
      target.scroll = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
      kick();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(el);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (reduce.matches) {
      // A still, three-quarter pose. Nothing follows the pointer or the scroll.
      target.scroll = now.scroll = 0;
      paint();
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fig" ref={root} aria-hidden="true">
      <span className="fig__floor" />
      <span className="fig__rig">
        {BODY.map((box) => (
          <BoxModel key={box.name} box={box} />
        ))}
        <span className="fig__head">
          {HEAD.map((box) => (
            <BoxModel key={box.name} box={box} />
          ))}
        </span>
      </span>
    </div>
  );
}
