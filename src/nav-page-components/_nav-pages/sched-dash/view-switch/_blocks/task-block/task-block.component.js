import React from 'react';

// Functions
import objToArray from '../../../../../_FUNCTIONS/objToArr';

// Components
import MembItem from '../memb-assigned-block/memb-assigned-block.component';

// Style 
import colors from '../../../../../_RESOURCES/colors';
import './task-block.style.css';

export default (props)=>{
    // props.taskTitle
    // props.membsAssigned
    // ?props.id
    const membsAssigned = objToArray(props.membsAssigned);

    return (
        <div id={props.id || ''} className="task-block-item col-sm-6">
            <div style={{color: colors.task}} 
            className="sublist-header">{props.taskTitle}</div>
            {membsAssigned.map((memb, membIndx)=>{
                return <MembItem 
                key={'membIndx-'+membIndx}
                membName={memb.name}
                />
            })}
        </div>
    )
}
