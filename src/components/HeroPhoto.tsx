import Image from "next/image";

export function HeroPhoto({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* left-side fade: keeps the text column readable, mirrors the reference layout */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/55 to-transparent sm:via-bg/65" />

      {/* top darkening: keeps the nav bar legible over bright sky/highlights */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

      {/* bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/10 to-transparent" />

      {/* corner vignette: subtle, restrained darkening at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* faint brand-color wash to tie the photo into the palette */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 30%, rgba(139,92,246,0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
