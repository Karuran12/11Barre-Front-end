import type { ReactElement } from "react";
import Profile from "./Profile";
import Body from "./Body";
import "../styles/AccountSettings/AccountSettings.css";

function AccountSettings(): ReactElement {
  return (
    <main className="settings">
      <Profile />
      <Body />
    </main>
  );
}

export default AccountSettings;