import React from 'react';
import PropTypes from 'prop-types';
import ConfirmedFollower from './confirmed-follower-item/confirmed-follower-item.component';
import './confirmed-followers-list.style.css';

const PendingFollowersList = (props)=>{
    return (
        <div 
        className="confirmed-followers-wrapper">
            <h4>Confirmed</h4>
            {props.users.map(
                item=>{
                    return (
                        <ConfirmedFollower
                        key={"c-" + item.id}
                        id={item.id}
                        name={item.name}
                        handleDelete={props.handleDelete}
                        />
                    )
                }
            )}
        </div>
    )
}

PendingFollowersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    handleDelete: PropTypes.func.isRequired
}

export default PendingFollowersList;