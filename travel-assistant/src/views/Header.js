import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import MyAccount from "../components/MyAccount";
import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";

export default function Header() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div className="signInScreen"></div>;

  return (
    <div className="header">
      <div className="signInScreen">
        <div className="signInBtn">
          <LoginButton />
          <LogoutButton />
          <MyAccount />
        </div>
      </div>
      <div className="resetBtnCont">
        <a href="/">
          <button className="resetBtn">Reset</button>
        </a>
      </div>
    </div>
  );
}
