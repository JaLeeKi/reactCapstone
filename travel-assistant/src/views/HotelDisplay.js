import React from "react";
import axios from "axios";

export default function HotelDisplay({ apiKey, hotelId }) {
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/details",
    params: { hotel_id: hotelId },
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
  return <div></div>;
}
