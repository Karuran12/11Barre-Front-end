import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import type { NavMenu } from "./navLinks";

type Props = {
  menu: NavMenu;
  open: boolean;
  onToggle: () => void;
};

// Un menu de la navbar ordinateur: bouton + liste déroulante
function NavDropdown({ menu, open, onToggle }: Props): ReactElement {
  const panelId = `nav-panel-${menu.id}`;

  return (
    <li className="nav-menu">
      <button
        type="button"
        className={open ? "nav-menu-btn is-open" : "nav-menu-btn"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{menu.label}</span>
        <span className="nav-caret" aria-hidden="true">▾</span>
      </button>

      <ul id={panelId} className="nav-panel" hidden={!open}>
        {menu.items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-panel-link is-active" : "nav-panel-link")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default NavDropdown;