"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/nav/logo";
import { setLocale } from "@/lib/locale-action";
import { cn } from "@/lib/cn";

type Link = { label: string; href: string };
type FooterSection = { title: string; links: Link[] };

export function SiteFooter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const sections = t.raw("sections") as FooterSection[];

  const switchTo = (next: "de" | "en") => {
    if (next === locale || isPending) return;
    startTransition(() => {
      setLocale(next);
    });
  };

  return (
    <footer className="border-t border-hairline bg-bg">
      <div
        className="container-px mx-auto max-w-container py-14 md:py-24"
        style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-10">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.55] text-ink-muted md:mt-6">
              {t("tagline")}
            </p>
            <div className="mt-8 flex items-center gap-3 md:mt-10">
              <SocialIcon href="#" label="Instagram">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="#" label="GitHub">
                <Github className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
            </div>
          </div>

          {sections.map((section) => (
            <nav
              key={section.title}
              className="md:col-span-2 md:col-start-auto"
              aria-label={section.title}
            >
              <h3 className="font-mono text-[11px] uppercase tracking-caps text-ink-muted md:text-[12px]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2 md:mt-6 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline inline-flex min-h-[36px] items-center text-[15px] text-ink-body hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-5 border-t border-hairline pt-6 md:mt-16 md:flex-row md:items-center md:gap-6 md:pt-8">
          <p className="text-[13px] text-ink-muted">{t("copyright")}</p>

          <div
            className="relative inline-flex items-center gap-1 rounded-full border border-hairline p-1 text-[13px]"
            role="group"
            aria-label={t("langLabel")}
          >
            {(["de", "en"] as const).map((code) => {
              const active = locale === code;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => switchTo(code)}
                  className={cn(
                    "relative min-h-[36px] rounded-full px-4 py-1.5 transition-colors",
                    active ? "text-white" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="footer-lang-knob"
                      aria-hidden="true"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 520, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10">{code.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-ink transition-all duration-base ease-out-expo hover:border-accent hover:text-accent active:scale-[0.96]"
    >
      {children}
    </a>
  );
}
