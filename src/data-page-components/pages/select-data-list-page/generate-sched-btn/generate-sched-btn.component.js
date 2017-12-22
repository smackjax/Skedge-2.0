import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '../../../_icons';
import './generate-sched-btn.style.css';


const GenerateSchedBtn = (props)=>{
    return (
        <button
        onClick={props.onClick}
        className="generate-sched-btn bg-sched text-light"
        >
        {icons.sched} New schedule
        </button>
    )
}

GenerateSchedBtn.propTypes={
    onClick: PropTypes.func.isRequired
}

export default GenerateSchedBtn;