import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './date-range-item.style.css';
import { icons } from '../../../generic-components';
import { hydrateDate } from '../../../functions';

const DateRangeItem = (props)=>{
    const {data, isActive} = props;
    const startDate = hydrateDate(data.startDate);
    const endDate = hydrateDate(data.endDate);
    
    const deleteDateRange=()=>{
        props.handleDelete(data.id);
    }

    return (
        <div className="action-btn date-range-item-wrapper bg-day">
            <Link 
            to={'/date-range/' + data.id}
            className="view-date-range-btn bg-day text-light">
                <span className="date-range-icon"> {icons.dateRange} </span>

                <span className="dates-display">{`${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`}</span>

                {isActive && (
                    <span className="is-active">
                        {icons.star}
                    </span>
                )}
            </Link>
        </div>
    )
}

DateRangeItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        dates: PropTypes.object.isRequired
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    
}

export default DateRangeItem;