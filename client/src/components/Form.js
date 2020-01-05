import React, { Component } from "react";
import "../Form.css";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    this.props.seats.forEach(seat => {
      // event.preventDefault();
      fetch("http://localhost:3001/createReservation", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          showingId: this.props.showingId,
          firstName: this.firstName.value,
          lastName: this.lastname.value,
          seat: String(seat)
        })
      });
    });
    this.props.moveToMainView("Dziękujemy za rezerwację.");
  };

  componentDidMount() {
    // this.getReservations();
  }

  render() {
    return (
      <div className="form">
        <input
          autocomplete="off"
          className="input"
          ref={ref => {
            this.firstName = ref;
          }}
          placeholder="Imię"
          type="text"
          name="first_name"
        />
        <br />
        <input
          autocomplete="off"
          className="input"
          ref={ref => {
            this.lastname = ref;
          }}
          placeholder="Nazwisko"
          type="text"
          name="last_name"
        />
        <input
          autocomplete="off"
          className="input"
          placeholder="Numer telefonu"
        />
        <button className="submitButton" onClick={() => this.handleSubmit()}>
          Wyślij rezerwację
        </button>
      </div>
    );
  }
}

export default Reservation;
