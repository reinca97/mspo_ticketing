import React, { useContext, useEffect,useState } from 'react';
import {Context} from "../../Reducers";
/* global naver */

const Callback = props =>{
    const {store, dispatch} = useContext(Context);
    console.log(1234);
    useEffect( ()=> {


        var naverLogin = new naver.LoginWithNaverId(
            {
                clientId: "Qk1baoGApUsXJYUzkYSf",
                callbackUrl: "http://localhost:4000/#/callback",
                isPopup: true,
                callbackHandle: true
            }
        );

        /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
        naverLogin.init();

        // naverLogin.getLoginStatus(function (status) {
        //     console.log(status);
        //
        //     if (status) {
        //         var email = naverLogin.user.getEmail();
        //         var name = naverLogin.user.getNickName();
        //         var profileImage = naverLogin.user.getProfileImage();
        //         var birthday = naverLogin.user.getBirthday();
        //         var uniqId = naverLogin.user.getId();
        //         var age = naverLogin.user.getAge();
        //         console.log(email,uniqId)
        //
        //     } else {
        //         console.log("AccessToken이 올바르지 않습니다.");
        //     }
        // });
        /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우
        main page로 redirect(또는 Popup close) */
            naverLogin.getLoginStatus(function (status) {
                console.log(status);
                if (status) {
                    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
                    var email = naverLogin.user.getEmail();
                    if( email == undefined || email == null) {
                        alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                        /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
                        naverLogin.reprompt();

                    }


                } else {
                    console.log("callback 처리에 실패하였습니다.");
                }
            });

    },[]);

    return(
        <div style={{backgroundColor:"pink"}}>
            callback page
            <h1>
                12345567890987654321
            </h1>
        </div>
    )
};

export default Callback;