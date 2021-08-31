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
  console.log(req.body);
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
    params: { name: req.params.region },
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

module.exports = router;
