import {
    DATE_RANGE_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES
} from '../actions/_ACTION_TYPES';

import * as ACTIONS from '../../_action-types';

// Generic reducer functions 
import {
    deleteIdsByObject,
    updateByObject,
} from './GENERIC_REDUCERS';

export default function(state={
    membId1: {
        id: 'membId1',
        name: 'Smackjax',
        // Date strings by dehydrated date format
        unavailableDates: [['2017-09-15','2017-09-16','2017-09-17','2017-09-18']],
        // Times assigned gets added to 
        totalTimesAssigned: 0,
        groups: []    
    },
    membId2: {
        id: 'membId2',
        name: 'The Kid',
         // Date strings by dehydrated date format
        unavailableDates: [],
        totalTimesAssigned: 0,
        groups: []  
    },
    membId3: {
        id: 'membId3',
        name: 'TJ',
         // Date strings by dehydrated date format
        unavailableDates: [],
        totalTimesAssigned: 6,
        groups: []  
    },
}, action){
    const payload = action.payload;

    /* Updates are now calculated beforehand, 
    so payload is:
        {
            ...other updates
            members: {
                ...member data updates
            }
        }
    */
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: 
            // Returns current state if no data
            return updateByObject(state, payload, 'members');

        case DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE: 
            // Returns empty object if no data
            return updateByObject(state, payload, 'members', true);  

        case ACTIONS.SAVE_MEMBER: 
            return updateByObject(state, payload, 'members');
        
        case ACTIONS.DELETE_MEMBER_BY_ID:
            return deleteIdsByObject(state, payload, 'members');

        case ACTIONS.ADD_MEMBER_IDS_TO_GROUP_IDS: 
            return updateByObject(state, payload, 'members');
        
        case ACTIONS.REMOVE_MEMBER_IDS_FROM_GROUP_IDS: 
            return updateByObject(state, payload, 'members');
        

        // - - GROUP LISTENERS
        case ACTIONS.SAVE_GROUP: 
            return updateByObject(state, payload, 'members');

        // payload: <groupId>
        case ACTIONS.DELETE_GROUP_BY_ID: 
            return updateByObject(state, payload, 'members')

        // TODO switch to update object
        case SCHED_TYPES.SAVE_NEW_DATE_RANGE: {
            return {
                ...state,
                ...payload.newMembVals
            }
        }

        default: return state
    } //end switch
}