import React, { Component } from "react";
import BikeDataService from "../services/bike.service";
import { Link } from "react-router-dom";

export default class BikesList extends Component {
  
  constructor(props) {
    super(props);
    console.log("BikesList");
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBikes = this.retrieveBikes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBike = this.setActiveBike.bind(this);
    this.removeAllBikes = this.removeAllBikes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      bikes: [],
      currentBike: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.retrieveBikes();
  }

  onChangeSearchTitle(e) {
    console.log("onChangeSearchTitle=>" + e.target.value);
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBikes() {
    console.log("retrieveBikes");
    BikeDataService.getAll()
      .then(response => {
        this.setState({
          bikes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    console.log("refreshList");
    this.retrieveBikes();
    this.setState({
      currentBike: null,
      currentIndex: -1
    });
  }

  setActiveBike(bike, index) {
    console.log("setActiveBike");
    this.setState({
      currentBike: bike,
      currentIndex: index
    });
  }

  removeAllBikes() {
    console.log("removeAllBikes");
    BikeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    console.log("searchTitle=>" + this.state.searchTitle);
    this.setState({
      currentBike: null,
      currentIndex: -1
    });
    console.log("searchTitle" + this.state.searchTitle.length);
    if(this.state.searchTitle.length > 0){
      BikeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          bikes: response.data
        });
        console.log("searchTitle.findByTitle=>" + response.data.name);
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      this.retrieveBikes();
    }

  }

  render() {
    console.log("render bike list");
    const { searchTitle, bikes, currentBike, currentIndex } = this.state;
    console.log("render bikes=>" + bikes + ":currentBike=>" + currentBike  + ":currentIndex=>" + currentIndex + ":searchTitle=>" + searchTitle);
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by bike Id"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Bikes List</h4>

          <ul className="list-group">
            {bikes?.map((bike, index) => (
              <li
                className={"list-group-item " +
                  (index === currentIndex ? "active" : "")}
                onClick={() => this.setActiveBike(bike, index)}
                key={index}
              >
                {bike.id}-{bike.name}
              </li>
            ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBikes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBike ? (
            <div>
              <h4>Bike: {currentBike.id}</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentBike.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBike.description}
              </div>
<br/>
              <Link
                to={"/bikes/" + currentBike.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Bike...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
