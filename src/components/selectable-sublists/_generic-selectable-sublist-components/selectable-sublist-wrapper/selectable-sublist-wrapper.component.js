import React from 'react';
import './selectable-sublist-wrapper.style.css';

const SelectableSublistWrapper = (props)=>{
    return (
        <div className="selectable-sublist-wrapper">
            {props.children}
        </div>
    )
}

export default SelectableSublistWrapper;