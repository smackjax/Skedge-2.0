import React from 'react';
import PropTypes from 'prop-types';
import {check, times} from '../../../icons';
import './modal-footer-btns.style.css';

const ModalFooterBtns= (props)=>{
    const handleSave = ()=>{
        // Saves whatever needs to be saved
        props.handleSave();
        // Closes Modal
        props.handleCancel();
    }
    return (
        <div
        className="modal-footer-btns-wrapper"
        >
            <button
            className="cancel-item-btn text-light"
            onClick={props.handleCancel}
            >
                {times} Cancel
            </button>
            <button
            disabled={props.disabled}
            onClick={handleSave}
            className={"save-item-btn text-light " + (props.bgClassName || "")}
            >
                {check}  {props.saveText || "Save"}
            </button>

        </div>
    )
}
ModalFooterBtns.propTypes={
    bgClassName: PropTypes.string.isRequired,
    saveText: PropTypes.string,
    disabled: PropTypes.bool, 
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
}

export default ModalFooterBtns;