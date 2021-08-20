import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LocationForm() {
  const [searchParams, setSearchParams] = useState({
    guests: 1,
    city: "",
    startDate: "2021-08-19",
    endDate: "2021-08-20",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { value, className } = e.target;

    setSearchParams({
      ...searchParams,
      [className]: value,
    });
  };

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
  //     params: { name: "New York" },
  //     headers: {
  //       "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
  //       "x-rapidapi-key": "a249296ae8msh4ba546f035043f1p1e7ae7jsn460dcaf9557d",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // });

  return (
    <div>
      <form
        action="/hotel"
        onSubmit={() => setSearchParams(searchParams.city)}
        method="get"
      >
        <input
          value={searchParams.city}
          className="city"
          name="city"
          onChange={handleChange}
          type="text"
          placeholder="Where Would You Like To Go?"
        ></input>
        <div>
          <label for="guests">How Many Guests?</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={searchParams.guests}
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
            value={searchParams.startDate}
            className="startDate"
            name="startDate"
          ></input>
          <input
            type="date"
            className="endDate"
            name="endDate"
            onChange={handleChange}
            value={searchParams.endDate}
          ></input>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <form>
        <h1>{searchParams === undefined ? searchParams : null}</h1>
      </form>
    </div>
  );
}
