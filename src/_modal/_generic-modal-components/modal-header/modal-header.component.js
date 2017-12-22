import React from 'react';
import PropTypes from 'prop-types';
import './modal-header.style.css';

const ModalContentHeader = (props)=>{

    const className = 
        "modal-header " + 
            props.className;

    return (
        <div className={className}>
            {props.children}          
        </div>
    )
}

ModalContentHeader.propTypes={
    className: PropTypes.string.isRequired
}

export default ModalContentHeader;