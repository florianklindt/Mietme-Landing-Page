"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";

type Review = { name: string; city: string; rating: number; text: string };

const avatars = [
  "#00D66C",
  "#0A0A0A",
  "#9CA3AF",
  "#1A1A1A",
  "#00D66C",
  "#6B6B6B",
  "#0A0A0A",
  "#00D66C",
];

export function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Review[];

  return (
    <Section id="stimmen" tone="subtle">
      <Reveal as="h2" className="text-section max-w-[20ch]">
        {t("title")}
      </Reveal>

      <div className="mt-12 md:mt-20 md:hidden">
        <ul
          className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollPaddingLeft: "20px",
          }}
          aria-label="Kundenstimmen"
        >
          {items.map((r, i) => (
            <li
              key={r.name}
              className="w-[84vw] max-w-[360px] shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <ReviewCard r={r} i={i} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 hidden grid-cols-1 gap-6 md:grid md:grid-cols-3">
        {items.map((r, i) => (
          <Reveal
            as="article"
            key={r.name}
            delay={i * 0.08}
            className="flex flex-col rounded-lg bg-white p-8 ring-1 ring-hairline transition-all duration-base ease-out-expo hover:-translate-y-1 hover:shadow-hover hover:ring-accent"
          >
            <ReviewInner r={r} i={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border-y border-hairline py-5 md:mt-20 md:py-6">
        <Marquee speedSec={40} ariaLabel="Community-Ticker">
          {avatars.map((color, i) => (
            <span key={`a-${i}`} className="flex items-center gap-8">
              <span
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span className="font-mono text-[13px] uppercase tracking-caps text-ink-muted">
                {t("communityTicker")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-6 ring-1 ring-hairline">
      <ReviewInner r={r} i={i} />
    </article>
  );
}

function ReviewInner({ r, i }: { r: Review; i: number }) {
  return (
    <>
      <div className="flex items-center gap-1" aria-label={`${r.rating} von 5 Sternen`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={
              idx < r.rating
                ? "h-4 w-4 fill-accent text-accent"
                : "h-4 w-4 text-ink-subtle"
            }
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-[17px] leading-[1.4] text-ink md:mt-6 md:text-step-1 md:leading-snug">
        <span aria-hidden="true">“</span>
        {r.text}
        <span aria-hidden="true">”</span>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3 border-t border-hairline pt-4 md:mt-8 md:pt-5">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-medium text-white"
          style={{ background: avatars[i % avatars.length] }}
          aria-hidden="true"
        >
          {r.name.slice(0, 1)}
        </span>
        <div className="text-[14px]">
          <div className="font-medium text-ink">{r.name}</div>
          <div className="text-ink-muted">{r.city}</div>
        </div>
      </footer>
    </>
  );
}
