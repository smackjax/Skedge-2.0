import React from 'react';
import PropTypes from 'prop-types';
import './bulk-btn.style.css';
const BulkBtn = (props)=>{
    return(
        <button
        onClick={props.onClick}
        className={"bulk-selected-btn "+ (props.className || "")}
        >
            {props.children}
        </button>
    )
}
BulkBtn.propTypes={
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
}
export default BulkBtn;