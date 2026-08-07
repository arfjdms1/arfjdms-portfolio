import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number;
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const maxParticles = 70;
    const cursorRadius = 180;
    const connectionDist = 140;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function spawnParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
      };
    }

    function onMouseMove(e: MouseEvent) {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseLeave() {
      cursorRef.current = { x: -1000, y: -1000 };
    }

    resize();
    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle());
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    function draw() {
      if (!ctx || !canvas) return;
      const { width, height } = canvas;
      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dxc = p.x - cx;
        const dyc = p.y - cy;
        const distToCursor = Math.sqrt(dxc * dxc + dyc * dyc);
        const nx = distToCursor > 0 ? dxc / distToCursor : 0;
        const ny = distToCursor > 0 ? dyc / distToCursor : 0;

        if (distToCursor < cursorRadius) {
          const force = (1 - distToCursor / cursorRadius) * 1.2;
          p.vx += nx * force * 0.015;
          p.vy += ny * force * 0.015;
        }

        p.vx *= 0.999;
        p.vy *= 0.999;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const cursorAlpha = distToCursor < cursorRadius
          ? (1 - distToCursor / cursorRadius) * 0.5 + p.alpha
          : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${cursorAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${(1 - dist / connectionDist) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (distToCursor < cursorRadius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cx, cy);
          ctx.strokeStyle = `rgba(249, 115, 22, ${(1 - distToCursor / cursorRadius) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
