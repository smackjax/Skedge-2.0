import updateSchedData from './_updateSchedData';

export const updateMembers=( schedId, memberUpdates )=>{
    return updateSchedData(schedId, 'members', memberUpdates)
}
export const updateGroups=(schedId, groupObj)=>{
    return updateSchedData(schedId, 'groups', groupObj)
}
export const updateTasks=( schedId, taskObj)=>{
    return updateSchedData(schedId, 'tasks', taskObj)
}
export const updateDays=( schedId, dayObj)=>{
    return updateSchedData(schedId, 'days', dayObj)
}
export const updateDateRanges=( schedId, dateRangeUpdates )=>{
    return updateSchedData(
        schedId, 
        'dateRanges', 
        dateRangeUpdates
    );
}
