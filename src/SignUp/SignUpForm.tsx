import type { ReactElement } from "react";
import "../styles/SignUp/SignUpForm.css";
import FormField from "../CommonComponents/FormField";
import Checkbox from "../CommonComponents/Checkbox";

function SignUpForm(): ReactElement{
    return(
        <>
            <form id="SignUpForm">
                <FormField title="Pseudo"></FormField>
                <FormField title="Adresse e-mail"></FormField>
                <FormField title="Mot de passe"></FormField>
                <ul>
                    <li>8 charactères minimum</li>
                    <li>Au moins un chiffre</li>
                    <li>Au moins une majuscule</li>
                </ul>
                <Checkbox text="J'accepte les conditions d'utilisation"></Checkbox>
                <div className="SignInFormButton">Se connecter</div>
            </form>
        </>
    );
}

export default SignUpForm;