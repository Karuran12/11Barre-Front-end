import { useCallback, useEffect, useState } from "react";
import { loadLdcMatches, type LdcMatches } from "./ldcMatches";

type State = { data?: LdcMatches; loading: boolean };

export function useLdcMatches(): State & { refresh: () => void } {
  const [state, setState] = useState<State>({ loading: true });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadLdcMatches(version > 0).then((data) => {
      if (!cancelled) setState({ data, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const refresh = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    setVersion((v) => v + 1);
  }, []);

  return { ...state, refresh };
}