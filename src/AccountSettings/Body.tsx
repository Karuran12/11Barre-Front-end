import type { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import Parts from "./Parts";
import { DEFAULT_SECTION, SECTIONS } from "./sections";
import "../styles/AccountSettings/Body.css";
import "../styles/AccountSettings/Sections.css";

function Body(): ReactElement {
  const [params] = useSearchParams();
  const section = SECTIONS.find((s) => s.id === params.get("rubrique")) ?? SECTIONS.find((s) => s.id === DEFAULT_SECTION)!;
  const { Component } = section;

  return (
    <div className="settings-body">
      <Parts active={section.id} />
      <section className="settings-panel" aria-labelledby="settings-panel-title">
        <h2 id="settings-panel-title" className="settings-panel-title">{section.title}</h2>
        {/* key : chaque rubrique repart de zéro quand on change */}
        <Component key={section.id} />
      </section>
    </div>
  );
}

export default Body;