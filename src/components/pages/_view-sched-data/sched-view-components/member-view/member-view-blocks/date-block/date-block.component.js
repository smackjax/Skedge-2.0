import React from 'react';

// functions
import {
    hydrateDate,
    dehydrateDate,
    objToArr
} from '../../../_functions';

export default (props)=>{

    const dateStr = hydrateDate(props.dateStr).format('ddd, MMM DD');
    const tasksOnDate = objToArr(props.tasks);
    
    return(
        <div className="memb-view-date-item">
            <div  className="sublist-header text-sched">{dateStr}</div>
            <div className="memb-view-task-block">
                {
                    tasksOnDate.map((task, tId)=>{
                        return <div 
                        className="sublist-item text-sched"
                            key={tId}
                        >{task.name}</div>
                    })
                }
            </div>
        </div>
    )
}
