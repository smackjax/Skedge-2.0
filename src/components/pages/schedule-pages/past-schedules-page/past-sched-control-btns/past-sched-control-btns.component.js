import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '../../icons';
import './past-sched-control-btns.style.css';

const PastSchedControlBtns = (props)=>{
    const schedId = props.id;
    const makeActive=()=>{
        props.makeActive(schedId);
    }

    return(
        <div className="past-sched-btns-wrapper">
            <button
            className="text-sched border-sched">
                {icons.activeSched} Make Active
            </button>

            <button
            className="view-sched-btn bg-sched"
            onClick={makeActive}
            >
                {icons.eye} View
            </button>
        </div>
    )
}

PastSchedControlBtns.propTypes={
    id: PropTypes.string.isRequired,
    makeActive: PropTypes.func.isRequired,
    viewSched: PropTypes.func.isRequired

}

export default PastSchedControlBtns;