import type { Club } from "../types/club";

// Transforme les couleurs d'un club en variables CSS pour le site.


function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Si les deux couleurs du club sont claires, on garde le bleu nuit de 11barre.
function strongColor(club: Club): string {
  const dark = [club.colors.primary, club.colors.secondary].find((c) => luminance(c) < 0.3);
  return dark ?? "#0a1a4f";
}

const VARS = ["--club-primary", "--club-secondary", "--club-strong"] as const;

export function applyClubTheme(club: Club | undefined): void {
  const root = document.documentElement;

  if (!club) {
    VARS.forEach((v) => root.style.removeProperty(v));
    delete root.dataset.club;
    return;
  }

  root.style.setProperty("--club-primary", club.colors.primary);
  root.style.setProperty("--club-secondary", club.colors.secondary);
  root.style.setProperty("--club-strong", strongColor(club));
  root.dataset.club = club.id;
}