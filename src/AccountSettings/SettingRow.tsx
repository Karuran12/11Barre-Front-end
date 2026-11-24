import type { ReactElement } from "react";
import Toggle from "./Toggle";

type Props = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function SettingRow({ title, description, checked, onChange }: Props): ReactElement {
  return (
    <li className="setting-row">
      <div className="setting-texts">
        <p className="setting-title">{title}</p>
        <p className="setting-desc">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </li>
  );
}

export default SettingRow;