import type { ReactElement } from "react";
import "../styles/SignIn/SignIn.css"
import SignInForm from "./SignInForm";

function SignIn(): ReactElement{
    return (
        <div id="centerX">
            <section id="SignInComponent">
                <h2 id="SignInComponentTitle">Content de te revoir</h2>
                <label id="SignInComponentSubTitle">Connecte-toi pour retrouver tes pronos et ta carrière.</label>
                <SignInForm></SignInForm>
                <label id="SignInLabel">Pas encore de compte ? Créer un compte</label>
            </section>
        </div>
    )
}

export default SignIn;