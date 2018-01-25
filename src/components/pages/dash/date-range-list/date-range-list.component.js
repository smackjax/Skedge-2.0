import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DateRangeItem from './date-range-item/date-range-item.component';
import { objToArr } from '../../functions';
import './date-range-list.style.css';

const DateRangeList = ({dateRanges, activeDateRangeId})=>{
    const dateRangeArray = 
        objToArr(dateRanges);
    
    return (
        <div className="date-range-list-wrapper">
            
            <h4
            className="text-day border-day"
            >
                Generated Dates
            </h4>

            <div className="date-range-list border-day">
                {
                    dateRangeArray.map(dateRangeData=>(
                        <DateRangeItem
                        key={dateRangeData.id}
                        data={dateRangeData}
                        isActive={dateRangeData.id === activeDateRangeId}
                        />
                    ))
                }
            </div>
        </div>
    )
}

DateRangeList.propTypes = {
    dateRanges: PropTypes.object.isRequired,
    activeDateRangeId: PropTypes.string.isRequired
}

export default connect(store=>({
    dateRanges: store.dateRanges,
    activeDateRangeId: store.meta.activeDateRangeId
}))(DateRangeList);
