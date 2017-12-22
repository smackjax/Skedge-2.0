import React from 'react';

// Functions
import {objToArr} from '../../_functions';

// Components
import MembItem from '../memb-assigned-block/memb-assigned-block.component';

// Style 
import './task-block.style.css';

export default (props)=>{
    // props.taskTitle
    // props.membsAssigned
    // ?props.id
    const membsAssigned = objToArr(props.membsAssigned);

    return (
        <div id={props.id || ''} className="task-block-item col-sm-6">
            <div
            className="sublist-header text-task">{props.taskTitle}</div>
            {membsAssigned.map((memb, membIndx)=>{
                return <MembItem 
                key={'membIndx-'+membIndx}
                membName={memb.name}
                />
            })}
        </div>
    )
}
