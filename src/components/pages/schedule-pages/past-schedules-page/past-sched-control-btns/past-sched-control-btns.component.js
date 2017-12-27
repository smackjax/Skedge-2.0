import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as icons from '../../icons';
import './past-sched-control-btns.style.css';

const PastSchedControlBtns = (props)=>{
    const schedId = props.id;

    const makeActive=()=>{
        props.makeActive(schedId);
        props.history.push('/schedule-dash');
    }

    const handleDelete=()=>{
        props.handleDelete(schedId);
    }

    return(
        <div 
        style={{padding: "10px"}}
        className="past-sched-btns-wrapper">
            <button
            onClick={makeActive}
            className="text-sched border-sched">
                {icons.activeSched} Make Active
            </button>

            <button
            onClick={handleDelete}
            style={{padding: "5px 20px"}}
            className="delete-sched-btn bg-danger text-light"
            >
                {icons.trash} 
            </button>
        </div>
    )
}

PastSchedControlBtns.propTypes={
    id: PropTypes.string.isRequired,
    makeActive: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,

    history: PropTypes.object.isRequired
}

export default withRouter(PastSchedControlBtns);