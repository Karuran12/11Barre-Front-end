import { useState, type ReactElement } from "react";
import SettingRow from "../SettingRow";
import { useAuth } from "../../Account/useAuth";
import { DEFAULT_NOTIFICATIONS, type NotificationKey } from "../../Account/accountStorage";

const ITEMS: { key: NotificationKey; title: string; description: string }[] = [
  { key: "goals", title: "Buts de mes clubs", description: "Une alerte à chaque but de mes équipes" },
  { key: "kickoff", title: "Début des matchs", description: "15 minutes avant le coup d'envoi" },
  { key: "pronoResult", title: "Résultat de mes pronos", description: "Points gagnés ou perdus après le match" },
  { key: "pronoReminder", title: "Rappel de prono", description: "Si je n'ai pas encore parié 1 h avant" },
  { key: "tickets", title: "Alertes billetterie", description: "Quand des places se libèrent" },
];

function NotificationsSection(): ReactElement {
  const { user, update } = useAuth();
  const [draft, setDraft] = useState(user?.notifications ?? DEFAULT_NOTIFICATIONS);
  const [saved, setSaved] = useState(false);

  const change = (key: NotificationKey, on: boolean) => {
    setDraft((d) => ({ ...d, [key]: on }));
    setSaved(false);
  };

  const save = () => {
    update({ notifications: draft });
    setSaved(true);
  };

  return (
    <>
      <ul className="setting-list">
        {ITEMS.map((item) => (
          <SettingRow
            key={item.key}
            title={item.title}
            description={item.description}
            checked={draft[item.key]}
            onChange={(on) => change(item.key, on)}
          />
        ))}
      </ul>
      <div className="settings-actions">
        <button type="button" className="ui-btn" onClick={save}>Enregistrer</button>
        <p className="ui-success" role="status">{saved && "✓ Modifications enregistrées"}</p>
      </div>
    </>
  );
}

export default NotificationsSection;