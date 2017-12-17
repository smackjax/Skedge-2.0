import React from 'react';
import './list-controls-wrapper.style.css';

const ListControlsWrapper = (props)=>{
    return(
        <div className="list-footer-controls">
            {props.children}
        </div>
    )

}

export default ListControlsWrapper;