const express = require("express");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios").default;

const app = express();

const options = {
  method: "GET",
  url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
  params: { name: "Berlin" },
  headers: {
    "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
    "x-rapidapi-key": "f6aff1c7f5msh8c12a345969f9efp10a7a7jsn2feb1f489273",
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

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server breathing on ${chalk.green(PORT)}`);
});
