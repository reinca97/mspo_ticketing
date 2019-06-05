import React, { useContext, useState, useEffect } from 'react';
import {Context} from "../../Reducers";
import {Redirect} from "react-router-dom";
import "./style.scss";
import {
    getUserData,

} from "../../lib/getHallData";
import {seatNameTranslator} from "../../lib/util"


const MyPage = props =>{
    const {store} = useContext(Context);
    const [userDataList, setUserDataList] = useState([{
        host:"", guest:"",seats:[]
    }]);

    useEffect( ()=>{
        getUserData(store.userData.uid).then(
            result=>
                setUserDataList(result)
        );
    },[]);


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
                                                <button className="custom-btn"
                                                        onClick={()=>window.alert("취소가 불가능한 기간입니다.")}>
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
