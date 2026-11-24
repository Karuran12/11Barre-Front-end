import type { ReactElement } from "react";
import "../styles/AccountSettings/Profile.css"

function Profile(): ReactElement{
    return (
        <>
            <div id="Profile">
                <div id="PP">E</div>
                <section id="Infos">
                    <label id="Title">Paramètres du compte</label>
                    <label>exemple@gmail.com · Membre depuis septembre 2026</label>
                </section>
            </div>
        </>
    )
}

export default Profile;