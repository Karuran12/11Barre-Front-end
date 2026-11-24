import { createContext } from "react";
import type { Club } from "../types/club";

export type FavoriteClubValue = {
  club: Club | undefined;
  setClubId: (id: string | null) => void;
  colorsEnabled: boolean;
  setColorsEnabled: (on: boolean) => void;
  themeClub: Club | undefined; 
};

export const FavoriteClubContext = createContext<FavoriteClubValue>({
  club: undefined,
  setClubId: () => {},
  colorsEnabled: true,
  setColorsEnabled: () => {},
  themeClub: undefined,
});