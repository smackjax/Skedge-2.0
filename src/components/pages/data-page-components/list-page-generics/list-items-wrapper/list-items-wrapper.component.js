import React from 'react';
import './list-items-wrapper.style.css';


export default (props)=>{
    return(
        <div className="list-items-wrapper">
            {props.children}
        </div>
    )
}