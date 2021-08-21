import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Total from "./Total";

export default function Hotel(props) {
  console.log(props.formAnswers);
  return (
    <div>
      <Header />
      <h1>Hotels</h1>
      <div className="hotelList"></div>
      <a href="/flights">
        <button>Flights</button>
      </a>
      <Total />
      <Footer />
    </div>
  );
}
