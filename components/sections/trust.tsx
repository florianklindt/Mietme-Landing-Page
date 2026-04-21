"use client";

import { useTranslations } from "next-intl";
import { Star, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type Item = { title: string; body: string };

const icons = [Star, BadgeCheck, Headphones, ShieldCheck] as const;

export function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as Item[];

  return (
    <Section id="sicherheit" tone="light">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal as="h2" className="text-section lg:col-span-7">
          {t("title")}
        </Reveal>
        <Reveal
          delay={0.1}
          className="max-w-[52ch] text-[16px] leading-[1.55] text-ink-body md:text-step-1 lg:col-span-5 lg:pt-3"
        >
          <p>{t("lead")}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 divide-y divide-hairline border-y border-hairline md:mt-20 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = icons[i] ?? Star;
          return (
            <Reveal
              as="div"
              key={item.title}
              delay={i * 0.06}
              className="group relative p-5 md:p-10 lg:p-12 transition-colors duration-base ease-out-expo md:hover:bg-bg-subtle"
            >
              <div
                className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-bg-muted text-ink transition-colors duration-base md:mb-10 md:group-hover:bg-accent"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-[20px] font-medium tracking-tight md:text-step-1">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted md:mt-3 md:leading-[1.6]">
                {item.body}
              </p>
              <span
                className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-caps text-ink-subtle md:right-6 md:top-6 md:text-[12px]"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
