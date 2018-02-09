import { objToArr } from '../functions';

export const toArrays = (schedData, firstKey, secondKey)=>{
    const itemArrays = [];
    for(let itemId in schedData){
        const item = schedData[itemId];
        const newItem = {[firstKey]: [] };
        if(item.name) newItem.name = item.name;
        if(item.id) newItem.id = item.id;
        for(let secondId in item[firstKey] ){
            const secondItem = item[firstKey][secondId];
            const secondNewItem = {[secondKey]: []};
            if(secondItem.name) secondNewItem.name = secondItem.name;
            if (secondItem.id) secondNewItem.id = secondItem.id; 

            for(let thirdId in secondItem[secondKey]){
                const thirdItem  = secondItem[secondKey][thirdId];
                const finalItem = {};
                if(thirdItem.name) finalItem.name = thirdItem.name;
                if(thirdId) finalItem.id = thirdItem.id;

                secondNewItem[secondKey].push(finalItem);
            }
            newItem[firstKey].push(secondNewItem);
        }
        itemArrays.push(newItem);
    }
    return itemArrays;
}

export const formatSchedByMember = (dateRange)=>{
    // Gets all dates
    const datesArray = objToArr(dateRange.dates);
    // initialize final sched
    const memberSched = {};
    // Adds each date under the member ids that are assigned then
    datesArray.forEach((dateObj)=>{
        if(dateObj.tasks){
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
    
                    // Since this is dealing with an object and bracket notation,
                    // Each unique value will automatically go where it's supposed to
                    memberSched[member.id]["dates"][dateObj.id]["tasks"][task.id]=
                    {
                        ...task
                    }    
                })
            });
        }
    });

    // Create arrays from data
    const arrayMemberSched = toArrays(memberSched, 'dates', 'tasks');

  
    // Wraps member sched with meta info
    const mainSched = {
        id: dateRange.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        sched: arrayMemberSched
    };
  
    return mainSched;
  }

  export const formatSchedByDate = (dateRange)=>{
        const arrayDateSched = 
            toArrays(dateRange.dates, 'tasks', 'assigned');

        // Wraps member sched with meta info
        const mainSched = {
            id: dateRange.id,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            sched: arrayDateSched
        };
      
        return Promise.resolve(mainSched);
  }