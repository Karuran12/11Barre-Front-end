import { useEffect, useState } from "react";
import { getStandings } from "./api";
export function useStandings() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancelled = false;
        getStandings()
            .then((d) => { if (!cancelled)
            setData(d); })
            .catch((e) => { if (!cancelled)
            setError(e.message); })
            .finally(() => { if (!cancelled)
            setLoading(false); });
        return () => { cancelled = true; };
    }, []);
    return { data, loading, error };
}
