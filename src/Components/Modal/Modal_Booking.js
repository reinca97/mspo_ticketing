import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import moment from "moment";
import "./style.scss";
import {
    setGetDataList,
    setSelectedSeatsData
} from "../../Actions";
import {
    onGetDataList,
    getSeatData,
    getUserData,
} from "../../lib/getHallData";

import {seatNameTranslator} from "../../lib/util";
import firebase  from "firebase" ;

const Modal_Booking = props =>{
    const {store, dispatch} = useContext(Context);
    const [guestName, setGuestName] = useState("");
    const [hostName, setHostName] = useState("");
    const [userBookingList, setUserBookingList] = useState([]);

    useEffect(()=>{
        getUserData(store.userData.uid).then(list =>{
            setUserBookingList(list||[]);
        });
    },[]);

    const onCancelBooking = ev =>{
        ev.preventDefault();
        props.setIsDisplayModal("");
    };

    const onRegisterBooking = ev =>{
        ev.preventDefault();

        if(!guestName || !hostName){
            return window.alert("예약자와 초대받는 분 성함을 입력해야 합니다.")
        }

        if(!store.userData.token){
            props.setIsDisplayModal("");
            return window.alert("비정상적인 접근입니다. 새로고침 및 로그인 후 예약 바랍니다.")
        }

        if(!window.confirm(`좌석을 예약 하시겠습니까?`)){
            return window.alert("취소 되었습니다.");
        }

        //set currently selected seats(obj) to array before start
        let selectedSeatsList = [];
        Object.keys(store.selectedSeatsData).forEach(key =>{
            if(store.selectedSeatsData[key]){
                selectedSeatsList.push(key);
            }
        });

        //count currently selected seats
        let currentBookingCount = 0;
        if(userBookingList.length){
            userBookingList.forEach( booking =>{
                currentBookingCount = currentBookingCount+ booking.seats.length;
            });
        }

        //set booking limit here
        // if(currentBookingCount+ selectedSeatsList.length >10){
        //     props.setIsDisplayModal("");
        //     return window.alert(`이미 예약 가능한 좌석을 초과하였습니다.
        //     ( 현재까지 ${currentBookingCount} 석 예약 / 1인 최대 10석까지 가능 ) `)
        // }

        //TODO: dispatch req action
        checkAndSetSeatDataList(selectedSeatsList);

        onGetDataList().then(DATA => {
            dispatch( setGetDataList(DATA) );
            dispatch( setSelectedSeatsData({}))
        });
        //TODO: dispatch req action (ends)

        props.setIsDisplayModal("");
    };

    const checkAndSetSeatDataList =  async selectedSeatsList =>{
        let update = {};
        let updateCount = 0;
        const timeData = moment().format("YYYY-MM-DD HH:mm");

        selectedSeatsList.forEach( async seatData =>{
            const seatDataArr = seatData.split("_");
            let path=`/${seatDataArr[0]}/${seatDataArr[1]}/${seatDataArr[2]}`;

            const DBseatList = await getSeatData(path);

            for(let i=0; i<DBseatList.length; i++) {
                if (DBseatList[i].seatNum === Number(seatDataArr[3]) ) {

                    if(DBseatList[i].uid!==""){
                        dispatch( setSelectedSeatsData({}));
                        return window.alert("이미 예약된 좌석입니다.")
                    }

                    const exactPath = `${path}/${i}`;
                    updateCount++;

                    const seatData ={
                                uid:store.userData.token,
                                tel:store.userData.phoneNumber,
                                host:hostName,
                                guest:guestName,
                                seatNum:DBseatList[i].seatNum,
                                date: timeData
                            };

                    update[`/seats${exactPath}`] = seatData;
                }
            }
            if(selectedSeatsList.length === updateCount){
                const userData ={
                    tel:store.userData.phoneNumber,
                    host:hostName,
                    guest:guestName,
                    seats:[...selectedSeatsList],
                    date: timeData
                };

                const currentUserData = await getUserData(store.userData.uid)||[];

                update[`/users/${store.userData.uid}`] =
                    [...currentUserData,userData];

                firebase.database().ref().update(update).then( result => {
                    dispatch( setSelectedSeatsData({}));
                    onGetDataList().then( data =>{
                        dispatch( setGetDataList(data) );
                    });
                    window.alert("예약이 완료되었습니다. [나의 예약 현황] 메뉴에서 확인하세요.");
                });
            }
        }); //loop ends
    };


    return(
        <div className={`modal-wrapper ${props.isDisplayModal}`}>

            <div className="modal-booking">
                <h2>좌석 예약</h2>
                <h4> - 선택 좌석 - </h4>
                <ul>
                    {
                        Object.keys(store.selectedSeatsData).map(data=> {
                            if(store.selectedSeatsData[data]){
                                return (
                                    <li key={data}>
                                        {seatNameTranslator(data)}
                                    </li>
                                )
                            }
                       })
                    }
                </ul>

                <form>
                    <h4> - 예매자 정보 - </h4>
                    <div>
                        예약자 성함 <p>*</p>
                        <input type="text"
                               placeholder=" 이정필 "
                               onChange={ev=>setHostName(ev.target.value)}
                        />
                    </div>
                    <div>
                        초대받는 분 성함
                        <input type="text"
                               placeholder=" 마동석 "
                               onChange={ev=>setGuestName(ev.target.value)}
                        />
                    </div>
                    <p>* 예약자 성함에는 MS필하모닉 단원의 실명을 기재 바랍니다.</p>

                    <div className="btn-wrapper">
                        <button className="custom-btn"
                            onClick={ev=>onCancelBooking(ev)}>
                            취소
                        </button>
                        <button  className="custom-btn admit"
                            onClick={ev=>onRegisterBooking(ev)}>
                            예약
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
};

export default Modal_Booking;
