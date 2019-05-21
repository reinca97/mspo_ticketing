import React,{useEffect, useRef} from 'react';
import "./style.scss"
import sticker from "../../Images/sticker.svg";



const Intro = props =>{



    return (
        <div className="intro">
            <div className="background-gradation">
                <img src={sticker} alt="temp-poster"/>

                <div className="concert-info">
                    <h3>MS 필하모닉오케스트라 제10회 정기연주회</h3>
                    <h4>
                        2019년 6월 15일 토요일 오후 6시 30분
                        <span>관악문화관</span>
                    </h4>
                </div>

                <div className="program-list">
                    <h5> - 프로그램 -</h5>
                    <ul>
                        <li> <b>생상</b> | 바이올린 협주곡 3번 3악장</li>
                        <li> <b>보케리니</b> | 첼로 협주곡 9번 G482 1악장</li>
                        <li> <b>모차르트</b> | 신포니아 콘체르탄테 K.364 3악장</li>
                        <li> <b>하이든</b> | 첼로 협주곡 1번 1악장</li>
                        <li> <b>드보르작</b> | 교향곡 8번</li>
                    </ul>
                </div>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12666.816026847018!2d126.944822!3d37.46771!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb33d91bc5212efbb!2z6rSA7JWF66y47ZmU6rSA64-E7ISc6rSA!5e0!3m2!1sko!2skr!4v1558420715799!5m2!1sko!2skr"
                />

            </div>
        </div>
    )
};

export default Intro;
