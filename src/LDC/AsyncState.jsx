// Affiche chargement / erreur communs aux pages LDC
export default function AsyncState({ loading, error, label }) {
    if (loading)
        return <p role="status">Chargement : {label}…</p>;
    if (error)
        return <p role="alert" className="msg-error">Impossible de charger {label} : {error}. Réessaie dans un instant.</p>;
    return null;
}
