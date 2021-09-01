// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const express = require("express");
const router = express.Router();
require("dotenv").config();
const apiKey = process.env.API_KEY;

const axios = require("axios").default;

// bcrypt.hash(apiKey, saltRounds, function (err, hash) {
//   // Store hash in your password DB.
// });

router.get("/", (req, res) => {
  const body = req.body;
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
    params: body,
    headers: {
      "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
});

router.post("/", (req, res) => {
  const body = req.body;
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
    params: body,
    headers: {
      "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.send(response.data[0].id);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
