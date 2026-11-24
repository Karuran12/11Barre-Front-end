import type { ReactElement } from "react";

export type TagVariant = "accent" | "solid" | "outline" | "club";

type Props = {
  label: string;
  variant?: TagVariant;
};

// Étiquette arrondie (Ligue des champions, Officiel, Rumeur, etc).
function Tag({ label, variant = "accent" }: Props): ReactElement {
  return <span className={`ui-tag ui-tag--${variant}`}>{label}</span>;
}

export default Tag;