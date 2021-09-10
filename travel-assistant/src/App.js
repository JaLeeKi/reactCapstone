import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import HotelList from "./views/HotelList";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Airports from "./views/Airports";
import CarRental from "./views/CarRental";
import RentalDisplay from "./views/RentalDisplay";
import Final from "./views/Final";
import HotelDisplay from "./views/HotelDisplay";
import Total from "./views/Total";

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
  const [total, setTotal] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [rentalInfo, setRentalInfo] = useState({});
  const [rentalName, setRentalName] = useState("");
  const [totalObj, setTotalObj] = useState([]);
  const [apiKey] = useState(`${process.env.REACT_APP_API_KEY}`);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header className="App-header" />
            <LocationForm
              travelTo={travelTo}
              setTravelTo={setTravelTo}
              travelFrom={travelFrom}
              setTravelFrom={setTravelFrom}
              guests={guests}
              setGuests={setGuests}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              regionTo={regionTo}
              setRegionTo={setRegionTo}
              regionFrom={regionFrom}
              setRegionFrom={setRegionFrom}
              totalNights={totalNights}
              setTotalNights={setTotalNights}
            />
          </Route>
          <Route exact path="/hotellist">
            <Header className="App-header" />
            <HotelList
              travelTo={travelTo}
              regionTo={regionTo}
              startDate={startDate}
              endDate={endDate}
              guests={guests}
              cityId={cityId}
              setCityId={setCityId}
              apiKey={apiKey}
              total={total}
              setTotal={setTotal}
              hotelId={hotelId}
              setHotelId={setHotelId}
            />
            {/* <HotelDisplay apiKey={apiKey} hotelId={hotelId} /> */}
          </Route>
          <Route exact path="/hoteldisplay">
            <Header className="App-header" />
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
            />
          </Route>
          <Route exact path="/signin">
            <Header className="App-header" />
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <Header className="App-header" />
            <SignUp />
          </Route>
          <Route exact path="/airports">
            <Header className="App-header" />
            <Airports
              totalNights={totalNights}
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
            />
            <Total className="total" total={total} />
          </Route>
          <Route exact path="/carrental">
            <Header className="App-header" />
            <CarRental
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              travelTo={travelTo}
              travelFrom={setTravelFrom}
              regionTo={regionTo}
              regionFrom={regionFrom}
              guests={guests}
              startDate={startDate}
              endDate={endDate}
              rentalInfo={rentalInfo}
              setRentalInfo={setRentalInfo}
              rentalName={rentalName}
              setRentalName={setRentalName}
              totalObj={totalObj}
            />
            <Total className="total" total={total} />
          </Route>
          <Route exact path="/rentaldisplay">
            <Header className="App-header" />
            <RentalDisplay
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              travelTo={travelTo}
              travelFrom={setTravelFrom}
              regionTo={regionTo}
              regionFrom={regionFrom}
              guests={guests}
              startDate={startDate}
              endDate={endDate}
              rentalInfo={rentalInfo}
              rentalName={rentalName}
              setRentalName={setRentalName}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
            />
            <Total className="total" total={total} />
          </Route>
          <Route exact path="/final">
            <Header className="App-header" />
            <Final
              total={total}
              setTotal={setTotal}
              apiKey={apiKey}
              totalObj={totalObj}
              setTotalObj={setTotalObj}
            />
            <Total className="total" total={total} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
