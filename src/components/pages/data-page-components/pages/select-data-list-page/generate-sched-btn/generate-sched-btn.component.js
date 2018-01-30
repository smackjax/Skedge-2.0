import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '../../../_icons';
import './generate-sched-btn.style.css';


const GenerateSchedBtn = (props)=>{
    return (
        <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={"generate-sched-btn " + (props.disabled ? "" : "bg-day text-light")}
        >
            { props.disabled ? 
            <span>Errors {icons.times} </span> :
            <span>Generate New { icons.plus }</span>
            }
        </button>
    )
}

GenerateSchedBtn.propTypes={
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default GenerateSchedBtn;