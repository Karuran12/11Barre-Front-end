import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useNavMenus } from "./useNavMenus";
import "../styles/Navbar/MobileMenu.css";

type Props = {
  id: string;
  open: boolean;
};

// Menu plein écran du burger
function MobileMenu({ id, open }: Props): ReactElement {
  const menus = useNavMenus();
  return (
    <div id={id} className="mobile-menu" hidden={!open}>
      {menus.map((menu) => (
        <section key={menu.id} className="mobile-menu-group" aria-labelledby={`mm-${menu.id}`}>
          <h2 id={`mm-${menu.id}`} className="mobile-menu-title">
            <span>{menu.label}</span>
            <span aria-hidden="true">▾</span>
          </h2>
          <ul className="mobile-menu-list">
            {menu.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? "mobile-menu-link is-active" : "mobile-menu-link")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default MobileMenu;