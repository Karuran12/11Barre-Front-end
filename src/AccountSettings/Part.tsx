import type { ReactElement } from "react";
import "../styles/AccountSettings/Part.css"

interface Data{
    title:string,
    type:string
};

function Part(data: Data): ReactElement{
    return (
        <>
            <label id={data.type}>
                {data.title}
            </label>
        </>
    )
}

export default Part;