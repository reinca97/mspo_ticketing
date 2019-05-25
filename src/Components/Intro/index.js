import React from 'react';
import "./style.scss"
import poster from "../../Images/main_poster.png";



const Intro = props =>{


    return (
        <div className="intro">
            <div className="background-gradation">
                <img src={poster} alt="temp-poster"/>

                <h4>찾아오시는 길</h4>
               <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12666.816026847018!2d126.944822!3d37.46771!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb33d91bc5212efbb!2z6rSA7JWF66y47ZmU6rSA64-E7ISc6rSA!5e0!3m2!1sko!2skr!4v1558420715799!5m2!1sko!2skr"
                />

            </div>
        </div>
    )
};

export default Intro;
