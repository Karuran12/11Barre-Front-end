import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "../styles/UI/UI.css";

// Navbar commune à toutes les pages, chaque page gère son propre <main>
function AppLayout(): ReactElement {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AppLayout;