import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import FavoriteClubProvider from "../Club/FavoriteClubProvider";
import AuthProvider from "../Account/AuthProvider";
import "../styles/UI/UI.css";
import "../styles/Layout/AppLayout.css";

// Navbar et footer communs à toutes les pages, chaque page gère son propre <main>
function AppLayout(): ReactElement {
  return (
    <AuthProvider>
    <FavoriteClubProvider>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <div className="app-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </FavoriteClubProvider>
    </AuthProvider>
  );
}

export default AppLayout;