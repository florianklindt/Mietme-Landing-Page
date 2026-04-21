"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export function AboutIdea() {
  const t = useTranslations("about.idea");

  return (
    <Section tone="subtle">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Reveal as="h2" className="text-section max-w-[18ch]">
            {t("title")}
          </Reveal>
        </div>
        <Reveal
          delay={0.1}
          className="lg:col-span-7 lg:pt-2"
        >
          <p className="max-w-[58ch] text-[17px] leading-[1.6] text-ink-body md:text-step-1">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
