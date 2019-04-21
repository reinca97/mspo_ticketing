import React, { useContext,useState, useEffect } from 'react';
import {Context} from "../../Reducers";
import {columns, emptySeatsIndex,numberOfSeats,startSeatNum} from "../../lib/hallData";
import "./style.scss";
import firebase from '../../lib/firebase';

import Seat from "../Seat";

const database = firebase.database();

const Zone = props =>{
    const {store, dispatch} = useContext(Context);
    const [dataList, setDataList] = useState([null]);
    const [selectedSeats, selectSeats] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

   useEffect( ()=>{
       //***use only init whole database***
       // const tempDataList = initDataList();
       // setDataList(tempDataList);
       // writeUserData(tempDataList);
       //***********************************

       const currentData = store.totalSeatList;
       if(currentData){
           setDataList(currentData[props.floor][props.block][props.FRBK])
       }

   },[store.totalSeatList]);

    const CLM = columns[props.floor][props.block][props.FRBK];
    const NOS = numberOfSeats[props.floor][props.block][props.FRBK];
    const SSN = startSeatNum[props.floor][props.block][props.FRBK];
    const ESI = emptySeatsIndex[props.floor][props.block][props.FRBK];
    const seatInfoStr = `${props.floor}_${props.block}_${props.FRBK}`;

    //***use only init whole database***
    // const initDataList = () =>{
    //     const seatsCount = ESI===null? NOS : NOS+ESI.length;
    //     let seatList = [];
    //
    //     let seatNum = SSN;
    //     let currentEmptySeatIndex = 0;
    //
    //     for(let i=0; i<seatsCount; i++){
    //
    //         if(ESI !==null && i === ESI[currentEmptySeatIndex] ){
    //
    //             seatList.push ({
    //                 hostName:"no-one",
    //                 guestName:"no-one",
    //                 seatNum: null,
    //             }) ;
    //
    //             currentEmptySeatIndex++;
    //         } else{
    //             seatList.push({
    //                 date:"",
    //                 hostName:"",
    //                 guestName:"",
    //                 tel:"",
    //                 seatNum: seatNum,
    //                 uidx:""
    //             });
    //             seatNum++;
    //         }
    //     }
    //
    //     return seatList;
    // };
    // const  writeUserData = list => {
    //     firebase.database().ref(`${props.floor}` + `/${props.block}`+`/${props.FRBK}` )
    //         .set(list);
    // };
    //***********************************



    const editSeatInfo = (seatData, userData) =>{
        firebase.database().ref(`${seatData.floor}` + `/${seatData.block}`+`/${seatData.FRBK}`+`/${seatData.index}`)
        .set( userData, err =>{
            if(err){
                console.log(err)
            }else{
                console.log("success")
            }
        })
    };


    const wrapperStyle ={
        width:`${CLM*22}px`,
        display: "flex",
    };


    return(
        <div className="zone" style={wrapperStyle}>
            <div className="seat-wrapper"  >
                {
                    dataList.map( (seat,index) => (
                        seat===null || seat.guestName==="no-one"?
                            (
                                <span className="seat empty" key={index}>
                                </span>
                            ):(
                                <Seat
                                    data={seat}
                                    key={index}
                                    seatInfo ={`${seatInfoStr}_${seat.seatNum}`}
                                />
                            )
                        )
                    )
                }
            </div>


        </div>
    )
};

export default Zone;