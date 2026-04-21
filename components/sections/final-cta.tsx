"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function FinalCta() {
  const t = useTranslations("finalCta");
  return (
    <Section id="cta" tone="dark" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,214,108,0.35) 0%, rgba(0,214,108,0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative">
        <Reveal as="h2" className="text-hero text-white whitespace-pre-line max-w-[22ch]">
          {t("title")}
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 md:mt-12 md:flex-row md:flex-wrap md:items-center md:gap-4">
          <ButtonLink
            href="https://mietme.app"
            variant="inverse"
            magnetic
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
            className="border-white/70 text-white hover:text-accent hover:border-accent md:w-auto"
          >
            {t("ctaGhost")}
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
