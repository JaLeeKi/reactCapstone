import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import _ from "lodash";

export default function CarRental({
  apiKey,
  travelTo,
  regionTo,
  regionFrom,
  guests,
  startDate,
  endDate,
  rentalInfo,
  setRentalInfo,
  rentalName,
  setRentalName,
}) {
  const [airportCode, setAirportCode] = useState("");
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations",
      params: { name: travelTo, regionTo },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    if (!airportCode) {
      axios
        .request(options)
        .then(function (response) {
          setAirportCode(response.data[0].id);
          // console.log("FIRST RENTAL CALL");
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search",
      params: {
        location_return: airportCode,
        date_time_return: `${endDate} 12:00:00`,
        location_pickup: airportCode,
        date_time_pickup: `${startDate} 13:00:00`,
      },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    if (airportCode) {
      axios
        .request(optionsTwo)
        .then(function (response) {
          setRentalInfo(response.data);
          // console.log("SECOND RENTAL CALL");
          setToggleLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [airportCode]);

  const arrdObj = _.values(rentalInfo.partners);
  const arrdObj2 = _.values(rentalInfo.partnerLocations);
  const lodashArr = _.merge(arrdObj, arrdObj2);
  // console.log("rentalINFO: ", rentalInfo);
  // console.log("lodashARR: ", lodashArr);

  const displayRentalInfo = lodashArr.map((company) => {
    if (company.address) {
      return (
        <div key={Math.random()}>
          <img src={company.images.HEIGHT36} alt="rentalImg" />
          {company.partnerName} <br />
          Address: {company.address.addressLine1} <br />
          {company.address.cityName}, {company.address.provinceCode}
          Phone: {company.phoneNumber}
          <button
            type="submit"
            // price={}
            onClick={(e) => {
              e.preventDefault();
              setRentalName(company.partnerName);
              history.push("/rentaldisplay");
            }}
          >
            View Inventory
          </button>
        </div>
      );
    } else {
      return null;
    }
  });

  let history = useHistory();

  return (
    <div>
      <h1>Car Rental</h1>
      <div>
        {toggleLoading ? <ul>{displayRentalInfo}</ul> : <h1>LOADING...</h1>}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          //SET TOTAL BACK
          history.push("/airports");
        }}
      >
        Back
      </button>
    </div>
  );
}
