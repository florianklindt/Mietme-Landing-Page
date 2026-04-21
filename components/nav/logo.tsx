import { cn } from "@/lib/cn";

export function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <a
      href="/"
      aria-label="mietme — zur Startseite"
      className={cn(
        "inline-flex items-baseline gap-[1px] font-sans text-[22px] font-medium tracking-[-0.03em]",
        dark ? "text-white" : "text-ink",
        className
      )}
    >
      <span>mietme</span>
      <span className="h-[5px] w-[5px] translate-y-[1px] rounded-full bg-accent" aria-hidden="true" />
    </a>
  );
}
