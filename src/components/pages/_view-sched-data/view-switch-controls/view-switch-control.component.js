import React from 'react';
import PropTypes from 'prop-types';
import './view-switch-control.style.css';

const ViewSwitchRadios=(props)=>{
    return (
        <div className="view-switch-controls">
            <label 
            htmlFor="collapsedView"
            className="view-switch-option">
                <input type="radio" 
                onClick={props.handleViewChange}
                onChange={props.handleViewChange}
                checked={props.currentView === "collapsed"}
                value="collapsed"
                id="collapsedView"
                /> Collapsed
            </label>

            <label 
            htmlFor="membersView"
            className="view-switch-option">
                <input type="radio"
                onClick={props.handleViewChange}
                onChange={props.handleViewChange}
                checked={props.currentView === "members"}
                value="members"
                id="membersView"
                /> Members
            </label>
            
        </div>
    )
}

ViewSwitchRadios.propTypes = {
    handleViewChange: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired
}

export default ViewSwitchRadios;