import {TASK_ACT_TYPES as TYPES, 
    GROUP_ACT_TYPES as GROUP_TYPES,
    SCHED_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES } from '../actions/_ACTION_TYPES';
import {mainItems, updateSublist} from './GENERIC_REDUCERS';

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
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            // Check for & return local data OR
                // if none, an empty object 
            return {
                ...action.data.tasksById
            }
        }

        // action.newTask
        case TYPES.ADD_TASK:
            return mainItems.addNew(state, action.newTask);

        // action.taskId
        // action.newName
        case TYPES.EDIT_TASK_NAME:
            return mainItems.editName(state, action.taskId, action.newName);

        // action.taskIdList
        case TYPES.DELETE_TASKS: 
            return mainItems.delete(state, action.taskIdList);

        case TYPES.SET_IS_EXCLUSIVE:{
            const newState = {...state};
            newState[action.taskId].isExclusive = action.isExclusive;
            return newState;
        }
        case TYPES.SET_NUM_NEEDED: {
            const newState = {...state};
            newState[action.taskId].numNeeded = action.numNeeded;
            return newState;
        }
        // action.groupIds,
        // action.taskIds,
        case TYPES.UPDATE_GROUPS_ON_TASKS: {
            const newState = {...state};
            // If group id in list
            // overwrite it's members with new
            for(let tId of action.taskIds){
                newState[tId].groups = [...action.groupIds];
            }
            return {...newState};
        }

        // action.groupIds,
        // action.taskIds,
        case TYPES.ADD_GROUPS_TO_TASKS: 
            return updateSublist.addIds(
                state,
                action.taskIds,
                'groups',
                action.groupIds
            );

        // action.groupIds,
        // action.taskIds,
        case TYPES.DELETE_GROUPS_FROM_TASKS: 
            return updateSublist.deleteIds(
                state, 
                action.taskIds,
                'groups',
                action.groupIds
            );
        
        case GROUP_TYPES.DELETE_GROUPS:{
            const allIds = Object.keys(state);
            return updateSublist.deleteIds(state, allIds, 'groups', action.groupIdList);
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