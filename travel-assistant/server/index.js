const express = require("express");
const path = require("path");
const chalk = require("chalk");

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server listening on ${chalk.green(PORT)}`);
});
