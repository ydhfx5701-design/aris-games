import type { LucideIcon } from "lucide-react";
import { Swords, BrainCircuit, Building2, Gamepad2, Car, Sparkles, Smartphone, Monitor } from "lucide-react";

export type GenreTag = {
  key: string;
  label: string;
  icon: LucideIcon;
};

export const genreTags: GenreTag[] = [
  { key: "action", label: "Action", icon: Swords },
  { key: "strategy", label: "Strategy", icon: BrainCircuit },
  { key: "simulation", label: "Simulation", icon: Building2 },
  { key: "casual", label: "Casual", icon: Gamepad2 },
  { key: "racing", label: "Racing", icon: Car },
  { key: "rpg", label: "RPG", icon: Sparkles },
  { key: "mobile", label: "Mobile", icon: Smartphone },
  { key: "pc", label: "PC", icon: Monitor },
];
