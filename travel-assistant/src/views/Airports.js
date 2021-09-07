import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Total from "./Total";
// import { response } from "express";

export default function Airports({
  apiKey,
  travelTo,
  travelFrom,
  regionTo,
  regionFrom,
  guests,
  startDate,
  endDate,
}) {
  // const [allAirportData, setAllAirportData] = useState([]);
  const [allFlightData, setAllFlightData] = useState([]);
  const [fromCityCode, setFromCityCode] = useState("");
  const [fromStateCode, setFromStateCode] = useState("");
  const [toCityCode, setToCityCode] = useState("");
  const [toStateCode, setToStateCode] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations",
      params: { name: `${travelTo}, ${regionTo}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setToCityCode(response.data[0].cityCode);
        setToStateCode(response.data[0].stateCode);
        console.log(toCityCode);
        console.log(toStateCode);
      })
      .catch(function (error) {
        console.error(error);
      });

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations",
      params: { name: `${travelFrom}, ${regionFrom}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(optionsTwo)
      .then(function (response) {
        setFromCityCode(response.data[0].cityCode);
        setFromStateCode(response.data[0].stateCode);
        console.log(fromCityCode);
        console.log(fromStateCode);
      })
      .catch(function (error) {
        console.error(error);
      });

    const optionsThree = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/search",
      params: {
        class_type: "ECO",
        location_departure: fromCityCode,
        itinerary_type: "ROUND_TRIP",
        location_arrival: toCityCode,
        date_departure: startDate,
        sort_order: "PRICE",
        number_of_passengers: guests,
        date_departure_return: endDate,
        number_of_stops: "1",
        price_max: "20000",
        duration_max: "2051",
        price_min: "100",
      },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(optionsThree)
      .then(function (response) {
        setAllFlightData(response.data);
        console.log("flights", allFlightData);
      })
      .catch(function (error) {
        console.error(error);
      }, []);
  });

  // console.log(allFlightData);
  // console.log(allAirportData[0]);

  // const displayAirports = allAirportData[0].map((airportInfo) => {
  //   console.log(airportInfo.displayName);
  //   return (
  //     <li>
  //       <button>{airportInfo.displayName}</button>
  //     </li>
  //   );
  // });

  const displayFlights = allFlightData.map((flightInfo) => {
    console.log(flightInfo);
    return (
      <li>
        <button>
          {/*    cityCode={flightInfo.cityCode}
           onClick={() => displayToggle(flightInfo.cityCode)}
         >
           {flightInfo.displayName} */}
          {flightInfo}
        </button>
      </li>
    );
  });

  // const displayToggle = (cityCode) => {
  //   if (cityCode) {
  //     return (
  //       <div>
  //         <Header />
  //         <h1>Flights</h1>
  //         <ol>{displayFlights}</ol>
  //         <button>Car Rental</button>
  //         <Total />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Header />
  //         <h1>Airports</h1>
  //         <ol>{displayAirports}</ol>
  //         <button>Car Rental</button>
  //         <Total />
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      <div>
        <Header />
        <h1>Flights</h1>
        <button>{displayFlights}</button>
        <button>Car Rental</button>
        <Total />
      </div>
      {/* {() => displayToggle()} */}
    </div>
  );
}
