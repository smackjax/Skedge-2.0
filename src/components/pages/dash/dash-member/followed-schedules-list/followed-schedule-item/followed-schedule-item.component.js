import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { icons } from '../../../../generic-components';
import './followed-schedule-item.style.css';

const FollowedScheduleItem = (props)=>{
    const linkRoute = `/followed-schedule/${props.scheduleId}`

    const prettyFormat = "MM/DD/YY"
    const start = moment(props.startDate).format(prettyFormat);
    const end = moment(props.endDate).format(prettyFormat);
    return (
        <Link
        to={linkRoute}
        style={{
            textDecoration: "none"
        }}
        className="action-btn bg-sched text-light followed-schedule-item "
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
                    {start} - {end}
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