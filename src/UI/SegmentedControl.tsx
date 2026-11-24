import type { ReactElement } from "react";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string; 
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
};

// Bloc "Choix" de la maquette (Aujourd'hui / Cette semaine, En direct / À venir)
function SegmentedControl<T extends string>({ label, options, value, onChange, fullWidth }: Props<T>): ReactElement {
  return (
    <div className={fullWidth ? "ui-segmented ui-segmented--full" : "ui-segmented"} role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={opt.value === value}
          className={opt.value === value ? "ui-segmented-btn is-active" : "ui-segmented-btn"}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;