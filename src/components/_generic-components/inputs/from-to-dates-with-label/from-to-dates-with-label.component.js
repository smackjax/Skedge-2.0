import React from 'react';
import PropTypes from 'prop-types';

import { DateInputWithLabel } from 'ez-react-date-input';
import './from-to-dates-with-label.style.css';

const FromToDatesWithLabel = (props)=>{
    return (
        <div className="from-to-date-select-with-label">

            <div
            className="choose-date-select-block"
            >
                <DateInputWithLabel 
                labelText="From:"
                invalidColor="#d65151"
                outputFormat="MMM DD, YYYY"
                onChange={props.handleStartChange}           
                />
            </div>

            <div
            className="choose-date-select-block"
            >
                <DateInputWithLabel 
                labelText="To:"
                invalidColor="#d65151"
                outputFormat="MMM DD, YYYY"
                onChange={props.handleEndChange}           
                />
            </div>

        </div>
    )
}

FromToDatesWithLabel.propTypes={
    handleStartChange: PropTypes.func.isRequired,
    handleEndChange: PropTypes.func.isRequired
}

export default FromToDatesWithLabel;