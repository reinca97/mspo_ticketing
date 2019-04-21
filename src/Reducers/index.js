import {
    SET_DATA_LIST,
    SET_SELECTED_SEAT_LIST
} from '../Constants';
import React from 'react';

export const initialState = {
    isLogin:false,
    selectedSeatsList:[]
};


export const reducer = (state,action)=>{
    switch(action.type){
        case SET_DATA_LIST:
            return{
                ...state,
                totalSeatList: action.totalSeatList
            };

        case SET_SELECTED_SEAT_LIST:
            return{
                ...state,
                selectedSeatsList: action.selectedSeatsList
            };

        default:return state;
    }
};

export const Context = React.createContext();