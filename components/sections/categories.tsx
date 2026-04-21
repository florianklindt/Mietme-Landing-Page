"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type Category = { slug: string; title: string };

export function Categories() {
  const t = useTranslations("categories");
  const items = t.raw("items") as Category[];

  return (
    <Section id="kategorien" tone="subtle">
      <Reveal as="h2" className="text-section">
        {t("title")}
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
        {items.map((cat, i) => (
          <Reveal as="li" key={cat.slug} delay={i * 0.05}>
            <a
              href="https://go.mietme.app"
              className="group block transition-transform duration-fast active:scale-[0.98]"
              aria-label={cat.title}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-white ring-1 ring-hairline transition-all duration-base ease-out-expo md:group-hover:-translate-y-1 md:group-hover:shadow-hover md:group-hover:ring-accent">
                <Image
                  src={`/images/categories/${cat.slug}.jpg`}
                  alt={`${cat.title} — Beispielartikel`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 320px, 45vw"
                  className="object-cover transition-transform duration-slow ease-out-expo md:group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-[16px] font-medium tracking-tight md:text-step-1">
                {cat.title}
              </h3>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
