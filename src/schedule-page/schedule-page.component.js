import React from 'react';

import NavBar from '../navbar/navbar.component';
import SchedControls from './sched-controls/sched-controls.component';
import NewScheduleModal from './new-sched-modal/new-sched-modal.component';
import ViewSwitch from './_sched-views/view-switch/view-switch.component';

import { getOneSched } from '../brains/sched-api';


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
        const sched = getOneSched();
        return(
            <div className="schedule page"> 
                <NavBar />
                <SchedControls 
                dropdownOpen={false}
                handleDropdownToggle={this.handleDropdown}
                />
                <hr />

                <ViewSwitch
                schedule={sched}
                currentView={this.state.currentView}
                handleViewSwitch={this.handleViewSwitch}
                />

                <NewScheduleModal
                open={this.state.schedControlsOpen}
                handleCancel={this.handleDropdown}
                handleGenerate={this.handleGenerate}
                />
            </div>
        )
    }
}
export default SchedulePage;