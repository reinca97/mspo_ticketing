import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import firebaseui from "firebaseui"
import {setUserData} from "../../Actions";
import "./style.scss"

firebase.auth().languageCode = 'KR';
const uiConfig = {
    signInSuccessUrl: 'http://localhost:4000/check-auth',
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
            whitelistedCountries: ['KR','+81','GB','US']
        }
    ]
};
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.


const SignIn = props =>{
    const {store, dispatch} = useContext(Context);

    useEffect( ()=> {
        ui.start('#firebaseui-auth-container', uiConfig);
    },[]);



    return(
        <div className="sign-in">
            {
                store.userData.token !==""
                && <Redirect to="/booking" />
            }
            <div className="info">
                <h2>Sign In</h2>
                <p>좌석을 예매하기 위해서는 인증이 필요합니다.</p>
            </div>

            <div>
                <div id="firebaseui-auth-container"></div>
                <br/>
                <div id="loader">Loading...</div>
            </div>

        </div>
    )
};

export default SignIn;