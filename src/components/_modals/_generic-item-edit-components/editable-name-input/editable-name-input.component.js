import React from 'react';
import './editable-name-input.style.css';

export default ({className, ...rest})=>{
    const argClassName = className || "";
    return(
        <input
        type="text"
        className={"editable-name-input " + argClassName}
        {...rest}/>
    )
}