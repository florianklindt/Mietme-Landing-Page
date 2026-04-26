"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

type Step = { n: string; title: string; body: string; meta: string };

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

const C = {
  circleBorderInactive: "#E5E5E5",
  circleBorderActive: "#00D66C",
  numberInactive: "#8B8B8B",
  numberActive: "#0A0A0A",
  titleInactive: "#8B8B8B",
  titleActive: "#0A0A0A",
  bodyInactive: "#6B6B6B",
  bodyActive: "#1A1A1A",
  metaInactive: "#6B6B6B",
  metaActive: "#00D66C",
  glowInactive: "0 0 0 0 rgba(0,214,108,0)",
  glowActive: "0 0 24px 0 rgba(0,214,108,0.25)",
} as const;

export function HowItWorks() {
  const t = useTranslations("how");
  const steps = t.raw("steps") as Step[];
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="wie"
      aria-labelledby="how-title"
      className="relative w-full bg-bg py-section-y text-ink-body"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="md:max-w-[52ch]">
          <Reveal as="h2" id="how-title" className="text-section">
            {t("title")}
          </Reveal>
          <Reveal
            as="p"
            className="mt-6 max-w-[52ch] text-[16px] leading-[1.55] text-ink-body md:text-step-1"
            delay={0.05}
          >
            {t("lead")}
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 items-start gap-4 md:mt-20 md:gap-16 lg:gap-20">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-visible">
            <Reveal as="div" className="-ml-5 block w-[calc(100%+20px)] md:ml-0 md:w-full">
              <Image
                src="/images/how-mockup.png"
                alt="mietme App auf dem Smartphone: Suche nach Mietangeboten in der Berliner Nachbarschaft mit beliebten Inseraten."
                width={1680}
                height={1680}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="mx-auto h-auto w-full max-w-none origin-right scale-[2] translate-x-1/2 md:mx-0 md:max-w-[640px] md:origin-center md:scale-100 md:translate-x-0"
                priority={false}
              />
            </Reveal>
          </div>

          <StepsTimeline steps={steps} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

function StepsTimeline({ steps, reduce }: { steps: Step[]; reduce: boolean }) {
  const olRef = useRef<HTMLOListElement>(null);
  const circleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [spine, setSpine] = useState({ top: 0, height: 0 });
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [padding, setPadding] = useState({ top: 0, bottom: 0 });
  const [activeIndex, setActiveIndex] = useState(reduce ? steps.length - 1 : -1);
  const progress = useMotionValue(reduce ? 1 : 0);

  useLayoutEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    let raf = 0;
    function measure() {
      const ol = olRef.current;
      const circles = circleRefs.current;
      if (!ol || circles.length === 0) return;
      const first = circles[0];
      const last = circles[circles.length - 1];
      if (!first || !last) return;
      const olRect = ol.getBoundingClientRect();
      const fRect = first.getBoundingClientRect();
      const lRect = last.getBoundingClientRect();
      const firstCenterInOl = fRect.top - olRect.top + fRect.height / 2;
      const lastCenterInOl = lRect.top - olRect.top + lRect.height / 2;
      const height = Math.max(0, lastCenterInOl - firstCenterInOl);
      setSpine({ top: firstCenterInOl, height });
      if (height > 0) {
        const next = circles.map((c) => {
          if (!c) return 0;
          const r = c.getBoundingClientRect();
          const center = r.top - olRect.top + r.height / 2;
          return Math.min(1, Math.max(0, (center - firstCenterInOl) / height));
        });
        setThresholds(next);
      }
      const vh = window.innerHeight;
      const fHalf = fRect.height / 2;
      const leading = firstCenterInOl - fHalf;
      const trailingFromCenter = olRect.height - lastCenterInOl;
      const padTop = Math.max(0, vh / 2 - leading - fHalf);
      const padBottom = Math.max(0, vh / 2 - trailingFromCenter);
      setPadding((prev) =>
        prev.top === padTop && prev.bottom === padBottom
          ? prev
          : { top: padTop, bottom: padBottom }
      );
    }
    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    }
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(ol);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const circles = circleRefs.current;
      const valid: HTMLDivElement[] = [];
      for (const c of circles) if (c) valid.push(c);
      if (valid.length < 2) return;
      const mid = window.innerHeight / 2;

      let idx = -1;
      for (let i = 0; i < valid.length; i++) {
        const el = valid[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center <= mid + 0.5) idx = i;
      }
      setActiveIndex((prev) => (prev === idx ? prev : idx));

      const first = valid[0];
      const last = valid[valid.length - 1];
      if (!first || !last) return;
      const fRect = first.getBoundingClientRect();
      const lRect = last.getBoundingClientRect();
      const firstCenter = fRect.top + fRect.height / 2;
      const lastCenter = lRect.top + lRect.height / 2;
      const total = lastCenter - firstCenter;
      if (total <= 0) {
        progress.set(0);
        return;
      }
      const p = Math.max(0, Math.min(1, (mid - firstCenter) / total));
      progress.set(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce, progress]);

  const fillScaleY = useTransform(progress, [0, 1], [0, 1]);

  const setCircleRefAt = (i: number) => (el: HTMLDivElement | null) => {
    circleRefs.current[i] = el;
  };

  return (
    <div
      style={{
        paddingTop: padding.top || undefined,
        paddingBottom: padding.bottom || undefined,
      }}
    >
      <ol ref={olRef} className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[19px] w-[2px] md:left-[39px]"
          style={{ top: spine.top, height: spine.height }}
        >
          <div className="absolute inset-0 bg-hairline" />
          {reduce ? (
            <div className="absolute inset-0 bg-accent" />
          ) : (
            <motion.div
              className="absolute inset-0 origin-top bg-accent"
              style={{ scaleY: fillScaleY }}
            />
          )}
        </div>

        {steps.map((step, i) => {
          const rangeStart = thresholds[i] ?? 0;
          const rangeEnd =
            i + 1 < thresholds.length
              ? (thresholds[i + 1] ?? 1) - 0.04
              : 1;
          return (
            <StepRow
              key={step.n}
              step={step}
              isLast={i === steps.length - 1}
              reduce={reduce}
              active={reduce || i <= activeIndex}
              circleRef={setCircleRefAt(i)}
              scrollYProgress={progress}
              rangeStart={rangeStart}
              rangeEnd={Math.max(rangeStart + 0.01, rangeEnd)}
            />
          );
        })}
      </ol>
    </div>
  );
}

