import { GROUP_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import * as api from '../../_firebase/api';
import {
    addItem, 
    deleteItem, 
    addBulkIds, 
    removeBulkIds 
} from './_GENERIC.actions';

export default {
    saveGroup: (schedId, newGroup)=>{
        return (dispatch)=>{
            return api.saveGroup(schedId, newGroup)
            .then(success=>{
                const action = {
                    type: TYPE.SAVE_GROUP,
                    payload: newGroup
                }
                addItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log('Error saving group: ', err);
                throw Error("Couldn't save group")
            })
        }
    },
    deleteGroup: (schedId, groupId)=>{
        return (dispatch)=>{
            return api.deleteGroup(schedId, groupId)
            .then( success=> {
                const action = {
                    type: TYPE.DELETE_GROUP_BY_ID,
                    payload: groupId
                }
                deleteItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log("Error deleting group", err);
                throw Error("Couldn't delete group");
            })
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