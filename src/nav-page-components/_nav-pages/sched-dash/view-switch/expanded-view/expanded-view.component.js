import React from 'react';


//Functions
import {
    hydrateDate,
    objToArr
} from '../../../../_functions';

//Components
import DayBlock from '../_blocks/day-block/day-block.component';

// Style
import './expanded-view.style.css';


export default (props)=>{
    const schedData = props.activeSched;
    const days = objToArr(schedData.sched);
    
    /*
        '09-01-2017': {
            id: '09-01-2017', 
            date : 'Sep 1 2017',
            name: 'Friday',
            tasks:
    */
    const startMoment = hydrateDate(schedData.startDate);
    const endMoment = hydrateDate(schedData.endDate);
    return(

        <div className="container sched-view expanded">
            <div className="sched-view-header">
                {startMoment.format('MMM DD YYYY')} - {endMoment.format('MMM DD YYYY')} 
            </div>
            {
                days.map((day, dayIndex)=>{
                    return <DayBlock
                    key={'dayIndx' + dayIndex}
                    dayTitle={day.name}
                    dateStr={day.id}
                    tasks={day.tasks}
                    />
                })
            }

        </div>
    )
}
