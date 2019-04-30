import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import Zone from "../Zone";
import firebase from "firebase";
import {setGetDataList, setUserData, setSelectedSeatsData} from "../../Actions";
import { onGetDataList, getSeatData, setSeatData} from "../../lib/getHallData";


const Modal_Booking = props =>{
    const {store, dispatch} = useContext(Context);
    const [guestName, setGuestName] = useState("");
    const [hostName, setHostName] = useState("");

    useEffect(()=>{

    },[]);

    const onCancelBooking = ev =>{
        ev.preventDefault();
        props.setIsDisplayModal("");
    };


    const onRegisterBooking = (ev) =>{
        ev.preventDefault();

        if(!guestName || !hostName){
            return window.alert("예약자와 초대받는 분 성함을 입력해야 합니다.")
        }

        if(!store.userData.token){
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

        //*******write seats data*******// Do every selected seats (max 10 times)
        selectedSeatsList.forEach(async(data)=> {
            const seatDataArr = data.split("_");

            let path=`seats/${seatDataArr[0]}/${seatDataArr[1]}/${seatDataArr[2]}`;
            const DBseatList = await getSeatData(path);

            console.log(DBseatList);

            //search in DB (max 95 times / ground-Na-Bk block )




            for(let i=0;i<DBseatList.length;i++){
                if(DBseatList[i].seatNum === Number(seatDataArr[3])){
                    if(DBseatList[i].uid){
                        window.alert(`${data} 자리가 이미 예약되어 있십니다. 다시 시도해주세요.`)
                    }else{
                        const seatData ={
                            uid:store.userData.token,
                            tel:store.userData.phoneNumber,
                            host:hostName,
                            guest:guestName,
                            seatNum:DBseatList[i].seatNum
                        };

                        path = path+`/${i}`;
                        setSeatData(path, seatData).then((result,err)=>{
                            if(err){ console.log(err);}else{
                                return window.alert("등록이 완료되었습니다.")
                            }
                        });

                        onGetDataList().then(DATA => {
                            dispatch( setGetDataList(DATA) );
                            dispatch(setSelectedSeatsData({}))
                        });

                    }
                    break;
                }
            }



            });

            //*******write user data*******//
            const USERS = firebase.database().ref(`users/${store.userData.uid}`);
            const userData ={
                tel:store.userData.phoneNumber,
                host:hostName,
                guest:guestName,
                seats:[...selectedSeatsList]
            };

            USERS.once('value').then( snapshot =>{
                const fbUserData= snapshot.val()||[];
                    //make new userData item
                USERS.set(
                    [...fbUserData, userData]
                ).then(response=>
                        console.log("set success!",response)
                    , err=>{
                        console.log("rejected",err)
                });

            });



        props.setIsDisplayModal("");
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