import React from 'react';
import './slide-group.style.css';
export default (props)=>{
    return (
    <div className="slide-group-wrapper">
        {props.children}
    </div>
    )
}