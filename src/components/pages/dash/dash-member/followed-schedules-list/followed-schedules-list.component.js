import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { objToArr } from '../../../functions';
import FollowedScheduleItem from './followed-schedule-item/followed-schedule-item.component';
import './followed-schedules-list.style.css';


const FollowedSchedulesList = (props)=>{
    const schedulesArray = objToArr(props.followedSchedules);

    if(!schedulesArray.length){
        return (
            <div
            style={{
                width: "98%",

                maxWidth: "350px",
                margin: "20px auto",
                padding: "15px",
                borderWidth: "1px",
                borderStyle: "solid",
                textAlign: "center"
            }}
            className="border-sched text-sched"
            >
                <h4>No schedules to show</h4>

                {!props.isConnected ? (
                    <div
                    style={{
                        marginTop: "15px",
                        fontSize: "16px"
                    }}
                    >
                        If there should be, please go online
                    </div>
                ) : ""}
            </div>
        )
    }

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
    followedSchedules: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired
}

export default connect((store)=>({  
    followedSchedules: store.followedSchedules,
    isConnected: store.meta.connectedToInternet
}))( 
    FollowedSchedulesList 
);