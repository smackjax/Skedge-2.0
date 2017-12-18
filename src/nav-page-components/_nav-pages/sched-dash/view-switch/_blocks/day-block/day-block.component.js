import React from 'react';

// Functions
import objToArray from '../../../../../_FUNCTIONS/objToArr';
import {hydrateDate} from '../../../../../_FUNCTIONS/dateFunctions';
import { expand, collapse, toggleByBtn} from '../../../../../_FUNCTIONS/dropdown';

// Components
import TaskBlock from '../task-block/task-block.component';

// Style
import colors from '../../../../../_RESOURCES/colors';
import './day-block.style.css';


export default (props)=>{
    // props.dateTitle
    // props.tasks
    const tasks = objToArray(props.tasks);

    const dateStr = hydrateDate(props.dateStr).format('ddd, MMM DD');
    return (
        tasks.length > 0 ?
        <div style={{color: colors.sched, borderColor: colors.sched}}  className="day-block-item  sched-view-main-item">
            <div className="sched-item-header">
                {dateStr} 
                { props.collapsed ? <button id={'task-drop-btn-' + props.indx}
                className='btn sched-view-toggle' 
                style={{backgroundColor: colors.sched, color: '#f4f4f4'}}
                value={'task-dropdown-'+props.indx}
                onClick={toggleByBtn('task-drop-btn-' + props.indx)}>
                    <i className="fa fa-chevron-down"></i>
                </button> : ''}
            </div>

            <div id={'task-dropdown-'+props.indx} 
            className="add-info-dropdown">
                {tasks.map((task, taskIndx)=>{
                    return <TaskBlock 
                    key={'taskIndx-' + taskIndx}
                    taskTitle={task.name}
                    membsAssigned={task.assigned}
                    />
                })}
            </div>
        </div> : 
        <span></span>
    )
}
