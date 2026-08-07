import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({ children, className, delay = 0, duration = 0.6 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.1, 0.22, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
