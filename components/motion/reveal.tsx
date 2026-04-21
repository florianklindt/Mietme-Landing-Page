"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, type ReactNode } from "react";
import { useIsMobile } from "@/lib/use-media";

type AsTag =
  | "div"
  | "section"
  | "article"
  | "li"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "span";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: AsTag;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  delay = 0,
  y,
  as = "div",
  className,
  style,
  id,
}: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const Tag = motion[as] as React.ElementType;

  const commonProps = { className, style, id };

  if (reduce) {
    return <Tag {...commonProps}>{children}</Tag>;
  }

  const resolvedY = y ?? (isMobile ? 20 : 24);
  const duration = isMobile ? 0.4 : 0.6;
  const scaledDelay = isMobile ? delay * 0.7 : delay;

  return (
    <Tag
      {...commonProps}
      initial={{ opacity: 0, y: resolvedY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay: scaledDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
