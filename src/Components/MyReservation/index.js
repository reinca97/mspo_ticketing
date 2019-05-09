import React, { useContext, useState, useEffect } from 'react';
import {Redirect} from "react-router-dom";
import {Context} from "../../Reducers";
import "./style.scss";
import firebase from '../../lib/firebase';
import {
    getUserData,
    setUserData
} from "../../lib/getHallData";
import {seatNameTranslator} from "../../lib/util"

const database = firebase.database();




const MyPage = props =>{
    const {store, dispatch} = useContext(Context);
    const [userDataList, setUserDataList] = useState();

    useEffect( ()=>{
        getUserData(store.userData.uid).then(
            result=>
                setUserDataList(result)
        );
    },[]);

    const onDeleteBooking = index =>{

        const warning = "좌석별 취소는 불가하며 현재 선택된 예약이 취소됩니다. 계속 하시겠습니까?";
        if(window.confirm(warning)){
            window.alert("아직 안만들었지롱")
        }else{
            window.alert("취소 되었습니다.")
        }
    };

    return(
        <section className="my-page background-gradation" >
            <div>
                <h2>나의 예약 현황</h2>
                {
                    userDataList? (
                        <ul>
                            {userDataList.map( (data,index) =>
                                <li key={index} className="btn-wrapper" >
                                    <h5>▷ 초대하시는 분: {data.host}</h5>
                                    <h5>▷ 손님 성함 : {data.guest}</h5>
                                    <h5>▷ 예매한 좌석
                                        (총 {data.seats.length}석)
                                    </h5>
                                    <div className= "seat-num">
                                        {data.seats.map((seat,index) =>
                                            <div key={`seat-${index}`}>
                                                {index+1}) {seatNameTranslator(seat)}
                                            </div>
                                        )}
                                    </div>
                                    <button className="custom-btn warning"
                                            onClick={()=>onDeleteBooking(data)}>
                                        예약 취소
                                    </button>

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

        </section>
    )

};

export default MyPage;
