"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion, type MotionStyle } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/#wie", key: "howItWorks" as const, match: "/#wie" },
  { href: "/#kategorien", key: "categories" as const, match: "/#kategorien" },
  { href: "/#vermieter", key: "forHosts" as const, match: "/#vermieter" },
  { href: "/#faq", key: "faq" as const, match: "/#faq" },
  { href: "/ueber-uns", key: "about" as const, match: "/ueber-uns" },
];

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const bgColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]
  );
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerStyle: MotionStyle = reduce
    ? {
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }
    : { backgroundColor: bgColor, backdropFilter: blur, WebkitBackdropFilter: blur };

  const borderStyle: MotionStyle = reduce ? { opacity: 1 } : { opacity: borderOpacity };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 safe-top"
        style={headerStyle}
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hairline"
          style={borderStyle}
        />
        <div className="container-px mx-auto max-w-container">
          <div className="flex h-16 items-center justify-between">
            <Logo />

            <nav
              className="hidden items-center gap-10 md:flex"
              aria-label="Hauptnavigation"
            >
              {navItems.map((item) => {
                const isActive = item.match.startsWith("/#")
                  ? false
                  : pathname === item.match;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "link-underline text-[14px] transition-colors duration-fast",
                      isActive ? "text-ink" : "text-ink-body/90 hover:text-ink"
                    )}
                  >
                    {t(item.key)}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <ButtonLink
                href="https://go.mietme.app"
                variant="primary"
                className="hidden md:inline-flex h-10 min-h-0 px-5 text-[14px]"
              >
                {t("cta")}
              </ButtonLink>
              <button
                ref={toggleRef}
                type="button"
                aria-label={t("menu")}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen(true)}
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white active:scale-[0.96] transition-transform"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileNavOverlay
        open={open}
        onClose={() => setOpen(false)}
        firstLinkRef={firstLinkRef}
        toggleRef={toggleRef}
        pathname={pathname}
      />
    </>
  );
}

function MobileNavOverlay({
  open,
  onClose,
  firstLinkRef,
  toggleRef,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  firstLinkRef: React.RefObject<HTMLAnchorElement>;
  toggleRef: React.RefObject<HTMLButtonElement>;
  pathname: string | null;
}) {
  const t = useTranslations("nav");
  const reduce = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggleNode = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevWidth = document.body.style.width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    document.body.style.width = "100%";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const id = requestAnimationFrame(() => firstLinkRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.width = prevWidth;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      toggleNode?.focus();
    };
  }, [open, firstLinkRef, toggleRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className={cn(
            "fixed inset-0 z-[60] flex flex-col bg-white md:hidden",
            "pt-safe pb-safe"
          )}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container-px mx-auto flex h-16 w-full items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label={t("close")}
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline active:scale-[0.96] transition-transform"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            className="container-px mx-auto flex w-full flex-1 flex-col justify-start overflow-y-auto pt-8"
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => {
                const isActive = item.match.startsWith("/#")
                  ? false
                  : pathname === item.match;
                return (
                  <li key={item.key}>
                    <motion.a
                      href={item.href}
                      onClick={onClose}
                      ref={i === 0 ? firstLinkRef : undefined}
                      aria-current={isActive ? "page" : undefined}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reduce ? 0 : 0.05 * i + 0.08,
                        duration: reduce ? 0 : 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={cn(
                        "flex items-center gap-3 border-b border-hairline py-5 font-medium tracking-display text-ink",
                        "min-h-[56px]"
                      )}
                      style={{ fontSize: "clamp(28px, 8vw, 36px)", lineHeight: 1.1 }}
                    >
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full bg-accent"
                        />
                      ) : null}
                      {t(item.key)}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.35,
              duration: reduce ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="container-px mx-auto w-full pb-6 pt-4"
          >
            <ButtonLink
              href="https://go.mietme.app"
              variant="primary"
              fullWidth
              withArrow
              onClick={onClose}
            >
              {t("cta")}
            </ButtonLink>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
