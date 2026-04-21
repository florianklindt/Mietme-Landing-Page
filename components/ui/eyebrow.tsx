import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  withHairline = true,
}: {
  children: React.ReactNode;
  className?: string;
  withHairline?: boolean;
}) {
  return (
    <div className={cn("mb-10", className)}>
      <span className="eyebrow block">{children}</span>
      {withHairline ? <div className="hairline mt-4 max-w-[88px]" /> : null}
    </div>
  );
}
