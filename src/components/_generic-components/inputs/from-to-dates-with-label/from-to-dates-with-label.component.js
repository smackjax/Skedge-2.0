import React from 'react';
import PropTypes from 'prop-types';
import {DateSelectWithLabel} from '../';
import './from-to-dates-with-label.style.css';

const FromToDatesWithLabel = (props)=>{
    return (
        <div className="from-to-date-select-with-label">
            <div
            className="choose-date-select-block"
            >
                <DateSelectWithLabel 
                labelText="From:"
                onChange={props.handleStartChange}           
                />
            </div>
            <div
            className="choose-date-select-block"
            >
                <DateSelectWithLabel 
                labelText="To:"
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