import React, { useContext } from 'react';
import {Context} from "../../Reducers";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./style.scss"

const Nav = props =>{
    const {store, dispatch} = useContext(Context);

    return(
        <div className="Nav">
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/booking">좌석 예매하기</Link>
                </li>
                <li>
                    <Link to="/my-reservation">내 자리 확인하기</Link>
                </li>
                <li>
                    <Link to="/admin">ADMIN</Link>
                </li>
            </ul>
        </div>
    )
};

export default Nav;