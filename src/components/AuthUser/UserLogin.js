// register och login
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "../../style/_userlogin.scss";
import { FaUserAlt } from "react-icons/fa";
import firebase from "../FirebaseConfig";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

class UserLogin extends Component {
  state = {
    condition: true
  };

  changeState(e) {
    this.setState((prevState) => ({
      condition: !prevState.condition,
    }));
    e.target.innerHTML = this.state.condition
      ? "Already have an account?"
      : "Do not have an account?";
  }
  onSubmitLogin(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response.user.email);
        
      })
  }

  onSubmitRegister(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const displayName = e.target.elements.username.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        res.user.sendEmailVerification().then(function(){
          window.alert("Verifiering skickad")
        });
        this.props.callbackFromParent(displayName);
        
      })
    
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/profile',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="userlogin-container">
          <div className="firebase-ui-container">
            <p>Sign in with your social accounts or with your email and password.</p>
            <StyledFirebaseAuth  uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
          <div className="or-container">
            <div className="or-before"></div>Or
            <div className="or-after"></div>
          </div>
          {this.state.condition ? 
            <div>
                <p className="error">{this.state.error1}</p>
                <form className="login-form"  onSubmit={this.onSubmitLogin.bind(this)}>
                  <FaUserAlt /><br />
                  <input type="email" name="email" /><br />
                  <input type="password" name="password" /><br />
                  <button>Logga in</button>
                  <Link to="reset">Glömt lösenordet?</Link>
                  <button className="btn-change" onClick={this.changeState.bind(this)}>
                    Do not have an account?
                  </button>
                </form>
            </div>
           : <div>
                <p className="error">{this.state.error2}</p>
                <form  className="register-form"  onSubmit={this.onSubmitRegister.bind(this)}>
                  <FaUserAlt />
                  <input type="text" name="username" /><br />
                  <input type="email" name="email" /><br />
                  <input type="password" name="password" /><br />
                  <button>Registrera</button>
                  <button  className="btn-change" onClick={this.changeState.bind(this)}> Do not have an account?</button>
                  <br />
                </form>
            </div>
          }
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default UserLogin;
