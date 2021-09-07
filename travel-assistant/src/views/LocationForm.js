import React from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { RegionDropdown } from "react-country-region-selector";

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
}) {
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    history.push("/hotellist");
    // if (city === "") {
    //   return alert("Please enter a city.");
    // } else if (region === undefined) {
    //   return alert("Please select a region.");
    // } else if (guests === 0) {
    //   return alert("Please select how many guests.");
    // } else if (startDate || endDate === "") {
    //   return alert("Please select your dates.");
    // }
    const userData = {
      travelFrom: travelFrom,
      travelTo: travelTo,
      regionTo: regionTo,
      regionFrom: regionFrom,
      guests: guests,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(userData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="travelfrom"
          name="travelfrom"
          onChange={(e) => {
            setTravelFrom(e.target.value);
          }}
          type="text"
          placeholder="Where Are You Coming From?"
        ></input>
        <div>
          <RegionDropdown
            // placeholder="State"
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
          placeholder="Where Are You Going?"
        ></input>
        <div>
          <RegionDropdown
            // placeholder="State"
            country="United States"
            onChange={(val) => {
              setRegionTo(val);
            }}
            value={regionTo}
          />
        </div>
        <div>
          <label for="guests">How Many Guests?</label>
          <br />
          <input
            type="number"
            onChange={(e) => {
              setGuests(e.target.value);
            }}
            className="guests"
            name="guests"
          ></input>
        </div>
        <div>
          <label for="date">When Would You Like To Travel?</label>
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
