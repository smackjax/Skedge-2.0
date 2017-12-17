import {MEMBER_ACT_TYPES as TYPES, 
    GROUP_ACT_TYPES as GROUP_TYPES,
    SCHED_ACT_TYPES as SCHED_TYPES,
    DATA_ACT_TYPES} from '../actions/_ACTION_TYPES';

// Generic reducer functions 
import {updateSublist, mainItems } from './GENERIC_REDUCERS';

export default function(state={
    membId1: {
        id: 'membId1',
        name: 'Smackjax',
        // Date strings by dehydrated date format
        unavailableDates: [['2017-09-15','2017-09-16','2017-09-17','2017-09-18']],
        // Times assigned gets added to 
        totalTimesAssigned: 0,
        groups: ['groupId1', 'groupId2']    
    },
    membId2: {
        id: 'membId2',
        name: 'The Kid',
         // Date strings by dehydrated date format
        unavailableDates: [],
        totalTimesAssigned: 0,
        groups: ['groupId1', 'groupId3']  
    },
    membId3: {
        id: 'membId3',
        name: 'TJ',
         // Date strings by dehydrated date format
        unavailableDates: [],
        totalTimesAssigned: 6,
        groups: ['groupId1']  
    },
}, action){
    const payload = action.payload;

    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            // Check for & return local data OR
                // if none, an empty object 
            return {
                ...action.data.membersById
            }
        }

        // payload is {...new member}
        case TYPES.SAVE_MEMBER:
            return mainItems.saveItem(state, payload);
        
        // payload is "membID"
        case TYPES.DELETE_MEMBER_BY_ID: 
            return mainItems.deleteById(state, payload);


        // - - GROUP SUBLIST FUNCTIONS
        // Listens for groups saved,
        // updating each member.groups array
        case GROUP_TYPES.SAVE_GROUP: {
           return updateSublist(
                state, 
                'groups', 
                action.savedGroup.id,
                action.savedGroup.members
            )
        }

        // Removes group id from all members if deleted
        case GROUP_TYPES.DELETE_GROUPS: {
            return updateSublist(
                state, 
                'groups',
                action.groupIds,
                [] // Id's to add groups to. Left blank because we only want ids removed.
            );
        }

        // Takes updated member timesAssigned values
        case SCHED_TYPES.SAVE_SCHED: {
            return {
                ...action.newMembVals
            }
        }

        default: return state
    }//end switch
}