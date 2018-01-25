import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../generic-components';
const ScheduleItem = (props)=>{
    const changeSchedule=()=>{
        props.handleChangeSchedule(props.id);
    }
    
    return (
        <div
        style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: "400px",
            margin: "10px auto",
        }}
        className="action-btn schedule-item"
        >
            <button
            onClick={changeSchedule}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                padding: "10px",
                borderRadius: "0"
            }}
            className="bg-sched text-light"
            >        
                <span>
                    { icons.sched }
                </span>

                <span 
                style={{
                    marginLeft: "15px"
                }}
                >
                    {props.name}
                </span>
                
                <span 
                style={{
                    marginLeft: "auto",
                    marginRight: "5px",
                    fontSize: "25px"
                }}
                >
                    {icons.chevRight}
                </span>
            </button>
            <button
            style={{
                width: "15%"
            }}
            > 
                { icons.cog }
            </button>
        </div>
    )
}

ScheduleItem.propTypes={
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleChangeSchedule: PropTypes.func.isRequired
}

export default ScheduleItem;