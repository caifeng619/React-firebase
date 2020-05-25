import React from "react";
import "../style/_kontaktform.scss";
import Step from "./Step";
import Header from "./Header";
import Footer from "./Footer";
import firebase from "./FirebaseConfig";

class KontaktForm extends React.Component {
    state = {
        name:"",
        date:"",
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                const db=firebase.firestore()
                var product_id=localStorage.getItem("product_id")
                const docRef=db.collection("booking").doc(product_id)
                docRef.get().then(booking=>{
                    this.setState({
                        name:booking.data().name,
                        date:booking.data().date,
                        time:booking.data().time
                    })
                })
              }else{
                alert("Du har inte loggat in än!")
              }
        }.bind(this))
      }
    render() {
        return (
            <div>
                <Header/>
                <Step />
                <div>
                     Nu har du bokat en tid för {this.state.name} on {this.state.date} at {this.state.time}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default KontaktForm;