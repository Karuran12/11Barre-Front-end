import { useContext } from "react";
import { FavoriteClubContext, type FavoriteClubValue } from "./favoriteClubContext";

export function useFavoriteClub(): FavoriteClubValue {
  return useContext(FavoriteClubContext);
}