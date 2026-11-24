import type { ReactElement } from "react";
import Tag, { type TagVariant } from "../../UI/Tag";
import type { MercatoItem, MercatoStatus } from "../../types/home";

const STATUS_TAG: Record<MercatoStatus, { label: string; variant: TagVariant }> = {
  official: { label: "Officiel", variant: "solid" },
  rumor: { label: "Rumeur", variant: "outline" },
};

type Props = {
  item: MercatoItem;
};

function MercatoCard({ item }: Props): ReactElement {
  const tag = STATUS_TAG[item.status];

  return (
    <li className="home-mercato-card">
      <Tag label={tag.label} variant={tag.variant} />
      <h3 className="home-mercato-title">{item.title}</h3>
    </li>
  );
}

export default MercatoCard;