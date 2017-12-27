import React from 'react';
import PropTypes from 'prop-types';
import {FromToDatesWithLabel} from '../../../../inputs';
import UnavailDateControls from './unavailable-dates-controls/unavailable-dates-controls.component';
import UnavailDateList from './unavailable-dates-list/unavailable-dates-list.component';

class UnavailableDates extends React.Component{

    state={
        controlsOpen: false,
    }

    render(){
        return (
            <div>
                <UnavailDateControls 
                handleConfirm={this.props.handleAddDates}
                />
                <UnavailDateList 
                currentDateList={this.props.currentDateList}
                handleDelete={this.props.handleDeleteDates}
                />
            </div>
        )
    }
}

UnavailableDates.propTypes={
    currentDateList: PropTypes.array.isRequired,
    handleAddDates: PropTypes.func.isRequired,
    handleDeleteDates: PropTypes.func.isRequired
}


export default UnavailableDates;