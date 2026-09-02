import { socialLinks } from "@/lib/data/social";
import { DiscordIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";

const iconMap = {
  discord: DiscordIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  instagram: InstagramIcon,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => {
        const Icon = iconMap[social.id];
        const isActive = Boolean(social.url);
        const shared =
          "flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors duration-300";

        if (!isActive) {
          return (
            <span
              key={social.id}
              className={cn(shared, "cursor-default opacity-40")}
              aria-label={`${social.label} (준비 중)`}
              title={`${social.label} — coming soon`}
            >
              <Icon className="h-4 w-4" />
            </span>
          );
        }

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(shared, "hover:border-accent-purple-strong hover:text-fg")}
            aria-label={social.label}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
