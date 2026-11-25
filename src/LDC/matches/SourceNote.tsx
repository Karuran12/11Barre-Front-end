import type { ReactElement } from "react";

type Props = {
  source?: "api" | "mock";
  loading: boolean;
  onRefresh: () => void;
};

function SourceNote({ source, loading, onRefresh }: Props): ReactElement | null {
  if (!source) return null;
  return (
    <p className="meta source-note">
      <button type="button" className="link-reset" onClick={onRefresh} disabled={loading}>
        {loading ? "Actualisation…" : "Actualiser"}
      </button>
    </p>
  );
}

export default SourceNote;