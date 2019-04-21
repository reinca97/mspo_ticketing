import {
    SET_DATA_LIST,
    SET_SELECTED_SEAT_LIST
} from '../Constants';

export const setGetDataList =  list =>{

    return{
        type: SET_DATA_LIST,
        totalSeatList:list
    }
};


export const setSelectedSeatsList = (list, item) =>{

    let currentList = [...list];
    const index = currentList.indexOf(item);
    if(index===-1){
        currentList[currentList.length]=item;
    }else{
        currentList.splice(index, 1);
    }
    return{
        type: SET_SELECTED_SEAT_LIST,
        selectedSeatsList:currentList
    }
};