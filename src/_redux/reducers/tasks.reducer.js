import {
    updateByObject,
    deleteIdsByObject,
    overwriteByObject
} from './GENERIC_REDUCERS';

import * as ACTIONS from '../../_action-types';

export default function(state={
    // taskId1: {
    //     id: 'taskId1',
    //     name: "Cannon swabber",
    //     groups: [],
    //     // Whether a member assigned here can be assigned to another task on the same day
    //     isExclusive: false, 
    //     numNeeded: 1,
    //     // Holds amount of times membId has been assigned to task
    //     timesAssigned : {
    //     }
    // },
    // taskId2: {
    //     id: 'taskId2',
    //     name: "Man the wheel",
    //     groups: [],
    //     numNeeded: 1,
    //     isExclusive: false,
    //     timesAssigned : {
    //     }
    // },
    // taskId3: {
    //     id: 'taskId3',
    //     name: "Hoist sail",
    //     groups: [],
    //     numNeeded: 2,
    //     isExclusive: false,
    //     timesAssigned : {
    //     }
    // },
    // taskId4: {
    //     id: 'taskId4',
    //     name: "Remove barnacles",
    //     groups: [],
    //     numNeeded: 1,
    //     isExclusive: false,
    //     timesAssigned : {
    //     }
    // }
}, action){
    const payload = action.payload;
    switch(action.type){

        case ACTIONS.LOAD_REDUX_STATE: 
            return overwriteByObject(state, payload, 'tasks');

        case ACTIONS.CHANGE_ACTIVE_SCHEDULE:
            return overwriteByObject(state, payload, 'tasks', true);

        case ACTIONS.SAVE_TASK:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.DELETE_TASK_BY_ID: 
            return deleteIdsByObject(state, payload, 'tasks');

        // - - GROUP LISTENERS
        case ACTIONS.ADD_GROUP_IDS_TO_TASKS:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.REMOVE_GROUP_IDS_FROM_TASKS:
            return updateByObject(state, payload, 'tasks');

        case ACTIONS.DELETE_GROUP_BY_ID: 
            return updateByObject(state, payload, 'tasks');
        
        // Updates with task results from new sched generation
        case ACTIONS.SAVE_NEW_DATE_RANGE: 
            return updateByObject(state, payload, 'tasks');
        
        default: return state
    }//end switch
}