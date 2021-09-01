import React from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { RegionDropdown } from "react-country-region-selector";

export default function LocationForm({
  city,
  setCity,
  guests,
  setGuests,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  region,
  setRegion,
}) {
  let history = useHistory();
  function handleSubmit(e) {
    history.push("/hotellist");
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
    const userData = {
      city: city,
      region: region,
      guests: guests,
      startDate: startDate,
      endDate: endDate,
    };
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="city"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          placeholder="Where Would You Like To Go?"
        ></input>
        <div>
          <RegionDropdown
            // placeholder="State"
            country="United States"
            onChange={(val) => {
              setRegion(val);
            }}
            value={region}
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
