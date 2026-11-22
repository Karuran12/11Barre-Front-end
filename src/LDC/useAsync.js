import { useEffect, useState } from "react";
// Charge des données et gère chargement / erreur. Relance quand `key` change.
export function useAsync(load, key = "") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        load()
            .then((d) => { if (!cancelled)
            setData(d); })
            .catch((e) => { if (!cancelled)
            setError(e.message); })
            .finally(() => { if (!cancelled)
            setLoading(false); });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return { data, loading, error };
}
