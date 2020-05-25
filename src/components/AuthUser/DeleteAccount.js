import React, { Component } from 'react';
import firebase from "../FirebaseConfig";
import Nav from "../Nav";
import Header from "../Header";
import Footer from "../Footer";

class DeleteAccount extends Component {
    deleteAccount() {
        var user = firebase.auth().currentUser;
        user
          .delete()
          .then(function () {
            localStorage.clear();
            window.location.reload(false);
          })
          .catch(function (error) {
            // An error happened.
          });
      }
    render() { 
        return (
          <React.Fragment>
            <Header/>
            <Nav/>
            <section>
                <p>Är du säker att du ska radera ditt konto?</p>
                 <button onClick={this.deleteAccount.bind(this)}>Redera konto</button>
            </section>
            <Footer/>
          </React.Fragment>
         );
    }
}
 
export default DeleteAccount;