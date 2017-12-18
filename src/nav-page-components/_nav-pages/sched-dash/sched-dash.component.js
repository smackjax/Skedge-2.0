import React from 'react';
import {connect} from 'react-redux';

// Actions 
import UIActs from '../../../_redux/actions/ui.actions';
import SchedActs from '../../../_redux/actions/sched.actions';

// Sched api
import { getOneSched } from '../../../sched-engine/sched-api';

// Components
import PageHeader from '../_generics/_page-header/page-header.component'
import SchedHeader from './sched-header/sched-header.component';
import SelectView from './select-view-style/select-view-style.compenent';
import ViewSwitch from './view-switch/view-switch.component';

// Style 
import colors from '../../_RESOURCES/colors';

const SchedDashComponent = (props)=>{
    function handleViewChange(schedViewtype){
        props.dispatch( UIActs.changeSchedView(schedViewtype) );
    } 
    const newSched = (startDateStr, endDateStr)=>{
        props.dispatch(SchedActs.genNew(startDateStr, endDateStr));
    }
    const testSched = props.activeSchedId || 'schedId1'; 
    const activeSched = getOneSched(testSched); 
    
    return (
        <div className="page sched-page">
            <PageHeader 
            color={colors.sched}
            text="Sched's"
            faClass='th'
            />

            <SchedHeader
            genFunc={newSched}
            />
            <SelectView 
            onChange={handleViewChange}
            current={props.activeView}/>
            
            <ViewSwitch 
            activeView={props.activeView}
            activeSched={activeSched}
            />
            
      
        </div>
    )
}
export default connect(
    (state)=>{
        return {
            activeView: state.ui.schedViewType,
            generating: state.ui.generating,
            activeSchedId: state.ui.activeSchedId, 
        }
    }
)(SchedDashComponent)
