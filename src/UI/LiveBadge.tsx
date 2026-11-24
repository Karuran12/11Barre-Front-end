import type { ReactElement } from "react";

type Props = {
  label: string; 
};

function LiveBadge({ label }: Props): ReactElement {
  return (
    <span className="ui-live">
      <span className="ui-live-dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export default LiveBadge;