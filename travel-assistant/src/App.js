import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import HotelList from "./views/HotelList";
import MyAccount from "./views/MyAccount";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Footer from "./views/Footer";
import Flights from "./views/Flights";
import CarRental from "./views/CarRental";
import Final from "./views/Final";

export default function App() {
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [guests, setGuests] = useState(0);
  const [startDate, setStartDate] = useState("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const [cityId, setCityId] = useState("");
  const [apiKey] = useState(`${process.env.REACT_APP_API_KEY}`);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Header />
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
            <Footer />
          </Route>
          <Route path="/hotellist">
            <HotelList
              city={city}
              region={region}
              startDate={startDate}
              endDate={endDate}
              guests={guests}
              cityId={cityId}
              setCityId={setCityId}
              apiKey={apiKey}
            />
          </Route>
          <Route path="/myaccount">
            <MyAccount />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/flights">
            <Flights />
          </Route>
          <Route path="/carrental">
            <CarRental />
          </Route>
          <Route path="/final">
            <Final />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
