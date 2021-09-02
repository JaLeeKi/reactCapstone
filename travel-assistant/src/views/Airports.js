import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Total from "./Total";

export default function Airports({
  apiKey,
  city,
  region,
  guests,
  startDate,
  endDate,
}) {
  const [allFlightData, setAllFlightData] = useState([[]]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations",
      params: { name: `${city}, ${region}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setAllFlightData([response.data]);
        console.log("airportcall", allFlightData);
      })
      .catch(function (error) {
        console.error(error);
      });

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/search",
      params: {
        class_type: "ECO",
        location_departure: "MOW",
        itinerary_type: "ROUND_TRIP",
        location_arrival: "NYC",
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
      .request(optionsTwo)
      .then(function (response) {
        setAllFlightData([response.data]);
        console.log("flights", allFlightData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [city, region, startDate, endDate]);
  console.log(allFlightData);
  // const displayData = allFlightData.map((flightData) => {
  //   let airportData = flightData[0].airline;
  //   let flightData = flightData[0].return(
  //     <li>
  //       <button cityCode={data.cityCode} onClick={() => displayToggle()}>
  //         {data.displayName}
  //       </button>
  //     </li>
  //   );
  // });

  const displayToggle = (flights) => {
    if (flights) {
      return (
        <div>
          <Header />
          <h1>Flights</h1>
          {/* <ol>{displayData}</ol> */}
          <button>Car Rental</button>
          <Total />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <h1>Airports</h1>
          {/* <ol>{displayData}</ol> */}
          <button>Car Rental</button>
          <Total />
        </div>
      );
    }
  };

  return <div>{() => displayToggle()}</div>;
}
