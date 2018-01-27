import {MEMBER_ACT_TYPES as TYPES, 
    GROUP_ACT_TYPES as GROUP_TYPES,
    DATE_RANGE_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES} from '../actions/_ACTION_TYPES';

// Generic reducer functions 
import {
    mainItems, 
    bulkAddToSublist, 
    bulkRemoveFromSublist,
    syncStateWithNewSave
} from './GENERIC_REDUCERS';

export default function(state={
    // membId1: {
    //     id: 'membId1',
    //     name: 'Smackjax',
    //     // Date strings by dehydrated date format
    //     unavailableDates: [['2017-09-15','2017-09-16','2017-09-17','2017-09-18']],
    //     // Times assigned gets added to 
    //     totalTimesAssigned: 0,
    //     groups: ['groupId1', 'groupId2']    
    // }
}, action){
    const payload = action.payload;

    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
           return { ...payload.members }
        }

        case DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE: {
            return { ...payload.members }
        }

        // payload is {...newMembersState}
        case TYPES.UPDATE_MEMBERS:
            return { ...payload }
        
        case TYPES.DELETE_MEMBER_IDS: 
            return {/* Delete items from state */ }

        default: return state
    }//end switch
}
