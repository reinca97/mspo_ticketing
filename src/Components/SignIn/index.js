import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import firebaseui from "firebaseui"
import {onSetIsLogin,setUserData} from "../../Actions";
import "./style.scss"

firebase.auth().languageCode = 'ko';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
const uiConfig = {
    // signInSuccessUrl: '/booking',
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
                dispatch(onSetIsLogin(true));
                // User is signed in.\
                user.getIdToken().then(accessToken=> {

                    dispatch(setUserData({
                        token:accessToken,
                        phoneNumber:user.phoneNumber,
                        uid:user.uid
                    }));
                });
            }
        }, function(error) {
            console.log(error);
        });
    };



    return(
        <div className="sign-in">
            {
                store.userData.token !=="" ?
                    (
                        <div>
                            <h4>인증이 완료되었습니다.</h4>
                            <div>
                                <p> 좌석 예약 메뉴로 이동하여 예매 하실 수 있습니다.</p>
                            </div>

                            <Redirect to="/booking"/>
                        </div>

                    ):(
                    <div className="info">
                        <h2>Sign In</h2>
                        <div>
                            <h3>- 전화 인증 안내 -</h3>
                            <p>무분별한 예매 방지 및 본인 확인을 위하여 핸드폰 번호 인증을 하고 있습니다.</p>
                            <p>휴대폰 번호 입력 후 Verify 버튼을 누르시면 sms 로 인증 번호가 전송됩니다.</p>
                            <p>6 자리 인증 코드를 입력하시면 로그인이 됩니다.</p>
                        </div>

                        <div>
                            <div id="firebaseui-auth-container"></div>
                        </div>
                    </div>
                    )
            }
        </div>
    )
};

export default SignIn;