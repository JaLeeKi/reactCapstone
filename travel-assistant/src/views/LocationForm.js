import React from "react";
import { RegionDropdown } from "react-country-region-selector";

export default function LocationForm({ handleChange, handleSubmit, formData }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="city"
          name="city"
          onChange={handleChange}
          type="text"
          placeholder="Where Would You Like To Go?"
        ></input>
        <div>
          <RegionDropdown
            country="United States"
            onChange={handleChange}
            value={formData.region}
          />
        </div>
        <div>
          <label for="guests">How Many Guests?</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            className="guests"
            name="guests"
          ></input>
        </div>
        <div>
          <label for="date">When Would You Like To Travel?</label>
          <br />
          <input
            type="date"
            onChange={handleChange}
            className="startDate"
            name="startDate"
          ></input>
          <input
            type="date"
            className="endDate"
            name="endDate"
            onChange={handleChange}
          ></input>
        </div>
        <a href="/hotellist">
          <input type="submit" value="Submit" />
        </a>
      </form>
    </div>
  );
}
