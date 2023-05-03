import React, { Component } from "react";
import BikeDataService from "../services/bike.service";

export default class AddBike extends Component {
  constructor(props) {
    super(props);
    console.log("AddBike");
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBike = this.saveBike.bind(this);
    this.newBike = this.newBike.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      submitted: false
    };
  }

  onChangeName(e) {
    console.log("onChangeName");
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    console.log("onChangeDescription");
    this.setState({
      description: e.target.value
    });
  }

  saveBike() {
    console.log("saveBike");
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    BikeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBike() {
    console.log("newBike");
    this.setState({
      id: null,
      name: "",
      description: "",
      submitted: false
    });
  }

  render() {
    console.log("render");
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBike}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Bike Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveBike} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
