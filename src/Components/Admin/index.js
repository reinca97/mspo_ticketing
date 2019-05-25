import React, { useContext, useState, useEffect } from 'react';
import {Context} from "../../Reducers";
import "./style.scss";
import {
    getUserData,
    getSeatData
} from "../../lib/getHallData";
import {
    seatNameTranslator,
    telNumTranslator
} from "../../lib/util"
import TotalList from "./TotalList";
import ZoneList from "./ZoneList";
import exportFromJSON from 'export-from-json'



const Admin = props =>{
    const {store, dispatch} = useContext(Context);
    const [totalUserList, setTotalUserList] = useState([]);
    const [totalSeatList, setTotalSeatList] = useState({
        groundGA:[],
        groundNA:[],
        groundDA:[],
        loopGA:[],
        loopNA:[],
        loopDA:[],
        loopLA:[]
    });
    const [hide, setHide] = useState(true);
    const [warning,setWarning] = useState("");
    const [mode, setMode] = useState("");
    const [password, setPassword] = useState("");



    useEffect( ()=>{
        getUserData(`${store.userData.uid}_checkAuth`).then(result=> {
            if(result){
                getUserData("").then(result=>{
                    let tempList = [];
                    Object.keys(result).forEach(key =>{
                        if(key.indexOf("checkAuth")===-1){
                            tempList = [...tempList, ...result[key] ];
                        }
                    });
                    setTotalUserList(tempList);
                })
            }else{
                setWarning("관리자만 접근할 수 있습니다.")
            }
        });

        getSeatData("").then( result =>{
            const groundGA = [...result.ground.GA.FR,...result.ground.GA.BK];
            const groundNA = [...result.ground.NA.FR,...result.ground.NA.BK];
            const groundDA = [...result.ground.DA.FR,...result.ground.DA.BK];
            const loopGA = [...result.loop.GA.FR,...result.loop.GA.BK];
            const loopNA = [...result.loop.NA.FR,...result.loop.NA.BK];
            const loopDA = [...result.loop.DA.FR,...result.loop.DA.BK];
            const loopLA = [...result.loop.LA.FR,...result.loop.LA.BK];

            setTotalSeatList({
                groundGA:groundGA,
                groundNA:groundNA,
                groundDA:groundDA,
                loopGA:loopGA,
                loopNA:loopNA,
                loopDA:loopDA,
                loopLA:loopLA
            });
        })
    },[]);

    const adminLogin = () =>{
        (password==="1234")&&setHide(false);
    };

    const onDownloadBookingList = () =>{
        if(!totalUserList.length){
            return window.alert("예약 내역이 없습니다.")
        }
        let result= [];
        totalUserList.forEach( data =>{
            const userData = {
                guest:data.guest,
                host:data.host,
                tel:telNumTranslator(data.tel),
            };
            data.seats.forEach( seat =>{
                result.push({
                    ...userData,
                    seat : seatNameTranslator(seat)
                })
            })
        });

        const data = result;
        const fileName = 'BookingList';
        const exportType = 'xls';

        exportFromJSON({ data, fileName, exportType })
    };



    return(
        <section className="admin background-gradation" >
            {
                hide &&
                <div className="admin-login btn-wrapper">
                    <input type="text"
                           onChange={ev=>setPassword(ev.target.value)}
                           placeholder="관리자용 비밀번호 입력"/>
                    <button className="custom-btn go-on"
                        onClick={()=>adminLogin()}>관리자로 로그인</button>
                </div>
            }

            {hide? (
                <h4>로그인 후 사용 가능합니다.</h4>
            ):(
                <div>
                    {warning? (
                        <h2>{warning}</h2>
                    ):(
                        <div>
                            <h2>예매 목록</h2>
                            <h4> 보기 모드를 선택하세요 </h4>
                            <div className="btn-wrapper">
                                <button className="custom-btn go-on"
                                        onClick={()=>setMode("show-all")}>
                                        건별 보기
                                </button>
                                <button className="custom-btn go-on"
                                        onClick={()=>setMode("filter-by-zone")}
                                >
                                    구역 별 보기
                                </button>
                                <button className="custom-btn admit"
                                        onClick={()=>onDownloadBookingList()}
                                >
                                    엑셀 다운로드
                                </button>

                            </div>
                            {mode==="show-all"&&
                                <TotalList totalUserList={totalUserList}/>}
                            {mode==="filter-by-zone" &&
                                <ZoneList totalSeatList={totalSeatList}/>}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
};

export default Admin;
