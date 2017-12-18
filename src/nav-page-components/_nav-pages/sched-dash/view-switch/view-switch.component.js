import React from 'react';
import ExpandedView from './expanded-view/expanded-view.component';
import CollapsedView from './collapsed-view/collapsed-view.component';
import MemberView from './member-view/member-view.component';

import './view-switch.style.css'

export default (props)=>{

    const activeSched = props.activeSched;
    
    return (
        <div className="sched-view-switch">
            { // Renders correct component based on view selection
            props.activeSched ? 
                
                props.activeView === 'collapsed' ?
                <CollapsedView activeSched={activeSched} />  
                :
                props.activeView === 'members' ?
                <MemberView activeSched={activeSched} /> 
                :
                // Default view 
                <ExpandedView activeSched={activeSched} />  

            : 
            <div>No schedules yet...</div>
            }            
        </div>
    )
    
}
