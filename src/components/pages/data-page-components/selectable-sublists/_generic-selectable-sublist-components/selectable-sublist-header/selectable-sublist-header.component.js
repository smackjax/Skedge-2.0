import React from 'react';
import './selectable-sublist-header.style.css';
const SelectableSublistHeader = (props)=>{
    const className =
        "selectable-sublist-header " + 
            (props.className || "");
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default SelectableSublistHeader;