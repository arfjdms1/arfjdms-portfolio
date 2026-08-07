import { useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "transform 0.15s ease-out",
      }}
    >
      {children}
    </div>
  );
}
