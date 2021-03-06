import React from 'react';

// Functions 
import { objToArr } from '../../../_functions';
import { restructureFunc } from '../../_VIEW-FUNCTIONS/restructure-sched';


// Components
import DayBlock from '../date-block/date-block.component';
import * as icons from '../../../_icons';

// Style
import './memb-block.style.css';

export default (props)=>{
    const member = props.member;
    const workDates = objToArr(member.workDates);
    return (
        <div 
        className="main-member-block sched-view-main-item text-member border-member">
            <div className="member-block-header sched-item-header">{props.member.name}
                <button
                id={'sched-date-toggle-btn-' + props.indx}
                className="btn sched-view-toggle bg-member"
                style={{color: '#ededed'}}
                value={"sched-date-dropdown-" + props.indx}
                onClick={()=>{console.log("Todo")}}
                >
                    {icons.chevDown}
                </button>
            </div>
            <div id={"sched-date-dropdown-" + props.indx} 
            className="add-info-dropdown">
            {workDates.map((workDate, wdIndx)=>{
                return <DayBlock
                key={wdIndx}
                dateStr={workDate.id}
                tasks={workDate.tasksOnDate}                
                />
            })}
                
            </div>
        </div>
    )
}