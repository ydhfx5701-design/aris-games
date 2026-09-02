import { AlertTriangle } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function LegalPlaceholder({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-accent-purple/30 bg-accent-purple/10 px-5 py-4">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-purple-strong" />
      <div className="text-sm">
        <p className="text-fg">{dict.legal.placeholderNotice}</p>
        <p className="mt-1 text-xs text-fg-subtle">
          {dict.legal.lastUpdated}: {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </div>
  );
}
