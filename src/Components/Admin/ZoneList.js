import React, { useContext, useState, useEffect } from 'react';
import "./style.scss";
import {telNumTranslator} from "../../lib/util";


const ZoneList = props =>{
    const [currentList, setCurrentList] = useState([]);


    return(
        <div className="zone-list">
            <select onChange={ev =>{
                console.log(props.totalSeatList[ev.target.value]);
                setCurrentList(props.totalSeatList[ev.target.value])
            }}>
                <option value=""> 구역을 선택하세요 </option>
                <option value="groundGA">1층 가열</option>
                <option value="groundNA">1층 나열</option>
                <option value="groundDA">1층 다열</option>
                <option value="loopGA">2층 가열</option>
                <option value="loopNA">2층 나열</option>
                <option value="loopDA">2층 다열</option>
                <option value="loopLA">2층 라열</option>
            </select>

            <ul>
                {currentList.map( (seat,index) =>
                    (seat.guestName!=="no-one" && seat.uid!=="") &&
                    <li key={index}>
                        <div> ▷ {seat.seatNum}번 좌석</div>
                        <div> ▷ 초대자: {seat.guest}</div>
                        <div> ▷ 손님: {seat.host}</div>
                        <div> ▷ 예약 일시: {seat.date}</div>
                        <div> ▷ 연락처 : {telNumTranslator(seat.tel)}</div>
                    </li>
                )}
            </ul>
        </div>
    )

};

export default ZoneList;
