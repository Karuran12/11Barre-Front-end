import type { ReactElement } from "react";
import { PASSWORD_RULES } from "../Account/validation";

// Règles du mot de passe, cochées en vert au fur et à mesure (maquette « Crée ton compte »).
function PasswordRules({ password }: { password: string }): ReactElement {
  return (
    <ul className="password-rules" aria-label="Règles du mot de passe">
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password);
        return (
          <li key={rule.label} className={ok ? "is-valid" : undefined}>
            <span aria-hidden="true">{ok ? "✓" : "•"}</span> {rule.label}
            <span className="ui-sr-only">{ok ? " (validé)" : " (pas encore validé)"}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordRules;