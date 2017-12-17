import { TASK_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import {addItem, deleteItem, editItem, updateItem} from './_GENERIC.actions';

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
    }
    
}