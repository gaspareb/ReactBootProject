import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBike from "./components/add-bike.component";
import Bike from "./components/bike.component";
import BikesList from "./components/bikes-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Gaspare Bike Shop
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/"} className="nav-link"> Bikes</Link>
            </li>
            <li className="nav-item">
              <Link to={"/addBike"} className="nav-link">Add Bike</Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<BikesList/>} />
            <Route path="/addBike" element={<AddBike/>} />
            <Route path="/bikes/:id" element={<Bike/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
