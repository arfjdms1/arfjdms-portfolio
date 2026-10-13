import { useEffect, useRef } from "react";

type Vertex = { x: number; y: number; z: number };
const curves: Vertex[][] = [];

function curve(fixed: number, meridian: boolean) {
  return Array.from({ length: 65 }, (_, index) => {
    const angle = (index / 64) * Math.PI * 2;
    const u = meridian ? fixed : angle;
    const v = meridian ? angle : fixed;
    const radius = 136 + 48 * Math.cos(v);
    return {
      x: radius * Math.cos(u),
      y: radius * Math.sin(u),
      z: 48 * Math.sin(v),
    };
  });
}
for (let i = 0; i < 20; i++) curves.push(curve((i / 20) * Math.PI * 2, false));
for (let i = 0; i < 32; i++) curves.push(curve((i / 32) * Math.PI * 2, true));

export function RotatingSculpture() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!window.ResizeObserver || !window.IntersectionObserver) return;
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    const parent = canvas?.closest<HTMLElement>(".orbital-art");
    const shell = document.getElementById("top");
    if (!canvas || !context || !parent || !shell) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let rotation = 0.25;
    let visible = true;

    const draw = () => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(canvas.width / 520, 0, 0, canvas.height / 520, 0, 0);
      const gradient = context.createLinearGradient(95, 65, 425, 440);
      gradient.addColorStop(0, "#ffce8a");
      gradient.addColorStop(0.4, "#ff762e");
      gradient.addColorStop(0.76, "#f13a2b");
      gradient.addColorStop(1, "#971c1c");
      context.strokeStyle = gradient;
      context.lineWidth = 0.85;
      const sine = Math.sin(rotation);
      const cosine = Math.cos(rotation);
      for (const points of curves) {
        context.beginPath();
        let depthSum = 0;
        points.forEach((point, index) => {
          const x = point.x * cosine + point.z * sine;
          const z = -point.x * sine + point.z * cosine;
          const y = point.y * 0.56 - z * 0.83;
          const depth = point.y * 0.83 + z * 0.56;
          const scale = 680 / (680 + depth);
          const px = (x * 0.91 - y * 0.41) * scale + 260;
          const py = (x * 0.41 + y * 0.91) * scale + 260;
          depthSum += depth;
          if (index === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        });
        context.globalAlpha = 0.58 - depthSum / points.length / 550;
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const canAnimate = () =>
      visible &&
      !document.hidden &&
      !preference.matches &&
      !shell.classList.contains("motion-paused");
    const tick = (time: number) => {
      frame = 0;
      if (!canAnimate()) {
        previous = 0;
        return;
      }
      if (!previous || time - previous >= 1000 / 30) {
        rotation += Math.min(previous ? time - previous : 0, 80) * 0.00022;
        previous = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (canAnimate()) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    };
    const resize = () => {
      const size = Math.max(1, parent.clientWidth);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(size * ratio);
      canvas.height = Math.round(size * ratio);
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    const pauseObserver = new MutationObserver(sync);
    pauseObserver.observe(shell, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    viewportObserver.observe(parent);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    resize();
    parent.classList.add("forge-ready");
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      pauseObserver.disconnect();
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      parent.classList.remove("forge-ready");
    };
  }, []);
  return <canvas ref={ref} className="forge-canvas" aria-hidden="true" />;
}
