import type { ReactElement } from "react";
import "../styles/SignUp/SignUp.css";
import SignUpForm from "./SignUpForm";

function SignUp(): ReactElement{
    return (
        <>
            <section id="SignUpComponent">
                <h2 id="SignInComponentTitle">Crée ton compte</h2>
                <label id="SignUpComponentSubTitle">Gratuit, en moins d'une minute.</label>
                <SignUpForm></SignUpForm>
                <label id="SignUpLabel">Pas encore de compte ? Créer un compte</label>
            </section>
        </>
    );
}

export default SignUp;