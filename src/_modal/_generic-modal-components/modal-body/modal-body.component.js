import React from 'react';
import './modal-body.style.css';

export default (props)=>{
    return (
        <div className="modal-body">
            {props.children}
        </div>
    )
}