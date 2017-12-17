import React from 'react';
import './editable-name-input.style.css';

export default ({className, ...rest})=>{
    const argClassName = className || "";
    return(
        <label 
        htmlFor="editItemName"
        className="editable-name-wrapper">
            <i className="fa fa-pencil"></i>
            <input
            type="text"
            id="editItemName"
            className={argClassName}
            {...rest}/>
        </label>
    )
}