import { useEffect, useRef } from "react";

type Vertex = {
  x: number;
  y: number;
  z: number;
  waveSin: number;
  waveCos: number;
};
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
      waveSin: Math.sin(u * 3 + v * 2),
      waveCos: Math.cos(u * 3 + v * 2),
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
    if (!canvas || !context || !parent) return;
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
      const pitch = 0.62 + Math.sin(rotation * 0.45) * 0.16;
      const pitchSin = Math.sin(pitch);
      const pitchCos = Math.cos(pitch);
      const roll = 0.35 + Math.sin(rotation * 0.3) * 0.12;
      const rollSin = Math.sin(roll);
      const rollCos = Math.cos(roll);
      const waveSin = Math.sin(rotation * 1.8);
      const waveCos = Math.cos(rotation * 1.8);
      for (const points of curves) {
        context.beginPath();
        let depthSum = 0;
        points.forEach((point, index) => {
          const wave =
            1 + (point.waveSin * waveCos + point.waveCos * waveSin) * 0.045;
          const x = (point.x * cosine + point.z * sine) * wave;
          const z = (-point.x * sine + point.z * cosine) * wave;
          const y = point.y * pitchCos - z * pitchSin;
          const depth = point.y * pitchSin + z * pitchCos;
          const scale = 680 / (680 + depth);
          const px = (x * rollCos - y * rollSin) * scale + 260;
          const py = (x * rollSin + y * rollCos) * scale + 260;
          depthSum += depth;
          if (index === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        });
        context.globalAlpha = 0.58 - depthSum / points.length / 550;
        context.stroke();
      }
      context.globalAlpha = 1;

      // Satellites leave short fading trails along two differently tilted orbits.
      for (let orbit = 0; orbit < 2; orbit++) {
        const angle = rotation * (orbit ? -1.7 : 1.25) + orbit * 2.8;
        const radius = orbit ? 222 : 205;
        for (let segment = 18; segment >= 0; segment--) {
          const position = angle - segment * 0.018;
          const x = Math.cos(position) * radius;
          const y = Math.sin(position) * radius * (orbit ? 0.42 : 0.7);
          const turn = orbit ? -0.5 : 0.65;
          const px = x * Math.cos(turn) - y * Math.sin(turn) + 260;
          const py = x * Math.sin(turn) + y * Math.cos(turn) + 260;
          context.beginPath();
          context.arc(px, py, segment ? 1.25 : 3.2, 0, Math.PI * 2);
          context.fillStyle = orbit ? "#ff6844" : "#ffd29a";
          context.globalAlpha = segment ? (1 - segment / 19) * 0.6 : 1;
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const canAnimate = () => visible && !document.hidden && !preference.matches;
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
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      parent.classList.remove("forge-ready");
    };
  }, []);
  return <canvas ref={ref} className="forge-canvas" aria-hidden="true" />;
}
