import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import Zone from "../Zone";
import firebase from "firebase";
import {
    setGetDataList,
    setSelectedSeatsData
} from "../../Actions";
import {
    onGetDataList,
    getSeatData,
    setSeatData,
    getUserData,
    setUserData
} from "../../lib/getHallData";


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


    const onRegisterBooking = (ev) =>{
        ev.preventDefault();
        console.log(userBookingList);
        //set max booking limit here
        let totalBookingCount =0;
        if(userBookingList.length){
            userBookingList.forEach( booking =>{
                totalBookingCount = totalBookingCount+booking.seats.length;
            });
        }

        if(totalBookingCount>=10){
            props.setIsDisplayModal("");
            return window.alert("이미 예약 가능한 좌석을 초과하였습니다.")
        }else{
            window.alert(`현재 예약 가능한 좌석은 ${10-totalBookingCount}석 입니다.`)
        }



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

        //set object to array before start
        let selectedSeatsList = [];
        Object.keys(store.selectedSeatsData).forEach(key =>{
            if(store.selectedSeatsData[key]){
                    selectedSeatsList.push(key);
            }
        });

        let promiseArr = [];
        //*******write seats data*******// Do every selected seats (max 10 times)
        selectedSeatsList.forEach(async(data)=> {
            const seatDataArr = data.split("_");
            let path=`seats/${seatDataArr[0]}/${seatDataArr[1]}/${seatDataArr[2]}`;

            const DBseatList = await getSeatData(path);

            //search in DB (max 95 times / ground-Na-Bk block )
            for(let i=0;i<DBseatList.length;i++){
                if(DBseatList[i].seatNum === Number(seatDataArr[3])){

                    if(DBseatList[i].uid){
                        return window.alert(
                           `${data} 자리가 이미 예약되어 있십니다. 
                           내 자리 확인하기에서 예약 내역 확인 후 다시 시도해주세요.`)
                    }else{

                        const seatData ={
                            uid:store.userData.token,
                            tel:store.userData.phoneNumber,
                            host:hostName,
                            guest:guestName,
                            seatNum:DBseatList[i].seatNum
                        };

                        path = path+`/${i}`;
                        promiseArr.push(setSeatData(path, seatData) );
                    }
                    break;
                }
            }

        });

        //*******write user data*******//
        const userData ={
            tel:store.userData.phoneNumber,
            host:hostName,
            guest:guestName,
            seats:[...selectedSeatsList]
        };

        onSetUserData(userData).then(
            result =>{
                console.log(result);
                Promise.all(promiseArr).then( resolveList => {
                    if( resolveList.length===promiseArr.length){
                        window.alert("예약이 완료되었습니다. 나의 예약 내역 메뉴에서 확인하세요.")
                    }
                });
            }
        );

        onGetDataList().then(DATA => {
            dispatch( setGetDataList(DATA) );
            dispatch(setSelectedSeatsData({}))
        });

        props.setIsDisplayModal("");
    };

    const onSetUserData = async(userData) =>{
        let currentUserData = await getUserData(store.userData.uid)||[];
        currentUserData = [...currentUserData, userData];

        setUserData(store.userData.uid, currentUserData).then(
            result=> result, err=> err
        )
    };


    return(
        <div className={`modal-wrapper ${props.isDisplayModal}`}>

            <div className="modal-booking">
                BOOKING MODAL
                <h2>좌석 예약</h2>
                <h4> - 선택하신 좌석 - </h4>
                <ul>
                    {
                        Object.keys(store.selectedSeatsData).map(data=> {

                            if(store.selectedSeatsData[data]){
                                let seatInfoArr=data.split("_");
                                //["ground","GA","FR","1"]
                                if(seatInfoArr[0]==="ground"){
                                    seatInfoArr[0] = "1"
                                }else if(seatInfoArr[0]==="loop"){
                                    seatInfoArr[0] = "2"
                                }
                                return (
                                    <li key={data}>
                                        {`${seatInfoArr[0]}층 ${seatInfoArr[1]}열 ${seatInfoArr[3]}번 좌석`}
                                    </li>
                                )
                            }
                       })
                    }
                </ul>

                <form>
                    <h5> - 예매자 정보 입력 - </h5>
                    <div>
                        예약자 성함
                        <input type="text"
                               placeholder=" 우엉이 "
                               onChange={ev=>setHostName(ev.target.value)}
                        />
                    </div>

                    <div>
                        초대받는 분 성함
                        <input type="text"
                               placeholder=" 꼬미 "
                               onChange={ev=>setGuestName(ev.target.value)}

                        />
                    </div>


                    <div className="btn-wrapper">
                        <button onClick={ev=>onCancelBooking(ev)}>
                            취소
                        </button>
                        <button  onClick={ev=>onRegisterBooking(ev)}>
                            예약
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
};

export default Modal_Booking;
