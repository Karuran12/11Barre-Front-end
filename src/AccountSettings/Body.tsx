import type { ReactElement } from "react";
import "../styles/AccountSettings/Body.css"
import Parts from "./Parts";

function Body(): ReactElement{
    return (
        <>
            <section id="Body">
                <Parts/>
            </section>
        </>
    )
}

export default Body;