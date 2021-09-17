import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Index.css";

import LocationForm from "./views/LocationForm";
import HotelList from "./views/HotelList";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Airports from "./views/Airports";
import CarRental from "./views/CarRental";
import RentalDisplay from "./views/RentalDisplay";
import Final from "./views/Final";
import HotelDisplay from "./views/HotelDisplay";

export default function App() {
  const [travelFrom, setTravelFrom] = useState("");
  const [regionFrom, setRegionFrom] = useState("");
  const [travelTo, setTravelTo] = useState("");
  const [regionTo, setRegionTo] = useState("");
  const [guests, setGuests] = useState(0);
  const [startDate, setStartDate] = useState("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const [cityId, setCityId] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [total, setTotal] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [flightPrice, setFlightPrice] = useState("");
  const [rentalInfo, setRentalInfo] = useState({});
  const [rentalName, setRentalName] = useState("");
  const [rentalSeats, setRentalSeats] = useState("");
  // const [rentalImg, setRentalImg] = useState({
  //   imageSrc: "",
  //   imageAlt: "",
  // });
  const [totalObj, setTotalObj] = useState([]);
  const [apiKey] = useState(`${process.env.REACT_APP_API_KEY}`);

  return (
    <Router>
      <div className="background">
        <Switch>
          <Route exact path="/">
            <LocationForm
              setTravelTo={setTravelTo}
              setTravelFrom={setTravelFrom}
              setGuests={setGuests}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              regionTo={regionTo}
              setRegionTo={setRegionTo}
              regionFrom={regionFrom}
              setRegionFrom={setRegionFrom}
              setTotalNights={setTotalNights}
            />
          </Route>
          <Route exact path="/hotellist">
            <HotelList
              travelTo={travelTo}
              regionTo={regionTo}
              startDate={startDate}
              endDate={endDate}
              cityId={cityId}
              setCityId={setCityId}
              apiKey={apiKey}
              hotelId={hotelId}
              setHotelId={setHotelId}
            />
          </Route>
          <Route exact path="/hoteldisplay">
            <HotelDisplay
              apiKey={apiKey}
              hotelId={hotelId}
              startDate={startDate}
              endDate={endDate}
              total={total}
              setTotal={setTotal}
              totalNights={totalNights}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
              setHotelName={setHotelName}
            />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/airports">
            <Airports
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              travelTo={travelTo}
              travelFrom={travelFrom}
              regionTo={regionTo}
              regionFrom={regionFrom}
              guests={guests}
              startDate={startDate}
              endDate={endDate}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
              setFlightPrice={setFlightPrice}
            />
          </Route>
          <Route exact path="/carrental">
            <CarRental
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              travelTo={travelTo}
              travelFrom={setTravelFrom}
              regionTo={regionTo}
              startDate={startDate}
              endDate={endDate}
              rentalInfo={rentalInfo}
              setRentalInfo={setRentalInfo}
              rentalName={rentalName}
              setRentalName={setRentalName}
              flightPrice={flightPrice}
              guests={guests}
              // rentalImg={rentalImg}
              // setRentalImg={setRentalImg}
            />
          </Route>
          <Route exact path="/rentaldisplay">
            <RentalDisplay
              total={total}
              setTotal={setTotal}
              guests={guests}
              rentalInfo={rentalInfo}
              rentalName={rentalName}
              setRentalName={setRentalName}
              // rentalImg={rentalImg}
              // setRentalImg={setRentalImg}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
              setRentalSeats={setRentalSeats}
            />
          </Route>
          <Route exact path="/final">
            <Final
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              hotelName={hotelName}
              guests={guests}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
              totalNights={totalNights}
              rentalSeats={rentalSeats}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
