import { DAYS_ACT_TYPES,
    TASK_ACT_TYPES,
    DATA_ACT_TYPES
} from '../actions/_ACTION_TYPES';
import {updateSublist} from './GENERIC_REDUCERS';

export default (state={

    '0' : {
        id: '0',
        name: 'Sunday',
        tasks: []
    },
    '1' : {
        id: '1',
        name: 'Monday',
        tasks: []
    },
    '2' : {
        id: '2',
        name: 'Tuesday',
        tasks: []
    },
    '3' : {
        id: '3',
        name: 'Wednesday',
        tasks: ['taskId1']
    },
    '4' : {
        id: '4',
        name: 'Thursday',
        tasks: []
    },
    '5' : {
        id: '5',
        name: 'Friday',
        tasks: []
    },
    '6' : {
        id: '6',
        name: 'Saturday',
        tasks: []
    }



}, action)=>{
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            return {
                ...action.data.daysOfWeek 
            }
        }

        // action.taskIds
        // action.dayIds
        case DAYS_ACT_TYPES.UPDATE_TASKS_ON_DAYS: {
            const newState = {...state};
            for(let dayId of action.dayIds){
                newState[dayId].tasks = [...action.taskIds];
            }
            return {...newState};
        }

        // action.taskIdList
        // action.dayIdList
        case DAYS_ACT_TYPES.ADD_TASKS_TO_DAYS: 
            return updateSublist.addIds(state, action.dayIdList, 'tasks', action.taskIdList);

        // action.taskIdList
        // action.dayIdList
        case DAYS_ACT_TYPES.DELETE_TASKS_FROM_DAYS: 
            return updateSublist.deleteIds(state, action.dayIdList, 'tasks', action.taskIdList);
        
        // action.taskIdList
        case TASK_ACT_TYPES.DELETE_TASKS: {
            const allIds = Object.keys(state);
            return updateSublist.deleteIds(state, allIds, 'tasks', action.taskIdList);
        }
        default: return state;
    }
}
