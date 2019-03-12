import React, { useContext } from 'react';
import {Context} from "../Reducers";
import {testAction} from '../Actions'
import "./Nav.scss"


const Nav = props =>{
    const {store, dispatch} = useContext(Context);

    return(
        <div className="Nav">
            <button onClick={ () => dispatch( testAction(store.arr) ) }>
                Press BUTTON and see what happen in your console.
            </button>
        </div>
    )
};

export default Nav;