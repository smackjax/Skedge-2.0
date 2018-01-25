import React from 'react';
import PropTypes from 'prop-types';
import './date-range-item.style.css';
import { icons } from '../../../generic-components';
import { hydrateDate } from '../../../functions';

const DateRangeItem = ({data, isActive})=>{
    const startDate = hydrateDate(data.startDate);
    const endDate = hydrateDate(data.endDate);
    
    return (
        <div className="action-btn date-range-item-wrapper bg-day">
            <button className="view-date-range-btn bg-day text-light">
                <span className="date-range-icon"> {icons.dateRange} </span>

                <span className="dates-display">{`${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`}</span>

                {isActive && (
                    <span className="is-active">
                        {icons.star}
                    </span>
                )}
            </button>
            <button className="item-options-btn">
                {icons.vDots}
            </button>
        </div>
    )
}

DateRangeItem.propTypes = {
    data: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        dates: PropTypes.object.isRequired
    }).isRequired,
    isActive: PropTypes.bool.isRequired
}

export default DateRangeItem;