import { DATA_ACT_TYPES } from '../actions/_ACTION_TYPES';
import {
    updateByObject,
    deleteIdsByObject
} from './GENERIC_REDUCERS';

import * as ACTIONS from '../../_action-types';

export default function(state={
    // groupId1: {
    //     id: 'groupId1',
    //     name: 'Cannoneers',
    //     members: ['membId1', 'membId3', 'membId2'],      
    // },
    // groupId2: {
    //     id: 'groupId2',
    //     name: 'Crewmen',
    //     members: ['membId1']  
    // },
    // groupId3: {
    //     id: 'groupId3',
    //     name: 'Captains',
    //     members: ['membId2']  
    // },
}, action){
    const payload = action.payload;

    switch(action.type){
        case DATA_ACT_TYPES.LOAD: 
            return updateByObject(state, payload, 'groups');

        case DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE: 
            return updateByObject(state, payload, 'groups', true);

        case ACTIONS.SAVE_GROUP: 
            return updateByObject(state, payload, 'groups');

        case ACTIONS.DELETE_GROUP_BY_ID:
            return updateByObject(state, payload, 'groups');

        // -- MEMBER LISTENERS
        case ACTIONS.ADD_MEMBER_IDS_TO_GROUP_IDS:
            return updateByObject(state, payload, 'groups');

        case ACTIONS.REMOVE_MEMBER_IDS_FROM_GROUP_IDS:
            return updateByObject(state, payload, 'groups');

        case ACTIONS.SAVE_MEMBER: 
            return updateByObject(state, payload, 'groups');
        
        case ACTIONS.DELETE_MEMBER_BY_ID: 
            return updateByObject(state, payload, 'groups');

        default: return state
    }
}