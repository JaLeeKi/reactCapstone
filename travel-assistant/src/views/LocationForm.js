import React from "react";
import axios from "axios";

const onSubmit = async () => {
  const options = {
    method: "GET",
    url: "https://priceline-com.p.rapidapi.com/hotels/city/search",
    params: { q: "Seattle" },
    headers: {
      "x-rapidapi-key": "a249296ae8msh4ba546f035043f1p1e7ae7jsn460dcaf9557d",
      "x-rapidapi-host": "priceline-com.p.rapidapi.com",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default function LocationForm() {
  return (
    <div>
      <form action="/hotel" onSubmit={onSubmit}>
        <input type="text" placeholder="Where Would You Like To Go?"></input>
        <p>
          <label for="guests">How Many Guests?</label>
          <input type="number" class="guests"></input>
        </p>
        <p>
          <label for="date">When Would You Like To Travel?</label>
          <input type="date" class="date"></input>
          <input type="date"></input>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
