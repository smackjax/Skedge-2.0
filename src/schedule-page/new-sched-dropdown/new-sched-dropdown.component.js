import React from 'react';
import PropTypes from 'prop-types';
import { genDatesArray } from '../../_FUNCTIONS';
import Dropdown from '../../_dropdown/dropdown.component';
import FromToDateInput from '../../_inputs/from-to-date-block/from-to-date-block.component';
import NewSchedBtns from './new-sched-dropdown-btns/new-sched-dropdown-btns.component';

import icons from '../../_icons/icons';
import './new-sched-dropdown.style.css';

class NewSchedDropdown extends React.Component{

    state={
        invalid: true,
        endDateStr: "",
        startDateStr: "",
        dateChangeOutput: ""
    }

    handleDateChange=(newVals)=>{
        this.setState({
            ...newVals
        });
    }
    handleGenerate=()=>{
        if(!this.state.invalid){
            const { startDateStr, endDateStr } = this.state;
            const finalArray = genDatesArray(startDateStr, endDateStr);
            console.log("Final array: ", finalArray);
            
        }
    }

    render(){
    const { dateChangeOutput } = 
        this.state;
    return (
        <Dropdown
        open={this.props.open}
        >
        <div className="new-sched-dropdown border-sched">
            <FromToDateInput
            onChange={this.handleDateChange}
            />

            <NewSchedBtns
            datesInvalid={this.state.invalid}
            handleGenerate={this.handleGenerate}
            handleConfirm={this.handleGenerate}
            handleCancel={this.props.handleClose}
            />
        </div>
        </Dropdown>
    )
}
}

NewSchedDropdown.propTypes = {
    open: PropTypes.bool.isRequired,
    handleGenerate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}
export default NewSchedDropdown;