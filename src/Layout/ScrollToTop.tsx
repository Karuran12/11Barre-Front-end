import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// À chaque changement de page, on revient en haut de la page, sauf si l'URL contient un hash (ancre) qui indique une position spécifique.
function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;