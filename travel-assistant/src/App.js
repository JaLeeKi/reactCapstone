import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Header from "./views/Header";
import LocationForm from "./views/LocationForm";
import Hotel from "./views/Hotel";
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
      formAnswers: {
        city: "",
        guests: 1,
        startDate: "2021-08-20",
        endDate: "2021-08-21",
      },
      hotel: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.formAnswers = () => {
      this.handleChange();
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { value, className } = e.target;
    console.log(value);
    console.log(className);

    this.setState((state, props) => ({
      formAnswers: state.city + props.searchCity,
    }));
    console.log(this.state);
  };

  handleSubmit = (searchCity) => {
    console.log(this.state);
    const options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations",
      params: { name: searchCity },
      headers: {
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "a249296ae8msh4ba546f035043f1p1e7ae7jsn460dcaf9557d",
      },
    };

    console.log(options.params);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Header />
              <LocationForm
                formAnswers={this.state.formAnswers}
                hotelList={this.state.hotel}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
              <Footer />
            </Route>
            <Route path="/hotel">
              <Hotel
                formAnswers={this.state.formAnswers}
                hotelList={this.state.hotel}
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
}
