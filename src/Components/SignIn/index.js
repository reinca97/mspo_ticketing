import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import firebaseui from "firebaseui"
import {setUserData} from "../../Actions";
import "./style.scss"

firebase.auth().languageCode = 'KR';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
const uiConfig = {
    signInSuccessUrl: '/booking',
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
            whitelistedCountries: ['KR','+81','US']
        }
    ],
    callbacks: {
        signInSuccessWithAuthResult: authResult=> {
            // Process result. This will not trigger on merge conflicts.
            // On success redirect to signInSuccessUrl.
            return true
        }
    }
};

const SignIn = props =>{
    const {store, dispatch} = useContext(Context);

    useEffect( ()=> {
        ui.start('#firebaseui-auth-container', uiConfig);
        initApp();

    },[]);


    const  initApp = ()=> {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.\
                user.getIdToken().then(accessToken=> {

                    dispatch(setUserData({
                        token:accessToken,
                        phoneNumber:user.phoneNumber,
                        uid:user.uid
                    }));
                });
            } else {
                return window.alert("인증이 정상적으로 이루어지지 않았습니다. 새로고침 후 다시 시도해주세요")
            }
        }, function(error) {
            console.log(error);
        });
    };



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