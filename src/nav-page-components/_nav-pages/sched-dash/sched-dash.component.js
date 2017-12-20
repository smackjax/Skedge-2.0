import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Actions 
import SchedActs from '../../../_redux/actions/sched.actions';

// Sched api
import { getOneSched } from '../../../brains/sched-api';

// Components
import SchedHeader from './sched-header/sched-header.component';
import SelectView from './select-view-style/select-view-style.compenent';
import ViewSwitch from './view-switch/view-switch.component';


const SchedDashComponent = (props)=>{
    function handleViewChange(activeView){
        console.log("View changed: ", activeView);
    }

    const newSched = (startDateStr, endDateStr)=>{
        console.log("TODO gen sched");
        console.log("Start date: ", startDateStr);
        console.log("End date: ", endDateStr);
    }

    const testSched = props.activeSchedId || 'schedId1'; 
    const activeSched = getOneSched(testSched); 
    
    return (
        <div className="page sched-page">

            <SchedHeader
            genFunc={newSched}
            />
            <SelectView 
            onChange={handleViewChange}
            current={this.state.activeView}/>
            
            <ViewSwitch 
            activeView={this.state.activeView}
            activeSched={activeSched}
            />
      
        </div>
    )
}

SchedDashComponent.propTypes={
    activeView: PropTypes.string.isRequired
}

export default connect(
    (store)=>( 
        {
            activeSchedId: store.meta.activeSchedId, 
        }
    )
)(SchedDashComponent)
