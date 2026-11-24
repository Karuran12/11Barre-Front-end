import { useId, type InputHTMLAttributes, type ReactElement, type ReactNode } from "react";
import "../styles/CommonComponents/FormField.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  title: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: ReactNode;
};

function FormField({ title, value, onChange, error, hint, type = "text", ...input }: Props): ReactElement {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className={error ? "form-field has-error" : "form-field"}>
      <label className="form-field-label" htmlFor={id}>{title}</label>
      <input
        id={id}
        className="form-field-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        {...input}
      />
      {(error || hint) && (
        <div id={messageId} className="form-field-message">
          {error ?? hint}
        </div>
      )}
    </div>
  );
}

export default FormField;