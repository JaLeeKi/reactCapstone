import React from "react";
import { useHistory } from "react-router";
import _ from "lodash";
import Header from "./Header";
import "./RentalDisplay.css";

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
  totalObj,
  setTotalObj,
}) {
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
                  <h3>{car.vehicleInfo.vehicleExample}</h3> <br />
                  Description: {car.vehicleInfo.description} <br />
                  Seats: {car.vehicleInfo.peopleCapacity} <br />
                  Transmission: {car.vehicleInfo.transmissionTypeCode}
                  <br />
                  Total Price: ${car.rates.USD.basePrices.TOTAL} <br />
                  <button
                    type="submit"
                    onClick={(e) => {
                      const rentalTotal = parseInt(
                        car.rates.USD.basePrices.TOTAL
                      );
                      e.preventDefault();

                      setTotalObj([
                        ...totalObj,
                        {
                          rentalImg: car.vehicleInfo.images.SIZE134X72,
                          rentalName: car.vehicleInfo.vehicleExample,
                          //   rentalSeats: car.vehicleInfo.peopleCapacity,
                          rentalPrice: car.rates.USD.basePrices.TOTAL,
                        },
                      ]);
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
    <div className="hotelTv">
      <Header />
      <div className="hotelScreen">
        <button
          onClick={(e) => {
            e.preventDefault();
            history.push("/carrental");
          }}
          className="backBtn"
        >
          Back
        </button>
        <h1>{rentalName}</h1>
        <ol>{displayCars(arrdObj)}</ol>
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
