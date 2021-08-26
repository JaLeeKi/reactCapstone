import React from "react";

// function homeLink() {
//   const home = document.getElementById("home");

//   if (window.location.href === "http://localhost:3000/") {
//     home.style.visibility = "hidden";
//   } else {
//     home.style.visibility = "visible";
//   }
// }

export default function Header() {
  return (
    <div>
      <a href="/">
        <button id="home">Home</button>
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
