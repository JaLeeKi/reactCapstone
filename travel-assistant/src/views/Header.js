import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import MyAccount from "../components/MyAccount";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <a href="/">
        <button id="home">Home</button>
      </a>
      <LoginButton />
      <LogoutButton />
      <MyAccount />
    </div>
  );
}
