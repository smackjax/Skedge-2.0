import {
    updateByObject,
    deleteIdsByObject,
    overwriteByObject
} from './GENERIC_REDUCERS';

import * as ACTIONS from '../../_action-types';

export default function(state={
    // groupId1: {
    //     id: 'groupId1',
    //     name: 'Cannoneers',
    //     members: [],      
    // },
    // groupId2: {
    //     id: 'groupId2',
    //     name: 'Crewmen',
    //     members: []  
    // },
    // groupId3: {
    //     id: 'groupId3',
    //     name: 'Captains',
    //     members: []  
    // },
}, action){
    const payload = action.payload;

    switch(action.type){
        case ACTIONS.LOAD_REDUX_STATE: 
            return updateByObject(state, payload, 'groups', true);

        case ACTIONS.CHANGE_ACTIVE_SCHEDULE: 
            return overwriteByObject(state, payload, 'groups');

        case ACTIONS.SAVE_GROUP: 
            return updateByObject(state, payload, 'groups');

        case ACTIONS.DELETE_GROUP_BY_ID:
            return deleteIdsByObject(state, payload, 'groups');

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