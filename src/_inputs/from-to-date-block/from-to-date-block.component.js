import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateSelectInput from '../date-select-input/date-select-input.component';

class DateSelectBlock extends React.Component{
    state={
        datesAreValid: false,
        startValid: false,
        endValid: false,
        startDateStr: "",
        endDateStr: "",
        currentOutput: "Choose dates"
    }
    handleStartDate = (results)=>{
        const startDateStr =  results.value;
        const invalid = results.invalid;
        this.setState(
            { 
                startDateStr,
                startValid: !invalid
            }, 
            this.handleChange
        );
    }
    handleEndDate = (results)=>{
        const endDateStr =  results.value;
        const invalid = results.invalid;
        this.setState(
            { 
                endDateStr,
                endValid: !invalid
            }, 
            this.handleChange
        );
    }
    handleChange = ()=>{
        const {startDateStr, endDateStr, startValid, endValid} =
            this.state;

        const startDate = moment(startDateStr, 'YYYY-MM-DD');
        const endDate = moment(endDateStr, "YYYY-MM-DD");

        const newVals = 
            (   // If either date isn't valid
                !startValid || 
                !endValid 
            ) ? {
                currentOutput: "Invalid date",
                datesAreValid: false
            } :
            // If start date is later than end
            (startDate >= endDate) ? 
            {
                currentOutput : "Choose later end date",
                datesAreValid: false
            } : 
            // Otherwise, format dates together
            {
                currentOutput: `${startDate.format('MMM DD')} - ${endDate.format('MMM DD')}`,
                datesAreValid: true
            };

        this.setState({
            ...newVals
        }, ()=>{
            const invalid = !(
                this.state.datesAreValid && 
                this.state.startValid &&
                this.state.endValid 
            );

            // Pass values to parent
            this.props.onChange({
                invalid,
                startDateStr,
                endDateStr,
                dateChangeOutput: this.state.currentOutput
            });
        });
    }


    render(){
        return (
            <div className="from-to-date-select">
                <DateSelectInput 
                id="startDateInput"
                onChange={this.handleStartDate}
                />
                <DateSelectInput 
                id="endDateInput"
                onChange={this.handleEndDate}
                />
                <div 
                className="dates-change-output">
                    {this.state.currentOutput}
                </div>
            </div>
        )
    }
}

DateSelectBlock.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default DateSelectBlock;