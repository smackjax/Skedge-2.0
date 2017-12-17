import React from 'react';
import PropTypes from 'prop-types';
import {plus} from '../../_icons';
import './add-new-item-btn.style.css';

const AddNewItemBtn = (props)=>{
    return (
        <button 
        className={"add-new-item-btn " + (props.className || "")}
        onClick={props.onClick}>
            {plus}
        </button>
    )
}
AddNewItemBtn.propTypes={
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default AddNewItemBtn;