import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { objToArr } from '../../../functions';
import FollowedScheduleItem from './followed-schedule-item/followed-schedule-item.component';
import './followed-schedules-list.style.css';


const FollowedSchedulesList = (props)=>{
    const schedulesArray = objToArr(props.followedSchedules);

    return (
        <div className="followed-schedules-list">
            { schedulesArray.map( schedule => (
                <FollowedScheduleItem 
                key={schedule.id}
                scheduleId={schedule.id}
                scheduleName={schedule.name}
                startDate={schedule.data.startDate}
                endDate={schedule.data.endDate}
                />
            ))}
        </div>
    )
}

FollowedSchedulesList.propTypes = {
    followedSchedules: PropTypes.object.isRequired
}

export default connect((store)=>({  
    followedSchedules: store.followedSchedules
}))( 
    FollowedSchedulesList 
);