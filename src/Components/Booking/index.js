import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import {Redirect} from "react-router-dom";
import "./style.scss";
import Zone from "../Zone";
import Modal_Booking from "../Modal/Modal_Booking";
import {onGetDataList} from "../../lib/getHallData";
import {setGetDataList} from "../../Actions";



const Booking = props =>{
    const {store, dispatch} = useContext(Context);
    const [floor, setFloor] = useState("ground");
    const [isDisplayModal, setIsDisplayModal] = useState("");

    useEffect(()=>{
        onGetDataList().then( data =>{
            dispatch( setGetDataList(data) );
        });
        if(!store.userData.uid){
           return <Redirect to="/"/>
        }
    },[]);



    const onDisplayBookingModal = () =>{
       window.alert("예약 가능한 기간이 아닙니다.")
    };



    return(
        <div className="background-gradation">
            <Modal_Booking
                isDisplayModal={isDisplayModal}
                setIsDisplayModal={setIsDisplayModal}/>
            <div className="booking ">
                <div >
                    <div className="info">
                        <h2>좌석 예매하기</h2>
                        <h3>  - 온라인 예매가 종료되었습니다 - </h3>
                        <h3> [나의 예약 현황] 에서 예매 내역의 확인만 가능합니다.</h3>
                        <span>
                            좌석을 선택 한 후 예약 버튼을 누르세요. (1인당 최대 10석 가능)
                        </span>
                        <select name="floor"
                                value={floor}
                                onChange={ev=>{setFloor(ev.target.value)}}>
                            <option value="ground">1층</option>
                            <option value="loop" disabled={true}>2층</option>
                        </select>
                        <span>
                          ( 현재 1층 좌석만 예매 가능합니다. )
                        </span>
                    </div>
                </div>

                {floor==="ground" &&
                    <div className="ground">
                        <div className="stage">
                            S T A G E
                        </div>

                        <section className="column-text">
                            <div>가 열</div>
                            <div>나 열</div>
                            <div>다 열</div>
                        </section>

                        <section>
                            <Zone floor="ground" block="GA" FRBK="FR" key="1"/>
                            <Zone floor="ground" block="NA" FRBK="FR" key="2"/>
                            <Zone floor="ground" block="DA" FRBK="FR" key="3"/>
                        </section>

                        <div className="aisle">
                            통 행 로
                        </div>

                        <section>
                            <Zone floor="ground" block="GA" FRBK="BK" key="4"/>
                            <Zone floor="ground" block="NA" FRBK="BK" key="5"/>
                            <Zone floor="ground" block="DA" FRBK="BK" key="6"/>
                        </section>
                    </div>
                }

                {floor==="loop"&&
                    <div className="loop">
                        <div className="stage">
                            S T A G E
                        </div>
                        <section className="column-text">
                            <div>가 열</div>
                            <div>나 열</div>
                            <div>다 열</div>
                           <div>라 열</div>
                        </section>
                        <section>
                            <Zone floor="loop" block="GA" FRBK="FR" key="7"/>
                            <Zone floor="loop" block="NA" FRBK="FR" key="8"/>
                            <Zone floor="loop" block="DA" FRBK="FR" key="9"/>
                            <Zone floor="loop" block="LA" FRBK="FR" key="10"/>
                        </section>

                        <div className="aisle">
                            통 행 로
                        </div>

                        <section>
                            <Zone floor="loop" block="GA" FRBK="BK" key="11"/>
                            <Zone floor="loop" block="NA" FRBK="BK" key="12"/>
                            <Zone floor="loop" block="DA" FRBK="BK" key="13"/>
                            <Zone floor="loop" block="LA" FRBK="BK" key="14"/>
                        </section>
                    </div>
                }

                <div className="btn-wrapper">
                    <button className="custom-btn"
                        onClick={()=>onDisplayBookingModal()}>
                        예약
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Booking;
