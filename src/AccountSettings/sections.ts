import type { ComponentType } from "react";
import ProfileSection from "./sections/ProfileSection";
import NotificationsSection from "./sections/NotificationsSection";
import ClubsSection from "./sections/ClubsSection";
import DisplaySection from "./sections/DisplaySection";
import PrivacySection from "./sections/PrivacySection";
import SecuritySection from "./sections/SecuritySection";

export const SECTIONS: { id: string; title: string; Component: ComponentType }[] = [
  { id: "profil", title: "Profil", Component: ProfileSection },
  { id: "notifications", title: "Notifications", Component: NotificationsSection },
  { id: "clubs", title: "Mes clubs", Component: ClubsSection },
  { id: "affichage", title: "Affichage", Component: DisplaySection },
  { id: "confidentialite", title: "Confidentialité", Component: PrivacySection },
  { id: "securite", title: "Sécurité", Component: SecuritySection },
];

export const DEFAULT_SECTION = "notifications";