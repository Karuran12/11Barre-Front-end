import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../styles/AccountSettings/Part.css";

type Props = {
  id: string;
  title: string;
  active: boolean;
};

function Part({ id, title, active }: Props): ReactElement {
  return (
    <li>
      <Link
        to={`?rubrique=${id}`}
        replace
        className={active ? "settings-part is-active" : "settings-part"}
        aria-current={active ? "page" : undefined}
      >
        {title}
      </Link>
    </li>
  );
}

export default Part;