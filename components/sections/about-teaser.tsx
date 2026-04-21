"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function AboutTeaser() {
  const t = useTranslations("aboutTeaser");

  return (
    <Section id="ueber-uns" tone="subtle">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <Reveal as="h2" className="text-section max-w-[20ch]">
            {t("title")}
          </Reveal>
          <Reveal
            delay={0.08}
            className="mt-6 max-w-[54ch] text-[16px] leading-[1.6] text-ink-body md:mt-8 md:text-step-1"
          >
            <p>{t("lead")}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <Reveal delay={0.16} className="w-full md:w-auto">
            <ButtonLink
              href="/ueber-uns"
              variant="primary"
              magnetic
              withArrow
              fullWidth
              className="md:w-auto"
            >
              {t("cta")}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
