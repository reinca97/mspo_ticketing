import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
import firebase from "firebase";
import firebaseui from "firebaseui"
import "./style.scss"

const Intro = props =>{
    const {store, dispatch} = useContext(Context);

let token= "";
    useEffect( ()=> {

        console.log(token);

        firebase.auth().languageCode = 'KR';
        const uiConfig = {
            signInSuccessUrl: 'http://localhost:4000/booking',
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    recaptchaParameters: {
                        type: 'image', // 'audio'
                        size: 'invisible', // 'invisible' or 'compact'
                        badge: 'bottomleft'
                    },
                    defaultCountry: 'KR',
                    defaultNationalNumber: '010',
                    loginHint: '+11234567890',
                    whitelistedCountries: ['KR','+81','GB']
                }
            ]
        };

        // Initialize the FirebaseUI Widget using Firebase.
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log(user);
                user.getIdToken().then(function(accessToken) {
                    console.log(accessToken)
                    token=accessToken

                });
            } else {
                // User is signed out.
                console.log("------------")
            }
        }, function(error) {
            console.log(error);
        });

    },[]);

    const signOut =() =>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
        console.log(token)
    };


    return(
        <div className="intro">
          <div>
              <h1>MSPO</h1>
              <h2>online-ticketing system</h2>
          </div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>

             <button onClick={()=>signOut()}>
                 sign out
             </button>
        </div>
    )
};

export default Intro;