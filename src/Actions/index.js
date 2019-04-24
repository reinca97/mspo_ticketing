import {
    SET_DATA_LIST,
    SET_SELECTED_SEAT_DATA
} from '../Constants';

export const setGetDataList =  list =>{

    return{
        type: SET_DATA_LIST,
        totalSeatList:list
    }
};


export const setSelectedSeatsData = (data) =>{

    return{
        type: SET_SELECTED_SEAT_DATA,
        selectedSeatsData:data
    }
};