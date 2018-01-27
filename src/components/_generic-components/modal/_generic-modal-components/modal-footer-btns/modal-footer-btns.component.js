import React from 'react';
import PropTypes from 'prop-types';
import {check, times} from '../../../icons';
import './modal-footer-btns.style.css';

const ModalFooterBtns= (props)=>{

    const handleSave = ()=>{
        // Saves whatever needs to be saved
        if(props.handleSave){
            props.handleSave();
        }
        if(props.handleCancel) {
            // Closes Modal
            props.handleCancel();
        }
    }

    const handleCancel=(e)=>{
        e.preventDefault();
        props.handleCancel();
    }
    return (
        <div
        className="modal-footer-btns-wrapper"
        >
            <button
            type="button"
            className="cancel-item-btn text-light"
            onClick={handleCancel}
            >
                {times} Cancel
            </button>

            <button
            type="submit"
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
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func.isRequired
}

export default ModalFooterBtns;