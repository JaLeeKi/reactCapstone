import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import HotelList from "./views/HotelList";
import MyAccount from "./views/MyAccount";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Airports from "./views/Airports";
import CarRental from "./views/CarRental";
import Final from "./views/Final";
import HotelDisplay from "./views/HotelDisplay";

export default function App() {
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [guests, setGuests] = useState(0);
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
              city={city}
              setCity={setCity}
              guests={guests}
              setGuests={setGuests}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              region={region}
              setRegion={setRegion}
            />
          </Route>
          <Route exact path="/hotellist">
            <HotelList
              city={city}
              region={region}
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
            <HotelDisplay apiKey={apiKey} hotelId={hotelId} />
          </Route>
          <Route exact path="/myaccount">
            <MyAccount />
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
              cityId={cityId}
              region={region}
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
              cityId={cityId}
              region={region}
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
