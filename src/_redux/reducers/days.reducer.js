import { 
    DAYS_ACT_TYPES,
    TASK_ACT_TYPES,
    DATA_ACT_TYPES
} from '../actions/_ACTION_TYPES';
import {
    bulkAddToSublist,
    bulkRemoveFromSublist, 
    mainItems
} from './GENERIC_REDUCERS';

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
        tasks: []
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
    const payload = action.payload;
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            if(payload.days){   
                return {
                    ...payload.days
                }
            }
            return state;
        }

        case DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE: {
            // payload: scheduleObj
            if(payload.days){
                return {
                    ...payload.days
                }
            }
            return state;
        }

        case DAYS_ACT_TYPES.SAVE_DAY: {
            return mainItems.saveItem(state, payload)
        }

        case TASK_ACT_TYPES.ADD_TASK_IDS_TO_DAYS: {
            return bulkAddToSublist(
                state,
                payload.bulkIds,
                'tasks',
                payload.primaryIds
            )
        }
        case TASK_ACT_TYPES.REMOVE_TASK_IDS_FROM_DAYS: {
            return bulkRemoveFromSublist(
                state,
                payload.bulkIds,
                'tasks',
                payload.primaryIds
            )
        }
        
        // action.taskIdList
        case TASK_ACT_TYPES.DELETE_TASK_BY_ID: {
            const allIds = Object.keys(state);
            return bulkRemoveFromSublist(
                state,
                allIds,
                'tasks',
                [payload]
            )
        }
        default: return state;
    }
}
