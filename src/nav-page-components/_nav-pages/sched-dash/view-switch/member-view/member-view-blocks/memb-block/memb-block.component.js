import React from 'react';

// Functions 
import { restructureFunc } from '../../_VIEW-FUNCTIONS/restructure-sched';
import objToArr from '../../../../../../_FUNCTIONS/objToArr';
import {toggleByBtn} from '../../../../../../_FUNCTIONS/dropdown';


// Components
import DayBlock from '../date-block/date-block.component';

// Style
import './memb-block.style.css';
import colors from '../../../../../../_RESOURCES/colors';

export default (props)=>{
    const member = props.member;
    const workDates = objToArr(member.workDates);
    return (
        <div style={{borderColor: colors.member, color: colors.member}} 
        className="main-member-block sched-view-main-item ">
            <div className="member-block-header sched-item-header">{props.member.name}
                <button
                id={'sched-date-toggle-btn-' + props.indx}
                className="btn sched-view-toggle"
                style={{backgroundColor: colors.member, color: '#ededed'}}
                value={"sched-date-dropdown-" + props.indx}
                onClick={toggleByBtn('sched-date-toggle-btn-' + props.indx)}
                >
                    <i className="fa fa-chevron-down"></i>
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