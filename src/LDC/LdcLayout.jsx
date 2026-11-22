import { NavLink, Outlet } from "react-router-dom";
import "../styles/LDC/LDC.css";
const tabs = [
  { to: "/ldc/classement", label: "Classement" },
  { to: "/ldc/matchs", label: "Matchs" },
  { to: "/ldc/mon-club", label: "Mon club" },
  { to: "/ldc/billetterie", label: "Billetterie" },
];
export default function LdcLayout() {
    return (<>
      <header className="ldc-hero">
        <div className="container">
          <p className="season">Saison 2026-2027 · Phase de ligue, 4e journée</p>
          <h1>Ligue des champions</h1>
          <nav aria-label="Sections Ligue des champions">
            <ul className="tabs">
              {tabs.map((t) => (<li key={t.to}>
                  <NavLink to={t.to} className={({ isActive }) => (isActive ? "tab active" : "tab")}>
                    {t.label}
                  </NavLink>
                </li>))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container ldc-main">
        <Outlet />
      </main>
    </>);
}
