import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDateRangeById } from '../../api';
import DateRangeItem from './date-range-item/date-range-item.component';
import { objToArr } from '../../functions';
import './date-range-list.style.css';

const DateRangeList = (props)=>{
    const {dateRanges, activeDateRangeId} = props;
    const dateRangeArray = 
        objToArr(dateRanges);
    return (
        <div className="date-range-list-wrapper">
            
            <h4
            className="text-day border-day"
            >
                Generated Dates
            </h4>

            { !dateRangeArray.length && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    
                    width: "95%",
                    maxWidth: "400px",

                    margin: "20px auto",
                    padding: "10px",
                    backgroundColor: "#fff",
                }}
                className="action-btn"
                >
                    <h4
                    className="text-day"
                    >
                        No generated dates
                    </h4>
                    <Link
                    style={{
                        margin: "15px auto",
                    }}
                    to="/schedule-data"
                    >
                        Go to data page
                    </Link>
                </div>
            )}

            <div className="date-range-list border-day">
                { dateRangeArray.map( dateRangeData => (
                        <DateRangeItem
                        key={dateRangeData.id}
                        data={dateRangeData}
                        isActive={dateRangeData.id === activeDateRangeId}
                        handleDelete={props.deleteDateRangeById}
                        />
                ))}
            </div>
        


        </div>
    )
}

DateRangeList.propTypes = {
    dateRanges: PropTypes.object.isRequired,
    activeDateRangeId: PropTypes.string.isRequired
}

const mapDispatch = {
    deleteDateRangeById
}

export default connect(store=>({
    dateRanges: store.dateRanges,
    activeDateRangeId: store.meta.activeDateRangeId
}), mapDispatch )(DateRangeList);
