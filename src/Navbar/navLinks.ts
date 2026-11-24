import { PATHS } from "../routes/paths";

export type NavItem = {
  label: string;
  to: string;
};

export type NavMenu = {
  id: string;
  label: string;
  items: NavItem[];
};

// Les 4 menus de la maquette (logo = accueil).
export const NAV_MENUS: NavMenu[] = [
  {
    id: "ldc",
    label: "LDC",
    items: [
      { label: "Classement en direct", to: PATHS.ldcClassement },
      { label: "Livescore", to: PATHS.ldcMatchs },
      { label: "Mon club", to: PATHS.ldcMonClub },
      { label: "Billetterie", to: PATHS.ldcBilletterie },
    ],
  },
  {
    id: "pronos",
    label: "Pronos",
    items: [
      { label: "Faire mon prono", to: PATHS.pronos },
      { label: "Classement entre amis", to: PATHS.pronosAmis },
    ],
  },
  {
    id: "jeux",
    label: "Jeux",
    items: [
      { label: "Mode carrière", to: PATHS.jeuxCarriere },
      { label: "Reprendre ma partie", to: PATHS.jeuxReprendre },
    ],
  },
  {
    id: "compte",
    label: "Compte",
    items: [
      { label: "Se connecter", to: PATHS.signIn },
      { label: "Créer un compte", to: PATHS.signUp },
      { label: "Paramètres", to: PATHS.parametres },
    ],
  },
];