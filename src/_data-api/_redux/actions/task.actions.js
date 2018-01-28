import { TASK_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import * as api from '../../_firebase/api';
import {
    addItem, 
    deleteItem,
    addBulkIds,
    removeBulkIds
} from './_GENERIC.actions';

export default {
    saveTask: (schedId, newTask)=>{
        return (dispatch)=>{
            return api.saveTask(schedId, newTask)
            .then(success=>{
                const action = {
                    type: TYPE.SAVE_TASK,
                    payload: newTask
                }
                addItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log('Error saving task: ', err);
                throw Error("Couldn't save task")
            })
        }
    },
    deleteTask: (schedId, taskId)=>{
        return (dispatch)=>{
            return api.deleteTask(schedId, taskId)
            .then( success=> {
                const action =  {
                    type: TYPE.DELETE_TASK_BY_ID,
                    payload: taskId
                }
                deleteItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log("Error deleting task", err);
                throw Error("Couldn't delete task");
            })

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