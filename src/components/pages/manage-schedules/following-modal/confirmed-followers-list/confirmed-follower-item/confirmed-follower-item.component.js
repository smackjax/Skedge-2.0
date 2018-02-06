import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../../../generic-components';
import './confirmed-follower-item.style.css';

const ConfirmedFollowerItem = (props)=>{
    const deleteFollower=()=>{
        props.handleDelete(props.id);
    }
    
    return (
        <div 
        className="confirmed-follower-item"
        >
            <button
            onClick={deleteFollower}
            className={"action-btn " +
                ( props.selected ? 
                    "bg-danger text-light" :
                    "text-danger text-light" )
            }
            >
                { icons.trash }
            </button>
            
            <span
            className="confirmed-follower-name "
            >
                {props.name}
            </span>
            
            <span
            className="text-member"
            >
                { icons.member }
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