import * as ACTIONS from '../../_action-types';

// Generic reducer functions 
import {
    deleteIdsByObject,
    updateByObject,
    overwriteByObject,
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
        case ACTIONS.LOAD_REDUX_STATE: 
            // Returns current state if no data
            return overwriteByObject(state, payload, 'members');

        case ACTIONS.CHANGE_ACTIVE_SCHEDULE: 
            // Returns empty object if no data
            return overwriteByObject(state, payload, 'members', true);  

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
            return updateByObject(state, payload, 'members');

        // TODO switch to update object
        case ACTIONS.SAVE_NEW_DATE_RANGE: 
            return updateByObject(state, payload, 'members');
        

        default: return state
    } //end switch
}