import type { Club } from "../types/club";

// Ici on charge le logo du club et on le recolorise selon les couleurs du club pour générer une image de maillot.

export const LOGO_SRC = "/images/logo/logo.png";
const WIDTH = 320;

let logoPromise: Promise<HTMLImageElement> | null = null;
const cache = new Map<string, string>();

function loadLogo(): Promise<HTMLImageElement> {
  logoPromise ??= new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      logoPromise = null;
      reject(new Error("logo.png introuvable"));
    };
    img.src = LOGO_SRC;
  });
  return logoPromise;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export async function buildJerseyImage(club: Club): Promise<string> {
  const cached = cache.get(club.id);
  if (cached) return cached;

  const logo = await loadLogo();
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = Math.round((logo.naturalHeight * WIDTH) / logo.naturalWidth);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas indisponible");

  ctx.drawImage(logo, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = pixels.data;
  const body = hexToRgb(club.colors.primary);
  const details = hexToRgb(club.colors.secondary);

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;
    const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;

    if (lum >= 0.55) {
      [d[i], d[i + 1], d[i + 2]] = details;
    } else {
      const light = Math.min(1, lum / 0.35) * 0.3;
      for (let c = 0; c < 3; c++) d[i + c] = Math.round(body[c] + (255 - body[c]) * light);
    }
  }

  ctx.putImageData(pixels, 0, 0);
  const url = canvas.toDataURL("image/png");
  cache.set(club.id, url);
  return url;
}