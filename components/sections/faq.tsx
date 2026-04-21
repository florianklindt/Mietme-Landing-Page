"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type FAQ = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQ[];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" tone="light">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal as="h2" className="text-section">
            {t("title")}
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {items.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx((c) => (c === i ? null : i))}
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const headingId = `faq-q-${index}`;
  const panelId = `faq-p-${index}`;

  return (
    <li>
      <h3>
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-fast md:gap-8 md:py-7 md:hover:text-accent"
        >
          <span className="flex flex-1 items-baseline gap-3 md:gap-5">
            <span className="font-mono text-[11px] uppercase tracking-caps text-ink-muted md:text-[12px]">
              0{index + 1}
            </span>
            <span className="text-[17px] font-medium leading-snug tracking-tight text-ink md:text-step-1">
              {item.q}
            </span>
          </span>
          <PlusIcon open={isOpen} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-5 pl-[38px] pr-2 text-[15px] leading-[1.6] text-ink-muted md:pb-7 md:pl-[56px] md:pr-4 md:text-[16px] md:leading-[1.65]">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline"
      aria-hidden="true"
    >
      <span className="absolute h-[1.5px] w-4 bg-ink" />
      <motion.span
        className="absolute h-[1.5px] w-4 bg-ink origin-center"
        animate={{ rotate: open ? 0 : 90 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
