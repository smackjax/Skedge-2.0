import {
    addToSublist,
    deleteIdsFromStoreItems
} from './_base-funcs';

export const saveTask=(store, newTaskObj )=>{
    return {
        tasks: {
            [newTaskObj.id]: newTaskObj
        }
    }
}

export const deleteTaskById=(store, taskId)=>{
    const allDayIds = Object.keys(store.days);
    return deleteIdsFromStoreItems(store, 'days', allDayIds, 'tasks', [taskId], true);
}

export const addTaskIdsToDayIds=(store, taskIds, dayIds)=>{
    return addToSublist(store, 'days', dayIds, 'tasks', taskIds);
}
export const removeTaskIdsFromDayIds=(store, taskIds, dayIds)=>{
    return deleteIdsFromStoreItems( store, 'days', dayIds, 'tasks', taskIds, false);
}