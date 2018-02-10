import { cleanStatePiece, cleanMemberTimesAssigned } from './';

export default (state)=>{
    // Gets rid of item ids that don't correspond to an existing item
    const memberIds = Object.keys(state.members);
    const groupIds  = Object.keys(state.groups);
    const taskIds   = Object.keys(state.tasks);

    // members.groups
    const members = cleanStatePiece(state.members, 'groups', groupIds);
    // groups.members
    const groups = cleanStatePiece(state.groups, 'members', memberIds);
    // tasks.groups && tasks[id].timesAssigned
    const scrubbedTasks = cleanMemberTimesAssigned(state.tasks, memberIds);
    const tasks = cleanStatePiece(scrubbedTasks, 'groups', groupIds);
    // days.tasks
    const days = cleanStatePiece(state.days, 'tasks', taskIds);

    return {
        ...state,
        members,
        groups,
        tasks,
        days
    }
}