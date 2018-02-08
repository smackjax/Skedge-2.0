import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../../../generic-components';

import './pending-follower.style.css';

const PendingFollower = (props)=>{   
     
    const authorize=()=>{
        props.handleAuthorize(props.follower)
    }

    return (
        <div
        className="pending-follower-item"
        >            
            <span
            className="pending-follower-name "
            >
                {props.follower.name}
            </span>

            <button
            onClick={authorize}
            className="action-btn bg-sched text-light pending-follower-confirm-btn"
            >
            {icons.check}
            </button>
        </div>
    )
}

PendingFollower.propTypes = {
    follower:PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    handleAuthorize: PropTypes.func.isRequired
}

export default PendingFollower;