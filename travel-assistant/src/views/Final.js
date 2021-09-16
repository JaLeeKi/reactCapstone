import React from "react";
import Header from "./Header";
import "./Final.css";

export default function Final({ totalObj }) {
  return (
    <div className="hotelTv">
      <Header />
      <div className="hotelScreen">
        <div key={Math.random()}>
          <h3>Hotel:</h3>
          <img src={totalObj[0].hotelImg} alt="hotelImg" />
          <br />
          <h4>{totalObj[0].hotelName}</h4>
          Price Per Night: ${totalObj[0].hotelPrice} <br />
          <br />
          <h3>Flight:</h3>
          <h4>{totalObj[1].flightName}</h4> <br />
          Price Per Ticket: ${totalObj[1].flightPrice}
          <br />
          <h3>Rental:</h3>
          <img src={totalObj[2].rentalImg} alt="rentalImg" /> <br />
          <h4>{totalObj[2].rentalName}</h4>
          Total Price: ${totalObj[2].rentalPrice}
        </div>
      </div>
    </div>
  );
}
