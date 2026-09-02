import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Game } from "@/lib/data/games";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function GameCard({ game, lang, dict }: { game: Game; lang: Locale; dict: Dictionary }) {
  return (
    <Link
      href={`/${lang}/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent-purple-strong/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
          {game.genre}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-fg">{game.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">{game.tagline}</p>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-fg-subtle">
            {game.platforms.join(" · ")}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-purple-strong">
            {dict.games.detailCta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
