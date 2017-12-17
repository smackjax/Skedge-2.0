import React from 'react';
import './modal-header-badge.style.css';

export default (props)=>{
    
    return (
        <div className={"modal-header-badge " + (props.className || "")}>
            {props.children}
        </div>
    )
}
