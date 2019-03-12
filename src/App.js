import React,{ useReducer, useEffect } from 'react';
import './App.scss';
import {Context, initialState, reducer} from './Reducers';
import {onAppIit} from './Actions';
import logger from 'use-reducer-logger';

import Nav from './Components/Nav';

const App = props =>{
    const [store, dispatch] = useReducer( logger(reducer), initialState);

    useEffect( ()=>{
        dispatch( onAppIit() );
    },[]);

    return (
        <Context.Provider value={ {store, dispatch} }>
            <div className="App">
                {store.title}
                <Nav />
                {
                    store.arr.map( num =>{
                        return <div>{num}</div>
                    })
                }
            </div>
        </Context.Provider>

    )
};

export default App;