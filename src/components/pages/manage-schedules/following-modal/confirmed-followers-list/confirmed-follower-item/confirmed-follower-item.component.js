import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../../../generic-components';
import './confirmed-follower-item.style.css';

const ConfirmedFollowerItem = (props)=>{
    const deleteFollower=()=>{
        props.handleDelete(props.id);
    }

    const deleteBtnClass = "action-btn bg-danger text-light";
    
    return (
        <div 
        className="confirmed-follower-item"
        >
            <button
            onClick={deleteFollower}
            className={`${deleteBtnClass} delete-confirmed-follower-btn`}
            >
                { icons.trash }
            </button>
            
            <span
            className="confirmed-follower-name "
            >
                {props.name}
            </span>
        </div>
    )
}

ConfirmedFollowerItem.propTypes={
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default ConfirmedFollowerItem;