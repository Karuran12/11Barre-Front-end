import type { ReactElement } from "react";
import "../styles/CommonComponents/Checkbox.css"

interface Data{
    text:string;
}

function Checkbox(data:Data): ReactElement{
    return (
        <>
            <div className="Checkbox">
                <input type="checkbox" name="" id="" />
                <label>{data.text}</label>
            </div>
        </>
    )
}

export default Checkbox;