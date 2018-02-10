// General functions
import {
    findLowestNumber
} from '../../_FUNCTIONS/';

// Equalizes times members assigned to task by removing as much as possible
export default (dirtyTasks)=>{
    const tasks = dirtyTasks || {};
    const taskIds = Object.keys(tasks);
    if(!taskIds) return tasks;

    const newTasks = [...tasks];
    taskIds.forEach(
        id=>{
            const task = {...tasks[id]};
            // Find lowest times member has been assigned
            const amountToSubtract = findLowestNumber(task.timesAssigned);
            console.log(`Lowest times for ${task.name}: ${amountToSubtract}`)
            // Initialize
            const newAssignedMembers = task.timesAssigned || {};
            // Get member Ids that have been assigned
            const memberIds = Object.keys(newAssignedMembers);
            
            // If not subtracting anything, just return
            if(!amountToSubtract) return;

            // Subtract lowest times assigned from each member on task
            memberIds.forEach(
                mId=>{
                    const newTimesAssigned = 
                        (newAssignedMembers[mId] - amountToSubtract);
                    const atLeastOnce = newTimesAssigned || 1;
                    newAssignedMembers[mId] = atLeastOnce;
                }
            )
            newTasks[id] = {
                ...task,
                timesAssigned: {
                    ...newAssignedMembers
                }
            }
        }
    )
    return newTasks;
}
