import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import Hotel from "./views/Hotel";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Header />
            <LocationForm />
          </Route>
          <Route path="/Hotel">
            <Hotel />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
