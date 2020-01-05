import React, { Component } from "react";
import kino from "../../src/kino2.jpg";
import "../Main.css";
import Movies from "./Movies";
import Reservation from "./Reservation";

class Main extends Component {
  constructor(props) {
    super(props);

    const days = [];
    let date = new Date();
    for (let i = 0; i < 5; i++) {
      date.setDate(new Date().getDate() + i);
      const nextDay = new Date(date.getTime());
      console.log(nextDay);
      days.push(nextDay);
    }
    this.state = {
      showings: [],
      reservations: [],
      days: days,
      isReserving: false,
      message: ""
    };
  }

  componentDidMount() {
    // this.getShowings();
    console.log(this.state);
  }

  moveToReservation = showingId => {
    this.setState({ isReserving: true, showingId: showingId });
  };

  moveToMainView = message => {
    this.setState({ isReserving: false, showings: [], message: message });
  };

  getShowings = date => {
    console.log(date.toLocaleDateString());
    fetch(`http://localhost:3001/getShowings?date=${date.toLocaleDateString()}`)
      .then(data => data.json())
      .then(res => {
        this.setState({ showings: res.data });
      });
  };

  render() {
    const days = this.state.days.length
      ? this.state.days.map(day => {
          return (
            <div
              className="singleDay"
              onClick={() => this.getShowings(day)}
              key={day.getDay()}
            >
              {day.toLocaleDateString()}
            </div>
          );
        })
      : "";

    return this.state.isReserving ? (
      <div>
        <Reservation
          showingId={this.state.showingId}
          moveToMainView={this.moveToMainView}
        />
      </div>
    ) : (
      <div className="wrapper">
        <img className="banner" src={kino} alt="Banner, logo kina" />
        <div className="welcome">Witaj na stronie naszego kina!</div>
        <div className="welcome">
          Kliknij na podaną datę, aby wyświetlić planowane seanse
        </div>
        <div className="days">
          <div>{days}</div>
        </div>
        {!this.state.showings.length ? (
          <div className="notification">{this.state.message}</div>
        ) : (
          ""
        )}
        <Movies
          showings={this.state.showings}
          moveToReservation={this.moveToReservation}
        />
      </div>
    );
  }
}

//     console.log(this.props);
//     const { posts } = this.props;
//     const postList = posts.length ? (
//       posts.map(post => {
//         return (
//           <div className="post card" key={post.id}>
//             <div className="card-content">
//               <Link to={"/" + post.id}>
//                 <span className="card-title red-text">{post.title}</span>
//               </Link>
//               <p>{post.body}</p>
//             </div>
//           </div>
//         );
//       })
//     ) : (
//       <div className="center">No posts to show</div>
//     );

//     return (
//       <div>
//         <div className="container home">
//           <h4 className="center">Home</h4>
//           {postList}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     posts: state.posts
//   };
// };

export default Main;
