import React from 'react';
import PropTypes from 'prop-types';
import SchedViewRadios from './view-switch-controls/view-switch-control.component';
import {
    ViewByMember,
    ViewByDate
} from './views-by-data/';
import { getOneSched } from '../../../brains/sched-api';

class SchedViewSwitch extends React.Component{
    state={
        currentView: "collapsed"
    }
    handleViewChange = (e)=>{
        const newView = e.target.value;
        if(this.state.currentView !== newView){
            this.setState({ currentView: newView });
        }
    }


    render(){
        const view = this.state.currentView;

        return (
            <div
            className="sched-view-switch">
                <SchedViewRadios 
                handleViewChange={ this.handleViewChange }
                currentView={this.state.currentView}
                />

                { view === "members" ? 
                <ViewByMember
                schedule={ this.props.schedule }
                />    :
                <ViewByDate 
                schedule={ this.props.schedule }
                />
                }
                
            </div>
        )
    }
}

SchedViewSwitch.propTypes = {
    schedule: PropTypes.object.isRequired
}

export default SchedViewSwitch