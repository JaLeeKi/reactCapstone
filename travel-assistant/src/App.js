import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      guests: 1,
      startDate: "YYYY-MM-DD",
      endDate: "YYYY-MM-DD",
      region: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
  }

  handleSubmit(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
    this.getCity();
    console.log(this.state);
  }

  getCity() {
    const city = `${this.state.city}, ${this.state.region}`;

    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
      params: { name: city },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "f6aff1c7f5msh8c12a345969f9efp10a7a7jsn2feb1f489273",
      },
    };

    axios.request(options).then((res) => {
      console.log(res.data);
    });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleChange(e) {
    if (typeof e === "string") {
      this.selectRegion(e);
    } else {
      e.preventDefault();
      const target = e.target;

      const value = target.value;
      const name = target.name;

      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Header />
              <LocationForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                formData={this.state}
                selectRegion={this.selectRegion}
              />
              <Footer />
            </Route>
            <Route path="/hotellist">
              <HotelList />
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
}
