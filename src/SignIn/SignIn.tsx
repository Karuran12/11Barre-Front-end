import type { ReactElement } from "react";
import "../styles/SignIn/SignIn.css"

function SignIn(): ReactElement{
    return (
        <section id="SignInComponent">
            <h2 id="SignInComponentTitle">Content de te revoir</h2>
            <label id="SignInComponentSubTitle">Connecte-toi pour retrouver tes pronos et ta carrière.</label>
        </section>
    )
}

export default SignIn;