import React, { Component } from "react";
import Form from "./Form.js";
import "../Reservation.css";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40
      ],
      seatsToReserve: [],
      reservations: [],
      isDisplayingForm: false
    };
  }

  componentDidMount() {
    this.getReservations();
  }

  moveToReservation = () => {};

  onSeatClick = seat => {
    const index = this.state.seatsToReserve.indexOf(seat);
    const seatsToReserve = this.state.seatsToReserve;
    if (index === -1) {
      seatsToReserve.push(seat);
    } else {
      seatsToReserve.splice(index, 1);
    }
    this.setState({ seatsToReserve: seatsToReserve });
    console.log(this.state.seatsToReserve);
  };

  switchToForm = () => {
    this.setState({ isDisplayingForm: true });
  };

  switchToReservation = () => {
    this.setState({ isDisplayingForm: false });
  };

  makeReservation() {}

  getReservations = () => {
    fetch(
      `http://localhost:3001/getReservations?showingId=${this.props.showingId}`
    )
      .then(data => data.json())
      .then(res => {
        this.setState({ reservations: res.data.map(obj => Number(obj.seat)) });
        console.log(res.data);
      });
  };

  render() {
    const seats = this.state.seats.map(seat => {
      return (
        <div className="seat" key={seat}>
          {this.state.reservations.includes(seat) ? (
            <div className="busySeat" key={seat}>
              X
            </div>
          ) : (
            <div
              className={
                this.state.seatsToReserve.includes(seat)
                  ? "reserved freeSeat"
                  : "freeSeat"
              }
              key={seat}
              onClick={() => this.onSeatClick(seat)}
            >
              {seat}
            </div>
          )}
        </div>
      );
    });

    return this.state.isDisplayingForm ? (
      <div>
        <Form
          showingId={this.props.showingId}
          seats={this.state.seatsToReserve}
          moveToMainView={this.props.moveToMainView}
        />
      </div>
    ) : (
      <div>
        <div className="bannerReservation">Kliknij, aby wybrać</div>
        <div className="container">
          {seats}{" "}
          <button
            disabled={this.state.seatsToReserve.length === 0}
            className="reservationButton"
            onClick={() => this.switchToForm()}
          >
            Rezerwuj
          </button>
        </div>
      </div>
    );
  }
}

export default Reservation;
