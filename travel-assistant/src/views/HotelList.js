import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Total from "./Total";

export default function HotelList(formData) {
  function test() {
    console.log(formData);
  }

  return (
    <div>
      <Header />
      <h1>Hotels</h1>

      <div className="hotelList"></div>
      <a href="/flights">
        <button>Flights</button>
      </a>
      <button onClick={test}>db test</button>
      <ul>
        {/* {this.state.persons.map((person) => (
          <li>{person.name}</li>
        ))} */}
      </ul>
      <Total />
      <Footer />
    </div>
  );
}
