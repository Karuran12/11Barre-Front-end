import { useId, type ReactElement, type ReactNode } from "react";
import "../styles/CommonComponents/Checkbox.css";

type Props = {
  text: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
};

function Checkbox({ text, checked, onChange, error }: Props): ReactElement {
  const id = useId();

  return (
    <div className={error ? "checkbox has-error" : "checkbox"}>
      <div className="checkbox-row">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id}>{text}</label>
      </div>
      {error && <p id={`${id}-error`} className="checkbox-error">{error}</p>}
    </div>
  );
}

export default Checkbox;