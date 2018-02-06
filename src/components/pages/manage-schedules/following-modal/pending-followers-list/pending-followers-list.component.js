import React from 'react';
import PropTypes from 'prop-types';
import PendingFollower from './pending-follower/pending-follower.component';
import './pending-followers-list.style.css';

const PendingFollowersList = (props)=>{

    return (
        <div 
        className="pending-followers-wrapper">
            <h4>Pending</h4>
            { props.users.map(
                item=>{
                    return (
                        <PendingFollower 
                        key={"p-" + item.id}
                        id={item.id}
                        name={item.name}
                        handleAuthorize={props.handleAuthorize}
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
    handleAuthorize: PropTypes.func.isRequired,
}

export default PendingFollowersList;