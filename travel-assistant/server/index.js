const express = require("express");
const chalk = require("chalk");
const cors = require("cors");

const citySearchRouter = require("./routes/citySearchApi");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/hotellist", citySearchRouter);

app.get("/", (req, res) => {
  res.send({
    express: "EXPRESS BACKEND CONNECTED TO REACT",
  });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server breathing on ${chalk.green(PORT)}`);
});
