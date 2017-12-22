import React from 'react';
import './modal-content.style.css';

export default (props)=>{
    return (
        <div className="modal-content">
            {props.children}
        </div>
    )
}