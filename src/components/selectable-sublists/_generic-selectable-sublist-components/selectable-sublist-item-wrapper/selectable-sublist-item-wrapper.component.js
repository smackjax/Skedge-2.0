import React from 'react';
import './selectable-sublist-item-wrapper.style.css';

const SelectableSublist = (props)=>{
    const className =
        "selectable-sublist-items-wrapper " + 
            (props.className || "");
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default SelectableSublist;