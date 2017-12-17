import React from 'react';
import PropTypes from 'prop-types';
import {pencil} from '../../_icons';
import './edit-item-btn.style.css';


const EditItemBtn = (props)=>{
    return (
        <button
        className={"edit-item-btn " + (props.className || "")}
        onClick={props.onClick}
        >
            {pencil}
            <span>edit</span>
        </button>
    )
}
EditItemBtn.propTypes={
    onClick: PropTypes.func.isRequired
}
export default EditItemBtn;