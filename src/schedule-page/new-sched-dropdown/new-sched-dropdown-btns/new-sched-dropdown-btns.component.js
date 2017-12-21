import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '../../../_icons/icons';
import './new-sched-dropdown-btns.style.css';

const NewSchedDropdownBtns = (props)=>{

    return (
        <div className="new-sched-dropdown-btns-wrapper">
                <button
                className="bg-danger text-light"
                onClick={props.handleCancel}
                >
                    {icons.times} Cancel
                </button>

                <button
                disabled={props.datesInvalid}
                onClick={props.handleGenerate}
                className="bg-sched text-light"
                >
                    {icons.times} Generate
                </button>
        </div>
    )
}

NewSchedDropdownBtns.propTypes = {
    datesInvalid: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleGenerate: PropTypes.func.isRequired
}

export default NewSchedDropdownBtns;