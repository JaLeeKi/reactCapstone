import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button onClick={() => logout()} className="signOutBtn">
        Sign Out
      </button>
    )
  );
}
