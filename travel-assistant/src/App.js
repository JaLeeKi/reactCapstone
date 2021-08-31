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

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
    // console.log(res.express);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchData(this.props);
    }
  }

  callBackendAPI = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleSubmit(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    axios.get("http://localhost:5050/hotellist");

    this.setState({ [name]: value });
    console.log(this.state);
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
              <HotelList formData={this.state} />
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
