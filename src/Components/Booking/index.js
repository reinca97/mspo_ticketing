import React, { useContext, useState ,useEffect} from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import Zone from "../Zone";
import Modal_Booking from "../Modal/Modal_Booking";

import firebase from "firebase";
import {setUserData, setGetDataList} from "../../Actions";
import { Redirect } from "react-router-dom";



const Booking = props =>{
    const {store, dispatch} = useContext(Context);
    const [floor, setFloor] = useState("ground");
    const [isDisplayModal, setIsDisplayModal] = useState("");

    useEffect(()=>{

    },[]);



    return(
        <div>
            <Modal_Booking
                isDisplayModal={isDisplayModal}
                setIsDisplayModal={setIsDisplayModal}
            />
            <div className="booking">
                {
                    store.userData.token ===""
                    && <Redirect to ="sign-in" />
                }
                <div >
                    <div className="info">
                    <span>
                         좌석을 선택 한 후 예약 버튼을 누르세요. (1인당 최대 10석 가능)
                    </span>
                        <select name="floor"
                                value={floor}
                                onChange={ev=>{setFloor(ev.target.value)}}>
                            <option value="ground">1층</option>
                            <option value="loop">2층</option>
                        </select>
                    </div>

                </div>

                {
                    floor==="ground" &&
                    <div className="ground">
                        <div className="stage">
                            S T A G E
                        </div>

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

                {
                    floor==="loop"&&
                    <div className="loop">
                        <div className="stage">
                            S T A G E
                        </div>

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
                    <button onClick={()=>setIsDisplayModal("show")}>
                        예약
                    </button>
                </div>

            </div>
        </div>

    )
};

export default Booking;