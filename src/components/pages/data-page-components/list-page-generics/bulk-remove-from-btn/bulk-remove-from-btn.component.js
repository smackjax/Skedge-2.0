import React from 'react';
import PropTypes from 'prop-types';
import {BulkBtn} from '../index';
const BulkRemoveFromBtn = (props)=>{
    return (
        <BulkBtn
        disabled={props.disabled}
        className={"add-to-btn " + props.className }
        onClick={props.onClick}>
            {props.children}
        </BulkBtn>
    )
}
BulkRemoveFromBtn.propTypes={
    disabled: PropTypes.bool,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default BulkRemoveFromBtn;
