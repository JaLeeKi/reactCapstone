import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import Header from "./Header";

export default function HotelDisplay({
  apiKey,
  hotelId,
  startDate,
  endDate,
  total,
  setTotal,
}) {
  const [booking, setBooking] = useState({});
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/booking-details",
      params: {
        hotel_id: hotelId,
        date_checkout: endDate,
        date_checkin: startDate,
        rooms_number: "1",
      },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("RESPONSE DATA: ", response.data);
        setBooking(response.data);
        setToggleLoading(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const displayData = (bookingData) => {
    return (
      <div>
        <img src={bookingData.thumbnailUrl} alt="hotelImg"></img>
        <h1>{bookingData.name}</h1>
        <h2>{bookingData.location.address.addressLine1}</h2>
        <h2>
          {bookingData.location.address.cityName},{" "}
          {bookingData.location.address.countryName}
        </h2>
        <h3>{bookingData.location.address.phone}</h3> <br />
        <h3>Overall Guest Rating: {bookingData.overallGuestRating}</h3>
        <p>{bookingData.description}</p>
        <div>
          <h3>Features: </h3>
          <ul>
            {bookingData.hotelFeatures.features.map((listedFeatures) => {
              return <li>{listedFeatures}</li>;
            })}
          </ul>
        </div>
        <div>
          <h4>
            Check In Time: {bookingData.policies.checkInTime} <br />
            Check Out Time: {bookingData.policies.checkOutTime} <br />
          </h4>
        </div>
        {/* <div>
          {bookingData.rooms.filter((room) => {

              return (
                <div>
                  <img src={room.images[0].thumbNailUrl} alt="roomImg"></img>
                  Description: {room.roomDisplayName}, Price: ??
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      history.push("/airports");
                    }}
                  >
                    Book Room
                  </button>
                </div>
              );
            
          }, {room})}
        </div> */}
      </div>
    );
  };

  let history = useHistory();

  return (
    <div>
      <Header />
      {toggleLoading ? displayData(booking) : <h1>LOADING...</h1>}

      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/hotellist");
        }}
      >
        Back
      </button>
    </div>
  );
}
