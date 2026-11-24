import type { ReactElement } from "react";
import "../styles/AccountSettings/AccountSettings.css"
import Profile from "./Profile"
import Body from "./Body";

function AccountSettings(): ReactElement{
    return (
        <>
            <div id="AccountSettings">
                <Profile/>
                <Body/>
            </div>
        </>
    )
}

export default AccountSettings;