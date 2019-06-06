import React, { useContext, useState, useEffect } from 'react';
import {Context} from "../../Reducers";
import {Redirect} from "react-router-dom";
import "./style.scss";
import {
    getUserData,
    getSeatData,
    setSeatData,
    setUserData
} from "../../lib/getHallData";
import {seatNameTranslator} from "../../lib/util"


const MyPage = props =>{
    const {store, dispatch} = useContext(Context);
    const [userDataList, setUserDataList] = useState([{
        host:"", guest:"",seats:[]
    }]);

    useEffect( ()=>{
        getUserData(store.userData.uid).then(
            result=>
                setUserDataList(result)
        );
    },[]);

    const onDeleteBooking = index =>{
        const warning = "좌석별 취소는 불가하며, 현재 선택된 예약이 삭제됩니다. 계속 하시겠습니까?";
        if(window.confirm(warning)){
            // set 'user/[uid]' path
            let currentUserDataList = [...userDataList];
            currentUserDataList.splice(index,1);

            setUserData(store.userData.uid, currentUserDataList)
                .then( resolve =>
                err=> console.log(err)
                );

            // set each 'seats/[selected seat]' path
            const selectedBooking= userDataList[index];
            selectedBooking.seats.map( async seat =>{
                const seatDataArr = seat.split("_");
                const seatPath = `/${seatDataArr[0]}/${seatDataArr[1]}/${seatDataArr[2]}`;
                const fbSeatData = await getSeatData(seatPath);

                for(let i=0; i<fbSeatData.length; i++){
                    if(Number(seatDataArr[3])===fbSeatData[i].seatNum){
                        const emptySeatData = {
                            date:"",
                            hostName:"",
                            guestName:"",
                            seatNum: fbSeatData[i].seatNum,
                            uid:""
                        };

                    setSeatData(`${seatPath}/${i}`,emptySeatData)
                        .then(resolve =>console.log(""),
                                err=>console.log(err) );
                        break;
                    }
                }
            });


            window.alert("삭제되었습니다.");
            getUserData(store.userData.uid).then(
                result=>
                    setUserDataList(result)
            );

        }else{
            window.alert("삭제 취소 되었습니다.")
        }
    };

    return(
        <section className="my-page background-gradation" >
            {
                store.isLogin? (
                    <div>
                        <h2>나의 예약 현황</h2>
                        {
                            userDataList? (
                                <ul>
                                    {userDataList.map( (data,index) =>
                                        <li key={index} className="btn-wrapper" >
                                            <div className="guest-info">
                                                <p> 초대하시는 분: {data.host}</p>
                                                <p> 손님 성함 : {data.guest}</p>
                                                <button className="custom-btn warning"
                                                        onClick={()=>onDeleteBooking(index)}>
                                                    예약 취소
                                                </button>
                                            </div>

                                            <div className= "seat-num">
                                                <p> - 예매 좌석 ( 총 {data.seats.length} 석 ) -</p>
                                                {data.seats.map((seat,index) =>
                                                    <div key={`seat-${index}`}>
                                                        ({index+1}) {seatNameTranslator(seat)}
                                                    </div>
                                                )}
                                            </div>


                                        </li>
                                    )}
                                </ul>
                            ):(
                                store.isLogin? (
                                    <div>
                                        - 예약 내역이 없습니다 -
                                    </div>
                                ):(
                                    <div>
                                        - 로그인 후에 확인할 수 있습니다 -
                                    </div>
                                )

                            )
                        }
                    </div>
                ):(
                    <Redirect to ="/sign-in" />
                )
            }


        </section>
    )

};

export default MyPage;
