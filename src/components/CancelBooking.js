import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class CancelBooking extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="delete-form-container">
          <div className="delete-form">
            <p>Är du säker att du vill avboka den tiden?</p>
            <button onClick={this.deleteEvent.bind(this)}>Ja</button>
            <Link to="/profile/minabokingar">
              <button>Gå tillbaka</button>
            </Link>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CancelBooking;
