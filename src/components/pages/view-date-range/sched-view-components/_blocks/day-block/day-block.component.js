import React from 'react';

// Functions
import {
    objToArr,
    hydrateDate
} from '../../_functions'


// Components
import TaskBlock from '../task-block/task-block.component';

// Style
import './day-block.style.css';


export default (props)=>{
    // props.dateTitle
    // props.tasks
    const tasks = objToArr(props.tasks);

    const dateStr = hydrateDate(props.dateStr).format('ddd, MMM DD');
    return (
        tasks.length > 0 ?
        <div  className="day-block-item sched-view-main-item border-sched text-sched">
            <div className="sched-item-header">
                {dateStr} 
                
                { 
                props.collapsed ? (
                    <button id={'task-drop-btn-' + props.indx}
                    className='btn sched-view-toggle bg-sched' 
                    style={{color: '#f4f4f4'}}
                    value={'task-dropdown-'+props.indx}
                    onClick={()=>{console.log("TODO ")}}>
                        <i className="fa fa-chevron-down"></i>
                    </button> 
                ) : ''
                }
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
