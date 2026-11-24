import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import { useNavMenus } from "./useNavMenus";
import { useClickOutside } from "./useClickOutside";
import "../styles/Navbar/Navbar.css";

function Navbar(): ReactElement {
  const menus = useNavMenus();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menusRef = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();

  const closeMenus = useCallback(() => setOpenMenu(null), []);
  
  useClickOutside(menusRef, closeMenus, openMenu !== null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const toggleMenu = (id: string) => setOpenMenu((current) => (current === id ? null : id));

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Navigation principale">
        <NavLogo />

        <ul ref={menusRef} className="nav-menus">
          {menus.map((menu) => (
            <NavDropdown
              key={menu.id}
              menu={menu}
              open={openMenu === menu.id}
              onToggle={() => toggleMenu(menu.id)}
            />
          ))}
        </ul>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      <MobileMenu id="mobile-menu" open={mobileOpen} />
    </header>
  );
}

export default Navbar;