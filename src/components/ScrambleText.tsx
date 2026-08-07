import { useEffect, useState } from "react";

interface Props {
  text: string;
  className?: string;
  speed?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#___________abcdefghijklmnopqrstuvwxyz0123456789";

export function ScrambleText({ text, className, speed = 40 }: Props) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    let resolveText = "";
    const maxFrames = text.length * 3;

    const interval = setInterval(() => {
      frame++;
      if (frame >= maxFrames) {
        setDisplay(text);
        setDone(true);
        clearInterval(interval);
        return;
      }

      const progress = frame / maxFrames;
      const revealCount = Math.floor(progress * text.length * 1.3);
      resolveText = "";

      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          resolveText += text[i];
        } else {
          resolveText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplay(resolveText);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className} aria-label={text}>
      {display || text}
      {!done && (
        <span className="inline-block w-[2px] h-[0.9em] bg-orange-500 ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}
