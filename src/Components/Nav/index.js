import React, { useContext, useState } from 'react';
import {Context} from "../../Reducers";
import {  NavLink } from "react-router-dom";
import "./style.scss"
import firebase from "firebase";

import {setUserData,onSetIsLogin} from "../../Actions";

const Nav = props =>{
    const {store, dispatch} = useContext(Context);

    const signOut =() =>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            dispatch(setUserData({
                token:"",
                phoneNumber:""
            }));
           dispatch(onSetIsLogin(false));
            window.alert("정상적으로 로그아웃 되었습니다.");
        }).catch(function(error) {
            // An error happened.
            console.log(error);
            window.alert("로그아웃에 실패하였습니다. 새로 고침 후 재시도 해주세요.")
        });
    };

    return(
        <div className="Nav">
            <ul>
                <li>
                    <NavLink to="/">
                        처음으로
                    </NavLink>
                </li>
                {
                    store.isLogin &&
                    <li>
                        <NavLink to="/booking" activeClassName="selected">
                            좌석 예매하기
                        </NavLink>
                    </li>
                }
                {
                    store.isLogin &&
                    <li>
                        <NavLink to="/my-reservation" activeClassName="selected">
                            나의 예약 현황
                        </NavLink>
                    </li>
                }
                {
                    store.isLogin?
                        (
                            <li onClick={()=>signOut()}>
                                <NavLink to ="/">
                                    로그아웃
                                </NavLink>
                            </li>
                        ):(
                            <li>
                                <NavLink to="/sign-in" activeClassName="selected">
                                    로그인
                                </NavLink>
                            </li>
                        )
                }
                <li>
                    <NavLink to="/admin" activeClassName="selected">
                        관리자 페이지
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};

export default Nav;