"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

type Stat = { value: number; unit: string; label: string; suffix: string };

export function Sustainability() {
  const t = useTranslations("sustainability");
  const stats = t.raw("stats") as Stat[];
  const reduce = useReducedMotion() ?? false;

  return (
    <Section tone="dark" id="nachhaltigkeit" className="relative isolate overflow-hidden">
      <DemoSticker reduce={reduce} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal as="h2" className="text-hero lg:col-span-8 whitespace-pre-line">
          {t("title")}
        </Reveal>
        <Reveal
          delay={0.1}
          className="max-w-[50ch] text-[16px] leading-[1.55] text-ink-body md:text-step-1 lg:col-span-4 lg:pt-3"
        >
          <p className="text-white/70">{t("lead")}</p>
        </Reveal>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-y-12 md:mt-24 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
        {stats.map((s, i) => (
          <Reveal
            as="div"
            key={s.label}
            delay={i * 0.08}
            className="border-t border-white/15 pt-6 text-center md:pt-8"
          >
            <dt className="font-mono text-[12px] uppercase tracking-caps text-white/60">
              <span aria-hidden="true">0{i + 1} / </span>
              <span>{s.label}</span>
            </dt>
            <dd className="mt-5 md:mt-7">
              <div
                className="flex items-baseline justify-center gap-2 text-white tracking-display md:gap-3"
                style={{
                  fontSize: "clamp(56px, 14vw, 104px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  fontWeight: 600,
                }}
              >
                <span className="tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                {s.unit ? (
                  <span
                    className="text-white/55"
                    style={{ fontSize: "0.45em", letterSpacing: "-0.01em" }}
                  >
                    {s.unit}
                  </span>
                ) : null}
              </div>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

function DemoSticker({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-4 z-10 md:left-1/2 md:right-auto md:top-10 md:-translate-x-1/2"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      animate={
        reduce
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [0, -8, 0] }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              opacity: { duration: 0.6 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      <div
        className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:gap-3.5 md:px-8 md:py-3.5"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-accent md:h-3 md:w-3"
          style={{ boxShadow: "0 0 10px rgba(0,214,108,0.8)" }}
        />
        <span
          className="font-medium uppercase text-white"
          style={{
            fontSize: "clamp(10px, 1.8vw, 22px)",
            letterSpacing: "0.14em",
          }}
        >
          Demo
        </span>
      </div>
    </motion.div>
  );
}
