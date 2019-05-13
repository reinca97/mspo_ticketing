import React,{ useReducer, useEffect, useState } from 'react';
import {onGetDataList} from "./lib/getHallData";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import './App.scss';
import {Context, initialState, reducer} from './Reducers';
import {onSetIsLogin, setGetDataList, setUserData} from './Actions';
import logger from 'use-reducer-logger';


import Mobile from "./Components/Mobile";
import Nav from "./Components/Nav";
import Booking from "./Components/Booking";
import Intro from "./Components/Intro";
import SignIn from "./Components/SignIn";
import MyReservation from "./Components/MyReservation";
import Admin from "./Components/Admin";





const App = props =>{
    const [store, dispatch] = useReducer( logger(reducer), initialState);
    const [isMobile, setIsMobile] = useState(false);

    useEffect( ()=>{
        // appInit();
        checkMobile();
    },[]);


    const appInit = async() =>{
        const DATA = await onGetDataList();
        dispatch( setGetDataList(DATA) );
        //dispatch userInfo here (DATA.users)
    };

    const checkMobile = () =>{
        const width=window.innerWidth;
        if(width<1200){
            setIsMobile(true)
        }
    };



    return (
        <Context.Provider value={ {store, dispatch} }>

            {isMobile? (
                <Route exact path="/" component={Mobile} />
            ):(
                <div className="App">
                    <Route path="/" component={Nav} />
                    <section>
                        <Route exact path="/" component={Intro} />
                        <Route exact path="/booking" component={Booking} />
                        <Route exact path="/sign-in" component={SignIn} />
                        <Route exact path="/my-reservation" component={MyReservation} />
                        <Route exact path="/admin" component={Admin} />
                    </section>
                </div>
            )}

        </Context.Provider>
    )
};

export default App;