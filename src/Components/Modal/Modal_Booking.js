import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import Zone from "../Zone";
import firebase from "firebase";
import {setGetDataList, setUserData, setSelectedSeatsData} from "../../Actions";
import {editSeatInfo, onGetDataList} from "../../lib/getHallData";


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

    const onRegisterBooking = ev =>{
        ev.preventDefault();

        if(window.confirm(`좌석을 예약 하시겠습니까?`)){
            window.alert("---현재는 예약 가능한 기간이 아닙니다----");
            if(!store.userData.token){
                return window.alert("비정상적인 접근입니다. 새로고침 및 로그인 후 예약 바랍니다.")
            }

            Object.keys(store.selectedSeatsData).forEach(data=> {
                if (store.selectedSeatsData[data]) {
                    const tempArr = data.split("_");
                    let zoneList=[];

                    firebase.database()
                        .ref(`seats/${tempArr[0]}/${tempArr[1]}/${tempArr[2]}`)
                        .once('value').then(resolve => {
                        zoneList = resolve.val();

                        for(let i=0;i<zoneList.length;i++){
                            if( zoneList[i].seatNum === Number(tempArr[3]) ){
                                console.log(zoneList[i]);

                                if(zoneList[i].uid){
                                    return window.alert(
                                        `${tempArr} 자리가 이미 예약되어있습니다. 다시 시도해주세요.`
                                    )
                                }else{
                                    const userData ={
                                        uid:store.userData.token,
                                        tel:store.userData.phoneNumber,
                                        host:hostName,
                                        guest:guestName,
                                        seatNum:zoneList[i].seatNum
                                    };

                                    firebase.database()
                                        .ref(`seats/${tempArr[0]}/${tempArr[1]}/${tempArr[2]}/${i}`)
                                        .set(userData).then(err=> {
                                            if(err){ console.log(err)}else{
                                                console.log("fulfilled")
                                            }
                                        onGetDataList().then(DATA => {
                                            dispatch( setGetDataList(DATA) );
                                            dispatch(setSelectedSeatsData({}))
                                        });

                                    })
                                }
                            }
                        }
                    })
                }
            })

        }else{
            window.alert("잘 생각하셨습니다.")
        }
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