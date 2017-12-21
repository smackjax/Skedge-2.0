import React from 'react';
import PropTypes from 'prop-types';
import SchedViewRadios from '../view-switch-controls/view-switch-control.component';

import {
    CollapsedView,
    MemberView
} from '../sched-view-components';

class SchedViewSwitch extends React.Component{
    state={
        currentView: ""
    }
    handleViewSwitch = (newView)=>{
        this.setState({ currentView: newView });
    }

    render(){
        
        const view = this.state.currentView;
        const SelectedView = 
            view === "members" ? 
                MemberView : CollapsedView
        return (
            <div
            className="">
                <SchedViewRadios 
                handleViewSwitch={this.handleViewSwitch}
                />
                <SelectedView 
                schedule={this.props.schedule}
                />
            </div>
        )
    }
}

SchedViewSwitch.propTypes = {
    schedule: PropTypes.object.isRequired
}

export default SchedViewSwitch