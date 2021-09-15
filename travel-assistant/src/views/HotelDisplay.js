import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./HotelDisplay.css";

export default function HotelDisplay({
  apiKey,
  hotelId,
  startDate,
  endDate,
  setTotal,
  totalNights,
  totalObj,
  setTotalObj,
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
        setBooking(response.data);
        setToggleLoading(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  let timesRun = 0;
  let prevRoomArr = [];
  let prevRoomIdArr = [];

  const displayData = (bookingData) => {
    return (
      <div>
        <img src={bookingData.thumbnailUrl} alt="hotelImg"></img>
        <br />
        <h1>{bookingData.name}</h1>
        <h2>{bookingData.location.address.addressLine1}</h2>
        <h2>
          {bookingData.location.address.cityName},{" "}
          {bookingData.location.address.countryName}
        </h2>
        <h3>{bookingData.location.address.phone}</h3> <br />
        <h3>Overall Guest Rating: {bookingData.overallGuestRating}/10</h3>
        <p>{bookingData.description}</p>
        <div>
          <h3>Features: </h3>
          <ul>
            {bookingData.hotelFeatures.features.map((listedFeatures) => {
              return <li key={listedFeatures}>{listedFeatures}</li>;
            })}
          </ul>
        </div>
        <div>
          <h4>
            Check In Time: {bookingData.policies.checkInTime} <br />
            Check Out Time: {bookingData.policies.checkOutTime} <br />
          </h4>
        </div>
        <div>
          {bookingData.rooms.map((room, i) => {
            let displayPrice = room.displayableRates[0].displayPrice;

            prevRoomArr.push(displayPrice);
            prevRoomIdArr.push(room.roomId);

            // prevRoomIdArr.sort();
            timesRun++;

            if (timesRun > 1) {
              if (
                displayPrice !== prevRoomArr[i - 1] &&
                room.roomId !== prevRoomIdArr[i - 1]
              ) {
                return (
                  <form key={Math.random()}>
                    <img
                      src={
                        room.images[0].thumbNailUrl
                          ? room.images[0].thumbNailUrl
                          : null
                      }
                      alt="roomImg"
                    ></img>
                    <br />
                    Description: {room.roomDisplayName}
                    <br /> Price Per Night: $
                    {room.displayableRates[0].displayPrice}
                    <br />
                    <button
                      type="submit"
                      price={room.displayableRates[0].displayPrice}
                      onClick={(e) => {
                        e.preventDefault();
                        setTotalObj([
                          {
                            hotelImg: room.images[0].thumbNailUrl,
                            hotelName: room.roomDisplayName,
                            hotelPrice: room.displayableRates[0].displayPrice,
                          },
                        ]);
                        setTotal(e.target.attributes[1].value * totalNights);
                        history.push("/airports");
                      }}
                    >
                      Book Room
                    </button>
                  </form>
                );
              } else {
                return null;
              }
            } else {
              return (
                <form key={Math.random()}>
                  <img
                    src={
                      room.images[0].thumbNailUrl
                        ? room.images[0].thumbNailUrl
                        : null
                    }
                    alt="roomImg"
                  ></img>
                  <br />
                  Description: {room.roomDisplayName} <br /> Price Per Night: $
                  {room.displayableRates[0].displayPrice}
                  <br />
                  <button
                    type="submit"
                    price={room.displayableRates[0].displayPrice}
                    onClick={(e) => {
                      e.preventDefault();
                      setTotalObj({
                        hotelImg: room.images[0].thumbNailUrl,
                        hotelName: room.roomDisplayName,
                        hotelPrice: room.displayableRates[0].displayPrice,
                      });

                      setTotal(e.target.attributes[1].value * totalNights);
                      history.push("/airports");
                    }}
                  >
                    Book Room
                  </button>
                </form>
              );
            }
          })}
        </div>
      </div>
    );
  };

  let history = useHistory();

  return (
    <div>
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
