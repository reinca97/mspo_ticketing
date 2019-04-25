import React, { useContext ,useEffect} from 'react';
import {Context} from "../../Reducers";
import firebase from "firebase";
import {setUserData} from "../../Actions";
import { Redirect } from "react-router-dom";

const CheckAuth = props =>{
    const {store, dispatch} = useContext(Context);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log(user);
                user.getIdToken().then(function(accessToken) {
                    console.log(accessToken);

                    dispatch(setUserData({
                        token:accessToken,
                        phoneNumber:user.phoneNumber
                    }));
                });
            } else {
                // User is signed out.
                console.log("-----singed out-------")
            }
        }, function(error) {
            console.log(error);
        });

    },[]);



    return(
        <div className="check-auth">
            {
                store.userData.token!==""
                && <Redirect to="/booking" />
            }
        </div>
    )
};

export default CheckAuth;