import { objToArr, arrToObj } from '../../../../../_functions';

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
    
    const datesArray = objToArr(vanillaSched.sched);
    const memberSched = {};
    // Adds each date under the member ids that are assigned then
    datesArray.forEach((dateObj)=>{
        const tasksArray = objToArr(dateObj.tasks);
        tasksArray.forEach((task)=>{
            const memberArray = objToArr(task.assigned);
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

