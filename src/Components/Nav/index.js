import React, { useContext, useState } from 'react';
import {Context} from "../../Reducers";
import {  Link, Redirect } from "react-router-dom";
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
                    <Link to="/">처음으로</Link>
                </li>
                {
                    store.isLogin &&
                    <li>
                        <Link to="/booking">좌석 예매하기</Link>
                    </li>
                }
                {
                    store.isLogin &&
                    <li>
                        <Link to="/my-reservation">나의 예약 현황</Link>
                    </li>
                }
                {
                    store.isLogin?
                        (
                            <li onClick={()=>signOut()}>
                                <Link to ="/">
                                    로그아웃
                                </Link>
                            </li>
                        ):(
                            <li>
                                <Link to="/sign-in">로그인</Link>
                            </li>
                        )
                }
                <li>
                    <Link to="/admin">관리자 페이지</Link>
                </li>
            </ul>
        </div>
    )
};

export default Nav;