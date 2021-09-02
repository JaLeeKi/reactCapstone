import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import Header from "./Header";
import Total from "./Total";
import Flights from "./Airports";

export default function HotelList({
  city,
  region,
  startDate,
  endDate,
  cityId,
  setCityId,
  hotelId,
  setHotelId,
  apiKey,
  total,
  setTotal,
}) {
  const [hotels, setHotels] = useState([]);
  // bcrypt.hash(apiKey, saltRounds, function (err, hash) {
  //   // Store hash in your password DB.
  // });

  useEffect(() => {
    //add setTimeout() to second axios call to allow state to be set
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
      params: { name: `${city}, ${region}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setCityId(response.data[0].id);
      })
      .catch((error) => {
        console.error(error);
      });

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search",
      params: {
        location_id: cityId,
        date_checkin: startDate,
        date_checkout: endDate,
        sort_order: "HDR",
        amenities_ids: "FINTRNT,FBRKFST",
        rooms_number: "1",
        star_rating_ids: "3.0,3.5,4.0,4.5,5.0",
      },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(optionsTwo)
      .then(function (response) {
        setHotels(response.data.hotels);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [city, region, startDate, endDate, cityId]);

  function hotelSelect(e) {
    e.preventDefault();
    history.push("/");
  }

  let history = useHistory();

  const displayData = hotels.map((hotel) => {
    if (hotel.name) {
      return (
        <li>
          <button onClick={hotelSelect}>
            <img src={hotel.media.url} alt="hotelImg"></img>
          </button>
          Hotel: {hotel.name},{hotel.brand}, Rating: {hotel.starRating},
          Hotel_ID: {hotel.hotelId}
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <Header />
      <h1>Hotels</h1>

      <div className="hotelList"></div>
      <ul>{displayData}</ul>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/airports");
        }}
      >
        Flights
      </button>
      <Total />
    </div>
  );
}
