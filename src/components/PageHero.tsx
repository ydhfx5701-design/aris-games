import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-elevated py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(139,92,246,0.14) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.28em] text-accent-purple-strong uppercase">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-fg sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">{description}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
