import React from 'react';
import PropTypes from 'prop-types';

const UnavailableDatesList = (props)=>{
    return (
        <div>
            UnavailableDatesList
        </div>
    )
}

UnavailableDatesList.propTypes={
    currentDateList: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default UnavailableDatesList;