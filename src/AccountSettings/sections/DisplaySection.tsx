import type { ReactElement } from "react";
import SettingRow from "../SettingRow";
import { useFavoriteClub } from "../../Club/useFavoriteClub";

function DisplaySection(): ReactElement {
  const { club, colorsEnabled, setColorsEnabled } = useFavoriteClub();

  return (
    <ul className="setting-list">
      <SettingRow
        title="Couleurs de mon club"
        description={
          club
            ? `Le maillot 11barre et les détails du site prennent les couleurs de ${club.name}`
            : "Choisis d'abord une équipe favorite dans « Mes clubs »"
        }
        checked={colorsEnabled}
        onChange={setColorsEnabled}
      />
    </ul>
  );
}

export default DisplaySection;