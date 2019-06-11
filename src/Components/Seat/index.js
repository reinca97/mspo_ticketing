import React, { useContext,useState,useEffect } from 'react';
import {Context} from "../../Reducers";
import {setSelectedSeatsData} from '../../Actions'
import "./style.scss";


const Seat = props =>{
    const {store, dispatch} = useContext(Context);
    const [isSelected, setIsSelected] = useState(
        store.selectedSeatsData[props.seatInfo]
    );

    useEffect(()=>{
        setIsSelected(store.selectedSeatsData[props.seatInfo]);
    },[store.selectedSeatsData]);


    const onToggleSeats = () => {
        window.alert("예약 가능한 기간이 아닙니다.");
    };


    return(
        props.data.uid?
            (
                <span className={`seat reserved ${isSelected && "selected"}`} >
                       {props.data.seatNum}
                </span>
            ):(
                <span className={`seat valid ${isSelected && "selected"}`}
                      onClick={()=>onToggleSeats()} >
                    {props.data.seatNum}
                </span>
            )
    )
};

export default Seat;