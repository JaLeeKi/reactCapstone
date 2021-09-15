import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()} className="signInBtn">
        Sign In
      </button>
    )
  );
}
