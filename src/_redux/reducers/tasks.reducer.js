import {TASK_ACT_TYPES as TYPES, 
    GROUP_ACT_TYPES as GROUP_TYPES,
    SCHED_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES } from '../actions/_ACTION_TYPES';
import {
    mainItems,
    bulkAddToSublist,
    bulkRemoveFromSublist
} from './GENERIC_REDUCERS';

export default function(state={
    taskId1: {
        id: 'taskId1',
        name: "Cannon swabber",
        groups: ['groupId1'],
        // Whether a member assigned here can be assigned to another task on the same day
        isExclusive: false, 
        // How many members need to be assigned TODO in gui
        numNeeded: 1,
        // Holds amount of times membId has been assigned to task
        timesAssigned : {
            'membId2': 1,
        }
    },
    taskId2: {
        id: 'taskId2',
        name: "Man the wheel",
        groups: ['groupId1', 'groupId2'],
        numNeeded: 1,
        isExclusive: false,
        timesAssigned : {
            'membId1': 0,
            'membId2': 0,
            'membId3': 0
        }
    },
    taskId3: {
        id: 'taskId3',
        name: "Hoist sail",
        groups: ['groupId2', 'groupId3'],
        numNeeded: 2,
        isExclusive: false,
        timesAssigned : {
            'membId1': 0,
            'membId4': 0,
            'membId3': 0
        }
    },
    taskId4: {
        id: 'taskId4',
        name: "Remove barnacles",
        groups: [],
        numNeeded: 1,
        isExclusive: false,
        timesAssigned : {
            'membId3' : 0
        }
    }
}, action){
    const payload = action.payload;
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            // Check for & return local data OR
                // if none, an empty object 
            return {
                ...payload.tasks
            }
        }

        // action.newTask
        case TYPES.SAVE_TASK:
            return mainItems.saveItem(state, payload);

        // action.taskIdList
        case TYPES.DELETE_TASK_BY_ID: 
            return mainItems.deleteById(state, payload);

        // GROUP Listeners
        case GROUP_TYPES.ADD_GROUP_IDS_TO_TASKS:{
            return bulkAddToSublist(
                state,
                payload.bulkIds,
                'groups',
                payload.primaryIds
            );
        }
        case GROUP_TYPES.REMOVE_GROUP_IDS_FROM_TASKS:{
            return bulkRemoveFromSublist(
                state,
                payload.bulkIds,
                'groups',
                payload.primaryIds
            );
        }
        case GROUP_TYPES.DELETE_GROUP_BY_ID:{
            const allIds = Object.keys(state);
            return bulkRemoveFromSublist(
                state,
                allIds,
                'groups',
                [payload]
            )
        }
        

        // Updates with task results from new sched generation
        case SCHED_TYPES.SCHED_GEN_SUCCESS: {
            return {
                ...action.newTaskVals
            }
        }

        default: return state
    }//end switch
}