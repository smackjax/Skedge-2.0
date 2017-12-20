import React from 'react';

// Functions 
import moment from 'moment';
import { restructureFunc } from './_VIEW-FUNCTIONS/restructure-sched';
import {objToArr} from '../../../../_functions';

// Components 
import MembBlock from './member-view-blocks/memb-block/memb-block.component';

// Style
import './member-view.style.css';


export default (props)=>{
    
    
    const schedData = restructureFunc(props.activeSched);
    /* 
    member.workdays {
        dateStr: {
        id: (dateStr)  
        tasksOnDay: {
            id: {
                id: 
                name,
                assigned: {
                    id: {
                        id
                        name
                    }
                }
            }
        }
    }
    */
    
    const startMoment = moment(schedData.startDate);
    const endMoment = moment(schedData.endDate);
    const member = props.member;

    const memberSched = objToArr(schedData.sched);
 

 
    // Sort by first character in name
    const sortedByNameMembs =  memberSched.length>0 ? memberSched.sort((memb, nextMemb)=>{
        const membOneChar = memb.name.split()[0];
        const membTwoChar = nextMemb.name.split()[0];
        return (membOneChar > membTwoChar ? 1 : -1);
    }).slice() :
    memberSched;

    
    
    return (
        <div 
        className="container sched-view members border-member">
            <div className="sched-view-header">
                {startMoment.format('MMM DD YYYY')} - {endMoment.format('MMM DD YYYY')}
            </div>

            {memberSched.map((memb, membIndx)=>{
                return (
                <MembBlock 
                key={'memb-v-block'+membIndx}
                member={memb}
                indx={membIndx}
                />
                )
            })}
            
        </div>
    )
}
