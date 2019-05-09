import React from 'react';
import "./style.scss"
import sticker from "../../Images/sticker.svg";

const Intro = props =>{


    return(
        <div className="intro">
          <div className="background-gradation">

              <img src={sticker} alt="temp-poster"/>
          </div>

        </div>
    )
};

export default Intro;