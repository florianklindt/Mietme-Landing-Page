"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type Anchor = { value: string; label: string; body: string };

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

      <div className="mt-14 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {anchors.map((a, i) => (
          <Reveal
            as="div"
            key={a.label}
            delay={i * 0.08}
            className="border-t border-hairline pt-6 md:pt-8"
          >
            <div className="font-mono text-[12px] uppercase tracking-caps text-ink-muted">
              <span aria-hidden="true">0{i + 1} / </span>
              <span>{a.label}</span>
            </div>
            <div
              className="mt-5 text-ink tabular-nums md:mt-7"
              style={{
                fontSize: "clamp(48px, 9vw, 88px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                fontWeight: 600,
              }}
            >
              {a.value}
            </div>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-ink-muted md:mt-6 md:leading-[1.6]">
              {a.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
