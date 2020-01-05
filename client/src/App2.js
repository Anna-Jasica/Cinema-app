import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    showingId: null,
    id: 1,
    firstName: null,
    lastName: null,
    seat: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("http://localhost:3001/getReservations")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (showingId, firstName, lastName, seat) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 1;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/createReservation", {
      id: idToBeAdded,
      showingId: showingId,
      firstName: firstName,
      lastName: lastName,
      seat: seat
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/deleteReservation", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={dat.id}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> showingId: </span>{" "}
                  {dat.showingId} <br />
                  <span style={{ color: "gray" }}> firstName: </span>
                  {dat.firstName}
                  <span style={{ color: "gray" }}> lastName: </span>
                  {dat.lastName}
                  <span style={{ color: "gray" }}> seat: </span>
                  {dat.seat}
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ showingId: e.target.value })}
            placeholder="showingId"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder="firstName"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder="lastName"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ seat: e.target.value })}
            placeholder="seat"
            style={{ width: "200px" }}
          />
          <button
            onClick={() =>
              this.putDataToDB(
                this.state.showingId,
                this.state.firstName,
                this.state.lastName,
                this.state.seat
              )
            }
          >
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
