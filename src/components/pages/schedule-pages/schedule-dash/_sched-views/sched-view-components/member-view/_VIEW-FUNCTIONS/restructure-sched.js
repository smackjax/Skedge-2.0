import { objToArr, arrToObj } from '../../_functions';

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
    // Gets all dates
    const datesArray = objToArr(vanillaSched.sched);
    // initialize final sched
    const memberSched = {};
    // Adds each date under the member ids that are assigned then
    datesArray.forEach((dateObj)=>{
        const tasksArray = objToArr(dateObj.tasks);
        tasksArray.forEach((task)=>{

            const memberArray = objToArr(task.assigned);

            memberArray.forEach((member)=>{
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

export const vTest = (vanillaSched)=>{
    // Gets all dates
    const datesArray = objToArr(vanillaSched.sched);
    // initialize final sched
    const memberSched = {};
    // Adds each date under the member ids that are assigned then
    datesArray.forEach((dateObj)=>{
        const tasksArray = objToArr(dateObj.tasks);
        tasksArray.forEach((task)=>{
  
            const memberArray = objToArr(task.assigned);
  
            memberArray.forEach((member)=>{
                // Initialize name, 'dates', and 'tasksOnDate' if not on list yet
                if(!memberSched[member.id]){ 
                    memberSched[member.id]={...member}; }
                if(!memberSched[member.id].workDates){ 
                    memberSched[member.id].workDates = {}; }
                if(!memberSched[member.id].workDates[dateObj.id]){
                    memberSched[member.id].workDates[dateObj.id] = {id: dateObj.id}; }
                if(!memberSched[member.id].workDates[dateObj.id].tasksOnDate){
                    memberSched[member.id].workDates[dateObj.id].tasksOnDate = {}; }
  
                memberSched[member.id]["workDates"][dateObj.id]["tasksOnDate"][task.id]=
                  {
                      ...task
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



/*
returns 
{ (...meta)
sched: [
    {
        name: "memberName",
        dates: [
            {
                dateStr: "YYYY-MM-DD",
                tasks: [
                    {
                        id: "",
                        name: 'task name'
                    }
                ]
            }
        ]
    }
]
*/


export const v2 = (vanillaSched)=>{
  // Gets all dates
  const datesArray = objToArr(vanillaSched.sched);
  // initialize final sched
  const memberSched = {};
  // Adds each date under the member ids that are assigned then
  datesArray.forEach((dateObj)=>{
      const tasksArray = objToArr(dateObj.tasks);
      tasksArray.forEach((task)=>{

          const memberArray = objToArr(task.assigned);

          memberArray.forEach((member)=>{
              // Initialize name, 'dates', and 'tasks' if not on list yet
              if(!memberSched[member.id]){ 
                  memberSched[member.id]={...member}; }
              if(!memberSched[member.id].dates){ 
                  memberSched[member.id].dates = {}; }
              if(!memberSched[member.id].dates[dateObj.id]){
                  memberSched[member.id].dates[dateObj.id] = {id: dateObj.id}; }
              if(!memberSched[member.id].dates[dateObj.id].tasks){
                  memberSched[member.id].dates[dateObj.id].tasks = {}; }

              memberSched[member.id]["dates"][dateObj.id]["tasks"][task.id]=
                {
                    ...task
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

/*
{ // ...meta

membId1: {
    dates: {
        'YYYY-MM-DD': {
            tasks: {
                taskId1
            }
        }
    }
}

}
*/
// Converts object list to arrays 
export const dataToArrays = (schedData)=>{
    const memberArray = [];
    for(let memberId in schedData){
        const member = schedData[memberId];
        const newMember = { id: member.id, name: member.name, dates: [] };
        for(let dateId in member.dates ){
            const date = member.dates[dateId];
            const newDate = {id: date.id, tasks: []};
            for(let taskId in date.tasks){
                const task = date.tasks[taskId];
                const newTask = {id: task.id, name: task.name};
                newDate.tasks.push(newTask);
            }
            newMember.dates.push(newDate);
        }
        memberArray.push(newMember);
    }
    return memberArray;
}