import React from 'react';
import PropTypes from 'prop-types';
import {BulkBtn} from '../index';
const BulkAddToBtn = (props)=>{
    return (
        <BulkBtn 
        className={"add-to-btn " + props.className }
        onClick={props.onClick}>
            {props.children}
        </BulkBtn>
    )
}
BulkAddToBtn.propTypes={
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default BulkAddToBtn;
