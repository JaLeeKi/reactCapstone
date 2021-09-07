import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import HotelList from "./views/HotelList";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Airports from "./views/Airports";
import CarRental from "./views/CarRental";
import Final from "./views/Final";
import HotelDisplay from "./views/HotelDisplay";

export default function App() {
  const [travelFrom, setTravelFrom] = useState("Salt Lake City");
  const [regionFrom, setRegionFrom] = useState("Utah");
  const [travelTo, setTravelTo] = useState("Las Vegas");
  const [regionTo, setRegionTo] = useState("Nevada");
  const [guests, setGuests] = useState(5);
  const [startDate, setStartDate] = useState("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const [cityId, setCityId] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [total, setTotal] = useState("");
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
            />
          </Route>
          <Route exact path="/hotellist">
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
            <HotelDisplay
              apiKey={apiKey}
              hotelId={hotelId}
              startDate={startDate}
              endDate={endDate}
              total={total}
              setTotal={setTotal}
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
              regionFrom={regionFrom}
              guests={guests}
              startDate={startDate}
              endDate={endDate}
            />
          </Route>
          <Route exact path="/final">
            <Final total={total} setTotal={setTotal} apiKey={apiKey} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
