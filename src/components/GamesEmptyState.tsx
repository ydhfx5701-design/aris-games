import { genreTags } from "@/lib/data/genres";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function GamesEmptyState({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr] lg:gap-8">
      <Reveal className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <span className="w-fit rounded-full border border-accent-purple/40 bg-accent-purple/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-purple-strong">
          {dict.games.emptyEyebrow}
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-fg sm:text-[1.75rem]">
          {dict.games.emptyTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">{dict.games.emptyBody}</p>
      </Reveal>

      <Reveal delay={80} className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <h4 className="font-display text-base font-bold tracking-tight text-fg">{dict.games.genresHeading}</h4>
        <p className="mt-2 text-sm text-fg-muted">{dict.games.genresBody}</p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {genreTags.map((genre) => (
            <div
              key={genre.key}
              className="flex flex-col items-center gap-2.5 rounded-xl border border-border bg-bg-elevated py-5 text-center transition-colors duration-300 hover:border-accent-purple-strong/50"
            >
              <genre.icon className="h-5 w-5 text-accent-purple-strong" strokeWidth={1.5} />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-fg-muted">{genre.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
