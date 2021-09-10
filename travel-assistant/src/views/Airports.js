import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import _ from "lodash";

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
  setTotal,
  total,
  totalNights,
  totalObj,
  setTotalObj,
}) {
  // const [allAirportData, setAllAirportData] = useState([]);
  const [fromCityCode, setFromCityCode] = useState("");
  const [fromStateCode, setFromStateCode] = useState("");
  const [toCityCode, setToCityCode] = useState("");
  const [toStateCode, setToStateCode] = useState("");
  const [allFlightData, setAllFlightData] = useState({});
  const [toggleLoading, setToggleLoading] = useState(false);

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

    if (!toStateCode) {
      axios
        .request(options)
        .then(function (response) {
          setToCityCode(response.data[0].cityCode);
          setToStateCode(response.data[0].stateCode);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    const optionsTwo = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations",
      params: { name: `${travelFrom}, ${regionFrom}` },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    if (toStateCode && !fromStateCode) {
      axios
        .request(optionsTwo)
        .then(function (response) {
          setFromCityCode(response.data[0].cityCode);
          setFromStateCode(response.data[0].stateCode);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

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

    if (fromStateCode) {
      axios
        .request(optionsThree)
        .then(function (response) {
          setAllFlightData(response.data);
          setToggleLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [toStateCode, fromStateCode]);

  let history = useHistory();

  const displayFlights = (allFlightData) => {
    let lodashArr = _.merge(
      allFlightData.airline,
      allFlightData.totalTripSummary.airline
    );

    //need option if flight is not available

    return (
      <div>
        <div>
          {lodashArr.map((arrsVal) => {
            if (arrsVal.lowestTotalFare) {
              if (arrsVal.name && arrsVal.phoneNumber && arrsVal.websiteUrl) {
                return (
                  <div key={arrsVal.code}>
                    {/* <img src={arrsVal.smallImage} alt="airlineImg" /> */}
                    {arrsVal.name} <br />
                    Phone: {arrsVal.phoneNumber} <br />
                    Website: {arrsVal.websiteUrl} <br />
                    Price Per Ticket: ${arrsVal.lowestTotalFare.amount}
                    <button
                      type="submit"
                      price={arrsVal.lowestTotalFare.amount}
                      onClick={(e) => {
                        e.preventDefault();
                        setTotalObj([
                          ...totalObj,
                          {
                            img: null,
                            flightName: arrsVal.name,
                            flightPrice: arrsVal.lowestTotalFare.amount,
                          },
                        ]);

                        setTotal(
                          total + guests * arrsVal.lowestTotalFare.amount
                        );

                        history.push("/carrental");
                      }}
                    >
                      Book Flight
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1>Flights</h1>
        {toggleLoading ? (
          displayFlights(allFlightData)
        ) : (
          <div>
            <h1>LOADING...</h1>
            <p>(This can sometimes take a second)</p>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setTotal(total / totalNights);
            history.push("/hoteldisplay");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
