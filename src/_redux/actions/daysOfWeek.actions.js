import { DAYS_ACT_TYPES } from './_ACTION_TYPES';
import {addItem, deleteItem, editItem, updateItem} from './_GENERIC.actions';

export default {
    updateTasksOnDays: (taskIds, dayIds)=>{
        return (dispatch)=>{
            const action = {
                type: DAYS_ACT_TYPES.SAVE_TASKS_ON_DAYS,
                payload: {
                    taskIds,
                    dayIds
                }
            }
            updateItem(dispatch, action);
        }
    },



}