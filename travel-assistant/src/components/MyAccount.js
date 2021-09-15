import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";

export default function MyAccount() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="userData">
        <img src={user.picture} alt="userImg" className="userImg" />
        <h2 className="username">Username: {user.name}</h2>
        <h4 className="email">Email: {user.email}</h4>
        {/* <JSONPretty data={user} /> */}
      </div>
    )
  );
}
