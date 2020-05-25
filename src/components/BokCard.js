import React, { Component } from "react"
import { Link } from "react-router-dom";
import firebase from "./FirebaseConfig";

class BokCard extends Component {
    state={
        displayName:"",
    }
    componentDidMount(){
        var user=firebase.auth().currentUser
        if(user){
            var displayName=user.displayName
            this.setState({
                displayName
            })
        }else{console.log("error")}
    }
    deleteBookingConfirm(){
        const db=firebase.firestore()
        console.log(this.props.id)
        var product_id=this.props.id
        db.collection("booking").doc(product_id).delete();
        
    }
render(){
    const {name, price, datum, tid, phoneNumber} =this.props
    return (
        <React.Fragment>
            <div className={"card"} style={{ width: "18rem" }}>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{this.state.displayName}</h5>
                    <h5 className={"card-title"}>{name}</h5>
                    <h5 className={"card-title"}>{price} kr</h5>
                    <p className={"card-text"}>{datum} {tid}</p>
                    <p className={"card-text"}>{phoneNumber}</p>
                    <button className={"btn btn-boka"}><Link to="/form">Boka om</Link></button><br />
                    <button className={"btn btn-boka"} onClick={this.deleteBookingConfirm.bind(this)}>Avboka</button>
                </div>
            </div>
            <div className="delete-form-container"></div>
            </React.Fragment>
        
    )
}
    
}
export default BokCard;