import React, { useContext } from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import Zone from "../Zone";


const Booking = props =>{
    const {store, dispatch} = useContext(Context);

    const onRegisterSeatList = () =>{
        const count = store.selectedSeatsList.length;
        if(window.confirm(`총 ${count}좌석을 예약 하시겠습니까?`)){
            window.alert("---현재는 예약 가능한 기간이 아닙니다----")
        }else{
            window.alert("잘 생각하셨습니다.")
        }
    };

    return(
        <div className="main">
            <div>
                <span>좌석을 선택 한 후 예약 버튼을 누르세요. (1인당 최대 10석 가능)</span>
                <button onClick={()=>onRegisterSeatList()}>
                    선택한 좌석 예약
                </button>
            </div>


            <div className="ground">
                <section>
                    <Zone floor="ground" block="GA" FRBK="FR" key="1"/>
                    <Zone floor="ground" block="NA" FRBK="FR" key="2"/>
                    <Zone floor="ground" block="DA" FRBK="FR" key="3"/>
                </section>

                <section>
                    <Zone floor="ground" block="GA" FRBK="BK" key="4"/>
                    <Zone floor="ground" block="NA" FRBK="BK" key="5"/>
                    <Zone floor="ground" block="DA" FRBK="BK" key="6"/>
                </section>
            </div>


            <div className="loop">
                <section>
                    <Zone floor="loop" block="GA" FRBK="FR" key="7"/>
                    <Zone floor="loop" block="NA" FRBK="FR" key="8"/>
                    <Zone floor="loop" block="DA" FRBK="FR" key="9"/>
                    <Zone floor="loop" block="LA" FRBK="FR" key="10"/>
                </section>

                <section>
                    <Zone floor="loop" block="GA" FRBK="BK" key="11"/>
                    <Zone floor="loop" block="NA" FRBK="BK" key="12"/>
                    <Zone floor="loop" block="DA" FRBK="BK" key="13"/>
                    <Zone floor="loop" block="LA" FRBK="BK" key="14"/>
                </section>
            </div>


        </div>
    )
};

export default Booking;