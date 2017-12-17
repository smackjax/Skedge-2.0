import {
    GROUP_ACT_TYPES as GROUP_TYPES, 
    MEMBER_ACT_TYPES as MEMB_TYPES,
    DATA_ACT_TYPES} from '../actions/_ACTION_TYPES';
import { 
    bulkAddToSublist,
    bulkRemoveFromSublist,
    syncStateWithNewSave,
    mainItems
} from './GENERIC_REDUCERS';

export default function(state={
    groupId1: {
        id: 'groupId1',
        name: 'Cannoneers',
        members: ['membId1', 'membId3', 'membId2'],      
    },
    groupId2: {
        id: 'groupId2',
        name: 'Crewmen',
        members: ['membId1']  
    },
    groupId3: {
        id: 'groupId3',
        name: 'Captains',
        members: ['membId2']  
    },
}, action){
    const payload = action.payload;

    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            return {
                ...action.data.groupsById
            }
        }

        // payload: {...group}
        case GROUP_TYPES.ADD_GROUP: 
            return mainItems.addNew(state, payload);

        // payload: <groupId>
        case GROUP_TYPES.DELETE_GROUP_BY_ID:
            return mainItems.delete(state, payload);


        // payload {
        //  primaryIds(membIds),
        //  bulkIds(groupIds)
        //}
        case MEMB_TYPES.ADD_MEMB_IDS_TO_GROUPS: {
            return bulkAddToSublist(
                state,
                payload.bulkIds,
                'members',
                payload.primaryIds
            );
        }
        case MEMB_TYPES.REMOVE_MEMB_IDS_FROM_GROUPS: {
            return bulkRemoveFromSublist(
                state,
                payload.bulkIds,
                'members',
                payload.primaryIds
            );
        }


        // payload: {<memb>}
        case MEMB_TYPES.SAVE_MEMBER: {
            return syncStateWithNewSave(
                state,
                payload.id,
                'members',
                payload.groups
            );
        }

        // payload: <membId>
        case MEMB_TYPES.DELETE_MEMBER_BY_ID: {
            const allIds = Object.keys(state);
            return bulkRemoveFromSublist(
                state,
                allIds,
                'members',
                [payload]
            )
        }

        default: return state
    }
}