import React, { useContext,useState } from 'react';
import {Context} from "../../Reducers";
import {setSelectedSeatsList} from '../../Actions'
import "./style.scss";


const Seat = props =>{
    const {store, dispatch} = useContext(Context);
    const [isSelected, setIsSelected] = useState(false);

    const onToggleSeats = () => {
        const totalList = [...store.selectedSeatsList];

        if(!isSelected){
            if(totalList.length<10){
                setIsSelected(!isSelected);
                dispatch( setSelectedSeatsList (totalList,props.seatInfo));
            }else{
                window.alert("최대 10석까지 선택 가능합니다.")
            }
        }else{
            setIsSelected(!isSelected);
            dispatch( setSelectedSeatsList (totalList,props.seatInfo));
        }
    };


    return(
        <span className={`seat valid ${isSelected && "selected"}`}
              onClick={()=>onToggleSeats()} >
        </span>
    )
};

export default Seat;