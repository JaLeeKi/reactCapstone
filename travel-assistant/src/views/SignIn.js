import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SignIn() {
  return (
    <div>
      <Header />
      <h1>SIGN IN</h1>
      <h3>Don't Have An Account?</h3>
      <a href="/signup">
        <button>Create New Account</button>
      </a>
      <Footer />
    </div>
  );
}
