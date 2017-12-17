import React from 'react';
import './select-data-list-card-block.style.css';

const SelectDataListCardBlock = (props)=>{
    return(
        <div
        className="select-data-list-card-block"
        >
            {props.children}
        </div>
    )
}

export default SelectDataListCardBlock;