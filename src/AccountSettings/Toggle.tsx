import type { ReactElement } from "react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

function Toggle({ checked, onChange, label }: Props): ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? "toggle is-on" : "toggle"}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-dot" />
      </span>
      <span className="toggle-text" aria-hidden="true">{checked ? "Activé" : "Désactivé"}</span>
    </button>
  );
}

export default Toggle;