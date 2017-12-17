import { GROUP_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import {
    addItem, 
    deleteItem, 
    addBulkIds, 
    removeBulkIds 
} from './_GENERIC.actions';

export default {
    saveGroup: (newGroup)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.SAVE_GROUP,
                payload: newGroup
            }
            addItem(dispatch, action);
        }
    },
    deleteGroup: (groupId)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.DELETE_GROUP_BY_ID,
                payload: groupId
            }
            deleteItem(dispatch, action);
        }
    },
    // Bulk Actions
    addGroupsToTasks: (primaryIds, bulkIds)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.ADD_GROUP_IDS_TO_TASKS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            addBulkIds(dispatch, action)
        }
    },
    removeGroupsFromTasks: (primaryIds, bulkIds)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.REMOVE_GROUP_IDS_FROM_TASKS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            removeBulkIds(dispatch, action);
        }
    }
}