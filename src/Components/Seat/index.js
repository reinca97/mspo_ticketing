import React, { useContext,useState,useEffect } from 'react';
import {Context} from "../../Reducers";
import {setSelectedSeatsData} from '../../Actions'
import "./style.scss";





const Seat = props =>{
    const {store, dispatch} = useContext(Context);

    const [isSelected, setIsSelected] = useState(
        store.selectedSeatsData[props.seatInfo]
    );


    const onToggleSeats = () => {
        let count =0;
        Object.keys(store.selectedSeatsData).forEach(data=>{
            store.selectedSeatsData[data] && count++
        });

        if(!isSelected && count>9){
            window.alert("최대 10석까지 선택 가능합니다.")
        }else{
            setIsSelected(!isSelected);
            let currentData = {...store.selectedSeatsData};
            currentData[props.seatInfo] = !currentData[props.seatInfo];
            dispatch( setSelectedSeatsData (currentData)) ;
        }
    };


    return(
        props.data.uid?
            (
                <span className={`seat reserved ${isSelected && "selected"}`} />
            ):(
                <span className={`seat valid ${isSelected && "selected"}`}
                      onClick={()=>onToggleSeats()} />
            )
    )
};

export default Seat;