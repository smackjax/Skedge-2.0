import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {DateSelectInput} from '../';
import './date-select-with-label.style.css';

class DateSelectWithLabel extends React.Component{
    state={
        currentOutput: "Select date",
        valid: true,
    }
    
    handleChange=(result)=>{
        const currentOutput = !result.invalid ?
            moment(result.value, "YYYY-MM-DD").format("MMM DD, YYYY") :
                result.value;

        this.setState({
            currentOutput,
            valid: !result.invalid
        },
        ()=>{
            if(this.props.onChange){
                this.props.onChange(result);
            }
        });
    }

    render(){
        const textInvalid = (this.state.currentOutput === "Invalid date");
        const outputClassName = 
            "date-select-output " + 
                (this.state.valid || textInvalid ? 
                    "" : "text-danger");
        const finalOutput = 
            textInvalid ? 
                    "Select date" : this.state.currentOutput;
        return (
            <label className="date-select-input-label">

                <div className={outputClassName}>
                    <span 
                    className="date-output-label"
                    >
                    {this.props.labelText || "Date: "}
                    </span>

                    <span 
                    className="date-output-text"
                    >
                    {finalOutput}
                    </span>

                </div>
                
                <DateSelectInput
                onChange={this.handleChange}
                invalidColor="red"
                outputFormat="YYYY-MM-DD"
                />
            </label>
        )
    }
}

DateSelectWithLabel.propTypes={
    labelText: PropTypes.string,
    invalidClassName: PropTypes.string, 
    onChange: PropTypes.func

}

export default DateSelectWithLabel;