import React from "react";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://priceline-com.p.rapidapi.com/hotels/city/search",
  params: { q: "Seattle" },
  headers: {
    "x-rapidapi-key": "a249296ae8msh4ba546f035043f1p1e7ae7jsn460dcaf9557d",
    "x-rapidapi-host": "priceline-com.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const LocationForm = () => {
  return (
    <div>
      <form action="/Hotel">
        <input type="text" placeholder="Where Would You Like To Go?"></input>
        <label for="guests">How Many Guests?</label>
        <input type="number" class="guests"></input>
        <label for="date">When Would You Like To Travel?</label>
        <input type="date" class="date"></input>
        <p>-</p>
        <input type="date"></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LocationForm;
