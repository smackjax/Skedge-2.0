import React from 'react';

// functions
import { dehydrateDate, hydrateDate} from '../../../../../../_FUNCTIONS/dateFunctions';
import objToArr from '../../../../../../_FUNCTIONS/objToArr';

// Style 
import colors from '../../../../../../_RESOURCES/colors';

export default (props)=>{

    const dateStr = hydrateDate(props.dateStr).format('ddd, MMM DD');
    const tasksOnDate = objToArr(props.tasks);
    
    return(
        <div className="memb-view-date-item">
            <div style={{color: colors.sched}} className="sublist-header">{dateStr}</div>
            <div className="memb-view-task-block">
                {
                    tasksOnDate.map((task, tId)=>{
                        return <div 
                        style={{color: colors.task}}
                        className="sublist-item"
                            key={tId}
                        >{task.name}</div>
                    })
                }
            </div>
        </div>
    )
}
