import {
    DATE_RANGE_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES 
} from '../actions/_ACTION_TYPES';

import {
    updateByObject,
    deleteIdsByObject
} from './GENERIC_REDUCERS';
import * as ACTIONS from '../../_action-types';
export default function(state={
    // taskId1: {
    //     id: 'taskId1',
    //     name: "Cannon swabber",
    //     groups: ['groupId1'],
    //     // Whether a member assigned here can be assigned to another task on the same day
    //     isExclusive: false, 
    //     numNeeded: 1,
    //     // Holds amount of times membId has been assigned to task
    //     timesAssigned : {
    //         'membId2': 1,
    //     }
    // },
    // taskId2: {
    //     id: 'taskId2',
    //     name: "Man the wheel",
    //     groups: ['groupId1', 'groupId2'],
    //     numNeeded: 1,
    //     isExclusive: false,
    //     timesAssigned : {
    //         'membId1': 0,
    //         'membId2': 0,
    //         'membId3': 0
    //     }
    // },
    // taskId3: {
    //     id: 'taskId3',
    //     name: "Hoist sail",
    //     groups: ['groupId2', 'groupId3'],
    //     numNeeded: 2,
    //     isExclusive: false,
    //     timesAssigned : {
    //         'membId1': 0,
    //         'membId4': 0,
    //         'membId3': 0
    //     }
    // },
    // taskId4: {
    //     id: 'taskId4',
    //     name: "Remove barnacles",
    //     groups: [],
    //     numNeeded: 1,
    //     isExclusive: false,
    //     timesAssigned : {
    //         'membId3' : 0
    //     }
    // }
}, action){
    const payload = action.payload;
    switch(action.type){

        case DATA_ACT_TYPES.LOAD: 
            return updateByObject(state, payload, 'tasks');

        case DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE:
            return updateByObject(state, payload, 'tasks', true);

        case ACTIONS.SAVE_TASK:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.DELETE_TASK_BY_ID: 
            return updateByObject(state, payload, 'tasks');

        // - - GROUP LISTENERS
        case ACTIONS.ADD_GROUP_IDS_TO_TASKS:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.REMOVE_GROUP_IDS_FROM_TASKS:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.DELETE_GROUP_BY_ID: 
            return updateByObject(state, payload, 'tasks');
        
        // Updates with task results from new sched generation
        case SCHED_TYPES.SAVE_NEW_DATE_RANGE: {
            return {
                ...state,
                ...payload.newTaskVals
            }
        }

        default: return state
    }//end switch
}