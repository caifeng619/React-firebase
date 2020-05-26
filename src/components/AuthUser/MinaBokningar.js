import React, { Component } from "react";
import "../../style/_bokningar.scss";
import BokCard from "../BokCard";
import Header from "../Header";
import Footer from "../Footer";
import Nav from "../Nav";
import firebase from "../FirebaseConfig";

class MinaBokningar extends Component {
  state = {
    bookings: [],
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userid = user.uid;
          const db = firebase.firestore();
          db.collection("booking")
            .where("userid", "==", userid)
            .where("status", "==", "booked")
            .onSnapshot((snapshot) => {
              let changes = snapshot.docChanges();
              changes.forEach((change) => {
                console.log(change.doc.data());
              });

              this.setState({
                bookings: changes,
              });
            });
        } else {
          alert("Du har inte loggat in än!");
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Nav />
        <section >
          <div className="bokningar-container">
          {this.state.bookings.length < 1 
          ? <div>Du har ingen bokning.</div>
          :<React.Fragment>
              {this.state.bookings.map((booking) => (
                <BokCard
                  key={booking.doc.id}
                  id={booking.doc.id}
                  name={booking.doc.data().name}
                  price={booking.doc.data().price}
                  datum={booking.doc.data().date}
                  tid={booking.doc.data().time}
                  phoneNumber={booking.doc.data().phoneNumber}
                />
              ))}
            </React.Fragment>}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MinaBokningar;
