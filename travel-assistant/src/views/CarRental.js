import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Total from "./Total";

export default function CarRental() {
  return (
    <div>
      <Header />
      <h1>Car Rental</h1>
      <a href="/final">
        <button>Submit</button>
      </a>
      <Total />
      <Footer />
    </div>
  );
}
