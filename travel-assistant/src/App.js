import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import Hotel from "./views/Hotel";
import MyAccount from "./views/MyAccount";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Footer from "./views/Footer";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Header />
            <LocationForm />
            <Footer />
          </Route>
          <Route path="/hotel">
            <Hotel />
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
        </Switch>
      </div>
    </Router>
  );
}
