"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({
  children,
  strength = 20,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion() ?? false;

  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const maxX = rect.width / 2;
    const maxY = rect.height / 2;
    x.set(Math.max(-strength, Math.min(strength, (relX / maxX) * strength)));
    y.set(Math.max(-strength, Math.min(strength, (relY / maxY) * strength)));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}
