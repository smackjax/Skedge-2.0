import React from 'react';
import PropTypes from 'prop-types';
import { trash } from '../../../_icons';
import './delete-item-btn.style.css';

const DeleteItemBtn=(props)=>{
    return (
        <button type="button"
        className="delete-item-btn bg-danger text-light"
        onClick={props.onClick}
        >
        {trash} Delete
        </button>
    )
}

DeleteItemBtn.propTypes={
    onClick: PropTypes.func.isRequired
}

export default DeleteItemBtn