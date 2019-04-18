import React,{ useReducer, useEffect } from 'react';
import firebase from './lib/firebase';

import './App.scss';
import {Context, initialState, reducer} from './Reducers';
import {onAppIit} from './Actions';
import logger from 'use-reducer-logger';

import Nav from './Components/Nav';
import Main from './Components/Main';

const App = props =>{

    const database = firebase.database();
    console.log(database);
    const [store, dispatch] = useReducer( logger(reducer), initialState);

    useEffect( ()=>{
        dispatch( onAppIit() );
    },[]);

    return (
        <Context.Provider value={ {store, dispatch} }>
            <div className="App">
                <Nav />
                <Main />
            </div>
        </Context.Provider>

    )
};

export default App;