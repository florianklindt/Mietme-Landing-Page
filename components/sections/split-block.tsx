"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Benefit = { title: string; body: string };

function AccentFirstWord({ text }: { text: string }) {
  const match = text.match(/^(\S+)(.*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <span className="text-accent">{match[1]}</span>
      {match[2]}
    </>
  );
}

export function SplitBlock({
  id,
  tone,
  imageSrc,
  imageAlt,
  imageSide,
  imageMode = "cover",
  nsKey,
  ctaHref,
}: {
  id: string;
  tone: "light" | "subtle";
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  imageMode?: "cover" | "mockup";
  nsKey: "renters" | "hosts";
  ctaHref: string;
}) {
  const t = useTranslations(nsKey);
  const benefits = t.raw("benefits") as Benefit[];

  const image =
    imageMode === "mockup" ? (
      <Reveal className="block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1680}
          height={1680}
          loading="lazy"
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="mx-auto h-auto w-full max-w-[840px] lg:max-w-[960px]"
        />
      </Reveal>
    ) : (
      <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-bg-muted">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
      </Reveal>
    );

  const textBlock = (
    <>
      <Reveal as="h2" className="text-section">
        {nsKey === "renters" ? <AccentFirstWord text={t("title")} /> : t("title")}
      </Reveal>
      <Reveal
        delay={0.08}
        className="mt-5 max-w-[48ch] text-[16px] leading-[1.55] text-ink-body md:mt-6 md:text-step-1"
      >
        <p>{t("lead")}</p>
      </Reveal>
      <ul className="mt-10 divide-y divide-hairline md:mt-12">
        {benefits.map((b, i) => (
          <Reveal as="li" key={b.title} delay={0.08 + i * 0.05} className="py-5 md:py-6">
            <div className="flex items-start gap-4 md:gap-6">
              <span className="font-mono text-[12px] tracking-caps uppercase text-ink-muted pt-1 md:text-[13px]">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-[18px] font-medium tracking-tight md:text-step-1">
                  {b.title}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.55] text-ink-muted md:leading-[1.6]">
                  {b.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  );

  const ctaBlock = (
    <Reveal delay={0.25} className="mt-8 md:mt-10">
      <ButtonLink href={ctaHref} variant="primary" withArrow fullWidth className="md:w-auto">
        {t("cta")}
      </ButtonLink>
    </Reveal>
  );

  const content = (
    <div>
      {textBlock}
      {ctaBlock}
    </div>
  );

  if (imageMode === "mockup") {
    return (
      <Section id={id} tone={tone}>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="order-1 lg:col-span-5">
            {textBlock}
            <div className="hidden lg:block">{ctaBlock}</div>
          </div>
          <div className="order-2 lg:col-span-7 lg:col-start-6">{image}</div>
          <div className="order-3 lg:hidden">{ctaBlock}</div>
        </div>
      </Section>
    );
  }

  return (
    <Section id={id} tone={tone}>
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-6 lg:gap-20",
          "lg:grid-cols-12"
        )}
      >
        {imageSide === "left" ? (
          <>
            <div className="lg:col-span-5">{image}</div>
            <div className="lg:col-span-6 lg:col-start-7">{content}</div>
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1 lg:col-span-6">{content}</div>
            <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">{image}</div>
          </>
        )}
      </div>
    </Section>
  );
}
