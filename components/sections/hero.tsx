"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { WordReveal } from "@/components/motion/word-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/motion/marquee";
import { useIsMobile } from "@/lib/use-media";

export function Hero() {
  const t = useTranslations("hero");
  const tMarquee = useTranslations();
  const items = tMarquee.raw("marquee.items") as string[];

  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const enableParallax = !reduce && !isMobile;

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-bg pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] md:pt-[72px]"
    >
      <div className="container-px mx-auto max-w-container">
        <div className="grid grid-cols-1 items-end gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:order-1 order-1">
            <h1 className="text-hero">
              <WordReveal
                className="block"
                segments={[
                  { text: t("headlineLead") },
                  { text: t("headlineAccent1"), accent: true },
                ]}
              />
              <span className="block pt-2 md:pt-3">
                <WordReveal
                  segments={[
                    { text: t("headlineConnector") },
                    { text: t("headlineAccent2"), accent: true },
                  ]}
                  delayStart={0.35}
                />
              </span>
            </h1>

            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-ink-body md:mt-10 md:text-step-1"
            >
              {t("subline")}
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:flex-wrap md:items-center"
            >
              <ButtonLink
                href="https://go.mietme.app"
                variant="primary"
                withArrow
                fullWidth
                className="md:w-auto"
              >
                {t("ctaPrimary")}
              </ButtonLink>
              <ButtonLink
                href="#vermieter"
                variant="ghost"
                fullWidth
                className="md:w-auto"
              >
                {t("ctaGhost")}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-2 lg:col-span-5 lg:self-stretch"
          >
            <div className="relative aspect-[4/5] w-full">
              <motion.div
                style={enableParallax ? { y: imgY, scale: imgScale } : undefined}
                className="absolute inset-0 overflow-hidden rounded-2xl"
              >
                <Image
                  src="/images/hero/hero.png"
                  alt="Frau schraubt mit geliehener Bohrmaschine an einem Holzregal in Berlin, darunter ein Mann mit geliehenem Hochdruckreiniger im Wohnzimmer."
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-14 flex justify-center md:mt-24 md:justify-start"
        >
          <div className="inline-flex items-center gap-3 text-[12px] text-ink-muted md:text-[13px]">
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
            <span className="font-mono uppercase tracking-caps">{t("scrollHint")}</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 border-y border-hairline py-6 md:mt-24 md:py-8">
        <Marquee speedSec={48} ariaLabel="Kategorien-Ticker">
          {items.map((item, i) => (
            <span
              key={`m1-${i}-${item}`}
              className="inline-flex items-center gap-8 text-step-2 font-medium tracking-display text-ink md:gap-12"
            >
              <span>{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
