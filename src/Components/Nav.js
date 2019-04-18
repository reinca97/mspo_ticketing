import React, { useContext } from 'react';
import {Context} from "../Reducers";
import {testAction} from '../Actions'
import "./Nav.scss"


const Nav = props =>{
    const {store, dispatch} = useContext(Context);

    return(
        <div className="Nav">
        </div>
    )
};

export default Nav;