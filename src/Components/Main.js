import React, { useContext } from 'react';
import {Context} from "../Reducers";
import {testAction} from '../Actions'
import "./Main.scss";
import Zone from "./Zone";


const Main = props =>{
    const {store, dispatch} = useContext(Context);


    return(
        <div className="main">

            <div className="ground">
                <section>
                    <Zone floor="ground" block="GA" FRBK="FR" key="1"/>
                    <Zone floor="ground" block="NA" FRBK="FR" key="2"/>
                    <Zone floor="ground" block="DA" FRBK="FR" key="3"/>
                </section>

                <section>
                    <Zone floor="ground" block="GA" FRBK="BK" key="4"/>
                    <Zone floor="ground" block="NA" FRBK="BK" key="5"/>
                    <Zone floor="ground" block="DA" FRBK="BK" key="6"/>
                </section>
            </div>


            <div className="loop">
                <section>
                    <Zone floor="loop" block="GA" FRBK="FR" key="7"/>
                    <Zone floor="loop" block="NA" FRBK="FR" key="8"/>
                    <Zone floor="loop" block="DA" FRBK="FR" key="9"/>
                    <Zone floor="loop" block="LA" FRBK="FR" key="10"/>
                </section>

                <section>
                    <Zone floor="loop" block="GA" FRBK="BK" key="11"/>
                    <Zone floor="loop" block="NA" FRBK="BK" key="12"/>
                    <Zone floor="loop" block="DA" FRBK="BK" key="13"/>
                    <Zone floor="loop" block="LA" FRBK="BK" key="14"/>
                </section>
            </div>


        </div>
    )
};

export default Main;