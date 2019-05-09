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

        console.log(userDataList);

    },[]);


    return(
        <section className="my-page background-gradation" >
            <div>
                <h2>예매 내역 확인</h2>
                {
                    userDataList? (
                        <ul>
                            {userDataList.map( data =>
                                <li>
                                    <div>
                                        <h5>▷ 초대하시는 분: {data.host}</h5>
                                        <h5>▷ 손님 성함 : {data.guest}</h5>
                                    </div>
                                    <div className= "seat-num">
                                        <h5>▷ 예매한 좌석
                                            (총 {data.seats.length}석)
                                        </h5>
                                        {data.seats.map((seat,index) =>
                                            <div>{index+1}) {seatNameTranslator(seat)} </div>
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

        </section>
    )

};

export default MyPage;
