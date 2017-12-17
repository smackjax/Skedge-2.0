import { TASK_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import {
    addItem, 
    deleteItem,
    addBulkIds,
    removeBulkIds
} from './_GENERIC.actions';

export default {
    saveTask: (newTask)=>{
        return (dispatch)=>{
           const action = {
                type: TYPE.SAVE_TASK,
                payload: newTask
            }
            addItem(dispatch, action);
        }
    },
    deleteTask: (taskId)=>{
        return (dispatch)=>{
            const action =  {
                type: TYPE.DELETE_TASK_BY_ID,
                payload: taskId
            }
            deleteItem(dispatch, action);
        }
    },
    // Bulk Actions
    // primaryIds: <taskIds>
    // bulkIds: <dayIds>
    addTasksToDays: (primaryIds, bulkIds)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.ADD_TASK_IDS_TO_DAYS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            addBulkIds(dispatch, action)
        }
    },
    removeTasksFromDays: (primaryIds, bulkIds)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.REMOVE_TASK_IDS_FROM_DAYS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            removeBulkIds(dispatch, action);
        }
    }
}