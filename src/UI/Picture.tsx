import type { ReactElement } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  placeholder?: string; 
};

// Affiche l'image si elle existe, sinon l'emplacement gris de la maquette
function Picture({ src, alt, className = "", placeholder }: Props): ReactElement {
  return (
    <div className={`ui-picture ${className}`.trim()}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : placeholder && <span aria-hidden="true">{placeholder}</span>}
    </div>
  );
}

export default Picture;