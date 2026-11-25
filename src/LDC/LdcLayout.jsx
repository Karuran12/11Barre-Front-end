import { NavLink, Outlet } from "react-router-dom";
import { useLdcMatches } from "./matches/useLdcMatches";
import "../styles/LDC/LDC.css";
const tabs = [
  { to: "/ldc/classement", label: "Classement" },
  { to: "/ldc/matchs", label: "Matchs" },
  { to: "/ldc/mon-club", label: "Mon club" },
  { to: "/ldc/billetterie", label: "Billetterie" },
];

function useSeasonLine() {
    const { data } = useLdcMatches();
    const current = data?.groups.find((g) => g.key === data.currentKey);
    const season = data?.season ? `Saison ${data.season}` : "Saison 2026-2027";
    return current ? `${season} · ${current.phase}, ${current.label}` : season;
}

export default function LdcLayout() {
    const seasonLine = useSeasonLine();
    return (<>
      <header className="ldc-hero">
        <div className="container">
          <p className="season">{seasonLine}</p>
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