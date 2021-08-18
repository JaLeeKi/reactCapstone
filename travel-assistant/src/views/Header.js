import React from "react";

export default function Header() {
  return (
    <div>
      <a href="/">
        <button>Home</button>
      </a>
      <a href="/myaccount">
        <button>My Account</button>
      </a>
      <a href="/signin">
        <button>Sign In</button>
      </a>
    </div>
  );
}
