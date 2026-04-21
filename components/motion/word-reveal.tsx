"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Segment = {
  text: string;
  accent?: boolean;
  marker?: boolean;
};

export function WordReveal({
  segments,
  className,
  delayStart = 0,
}: {
  segments: Segment[];
  className?: string;
  delayStart?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  const words = segments.flatMap((seg, segIdx) =>
    seg.text.split(/\s+/).filter(Boolean).map((word, i) => ({
      word,
      accent: seg.accent ?? false,
      marker: seg.marker ?? false,
      key: `${segIdx}-${i}-${word}`,
    }))
  );

  return (
    <span className={className} aria-label={segments.map((s) => s.text).join(" ")}>
      {words.map((w, idx) => {
        const isAccent = w.accent;
        const hasMarker = w.marker;
        const wordNode = (
          <span className="relative inline-block">
            <span
              className={
                isAccent
                  ? "relative z-10 text-accent"
                  : "relative z-10"
              }
            >
              {w.word}
            </span>
            {hasMarker ? <MarkerStroke delay={delayStart + idx * 0.05 + 0.5} /> : null}
          </span>
        );

        if (reduce) {
          return (
            <span key={w.key} className="inline-block" aria-hidden="true">
              {wordNode}
              {idx < words.length - 1 ? "\u00A0" : ""}
            </span>
          );
        }

        return (
          <span key={w.key} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.8,
                delay: delayStart + idx * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {wordNode}
              {idx < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function MarkerStroke({ delay }: { delay: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[0.28em] w-full"
    >
      <motion.path
        d="M4 14 C 60 4, 120 22, 180 10 S 280 18, 296 8"
        fill="none"
        stroke="rgb(var(--color-accent))"
        strokeWidth="8"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduce ? 0 : 1.1,
          delay: reduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}
