import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../generic-components';
const NewScheduleBtn = (props)=>{
    return (
        <button
        style={{
            display: "block",
            margin: "15px auto",
            padding: "10px"
        }}
        className="action-btn bg-sched text-light"
        onClick={props.onClick}
        >
            Create New {icons.plus} 
        </button>
    )
}

NewScheduleBtn.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default NewScheduleBtn;