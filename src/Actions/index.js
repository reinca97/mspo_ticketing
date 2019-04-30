import {
    SET_DATA_LIST,
    SET_SELECTED_SEAT_DATA,
    SET_USER_DATA,
    SET_USER_BOOKING_LIST
} from '../Constants';

export const setGetDataList =  list =>{

    return{
        type: SET_DATA_LIST,
        totalSeatList:list
    }
};


export const setSelectedSeatsData = data =>{

    return{
        type: SET_SELECTED_SEAT_DATA,
        selectedSeatsData:data
    }
};

export const setUserData = data =>{

  return{
      type: SET_USER_DATA,
      userData:data
  }
};

export const setUserBookingList = list =>{

    return{
        type:SET_USER_BOOKING_LIST,
        userBookingList:list
    }
};