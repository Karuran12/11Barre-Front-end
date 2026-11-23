import type { ReactElement } from "react";
import "../styles/SignIn/SignInForm.css";
import FormField from "../CommonComponents/FormField";

function SignInForm(): ReactElement{
    return(
        <>
            <form id="SignInForm">
                <FormField title="Adresse e-mail"></FormField>
                <FormField title="Mot de passe"></FormField>
                <label id="ForgottenPasswordLabel">Mot de passe oublié ?</label>
                <div className="SignInFormButton">Se connecter</div>
                <div className="SignInFormButton" id="GoogleButton">Continuer avec Google</div>
            </form>
        </>
    );
}

export default SignInForm;