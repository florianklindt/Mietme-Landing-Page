"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({
  to,
  duration = 1.8,
  suffix = "",
  locale = "de-DE",
}: {
  to: number;
  duration?: number;
  suffix?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion() ?? false;

  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) =>
    Math.round(v).toLocaleString(locale)
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      <DisplayNumber rounded={rounded} />
      {suffix}
    </span>
  );
}

function DisplayNumber({ rounded }: { rounded: ReturnType<typeof useTransform<number, string>> }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);
  return <span ref={ref}>0</span>;
}
