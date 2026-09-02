export type SocialLink = {
  id: "discord" | "youtube" | "x" | "instagram";
  label: string;
  /** Leave empty until the official account exists — links only render once filled in. */
  url: string;
};

export const socialLinks: SocialLink[] = [
  { id: "discord", label: "Discord", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
  { id: "x", label: "X", url: "" },
  { id: "instagram", label: "Instagram", url: "" },
];
