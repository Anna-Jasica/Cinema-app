import React, { Component } from "react";
import "../Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [] };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    const showings = this.props.showings.length
      ? this.props.showings.map(showing => {
          return (
            <div
              className="singleMovie"
              onClick={() => this.props.moveToReservation(showing.id)}
              key={showing.id}
            >
              <div className="movies">
                <div className="movieName">{showing.movieName}</div>
                <div className="movieDescription">
                  {showing.movieDescription}
                </div>
              </div>
            </div>
          );
        })
      : "";
    return <div className="wrapper">{showings}</div>;
  }
}

export default Movies;
