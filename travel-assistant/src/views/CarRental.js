import React, { useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import Total from "./Total";

export default function CarRental({
  apiKey,
  city,
  region,
  guests,
  startDate,
  endDate,
}) {
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations",
      params: { name: `${city}, ${region}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search",
      params: {
        location_return: "1365100023",
        date_time_return: "2021-09-27 14:00:00",
        location_pickup: "JFK",
        date_time_pickup: "2021-09-26 14:00:00",
      },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(optionsTwo)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>Car Rental</h1>
      <a href="/final">
        <button>Submit</button>
      </a>
      <Total />
    </div>
  );
}
