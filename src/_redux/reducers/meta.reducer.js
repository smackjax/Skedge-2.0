import {
    DATA_ACT_TYPES,
    META_DATA_ACT_TYPES,
    SCHED_ACT_TYPES
} from '../actions/_ACTION_TYPES';

export default (state={
    activeSchedId: '',
    linkedUsernames: {
        // "linkedName1" : "membId1",
        // "linkedName2" : "membId2",
        // "linkedName3" : "membId3",
        // "linkedName4" : "membId4",
    }

}, action)=>{
    const payload = action.payload;
    switch(action.type){
        case DATA_ACT_TYPES: {
            if(payload.meta){
                return {
                    ...payload.meta
                }
            }
            return state;

        }

        case META_DATA_ACT_TYPES.UPDATE_ACTIVE_SCHED_ID: {
            return {
                ...state,
                activeSchedId: payload
            }
        }

        case SCHED_ACT_TYPES.SAVE_NEW_SCHED: {
            return {
            ...state,
            activeSchedId: payload.newSched.id
            }

        }
        default: return state
    }
}