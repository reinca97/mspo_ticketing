import React,{ useReducer, useEffect } from 'react';
import {onGetDataList} from "./lib/getHallData";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.scss';
import {Context, initialState, reducer} from './Reducers';
import {setGetDataList} from './Actions';
import logger from 'use-reducer-logger';


import Nav from "./Components/Nav";
import Booking from "./Components/Booking";
import Intro from "./Components/Intro";
import Callback from "./Components/Callback";


const App = props =>{
    // const database = firebase.database();
    // const storageRef = database.ref();
    // const main =storageRef.child("main");

    const [store, dispatch] = useReducer( logger(reducer), initialState);

    useEffect( ()=>{
        appInit();

    },[]);


    const appInit = async() =>{
        const list = await onGetDataList();
        dispatch( setGetDataList(list) );

    };




    return (
        <BrowserRouter>
            <Context.Provider value={ {store, dispatch} }>
                <div className="App">
                    <Route path="/" component={Nav} />
                    <section>
                        <Route exact path="/" component={Intro} />
                        <Route exact path="/booking" component={Booking} />
                        <Route exact path="/callback" component={Callback} />
                    </section>
                </div>
            </Context.Provider>
        </BrowserRouter>
    )
};

export default App;