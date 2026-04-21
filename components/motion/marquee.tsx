"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { useIsMobile } from "@/lib/use-media";

export function Marquee({
  children,
  speedSec = 50,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  speedSec?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const [paused, setPaused] = useState(false);
  const running = !reduce && !paused;
  const resolvedSpeed = isMobile ? speedSec * 0.55 : speedSec;

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      aria-label={ariaLabel}
      role="region"
    >
      <div
        className={cn("flex gap-12 whitespace-nowrap will-change-transform", running ? "animate-marquee" : "")}
        style={running ? { animationDuration: `${resolvedSpeed}s` } : undefined}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
      {!reduce ? (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Ticker fortsetzen" : "Ticker pausieren"}
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-1/2 focus:-translate-y-1/2 focus:z-10 focus:inline-flex focus:h-11 focus:w-11 focus:items-center focus:justify-center focus:rounded-full focus:bg-ink focus:text-white"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      ) : null}
    </div>
  );
}
