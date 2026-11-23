import type { ReactElement } from "react";
import "../styles/CommonComponents/FormField.css"

interface FormFieldData{
    title:string;
}

function FormField(props: FormFieldData): ReactElement{
    return (
        <>
            <div className="SignInFormField">
                <label id="Title">{props.title}</label>
                <input id="TextField" type="text"/>
            </div>
        </>
    )
}

export default FormField;