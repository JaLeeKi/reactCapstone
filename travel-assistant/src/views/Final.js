import React from "react";
import Header from "./Header";
import Total from "./Total";
import "./Final.css";

export default function Final({
  totalObj,
  total,
  totalNights,
  hotelName,
  guests,
  rentalSeats,
}) {
  return (
    <div className="hotelTv">
      <Header />
      <div className="hotelScreen">
        <div key={Math.random()} className="totalInfo">
          <div className="hotelTotal">
            <img
              src={totalObj[0].hotelImg}
              alt="hotelImg"
              className="hotelTotalImg"
            />
            <h1 className="hotelTotalName">
              {hotelName} <br />
              {totalObj[0].hotelName}
            </h1>
            <h2 className="hotelTotalPrice">
              Total Nights: {totalNights} <br />
              Price Per Night: ${totalObj[0].hotelPrice}
            </h2>
          </div>
          <div className="flightTotal">
            <h1 className="flightTotalName">{totalObj[1].flightName}</h1>
            <h2 className="flightTotalPrice">
              Total Guests: {guests} <br />
              Price Per Ticket: ${totalObj[1].flightPrice}
            </h2>
          </div>
          <div className="rentalTotal">
            <img
              src={totalObj[2].rentalImg}
              alt="rentalImg"
              className="rentalTotalImg"
            />
            <h1 className="rentalTotalName">{totalObj[2].rentalName}</h1>
            <h2 className="rentalTotalPrice">
              Seats: {rentalSeats} <br />
              Total Price: ${totalObj[2].rentalPrice}
            </h2>
          </div>
        </div>
        <Total total={total} />
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
