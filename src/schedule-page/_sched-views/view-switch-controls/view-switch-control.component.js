import React from 'react';
import PropTypes from 'prop-types';

const ViewSwitchControls=(props)=>{
    return (
        <div className="view-switch-controls">
            <label 
            htmlFor="defaultView"
            className="view-switch-option">
                <input type="radio" 
                onClick={props.handleViewChange}
                checked={props.currentView === ""}
                value=""
                id="defaultView"
                /> Date
            </label>

            <label 
            htmlFor="collapsedView"
            className="view-switch-option">
                <input type="radio" 
                onClick={props.handleViewChange}
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
                checked={props.currentView === "members"}
                value="members"
                id="membersView"
                /> Members
            </label>
            
        </div>
    )
}

ViewSwitchControls.propTypes = {
    handleViewChange: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired
}

export default ViewSwitchControls;