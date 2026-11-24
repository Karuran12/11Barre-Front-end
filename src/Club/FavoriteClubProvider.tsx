import { useCallback, useEffect, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { FavoriteClubContext } from "./favoriteClubContext";
import { applyClubTheme } from "./clubTheme";
import { getClub } from "../mocks/clubs";

const STORAGE_KEY = "11barre.favoriteClub";
const COLORS_KEY = "11barre.clubColors";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // stockage indisponible (navigation privée) : le choix vaut pour la session
  }
}

function FavoriteClubProvider({ children }: { children: ReactNode }): ReactElement {
  const [clubId, setClubIdState] = useState<string | null>(() => read(STORAGE_KEY));
  const [colorsEnabled, setColorsState] = useState(() => read(COLORS_KEY) !== "off");
  const club = getClub(clubId);
  const themeClub = colorsEnabled ? club : undefined;

  const setClubId = useCallback((id: string | null) => {
    setClubIdState(id);
    write(STORAGE_KEY, id);
  }, []);

  const setColorsEnabled = useCallback((on: boolean) => {
    setColorsState(on);
    write(COLORS_KEY, on ? null : "off");
  }, []);

  useEffect(() => applyClubTheme(themeClub), [themeClub]);

  const value = useMemo(
    () => ({ club, setClubId, colorsEnabled, setColorsEnabled, themeClub }),
    [club, setClubId, colorsEnabled, setColorsEnabled, themeClub],
  );

  return <FavoriteClubContext.Provider value={value}>{children}</FavoriteClubContext.Provider>;
}

export default FavoriteClubProvider;