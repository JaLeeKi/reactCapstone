import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Total from "./Total";

export default function Flights() {
  return (
    <div>
      <Header />
      <h1>Flights</h1>
      <a href="/carrental">
        <button>Car Rental</button>
      </a>
      <Total />
      <Footer />
    </div>
  );
}
