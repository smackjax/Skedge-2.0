import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../../../_generic-components/navbar/navbar.component';

import ViewSwitch from './_sched-views/view-switch/view-switch.component';

class SchedulePage extends React.Component{

    state={
        schedControlsOpen: false,
        activeSched: "",
        currentView: ""
    }

    componentDidMount(){
        this.updateSched(this.props);
    }
    componentWillReceiveProps(newProps){
        this.updateSched(newProps);
    }
    updateSched=(props)=>{
        const id = props.activeSchedId;
        const activeSched = 
            props.schedules[id];
        if(activeSched) this.setState( {activeSched });
    }


    handleViewSwitch=(e)=>{
        const newView = e.target.value;
        this.setState({
            currentView: newView
        });
    }

    render(){
        return(
            <div className="schedule page"> 
                <NavBar />

                { this.state.activeSched ? ( 
                <ViewSwitch
                schedule={this.state.activeSched}
                currentView={this.state.currentView}
                handleViewSwitch={this.handleViewSwitch}
                />) : 
                <div style={{textAlign: "center"}}>Couldn't find an active schedule</div>
                }
            </div>
        )
    }
}

SchedulePage.propTypes={
    schedules: PropTypes.object.isRequired,
    activeSchedId: PropTypes.string.isRequired
}

export default connect(
    store=>({
        schedules: store.schedules,
        activeSchedId: store.meta.activeSchedId
    })
)(SchedulePage);