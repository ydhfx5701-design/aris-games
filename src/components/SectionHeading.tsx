import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="text-xs font-semibold tracking-[0.28em] text-accent-purple-strong uppercase">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
    </Reveal>
  );
}
