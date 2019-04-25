import React, { useContext } from 'react';
import {Context} from "../../Reducers";
import {  Link, Redirect } from "react-router-dom";
import "./style.scss"
import firebase from "firebase";

import {setUserData} from "../../Actions";

const Nav = props =>{
    const {store, dispatch} = useContext(Context);

    const signOut =() =>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            dispatch(setUserData({
                token:"",
                phoneNumber:""
            }));
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
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/sign-in">좌석 예매하기</Link>
                </li>
                <li>
                    <Link to="/my-reservation">내 자리 확인하기</Link>
                </li>
                <li>
                    <Link to="/admin">ADMIN</Link>
                </li>
                {
                    store.userData.token!=="" &&
                    <li>
                        <button onClick={()=>signOut()}>
                            sign out
                        </button>
                    </li>
                }
            </ul>
        </div>
    )
};

export default Nav;