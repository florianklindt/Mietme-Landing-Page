"use client";

import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";

type Variant = "primary" | "ghost" | "inverse";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  magnetic?: boolean;
  withArrow?: boolean;
  asChild?: false;
  children: ReactNode;
  fullWidth?: boolean;
};

type AnchorProps = {
  variant?: Variant;
  magnetic?: boolean;
  withArrow?: boolean;
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight " +
  "min-h-[48px] h-12 px-6 text-[16px] md:text-[15px] md:min-h-0 " +
  "transition-[background-color,color,border-color,transform] duration-base ease-out-expo " +
  "active:scale-[0.97] select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  ghost:
    "bg-transparent text-ink border border-ink/90 hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  inverse:
    "bg-white text-ink hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      magnetic = false,
      withArrow = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const content = (
      <button
        ref={ref}
        className={cn(base, variants[variant], "group", fullWidth && "w-full", className)}
        {...props}
      >
        <span>{children}</span>
        {withArrow ? (
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-base ease-out-expo group-hover:translate-x-0.5"
          />
        ) : null}
      </button>
    );

    return magnetic ? <Magnetic>{content}</Magnetic> : content;
  }
);

export function ButtonLink({
  variant = "primary",
  magnetic = false,
  withArrow = false,
  fullWidth = false,
  href,
  className,
  children,
  ...rest
}: AnchorProps) {
  const content = (
    <a
      href={href}
      className={cn(base, variants[variant], "group", fullWidth && "w-full", className)}
      {...rest}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-base ease-out-expo group-hover:translate-x-0.5"
        />
      ) : null}
    </a>
  );
  return magnetic ? <Magnetic>{content}</Magnetic> : content;
}
