import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import Header from "./Header";
import Total from "./Total";

export default function HotelList({
  travelTo,
  regionTo,
  startDate,
  endDate,
  cityId,
  setCityId,
  hotelId,
  setHotelId,
  apiKey,
  total,
  guests,
  setTotal,
}) {
  const [hotels, setHotels] = useState([]);
  const [toggleLoading, setToggleLoading] = useState(false);
  // bcrypt.hash(apiKey, saltRounds, function (err, hash) {
  //   // Store hash in your password DB.
  // });

  useEffect(() => {
    // add setTimeout() to second axios call to allow state to be set
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
      params: { name: `${travelTo}, ${regionTo}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };
    console.log(travelTo);
    console.log(regionTo);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data[0]);
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

    if (cityId) {
      axios
        .request(optionsTwo)
        .then(function (response) {
          console.log(response.data);
          setHotels(response.data.hotels);
          setToggleLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [cityId]);

  function hotelSelect(e) {
    e.preventDefault();
    setHotelId(e.target.attributes[1].value);

    history.push("/hoteldisplay");
  }

  let history = useHistory();

  const displayData = hotels.map((hotel) => {
    if (hotel.hotelId) {
      return (
        <li>
          <button onClick={hotelSelect} hotelid={hotel.hotelId}>
            <img
              src={hotel.media.url}
              hotelid={hotel.hotelId}
              alt="hotelImg"
            ></img>
            <br />
            {hotel.name} <br /> Rating: {hotel.starRating}
          </button>
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
      {toggleLoading ? <ul>{displayData}</ul> : <h1>LOADING...</h1>}
    </div>
  );
}
