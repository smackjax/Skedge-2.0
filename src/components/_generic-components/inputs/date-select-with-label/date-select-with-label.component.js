import React from 'react';
import PropTypes from 'prop-types';
import {DateSelectInput} from '../';
import './date-select-with-label.style.css';

class DateSelectWithLabel extends React.Component{
    state={
        currentOutput: "Select date",
        valid: true,
    }
    
    handleChange=(result)=>{
        this.setState({
            currentOutput: result.value,
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
                outputFormat="MMM DD, YYYY"
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