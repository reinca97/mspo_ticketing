import {
    SET_DATA_LIST,
    SET_SELECTED_SEAT_DATA,
    SET_USER_DATA
} from '../Constants';
import React from 'react';


export const initialState = {
    isLogin:false,
    selectedSeatsData:{},
    userData:{
        token:"",
        phoneNumber:""
    }
};


export const reducer = (state,action)=>{
    switch(action.type){
        case SET_DATA_LIST:
            return{
                ...state,
                totalSeatList: action.totalSeatList
            };

        case SET_SELECTED_SEAT_DATA:
            return{
                ...state,
                selectedSeatsData: action.selectedSeatsData
            };

        case SET_USER_DATA:
            return{
                ...state,
                userData:action.userData
            };

        default: return state;
    }
};

export const Context = React.createContext();