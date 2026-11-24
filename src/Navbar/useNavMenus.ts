import { useMemo } from "react";
import { NAV_MENUS, type NavMenu } from "./navLinks";
import { useAuth } from "../Account/useAuth";
import { PATHS } from "../routes/paths";

// Menu « Compte » connecté 
const ACCOUNT_ITEMS = [
  { label: "Paramètres", to: PATHS.parametres },
  { label: "Notifications", to: `${PATHS.parametres}?rubrique=notifications` },
  { label: "Mes clubs", to: `${PATHS.parametres}?rubrique=clubs` },
  { label: "Se déconnecter", to: PATHS.signOut },
];

export function useNavMenus(): NavMenu[] {
  const { user } = useAuth();
  return useMemo(
    () => (user ? NAV_MENUS.map((m) => (m.id === "compte" ? { ...m, items: ACCOUNT_ITEMS } : m)) : NAV_MENUS),
    [user],
  );
}