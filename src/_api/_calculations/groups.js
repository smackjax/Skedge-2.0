import {
    addToSublist,
    deleteIdsFromStoreItems,
    saveItemAndSync
} from './_base-funcs';

export const saveGroup=(store, newGroupObj )=>{
    return saveItemAndSync(store, 'groups', newGroupObj, 'members');
}
export const deleteGroupById=(store, groupId)=>{
    const allMemberIds = Object.keys(store.members);
    const allTaskIds = Object.keys(store.tasks);
    const memberUpdates = deleteIdsFromStoreItems(store, 'members', allMemberIds,'groups', [groupId], true);
    const taskUpdates =  deleteIdsFromStoreItems(store, 'tasks', allTaskIds,'groups', [groupId], true);
    const updates = {
        ...memberUpdates,
        ...taskUpdates
    }
    return updates;
}
export const addGroupIdsToTaskIds=(store, groupIds, taskIds)=>{
    return addToSublist(store, 'tasks', taskIds, 'groups', groupIds);
}
export const removeGroupIdsFromTaskIds=(store, groupIds, taskIds)=>{
    return deleteIdsFromStoreItems( store, 'tasks', taskIds, 'groups', groupIds, false);
}