import React from 'react';
import PropTypes from 'prop-types';
import ConfirmedFollower from './confirmed-follower-item/confirmed-follower-item.component';
import { icons } from '../../../generic-components';
import './confirmed-followers-list.style.css';

const ConfirmedFollowersList = (props)=>{
    return (
        <div 
        className="confirmed-followers-wrapper">
            <h4
            className="text-member"
            >
                {icons.member} Confirmed
            </h4>
            
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

ConfirmedFollowersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    handleDelete: PropTypes.func.isRequired
}

export default ConfirmedFollowersList;