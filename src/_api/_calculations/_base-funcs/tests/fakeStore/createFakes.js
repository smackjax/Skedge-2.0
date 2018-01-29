export const createFakeMembers=(howMany, startIdFrom )=>{
    const results = {};
    const start = startIdFrom || 0;
    for(let i = 0; i < howMany; i++){
        const numbId = (i + 1) + start;
        const newMember = {
            id: "memberId" + numbId,
            name: "Member " + numbId,
            groups: [],
            timesAssigned: 0
        }
        results[newMember.id] = newMember;
    }
    return results;
}

export const createFakeGroups = (howMany, startIdFrom) => {
    const results = {};
    const start = startIdFrom || 0;
    for(let i = 0; i < howMany; i++){
        const numbId = (i + 1) + start;
        const newGroup = {
            id: "groupId" + numbId,
            name: "Group " + numbId,
            members: [],
        }
        results[newGroup.id] = newGroup;
    }
    return results;
}

export const createFakeTasks = (howMany, startIdFrom) => {
    const results = {};
    const start = startIdFrom || 0;
    for(let i = 0; i < howMany; i++){
        const numbId = (i + 1) + start;
        const newTask = {
            id: "taskId" + numbId,
            name: "Task " + numbId,
            groups: [],
            numNeeded: 1,
            isExclusive: false,
            timesAssigned: {}
        }
        results[newTask.id] = newTask;
    }
    return results;
}

export const createFakeDays = () => {
    const results = {};
    for(let i = 0; i < 7; i++){
        const numbId = i;
        const newDay = {
            id: numbId,
            name: "Day " + numbId,
            tasks: []
        }
        results[newDay.id] = newDay;
    }
    return results;
}