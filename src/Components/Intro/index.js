import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
import "./style.scss"

const Intro = props =>{
    const {store, dispatch} = useContext(Context);

    useEffect( ()=> {
    },[]);


    return(
        <div className="intro">
          <div>
              <h1>MSPO</h1>
              <h2>online-ticketing system</h2>
          </div>

        </div>
    )
};

export default Intro;