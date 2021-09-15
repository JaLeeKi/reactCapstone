import React from "react";
import { useHistory } from "react-router-dom";
import { RegionDropdown } from "react-country-region-selector";
import "./LocationForm.css";
import Header from "./Header";

export default function LocationForm({
  travelTo,
  setTravelTo,
  travelFrom,
  setTravelFrom,
  guests,
  setGuests,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  regionTo,
  setRegionTo,
  regionFrom,
  setRegionFrom,
  totalNights,
  setTotalNights,
}) {
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    // if (city === "") {
    //   return alert("Please enter a city.");
    // } else if (region === undefined) {
    //   return alert("Please select a region.");
    // } else if (guests === 0) {
    //   return alert("Please select how many guests.");
    // } else if (startDate || endDate === "") {
    //   return alert("Please select your dates.");
    // }

    const startDateDate = new Date(startDate);
    const endDateDate = new Date(endDate);
    const timeDiff = Math.abs(startDateDate - endDateDate);
    setTotalNights(Math.ceil(timeDiff / (1000 * 3600 * 24)));

    // const userData = {
    //   travelFrom: travelFrom,
    //   travelTo: travelTo,
    //   regionTo: regionTo,
    //   regionFrom: regionFrom,
    //   guests: guests,
    //   startDate: startDate,
    //   endDate: endDate,
    // };
    // console.log(userData);

    history.push("/hotellist");
  }

  return (
    <div className="tv">
      <Header />
      <div className="screen">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              className="travelfrom"
              name="travelfrom"
              onChange={(e) => {
                setTravelFrom(e.target.value);
              }}
              type="text"
              placeholder="Which City Are You Coming From?"
            ></input>
            <div>
              <RegionDropdown
                // placeholder="State"
                className="regionFrom"
                country="United States"
                onChange={(val) => {
                  setRegionFrom(val);
                }}
                value={regionFrom}
              />
            </div>
            <input
              className="travelto"
              name="travelto"
              onChange={(e) => {
                setTravelTo(e.target.value);
              }}
              type="text"
              placeholder="Which City Are You Going To?"
            ></input>
            <div>
              <RegionDropdown
                // placeholder="State"
                className="regionTo"
                country="United States"
                onChange={(val) => {
                  setRegionTo(val);
                }}
                value={regionTo}
              />
            </div>
            <div>
              <label for="guests" className="guestsLabel">
                How Many Guests?
              </label>
              <br />
              <input
                //SET MAX OF 7
                type="number"
                onChange={(e) => {
                  setGuests(e.target.value);
                }}
                className="guests"
                name="guests"
              ></input>
            </div>
            <div className="dates">
              <label for="date" className="dateLabel">
                When Would You Like To Travel?
              </label>
              <br />
              <input
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className="startDate"
                name="startDate"
              ></input>
              <input
                type="date"
                className="endDate"
                name="endDate"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              ></input>
            </div>
            <input type="submit" value="Submit" className="submit" />
          </form>
        </div>
      </div>
      <h3 className="tvBrand">Travel-O-Matic</h3>
    </div>
  );
}
