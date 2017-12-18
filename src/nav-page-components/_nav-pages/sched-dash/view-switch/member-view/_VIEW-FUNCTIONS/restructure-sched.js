import FAKESCHED from '../../../../../../sched-engine/FAKESCHEDDATA';

import objToArray from '../../../../../_FUNCTIONS/objToArr';
import arrayToObject from '../../../../../_FUNCTIONS/arrToObj';


/*
returns {
    id: schedId,
    startDate,
    endDate,
    sched: {
        membId:{
            workDates: {
                taskId :{
                    assigned: {}
                }
            }
        }
    }
}
*/

export const restructureFunc = (vanillaSched)=>{
    
    const datesArray = objToArray(vanillaSched.sched);
    const memberSched = {};
    // Adds each date under the member ids that are assigned then
    datesArray.forEach((dateObj)=>{
        const tasksArray = objToArray(dateObj.tasks);
        tasksArray.forEach((task)=>{
            const memberArray = objToArray(task.assigned);
            memberArray.map((member)=>{
                // Initialize name, 'workDates', and 'tasksOnDate' if not on list yet
                if(!memberSched[member.id]){ 
                    memberSched[member.id]={...member}; }
                if(!memberSched[member.id].workDates){ 
                    memberSched[member.id].workDates = {}; }
                if(!memberSched[member.id].workDates[dateObj.id]){
                    memberSched[member.id].workDates[dateObj.id] = {}; }

                if(!memberSched[member.id].workDates[dateObj.id].tasksOnDate){
                    memberSched[member.id].workDates[dateObj.id].tasksOnDate = {}; }

                memberSched[member.id] = {
                    ...memberSched[member.id],
                    workDates: {
                        ...memberSched[member.id].workDates,
                        [dateObj.id]: {
                            id: dateObj.id,
                            tasksOnDate: {
                                ...memberSched[member.id].workDates[dateObj.id].tasksOnDate,
                                [task.id]: {
                                    ...task
                                }
                            }
                        }
                    }
                }
            })
        });
    });

    // Wraps member sched with meta info
    const mainSched = {
        id: vanillaSched.id,
        startDate: vanillaSched.startDate,
        endDate: vanillaSched.endDate,
        sched: memberSched
    };

    return mainSched;
}