function ScrollLineText({
  text,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  activeColor,
  inactiveColor,
  reduce,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  activeColor: string;
  inactiveColor: string;
  reduce: boolean;
}) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [lineOfWord, setLineOfWord] = useState<number[]>([]);
  const [lineCount, setLineCount] = useState(0);
  const [activeLines, setActiveLines] = useState(reduce ? Number.MAX_SAFE_INTEGER : 0);

  const words = text.split(/(\s+)/);

  useLayoutEffect(() => {
    function measure() {
      const spans = wordRefs.current;
      if (!pRef.current || spans.length === 0) return;
      const mapping: number[] = [];
      let lineIdx = -1;
      let lastTop = Number.NEGATIVE_INFINITY;
      spans.forEach((s) => {
        if (!s) {
          mapping.push(lineIdx < 0 ? 0 : lineIdx);
          return;
        }
        const top = s.offsetTop;
        if (Math.abs(top - lastTop) > 2) {
          lineIdx += 1;
          lastTop = top;
        }
        mapping.push(lineIdx);
      });
      setLineOfWord(mapping);
      setLineCount(lineIdx + 1);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (pRef.current) ro.observe(pRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce || lineCount === 0) return;
    const range = rangeEnd - rangeStart;
    if (range <= 0) return;
    const frac = Math.max(0, Math.min(1, (p - rangeStart) / range));
    const count = Math.min(lineCount, Math.floor(frac * lineCount) + (frac > 0 ? 1 : 0));
    setActiveLines((prev) => (prev === count ? prev : count));
  });

  return (
    <p
      ref={pRef}
      className="mt-3 max-w-[48ch] text-[13px] leading-[1.4] md:text-step-1 md:leading-[1.55]"
    >
      {words.map((w, i) => {
        const isSpace = /^\s+$/.test(w);
        const line = lineOfWord[i] ?? 0;
        const isActive = reduce || line < activeLines;
        if (isSpace) {
          return (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {w}
            </span>
          );
        }
        return (
          <motion.span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            initial={false}
            animate={{ color: isActive ? activeColor : inactiveColor }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {w}
          </motion.span>
        );
      })}
    </p>
  );
}

function StaggeredColor({
  text,
  splitBy,
  active,
  reduce,
  activeColor,
  inactiveColor,
  stagger,
  baseDelay = 0,
}: {
  text: string;
  splitBy: "char" | "word";
  active: boolean;
  reduce: boolean;
  activeColor: string;
  inactiveColor: string;
  stagger: number;
  baseDelay?: number;
}) {
  const tokens =
    splitBy === "char" ? Array.from(text) : text.split(/(\s+)/);
  let animIndex = 0;
  return (
    <>
      {tokens.map((tok, i) => {
        const isSpace = /^\s+$/.test(tok);
        if (isSpace) {
          return (
            <span key={i} style={{ whiteSpace: "pre" }}>
              {tok}
            </span>
          );
        }
        const delay = reduce || !active ? 0 : baseDelay + animIndex * stagger;
        animIndex += 1;
        return (
          <motion.span
            key={i}
            initial={false}
            animate={{ color: active ? activeColor : inactiveColor }}
            transition={{ duration: 0.35, delay, ease: EASE_OUT }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {tok}
          </motion.span>
        );
      })}
    </>
  );
}

function StepRow({
  step,
  isLast,
  reduce,
  active,
  circleRef,
  scrollYProgress,
  rangeStart,
  rangeEnd,
}: {
  step: Step;
  isLast: boolean;
  reduce: boolean;
  active: boolean;
  circleRef: (el: HTMLDivElement | null) => void;
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}) {
  return (
    <li
      className={
        "relative pl-12 md:pl-28" + (isLast ? "" : " pb-24 md:pb-[280px]")
      }
    >
      <motion.div
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-bg md:h-20 md:w-20"
        initial={false}
        animate={{
          borderColor: active ? C.circleBorderActive : C.circleBorderInactive,
          scale: active && !reduce ? [1, 1.08, 1] : 1,
          boxShadow: active ? C.glowActive : C.glowInactive,
        }}
        transition={{
          borderColor: { duration: 0.4, ease: EASE_OUT },
          scale: { duration: 0.5, ease: EASE_SPRING },
          boxShadow: { duration: 0.4, ease: EASE_OUT },
        }}
      >
        <motion.span
          className="font-medium tabular-nums leading-none"
          style={{ fontSize: "clamp(13px, 2.6vw, 26px)", letterSpacing: "-0.02em" }}
          initial={false}
          animate={{ color: active ? C.numberActive : C.numberInactive }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          {step.n}
        </motion.span>
      </motion.div>

      <h3
        className="font-semibold"
        style={{
          fontSize: "clamp(16px, 3vw, 30px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        <StaggeredColor
          text={step.title}
          splitBy="char"
          active={active}
          reduce={reduce}
          activeColor={C.titleActive}
          inactiveColor={C.titleInactive}
          stagger={0.03}
        />
      </h3>
      <ScrollLineText
        text={step.body}
        scrollYProgress={scrollYProgress}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        activeColor={C.bodyActive}
        inactiveColor={C.bodyInactive}
        reduce={reduce}
      />
      <motion.span
        className="mt-3 block text-[10px] font-medium uppercase tracking-caps md:mt-6 md:text-[12px]"
        initial={
          reduce
            ? { y: 0, opacity: 1, color: C.metaActive }
            : { y: 8, opacity: 0, color: C.metaInactive }
        }
        animate={
          active
            ? { y: 0, opacity: 1, color: C.metaActive }
            : { y: 8, opacity: 0, color: C.metaInactive }
        }
        transition={{
          duration: 0.45,
          delay: active && !reduce ? 0.1 : 0,
          ease: EASE_OUT,
        }}
      >
        {step.meta}
      </motion.span>
    </li>
  );
}
