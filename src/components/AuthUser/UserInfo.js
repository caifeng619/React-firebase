import React, { Component } from "react";
import firebase from "../FirebaseConfig";
import Nav from "../Nav";
import Header from "../Header";
import Footer from "../Footer";

class UserInfo extends Component {

  state={
    name:"",
    email:"",
    phoneNumber:""
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({
          name:user.displayName,
          email:user.email,
          phoneNumber:user.phoneNumber,
        })
      }
    })
  }
  onSubmitSaveUserinfo(e){
    var user = firebase.auth().currentUser
    console.log(user)
    user.updateProfile({
      displayName:e.target.elements.name.value,
      email:e.target.elements.email.value,
      phoneNumber:e.target.elements.tel.value,
    })
  }
  render() {
    return (
      <div>
        <Header/>
        <Nav/>
        <section className="userinfo-container">
          <h4>Mina uppgifter</h4>
          <form onSubmit={this.onSubmitSaveUserinfo.bind(this)}>
            <label htmlFor="name">Avändaresnamn</label>
            <input type="text" name="name" defaultValue={this.state.name}/><br/>
            <label htmlFor="name">E-postadress</label>
            <input type="text" name="email" defaultValue={this.state.email}/><br/>
            <label htmlFor="name">Telefone Nummer</label>
            <input type="tel" name="tel" defaultValue={this.state.phoneNumber}/><br/>
            <button className="btn">Spara</button>
          </form>
        </section>
        <Footer/> 
      </div>
    );
  }
}

export default UserInfo;
