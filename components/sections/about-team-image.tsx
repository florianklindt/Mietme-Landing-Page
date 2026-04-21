"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutTeamImage() {
  const t = useTranslations("about.team");

  return (
    <Section tone="light">
      <Reveal>
        <figure>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-bg-muted md:aspect-[16/9]">
            <Image
              src="/images/team/placeholder.svg"
              alt={t("alt")}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority={false}
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5"
              aria-hidden="true"
            />
          </div>
          <figcaption className="mt-4 text-[13px] text-ink-muted md:mt-5 md:text-[14px]">
            {t("caption")}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
