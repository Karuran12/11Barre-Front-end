import type { ReactElement } from "react";
import MercatoCard from "./MercatoCard";
import type { MercatoItem } from "../../types/home";
import "../../styles/Home/Mercato.css";

type Props = {
  items: MercatoItem[];
};

function MercatoSection({ items }: Props): ReactElement {
  return (
    <section className="home-mercato" aria-labelledby="home-mercato-title">
      <h2 id="home-mercato-title" className="home-section-title">Mercato</h2>
      <ul className="home-mercato-list">
        {items.map((item) => (
          <MercatoCard key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default MercatoSection;