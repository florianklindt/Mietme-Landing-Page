import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "light" | "subtle" | "dark";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  id?: string;
  as?: "section" | "div" | "footer";
};

const toneClasses: Record<Tone, string> = {
  light: "bg-bg text-ink-body",
  subtle: "bg-bg-subtle text-ink-body",
  dark: "dark-section",
};

export function Section({
  tone = "light",
  as: Tag = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative w-full",
        "py-section-y",
        toneClasses[tone],
        className
      )}
      {...rest}
    >
      <div className="container-px mx-auto max-w-container">{children}</div>
    </Tag>
  );
}
