import React from 'react';
import "./style.scss";
import {seatNameTranslator,telNumTranslator} from "../../lib/util"


const TotalList = props =>{

    return(
        <div className="total-list">
            <ul>
                {props.totalUserList.map( (data,index) =>
                    <li key={index}>
                        <div>
                            ▷ 초대자 :{data.host}
                        </div>
                        <div>
                            ▷ 손님: {data.guest}
                        </div>
                        <div>
                            ▷ 연락처: {telNumTranslator(data.tel)}
                        </div>
                        <div>
                            ▷ 예약일시: {data.date}
                        </div>
                        <br/>
                        <div>
                            <span>
                                ▷ 예약한 좌석 ( 총 {data.seats.length}석 )
                            </span>
                            {data.seats.map( (seat,index) =>
                                    <div className="seat-num" key={`seat-${index}`}>
                                        {seatNameTranslator(seat)}
                                    </div>
                            )}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default TotalList;
