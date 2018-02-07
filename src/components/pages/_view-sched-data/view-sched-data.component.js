import React from 'react';
import PropTypes from 'prop-types';
import ViewSwitch from './view-switch/view-switch.component';

const ViewSchedData = (props)=>{
    
        return (
            <ViewSwitch
            {...props}
            />
        )
    
}

ViewSchedData.propTypes={
    scheduleName: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
    changeActiveId: PropTypes.func
}

export default ViewSchedData;