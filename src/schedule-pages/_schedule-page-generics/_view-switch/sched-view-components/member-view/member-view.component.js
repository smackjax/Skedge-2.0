import React from 'react';
import PropTypes from 'prop-types';
// Functions 
import moment from 'moment';
import { restructureFunc, vTest, v2, dataToArrays } from './_VIEW-FUNCTIONS/restructure-sched';
import {objToArr} from '../_functions';

// Components 
import MembBlock from './member-view-blocks/memb-block/memb-block.component';

// Style
import './member-view.style.css';

import { getOneSched } from '../../../../brains/sched-api';

const MemberSchedView= (props)=>{
    const activeSched = getOneSched();
    const schedData = vTest(activeSched);

    const testData = v2(activeSched);
    console.log(dataToArrays(testData.sched));
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

MemberSchedView.propTypes={
    schedule: PropTypes.object
};

export default MemberSchedView;