// Tasks keeps a special record of people assigned, 
// which also need to be cleaned of deleted ids
export default (tasksObj, validMemberIds)=>{
    const scrubbedTasks = {};
    const taskIds = Object.keys(tasksObj);
    taskIds.forEach(
        id=>{
            const task = { ...tasksObj[id] };
            // get all ids assigned ever
            const allMemberIdsAssigned = 
                Object.keys( task.timesAssigned );
            // filter out ids that don't exist anymore(deleted)
            const idsThatExist = allMemberIdsAssigned.filter( 
                mId=>validMemberIds.includes(mId)
            );
            // Copy needed values to new object
            const newTimesAssigned = {};
            idsThatExist.forEach(
                validId=>{
                    newTimesAssigned[validId] = task.timesAssigned[validId]
                }
            )
            // Overwrite old data with only valid id data
            task.timesAssigned = newTimesAssigned;
            // Assign updated task to new tasks object
            scrubbedTasks[task.id] = task;
        }
    )

    return scrubbedTasks
}
