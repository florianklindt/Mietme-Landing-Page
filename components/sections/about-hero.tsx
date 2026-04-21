"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <Section
      tone="light"
      className="!pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+48px)] md:!pt-[140px]"
    >
      <div className="max-w-[22ch]">
        <Reveal className="mb-8 md:mb-10">
          <span className="eyebrow block">{t("eyebrow")}</span>
          <div className="hairline mt-4 max-w-[88px]" />
        </Reveal>
        <Reveal as="h1" delay={0.05} className="text-hero">
          {t("title")}
        </Reveal>
        <Reveal
          delay={0.15}
          className="mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-ink-muted md:mt-8 md:text-step-1"
        >
          <p>{t("subline")}</p>
        </Reveal>
      </div>
    </Section>
  );
}
