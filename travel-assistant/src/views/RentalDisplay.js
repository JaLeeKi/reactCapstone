import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useHistory } from "react-router";
import _ from "lodash";

export default function RentalDisplay({
  total,
  setTotal,
  apiKey,
  travelTo,
  travelFrom,
  regionTo,
  regionFrom,
  guests,
  startDate,
  endDate,
  rentalInfo,
  rentalName,
}) {
  useEffect(() => {
    // console.log("DISPLAYrentalINFO: ", rentalInfo);
  }, []);

  let history = useHistory();

  const arrdObj = _.values(rentalInfo.vehicleRates);
  const vehicleArr = _.values(rentalInfo.vehicles);
  const combArr = _.merge(arrdObj, vehicleArr);
  combArr.length = 75;

  const displayCars = (combArr) => {
    return (
      <div>
        {combArr.map((car, i) => {
          if (
            car.vehicleInfo.vehicleExample &&
            car.vehicleInfo.images.SIZE134X72 &&
            car.rates.USD.basePrices.TOTAL &&
            car.vehicleInfo.peopleCapacity >= guests
          ) {
            return (
              <div key={Math.random()}>
                <li>
                  <img src={car.vehicleInfo.images.SIZE134X72} alt="carImg" />
                  {car.vehicleInfo.vehicleExample} <br />
                  Description: {car.vehicleInfo.description} <br />
                  Seats: {car.vehicleInfo.peopleCapacity} <br />
                  Transmission: {car.vehicleInfo.transmissionTypeCode}
                  <br />
                  Total Price: ${car.rates.USD.basePrices.TOTAL}
                  <button
                    type="submit"
                    onClick={(e) => {
                      const rentalTotal = parseInt(
                        car.rates.USD.basePrices.TOTAL
                      );
                      e.preventDefault();

                      setTotal(total + rentalTotal);

                      history.push("/final");
                    }}
                  >
                    Book Rental
                  </button>
                </li>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  return (
    <div>
      <h1>{rentalName}</h1>
      <ol>{displayCars(arrdObj)}</ol>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/carrental");
        }}
      >
        Back
      </button>
    </div>
  );
}
