import React, { Component } from 'react';
import UserLogin from "./UserLogin";
import firebase from "../FirebaseConfig";
import UserInfo from './UserInfo';

class UserPage extends Component {
    state = { 
        useremail:"",
        displayName:""
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user)
                this.setState({
                    useremail:user.email,
                    displayName:user.displayName
                })
                localStorage.setItem("displayname", this.state.displayName)
            }        
        })
    }
    
    getDisplayname(userName){
        console.log("displayname", userName)
        var user = firebase.auth().currentUser

            user.updateProfile({
                displayName:userName
            }).then(()=>
            this.setState({displayName:user.displayName}))
            
            console.log(user.displayName)
        
    }

    render() { 
        const loggedIn=this.state.useremail || this.state.displayName
        return ( 
        <div>
            {!loggedIn
            ? <UserLogin callbackFromParent={this.getDisplayname.bind(this)}/>
            : <UserInfo displayName={this.state.displayName}/>}
        </div> );
    }
}
 
export default UserPage;