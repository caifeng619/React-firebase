import React, { Component } from 'react';
import firebase from "./FirebaseConfig";
import Header from "./Header";
import Footer from "./Footer";
import "../style/_contact.scss";

class Contact extends Component {

    onSubmitContactForm(e){
        e.preventDefault();
        var user = firebase.auth().currentUser;
        console.log(user.email)
        var d = new Date();
        var n=d.getTime()
        if(user){
            var userId=user.uid
            const db=firebase.firestore();
            const docRef=db.collection("ContactData").doc(userId).collection(n.toString())

            docRef.add({
                name:e.target.elements.name.value,
                tel:e.target.elements.tel.value,
                meddelande:e.target.elements.meddelande.value
            })

        }else{
            alert("Logga in för att kunna skicka meddelande till oss!")
        }
    }
    render() { 
        return (
            <React.Fragment>
                 <Header/>
                <div id="kontakt">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>Kontakta oss</h4>
                                <p>Ring oss eller lämna ett meddelande så ringer någon av våra medarbetare upp
                                    dig.</p>
                                    <br/>
                                <h4><a href="tel:+46712345678" title="08-000-00-000">+460123456789</a></h4>
                                <p><span><a href="https://drive.google.com/open?id=1URoOVgFhTwjYvLQN8IHy7lKJaxKsADV2&usp=sharing"
                                            target="_blank" rel="noopener">• Adress: Tulegatan 41, 113 53 Stockholm</a></span></p>
                            </div>
                            <div className="col-sm-6">
                                <form className="kontaktForm" onSubmit={this.onSubmitContactForm.bind(this)}>
                                    <input type="text" name="name" placeholder="Namn" required/>
                                    <input type="tel" name="tel" placeholder="Telefon" required/>
                                    <textarea name="meddelande" id="meddelande" cols="30" rows="3"
                                        placeholder="Meddelande"></textarea>
                                    <button className="btn-ring">Skicka</button>
                                </form>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                    
                </div>
                <Footer/>
                </React.Fragment>
         );
    }
}
 
export default Contact;