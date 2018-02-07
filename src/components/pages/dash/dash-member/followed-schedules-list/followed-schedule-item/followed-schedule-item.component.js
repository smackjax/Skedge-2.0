import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { icons } from '../../../../generic-components';

const FollowedScheduleItem = (props)=>{
    const linkRoute = `/followed-schedule/${props.scheduleId}`
    
    return (
        <Link
        to={linkRoute}
        className="followed-schedule-item"
        >
        
            <div 
            className="icon-wrapper"
            > 
                {icons.sched} 
            </div>

            <div 
            className="meta-wrapper"
            >
                <div className="schedule-name">
                    {props.scheduleName}
                </div>
                
                <div className="from-to-dates">
                    {props.startDate}-{props.endDate}
                </div>
            </div>

            <div className="chev-right-icon">
                {icons.chevRight }
            </div>

        </Link>
    )
    
}

FollowedScheduleItem.propTypes = {
    scheduleId: PropTypes.string.isRequired,
    scheduleName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
}

export default FollowedScheduleItem;