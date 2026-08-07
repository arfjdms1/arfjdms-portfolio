import { useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export function TiltCard({ children, className = "", maxTilt = 8, scale = 1.02 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * maxTilt;
    const tiltY = (0.5 - x) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
      style={style}
    >
      {children}
    </div>
  );
}
