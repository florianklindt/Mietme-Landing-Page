"use client";

import { useTranslations } from "next-intl";
import { Users, GraduationCap, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type Anchor = { value: string; label: string; body: string };

const icons: LucideIcon[] = [Users, GraduationCap];

export function TrustAnchors() {
  const t = useTranslations("trustAnchors");
  const anchors = t.raw("items") as Anchor[];

  return (
    <Section id="berlin" tone="light">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal as="h2" className="text-section lg:col-span-7">
          {t("title")}
        </Reveal>
        <Reveal
          delay={0.1}
          className="max-w-[58ch] text-[16px] leading-[1.55] text-ink-body md:text-step-1 lg:col-span-5 lg:pt-3"
        >
          <p>{t("lead")}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
        {anchors.map((a, i) => {
          const Icon = icons[i] ?? Users;
          return (
            <Reveal
              as="div"
              key={a.label}
              delay={i * 0.08}
              className="group relative rounded-2xl bg-bg-subtle p-8 transition-all duration-base ease-out-expo md:p-10 lg:p-12 md:hover:-translate-y-1 md:hover:bg-white md:hover:shadow-card md:hover:ring-1 md:hover:ring-hairline"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink transition-colors duration-base ring-1 ring-hairline md:group-hover:bg-accent md:group-hover:text-white md:group-hover:ring-accent"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className="font-mono text-[11px] uppercase tracking-caps text-ink-subtle md:text-[12px]"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>

              <div
                className="mt-8 text-accent tabular-nums md:mt-10"
                style={{
                  fontSize: "clamp(56px, 10vw, 96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  fontWeight: 600,
                }}
              >
                {a.value}
              </div>

              <div className="mt-3 font-mono text-[11px] uppercase tracking-caps text-ink md:mt-4 md:text-[12px]">
                {a.label}
              </div>

              <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.55] text-ink-muted md:mt-5 md:leading-[1.6]">
                {a.body}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
