import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import _ from "lodash";
import Header from "./Header";
import Total from "./Total";
import "./CarRental.css";

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
  totalObj,
  // rentalImg,
  // setRentalImg,
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

  const displayRentalInfo = lodashArr.map((company) => {
    console.log("COMPANY: ", company);
    // setRentalImg({
    //   imageSrc: company.images.SIZE48X22,
    //   imageAlt: "rentalImg",
    // });
    if (company.address) {
      console.log("COMPANY: ", company);
      return (
        <div key={Math.random()} className="rentalData">
          <img
            src={company.images.HEIGHT36}
            alt="rentalImg"
            className="rentalImg"
          />
          <h1 className="rentalName">{company.partnerName}</h1>
          <h2 className="rentalAddress1">{company.address.addressLine1}</h2>
          <h2 className="rentalAddress2">
            {company.address.cityName}, {company.address.provinceCode}
          </h2>
          <h3 className="rentalPhone">Phone: {company.phoneNumber} </h3>
          <button
            type="submit"
            className="rentalSubmit"
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
    <div className="hotelTv">
      <Header />
      <div className="hotelScreen">
        <button
          onClick={(e) => {
            e.preventDefault();
            //SET TOTAL BACK
            history.push("/airports");
          }}
          className="backBtn"
        >
          Back
        </button>
        <div className="carRentalTotal">
          {toggleLoading ? (
            displayRentalInfo
          ) : (
            <h1 className="loading">LOADING...</h1>
          )}
        </div>
        <Total />
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
