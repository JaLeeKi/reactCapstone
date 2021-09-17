import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./HotelDisplay.css";
import Header from "./Header";

export default function HotelDisplay({
  apiKey,
  hotelId,
  startDate,
  endDate,
  setTotal,
  totalNights,
  totalObj,
  setTotalObj,
  total,
  setHotelName,
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
        setTimeout(() => {
          setToggleLoading(true);
        }, 500);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  let timesRun = 0;
  let prevRoomArr = [];
  let prevRoomIdArr = [];

  const displayData = (bookingData) => {
    setHotelName(bookingData.name);
    if (bookingData.images[5] && bookingData.images[10]) {
      return (
        <div className="hotelRoom">
          <div className="hotelImgs">
            <img
              src={bookingData.images[5].imageUrl}
              alt="hotelImg"
              className="rHotelImg"
            ></img>
            <img
              src={bookingData.images[10].imageUrl}
              alt="hotelImg2"
              className="hotelImg2"
            ></img>
          </div>
          <div className="hotelDesc">
            <h1 className="roomHotelName">{bookingData.name}</h1>
            <h2 className="hotelAddress1">
              {bookingData.location.address.addressLine1}
            </h2>
            <h2 className="hotelAddress2">
              {bookingData.location.address.cityName},{" "}
              {bookingData.location.address.provinceCode}{" "}
              {bookingData.location.address.zip}
            </h2>
            <h3 className="hotelPhone">
              Phone: {bookingData.location.address.phone}
            </h3>{" "}
            <br />
          </div>
          <h2>Overall Guest Rating: {bookingData.overallGuestRating}/10</h2>
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
                    <div key={Math.random()} className="roomCard">
                      <div className="roomImgs">
                        <img
                          src={
                            room.images[0].thumbNailUrl
                              ? room.images[0].thumbNailUrl
                              : null
                          }
                          alt="roomImg"
                          className="roomHotelImg"
                        ></img>
                      </div>
                      <div className="roomDeets">
                        <h3>Description: {room.roomDisplayName}</h3>
                        <h4>
                          Price Per Night: $
                          {room.displayableRates[0].displayPrice}
                        </h4>
                      </div>
                      <button
                        type="submit"
                        price={room.displayableRates[0].displayPrice}
                        className="roomSubmit"
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
                          if (totalObj && total) {
                            history.push("/airports");
                          } else {
                            setTimeout(() => {
                              history.push("/airports");
                            }, 2500);
                          }
                        }}
                      >
                        Book Room
                      </button>
                    </div>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <div key={Math.random()} className="roomCard">
                    <img
                      src={
                        room.images[0].thumbNailUrl
                          ? room.images[0].thumbNailUrl
                          : null
                      }
                      alt="roomImg"
                      className="roomHotelImg"
                    ></img>
                    <div className="roomDeets">
                      <h3>Description: {room.roomDisplayName}</h3>
                      <h4>
                        Price Per Night: $
                        {room.displayableRates[0].displayPrice}
                      </h4>
                    </div>
                    <button
                      type="submit"
                      price={room.displayableRates[0].displayPrice}
                      className="roomSubmit"
                      onClick={(e) => {
                        e.preventDefault();
                        setTotalObj({
                          hotelImg: room.images[0].thumbNailUrl,
                          hotelName: room.roomDisplayName,
                          hotelPrice: room.displayableRates[0].displayPrice,
                        });
                        setTotal(e.target.attributes[1].value * totalNights);
                        if (totalObj && total) {
                          history.push("/airports");
                        } else {
                          setTimeout(() => {
                            history.push("/airports");
                          }, 2500);
                        }
                      }}
                    >
                      Book Room
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }
  };

  let history = useHistory();

  return (
    <div className="tv">
      <Header />
      <div className="screen">
        {/* <div className="hotelRoomData"> */}
        {toggleLoading ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push("/hotellist");
            }}
            className="backBtn"
          >
            Back
          </button>
        ) : null}
        {toggleLoading ? (
          displayData(booking)
        ) : (
          <h1 className="newLoading">LOADING...</h1>
        )}
        {/* </div> */}
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
