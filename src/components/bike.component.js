import React, { Component } from "react";
import BikeDataService from "../services/bike.service";
import { withRouter } from '../common/with-router';

class Bike extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBike = this.getBike.bind(this);
    this.updateBike = this.updateBike.bind(this);
    this.deleteBike = this.deleteBike.bind(this);

    this.state = {
      currentBike: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    console.log("Bike-componentDidMount=>" + this.props.router.params.id);
    this.getBike(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    console.log("Bike-onChangeTitle=>" + title);
    this.setState(function(prevState) {
      return {
        currentBike: {
          ...prevState.currentBike,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    console.log("Bike-onChangeDescription=>" + description);
    this.setState(prevState => ({
      currentBike: {
        ...prevState.currentBike,
        description: description
      }
    }));
  }

  getBike(id) {
    console.log("Bike-getBike=>" + id);
    BikeDataService.getBike(id)
      .then(response => {
        this.setState({
          currentBike: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBike() {
    console.log("Bike-updateBike=>" + this.state.currentBike.id);
    BikeDataService.update(
      this.state.currentBike.id,
      this.state.currentBike
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Bike was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBike() {    
    BikeDataService.delete(this.state.currentBike.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/bikes');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    console.log("render bike single");
    const { currentBike } = this.state;
    console.log("render bike single=>" + currentBike);
    return (
      
      <div>
        {currentBike? (
          <div className="edit-form">
            <h4>Bike: {currentBike.id}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentBike.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBike.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBike}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBike}
            >
              Update
            </button>
            <p>{this.state.message}</p>
            </form>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Bike...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Bike);