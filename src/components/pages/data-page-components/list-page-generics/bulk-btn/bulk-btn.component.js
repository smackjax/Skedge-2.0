import React from 'react';
import PropTypes from 'prop-types';
import './bulk-btn.style.css';
const BulkBtn = (props)=>{
    return(
        <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={"bulk-selected-btn "+ (props.className || "")}
        >
            {props.children}
        </button>
    )
}
BulkBtn.propTypes={
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
}
export default BulkBtn;