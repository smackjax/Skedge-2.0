import React from 'react';
import PropTypes from 'prop-types';
import {check, times} from '../../../_icons';
import './modal-footer-btns.style.css';

const ModalFooterBtns= (props)=>{
    return (
        <div
        className="modal-footer-btns-wrapper"
        >
            <button
            className="cancel-item-btn"
            onClick={props.handleCancel}
            >
                {times} Cancel
            </button>
            <button
            onClick={props.handleSave}
            className={"save-item-btn " + (props.bgClassName || "")}
            >
                {check}  Save
            </button>

        </div>
    )
}
ModalFooterBtns.propTypes={
    bgClassName: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
}

export default ModalFooterBtns;