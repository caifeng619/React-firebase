import React, { Component } from "react";
import UserInfo from "./UserInfo";
import Header from "../Header";
import Footer from "../Footer";
import "../../style/_userprofile.scss";
import DeleteAccount from "./DeleteAccount";
import Nav from "../Nav";
import {Router} from "@reach/router";
import MinaBokningar from "./MinaBokningar";
import AddImage from "./AddImage";

class UserProfile extends Component {

  render() {
    return (
      <React.Fragment>
        <Header/>
        <main className="user-profile-container">
          <Nav/>
          <Router>
            <UserInfo path="/profile/userinfo"/>
            <MinaBokningar path="/profile/minabokningar"/>
            <AddImage path="/profile/addimage"/>
            <DeleteAccount path="/profile/deleteaccount"/>
          </Router>
        </main>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default UserProfile;
