// Master data api
// All data actions go through here, which return promises

// capture action that needs to take place
// Get current store
// Act upon retrieved store
// Take updated values and...
// Update redux store
// Save store to local data(in entirety)
/* .update({
    groups: {gId: {...newValues} } // Example,
    members: {mId: {...newValues}}
}) firebase with all affected objects */
import {
    updateSublist,
    bulkRemoveFromSublist,
    bulkAddToSublist,
    removeIdsFromAllSublists,
    syncStateWithNewSave,
    mainItems
} from './GENERIC_REDUCERS';
import { syncIdArraysWithUpdatedObjs } from './members/generix';



export const saveMember=( memberObj )=>{
    return (dispatch, store)=>{
        const updates = syncIdArraysWithUpdatedObjs(store, 'groups', [ memberObj ], 'members');
        
        Promise.resolve(
                dispatch({
                type: MEMBER_SAVE,
                payload: updates
            })
        )
        .then(success=>{
            // Save push updates firebase
            // return localData.syncUpdates(updates)
        })
    }
}
export const deleteMember=( memberId )=>{
    return (dispatch, store)=>{
        const groupIds = Object.keys(store.groups);
        const updates = deleteIdsFromItems(store, 'members', [memberId], 'groups', groupIds);
        Promise.resolve(
            dispatch({
                type: MEMBER_DELETE_BY_ID,
                payload: updates
            })
        )
    }
}
export const addMemberIdsToGroups=()=>{
    return (dispatch, store)=>{
        const updates = addMemberIdsToGroups(store, groupIds, memberIds)

        Promise.resolve(
            dispatch({
                type: MEMBER_DELETE_BY_ID,
                payload: memberId
            })
        )
    }
}

export const removeMemberIdsFromGroups=()=>{
    const updates = removeMemberIdsFromGroups(store, groupIds, memberIds)
}


export const saveGroup=(groupObj)=>{

}

export const deleteGroup=(groupId)=>{
    return (dispatch, store)=>{
        const memberIds = Object.keys(store.members);
        const updates = deleteIdsFromItems(store, 'groups', [groupId], 'members', memberIds);
        Promise.resolve(
            dispatch({
                type: GROUP_DELETE_BY_ID,
                payload: updates
            })
        )
    }
}

const saveTask=( taskObj )=>{
    // Delete from redux
    // Add to local updates object {taskObj.id: taskObj}
}
const deleteTask=( taskId )=>{
    return (dispatch, store)=>{
        const dayIds = Object.keys(store.days);
        const updates = deleteIdsFromItems(store, 'tasks', [taskId], 'days', dayIds);
        Promise.resolve(
            dispatch({
                type: GROUP_DELETE_BY_ID,
                payload: updates
            })
        )
    }
}
const addGroupIdsToTasks=(state, taskIds, groupIds)=>{
    return (dispatch, store)=>{
        const updatedTasks = bulkAddToSublist(state, taskIds, 'groups', groupIds);
        const updates = { tasks: updatedTasks };
        Promise.resolve(
            dispatch({
                type: ADD_GROUP_IDS_TO_TASKS,
                payload: updates
            })
        )
    }
}
const removeGroupIdsFromTasks=(state, taskIds, groupIds)=>{
    return (dispatch, store)=>{
        const updatedTasks = bulkRemoveFromSublist(state, taskIds, 'groups', groupIds);
        const updates = { tasks: updatedTasks };
        Promise.resolve(
            dispatch({
                type: REMOVE_GROUP_IDS_FROM_TASKS,
                payload: updates
            })
        )
    }
}

const saveDay=( dayObj )=>{
    // save to redux
    // save update to local
}
const addTaskIdsToDays=(state, dayIds, taskIds)=>{
    return (dispatch, store)=>{
        const updatedDays = bulkAddToSublist(state, dayIds, 'tasks', taskIds);
        const updates = { days: updatedDays };
        Promise.resolve(
            dispatch({
                type: ADD_TASK_IDS_TO_DAYS,
                payload: updates
            })
        )
    }
}
const removeTaskIdsFromDays=(state, dayIds, taskIds)=>{
    return (dispatch, store)=>{
        const updatedDays = bulkRemoveFromSublist(state, dayIds, 'tasks', taskIds);
        const updates = { days: updatedDays };
        Promise.resolve(
            dispatch({
                type: REMOVE_TASK_IDS_FROM_DAYS,
                payload: updates
            })
        )
    }
}