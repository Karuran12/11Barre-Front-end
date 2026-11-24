import type { ReactElement } from "react";
import "../styles/AccountSettings/Parts.css"
import Part from "./Part";

function Parts(): ReactElement{
    return (
        <>
            <section id="Parts">
                {["Profil", "Notifications", "Mes clubs", "Affichage", "Confidentialité", "Sécurité"].map((value: string)=>{
                    return (<Part title={value} type="Part"/>)
                })}

                <Part title="Se déconecter" type="ButtonPart"/>
            </section>
        </>
    )
}

export default Parts;