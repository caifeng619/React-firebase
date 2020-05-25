import React, { Component } from 'react';
import firebase from "./FirebaseConfig";

class FirebaseTest extends Component {
    state = {  }

    onClickFirebase(){
        const db=firebase.firestore();
        const docRef=db.collection("booking").doc("info")
        // const docRef2=db.collection("booking").doc("oOkKKUfRoD1IgjWR10Dx")
        // läser data from firebase

        docRef.get().then(booking =>{
            if(booking.exists){
                console.log("document data:", booking.data())
            }else{
                console.log("error")
            }
        })

        // skriver data i firebase

        // docRef.set({item:"test", price: 200})
        // docRef2.set({item:"test", price: 750}) 
    }
    render() { 
        return ( <div>
            <button onClick={this.onClickFirebase.bind(this)}>Hämta firestore info</button>
        </div> );
    }
}
 
export default FirebaseTest;