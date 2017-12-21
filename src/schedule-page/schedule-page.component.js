import React from 'react';


import SchedControls from './sched-controls/sched-controls.component';
import NewScheduleDropdown from './new-sched-dropdown/new-sched-dropdown.component';
import ViewSwitch from './_sched-views/view-switch/view-switch.component';

import MemberViewTest from './_sched-views/_view-list-generics/view-list-revamp/members-list/members-list.component';


class SchedulePage extends React.Component{
    state={
        schedControlsOpen: false,
        currentView: ""
    }
    handleDropdown=()=>{
        const newOpen = !this.state.schedControlsOpen;
        this.setState({
            schedControlsOpen: newOpen
        });
    }
    handleViewSwitch=(e)=>{
        const newView = e.target.value;
        this.setState({
            currentView: newView
        });
    }
    handleGenerate=(startDateStr, endDateStr)=>{
        console.log("TODO handle generate");
    }
    render(){
        return(
            <div className="schedule page"> 
                <SchedControls 
                dropdownOpen={this.state.schedControlsOpen}
                handleDropdownToggle={this.handleDropdown}
                />
                <hr />
                <NewScheduleDropdown
                open={this.state.schedControlsOpen}
                handleClose={this.handleDropdown}
                handleGenerate={this.handleGenerate}
                />

                <MemberViewTest />
                {false && <ViewSwitch
                schedule={this.props.sched}
                currentView={this.state.currentView}
                handleViewSwitch={this.handleViewSwitch}
                />}
            </div>
        )
    }
}
export default SchedulePage;