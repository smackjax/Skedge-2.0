import moment from 'moment';

// General functions
import {
    dehydrateDate,
    hydrateDate,
    objToArr,
    arrToObj
} from '../_FUNCTIONS/';

import idGen from 'uniqid';


// Moment docs: 
/*
    moment.day() == 0


*/


export default (startDateString, endDateString, currentState)=>{
    const state = currentState;
    
    // Initialize data for sched
    const daysOfWeek = {...state.daysOfWeek};
    const groupsById = {...state.groupsById};
    const membersById = {...state.membersById};
    const tasksById = {...state.tasksById};

    // Needed. Stop second guessing.
    const membsAsArray = objToArr(membersById);
    // All memb info from here forward is written to, and taken from, 'members'
    let members = membsAsArray.map(
        // Give all member objects a prop to keep track of exclusivity
        // Initialize totalTimesAssigned if it's not there
        (member)=>{
            return {...member,
            totalTimesAssigned: member.totalTimesAssigned || 0 }
        }
    );
    // Same as 'members', this is where task info is taken from here on
    let tasks = objToArr(tasksById);
    
    const newSched = {
        id: idGen('sched-'),
        startDate: startDateString,
        endDate: endDateString,
        sched: {}
    };

    // Stores moment objects
    const daysToGen = [];
    
    // Create new moment objects from strings parameters
    const startMomentObj = 
        moment(startDateString, 'YYYY-MM-DD');
    const endMomentObj = 
        moment(endDateString, 'YYYY-MM-DD');
    
    let newDate = startMomentObj; 
    for(let d = 0; newDate < endMomentObj; d++){
        // 'date()' sets date when given args, 
            // or retrieves when called without
        newDate = moment(startMomentObj).date(
            startMomentObj.date() + d
        );
        daysToGen.push(newDate);
    }

    // Builds sched data object for each day
    const finishedDaysArray = daysToGen.map(
        (momentObj)=>{
            const newDay = {
                // Turns date into consistent string
                id: dehydrateDate(momentObj),
                name: daysOfWeek[momentObj.day()].name,
                tasks: {}
            }

            const membsAssignedToday = []; // TODO
            const membsAssignedExclusive = []; // TODO
            const taskIdsAssignedToday = []; // TODO


            /*  The main loop is: 
                get task ids !taskIdsAssignedToday.includes(taskId)
                sort tasks by lowest available members
                choose lowest membered task to work with this iteration
                sort members by lowest times assigned total + times performing this task
                assign as many members as needed
                update info with times assigned, times assigned to task, and 
                assign task under it's id to newDay for the schedule info 
            */
            const tasksOnDay = daysOfWeek[momentObj.day()].tasks;
            for(let ti = 0; ti < tasksOnDay.length; ti++){

            // 'day' returns int that corresponds to daysOfWeek key with task list
            const tasksToGen = 
            daysOfWeek[momentObj.day()].tasks.map(
                // Returns array, so grabs only value
                taskId=>tasks.filter(task=>task.id === taskId)[0]
            // Filters tasks that have been assigned
            ).filter(task=>!taskIdsAssignedToday.includes(task.id));

            // Gets array of tasks with total available members,
                // filters out already assigned to exclusive task
            const tasksWithAvailable = tasksToGen.map((task)=>{
                const newAvailable = task.groups.map((groupId)=>{

                    return groupsById[groupId].members;
                }).reduce(
                    // Concat all member lists
                    (prevMembList, currentMembList)=>prevMembList.concat(
                        // Filters duplicate ids
                        currentMembList.filter(
                            checkMembID=> !prevMembList.includes(checkMembID)
                        )
                    ), 
                    [] // <-- Second argument acts as 'prevMemblist' for first iteration
                
                ).filter( // <- Filter members assigned to exclusive task
                    // If task is exclusive, don't return a member that's assigned
                        // if not exclusive, don't return a member that's assigned to task that is
                    membId=>task.isExclusive ? 
                    !membsAssignedToday.includes(membId) :
                        !membsAssignedExclusive.includes(membId)

                ).filter(membId=>{ // <- filter members unavailable
                    // Get member
                    const member = members.filter(memb=>membId === memb.id)[0];
                    // If unavailable on today's date string, return false
                      // if no unavailableDates, member is available
                    return member.unavailableDates ? 
                        !member.unavailableDates.includes(dehydrateDate(momentObj)) :
                         true;
                });

                // TODO if no one is on available list, right now only returns list with one empty 'member'.
                    // Decide if that's a good idea
                const finishedAvailable = newAvailable;
                
                // Makes a wrapper for task, with an availableMemberIds prop
                const newTaskObj = {
                    ...task,
                    availableMemberIds: finishedAvailable
                };
                
                // Adds task obj with list of available members to 
                    // 'finishedWithAvailable'
                return newTaskObj;
            });

            // Sorts tasks by lowest number available members
            const tasksByAvailableMembs = tasksWithAvailable.sort(
                (task, nextTask)=>task.availableMemberIds.length - nextTask.availableMemberIds.length
            );

            // Makes makes task with least available members the task to work with
            const taskToAssign = tasksByAvailableMembs[0];          
            
            // Sort available members by times assigned
            const sortedMemberIds = taskToAssign.availableMemberIds.sort(
                (membId, nextMembId)=>{

                    // If this is the first time member has performed task, initialize id with 0
                    if(!taskToAssign.timesAssigned[membId]){ 
                        taskToAssign.timesAssigned[membId] = 0; }
                    if(!taskToAssign.timesAssigned[nextMembId]){ 
                        taskToAssign.timesAssigned[nextMembId] = 0; }
                    
                    
                    const membOneObj = members.filter((fMemb)=>fMemb.id === membId)[0];
                    const nextMembObj = members.filter((fMemb)=>fMemb.id === nextMembId)[0];

                    // Assigns final values to sort by
                    const membOneVal = membOneObj.totalTimesAssigned +
                        taskToAssign.timesAssigned[membId];
                    const membTwoVal = nextMembObj.totalTimesAssigned +
                        taskToAssign.timesAssigned[nextMembId];   
                    return membOneVal - membTwoVal;
                }
            ).slice(); // <--returns an array
                
                // Checks if there are assigned members
                const assignedMembers = sortedMemberIds.length > 0 ?
                // Assign amount of members needed
                 sortedMemberIds.filter(
                    (membId, index)=> index<taskToAssign.numNeeded
                ).map((membId)=>{
                    // Creates new object with member values for each assigned id
                    return {...members.filter(member=>{
                        return membId !== 'no1' ? 
                        member.id === membId ? true : false
                        : false;
                    })[0]}
                    }
                ): [];

                // If no one assigned, return empty object
                const assignedForTask = assignedMembers.length > 0 ?
                 arrToObj(assignedMembers) : {};
                
                // Assign task to day.tasks object
                    // doesn't get returned to state, so only grab values needed
                newDay.tasks[taskToAssign.id] = {
                    id: taskToAssign.id,
                    name: taskToAssign.name,
                    assigned: assignedForTask
                }

                // Extract ids to compare to main members list
                const assignedMembIds = assignedMembers.map((member)=>member.id);
                // Members and tasks source of truth for this function, so update times assigned 
                const newMembers = members.map((mainMemb)=>{
                    return assignedMembIds.includes(mainMemb.id) ? 
                        // If id was assigned, increment by 1
                        { ...mainMemb,
                            totalTimesAssigned: (mainMemb.totalTimesAssigned + 1)
                        } :
                        // If it wasn't assigned, return new object with values spread 
                        { ...mainMemb }
                });         
                // Updates number of times members assigned on this task
                // initialize with zero if it doesn't exist 
                const newTimesAssigned = {...taskToAssign.timesAssigned};
                assignedMembIds.forEach(aMembId=>{
                    newTimesAssigned[aMembId] = newTimesAssigned[aMembId] || 0;
                    newTimesAssigned[aMembId] = (newTimesAssigned[aMembId] + 1);
                });
                // Make new tasks list with updated values
                const newTasks = tasks.map(
                    (task)=> task.id === taskToAssign.id ?
                        {...task,
                            timesAssigned: newTimesAssigned
                        }
                        : task
                );


                // Reset sources of truth with updated values for next task iteration
                members = newMembers;
                tasks = newTasks;
                taskIdsAssignedToday.push(taskToAssign.id);
                
            };// End of forEach taskToAssign loop

            // Still 'map'-ing so need to return the finished day
            return newDay;
        } 

    )// End daysToGen.map    
    
    // Assigns day to sched with its string date as its prop key
    finishedDaysArray.forEach(day=>{
        newSched.sched[day.id] = {...day};
    });

    const newMembVals = arrToObj(members);
    const newTaskVals = arrToObj(tasks);
    
    return {
        newMembVals,
        newTaskVals,
        newSched
    };
}