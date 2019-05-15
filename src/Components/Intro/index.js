import React from 'react';
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
            </div>
        </div>
    )
};

export default Intro;
