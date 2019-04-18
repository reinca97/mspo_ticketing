import {APP_INIT,TEST} from '../Constants';
import React from 'react';

export const initialState = {
    title: "",
    arr:[1,2,3,4,5]
};


export const reducer = (state,action)=>{
    switch(action.type){
        case APP_INIT:
            return {
                ...state,
                title:action.title,
            };


        default:return state;
    }
};

export const Context = React.createContext();