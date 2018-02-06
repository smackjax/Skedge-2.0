import React from 'react';
import PropTypes from 'prop-types';
import {icons} from '../../../generic-components';

const ScheduleControls = (props)=>{
    return (
        <div
        style={{
            transition: "left 200ms ",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",

            position: "absolute",
            top: "0px",
            left: props.open ? "0%" : "100%",
            width: "100%",
            height: "100%",
                backgroundColor: "rgba(200,200,200,.8)"
        }}
        className="schedule-controls-wrapper"
        >


            <button
            style={{
                width: "20%",
                margin: "3px 10px"
            }}
            onClick={props.handleDelete}
            className="action-btn bg-danger text-light delete-schedule-btn"
            >
                {icons.trash}
            </button>

            <button
            style={{
                width: "20%",
                margin: "3px 10px"
            }}
            onClick={props.handleFollowers}
            className="action-btn bg-member text-light manage-followers-btn "
            >
                {props.hasPending ? (
                    <span
                    className="text-sched"
                    >
                        icons.exclamation
                        &nbsp;
                    </span>
                ) : ""}

                {icons.member}
            </button>

            <button
            style={{
                width: "15%",
                borderRadius: "0px",
                marginLeft: "15px"
            }}
            onClick={props.closeControls}
            className="close-schedule-controls"
            >
                {icons.chevRight}
            </button>

        </div>
    )
}

ScheduleControls.propTypes={
    hasPending: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    closeControls: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleFollowers: PropTypes.func.isRequired
}

export default ScheduleControls;