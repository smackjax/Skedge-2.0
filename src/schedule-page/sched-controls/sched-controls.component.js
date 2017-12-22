import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../_dropdown/dropdown.component';
import * as icons from '../../_icons/icons';
import './sched-controls.style.css';


const SchedControls = (props)=>{
    return (
        <Dropdown 
        open={!props.dropdownOpen}
        >
            <div className="sched-page-controls-wrapper">
                <button 
                className="border-sched text-sched sched-control">
                    {icons.chevLeft} Old
                </button>
                <button
                onClick={props.handleDropdownToggle}
                className="bg-sched text-light sched-control">
                    {icons.plus} New
                </button>
            </div>
        </Dropdown>
    )
}

SchedControls.propTypes={
    dropdownOpen: PropTypes.bool.isRequired,
    handleDropdownToggle: PropTypes.func.isRequired
}

export default SchedControls;