import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Header from "./Header";
import "./HotelList.css";

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

    if (!cityId) {
      axios
        .request(options)
        .then((response) => {
          setCityId(response.data[0].id);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search",
      params: {
        location_id: cityId,
        date_checkin: startDate,
        date_checkout: endDate,
        sort_order: "STAR",
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
          setHotels(response.data.hotels);
          if (hotels) {
            setToggleLoading(true);
          } else {
            setTimeout(() => {
              setToggleLoading(true);
            }, 3000);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [cityId]);

  let history = useHistory();

  // function hotelSelect(e) {
  //   e.preventDefault();
  //   if (e.target.attributes[1].value) {
  //     // setTimeout(() => {
  //       setHotelId(e.target.attributes[1].value);
  //     // }, 1000);
  //     // setTimeout(() => {
  //       history.push("/hoteldisplay");
  //     // }, 1500);
  //   } else {
  //     setHotelId(e.target.attributes[1].value);
  //     history.push("/hoteldisplay");
  //   }
  // }

  const displayData = hotels.map((hotel) => {
    if (hotel.hotelId) {
      return (
        <div key={hotel.hotelId}>
          <button
            className="hotelCard"
            onClick={(e) => {
              e.preventDefault();
              setHotelId(e.target.attributes[1].value);
              if (hotelId) {
                history.push("/hoteldisplay");
              } else {
                setTimeout(() => {
                  history.push("/hoteldisplay");
                }, 3500);
              }
            }}
            hotelid={hotel.hotelId}
          >
            <img
              src={hotel.media.url}
              hotelid={hotel.hotelId}
              alt="hotelImg"
              className="hotelImg"
            ></img>
            <br />
            <h3 className="hotelName">{hotel.name}</h3>
            <h4 className="hotelRating">Stars: {hotel.starRating}/5</h4>
          </button>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="hotelTv">
      <Header />
      <div className="hotelScreen">
        <div>
          {toggleLoading ? (
            <div className="hotelList">{displayData}</div>
          ) : (
            <h1 className="loading">LOADING...</h1>
          )}
        </div>
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
