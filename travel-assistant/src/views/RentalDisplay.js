import React from "react";
import { useHistory } from "react-router";
import _ from "lodash";
import Header from "./Header";
import Total from "./Total";
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
  // rentalImg,
  // setRentalImg,
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
            car.vehicleInfo.images.SIZE268X144 &&
            car.rates.USD.basePrices.TOTAL &&
            car.vehicleInfo.peopleCapacity >= guests
          ) {
            return (
              <div key={Math.random()} className="carData">
                <img
                  src={car.vehicleInfo.images.SIZE268X144}
                  alt="carImg"
                  className="carImg"
                />
                <h1 className="carName">{car.vehicleInfo.vehicleExample}</h1>
                <h2 className="carDesc">
                  Description: {car.vehicleInfo.description}
                </h2>
                <h2 className="carSeats">
                  Seats: {car.vehicleInfo.peopleCapacity}
                </h2>
                <h2 className="carTran">
                  Transmission: {car.vehicleInfo.transmissionTypeCode}
                </h2>
                <h3 className="carPrice">
                  Total Price: ${car.rates.USD.basePrices.TOTAL}
                </h3>
                <button
                  type="submit"
                  className="carSubmit"
                  onClick={(e) => {
                    e.preventDefault();
                    const rentalTotal = parseInt(
                      car.rates.USD.basePrices.TOTAL
                    );

                    setTotalObj([
                      ...totalObj,
                      {
                        rentalImg: car.vehicleInfo.images.SIZE268X144,
                        rentalName: car.vehicleInfo.vehicleExample,
                        //   rentalSeats: car.vehicleInfo.peopleCapacity,
                        rentalPrice: car.rates.USD.basePrices.TOTAL,
                      },
                    ]);
                    setTotal(total + rentalTotal);
                    if (totalObj && total) {
                      history.push("/final");
                    }
                  }}
                >
                  Book Rental
                </button>
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
        <div className="carTotal">
          {/* <img src={rentalImg} alt="rentalImg" /> */}
          <h1 className="carRentalName">{rentalName}</h1>
          {displayCars(arrdObj)}
        </div>
        <Total total={total} />
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
