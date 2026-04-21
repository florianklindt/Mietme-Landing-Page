"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function AboutCta() {
  const t = useTranslations("about.cta");

  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,214,108,0.28) 0%, rgba(0,214,108,0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-8">
          <Reveal as="h2" className="text-section max-w-[18ch] text-white">
            {t("title")}
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] md:mt-6 md:text-step-1"
          >
            <p className="text-white/80">{t("lead")}</p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:flex md:justify-end">
          <Reveal delay={0.18} className="w-full md:w-auto">
            <ButtonLink
              href="https://mietme.app"
              variant="inverse"
              magnetic
              withArrow
              fullWidth
              className="md:w-auto"
            >
              {t("button")}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
