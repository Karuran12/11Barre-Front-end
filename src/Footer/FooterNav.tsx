import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useNavMenus } from "../Navbar/useNavMenus";

// Partie droite du footer
function FooterNav(): ReactElement {
  const menus = useNavMenus();
  return (
    <nav className="footer-nav" aria-label="Plan du site">
      {menus.map((menu) => (
        <div key={menu.id} className="footer-col">
          <h2 className="footer-col-title">{menu.label}</h2>
          <ul className="footer-col-list">
            {menu.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer-link">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default FooterNav;