import React, { useContext,useState } from 'react';
import {Context} from "../Reducers";
import {testAction} from '../Actions'
import {columns, emptySeatsIndex,numberOfSeats,startSeatNum} from "../lib/hallData";
import "./Zone.scss";

const Zone = props =>{
    const {store, dispatch} = useContext(Context);

    const CLM = columns[props.floor][props.block][props.FRBK];
    const NOS = numberOfSeats[props.floor][props.block][props.FRBK];
    const SSN = startSeatNum[props.floor][props.block][props.FRBK];
    const ESI = emptySeatsIndex[props.floor][props.block][props.FRBK];


    const seatsNum = ESI===null? NOS : NOS+ESI.length;
    let seatList = new Array(seatsNum);

    let seatNum = SSN;
    let currentEmptySeatIndex = 0;

    for(let i=0; i<seatList.length; i++){

        if(ESI !==null && i === ESI[currentEmptySeatIndex] ){
            seatList[i] = null;
            currentEmptySeatIndex++;
        } else{
            seatList[i]={
                date:"",
                hostName:"",
                guestName:"",
                tel:"",
                seatNum: seatNum
            };
            seatNum++;
        }
    }


    const wrapperStyle ={
        width:`${CLM*22}px`,
        display: "flex",
    };


    return(
        <div className="zone" style={wrapperStyle}>
            <div className="seat-wrapper"  >
                {
                    seatList.map( (seat,index) => (
                        seat===null?
                            (
                                <span className="seat empty" key={index}> </span>
                            ):(
                                <span className="seat valid" key={index}
                                      onClick={()=>console.log(seat.seatNum)}
                                >
                                </span>
                            )
                    ))
                }
            </div>

        </div>
    )
};

export default Zone;