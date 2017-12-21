import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../_dropdown/dropdown.component';
import * as icons from '../../_icons/icons';

const SchedControls = (props)=>{
    return (
        <Dropdown 
        open={!props.dropdownOpen}
        className="sched-page-controls">
            <button 
            className="border-sched text-sched">
                {icons.chevLeft} Old
            </button>
            <button
            onClick={props.handleDropdownToggle}
            className="bg-sched text-light">
                {icons.plus} New
            </button>
        </Dropdown>
    )
}

SchedControls.propTypes={
    dropdownOpen: PropTypes.bool.isRequired,
    handleDropdownToggle: PropTypes.func.isRequired
}

export default SchedControls;