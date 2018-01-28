import {
    DATA_ACT_TYPES,
    META_DATA_ACT_TYPES,
    DATE_RANGE_ACT_TYPES
} from '../actions/_ACTION_TYPES';

export default (state={
    userType: "creator",
    activeSchedId: '',
    activeSchedName: "schedNameTest",
    activeDateRangeId: "",

    pendingViewers: [/*{},{}*/],
    authenticatedViewerIds: [/*"vId", "vId*/],


    linkedUsernames: {
        // "linkedName1" : "membId1",
        // "linkedName2" : "membId2",
        // "linkedName3" : "membId3",
        // "linkedName4" : "membId4",
    }
}, action)=>{
    
    const payload = action.payload;
    
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
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

        case DATE_RANGE_ACT_TYPES.SAVE_NEW_DATE_RANGE: {
            return {
            ...state,
            activeDateRangeId: payload.newDateRange.id
            }

        }

        case META_DATA_ACT_TYPES.CHANGE_ACTIVE_SCHEDULE: {
            // payload: { name, id, activeDateRangeId }
            return {
                ...state,
                activeSchedName: payload.name,
                activeSchedId: payload.id,
                activeDateRangeId: (payload.activeDateRangeId || "")
            }
        }

        case META_DATA_ACT_TYPES.CHANGE_ACTIVE_DATE_RANGE_ID: {
            // payload: newId
            return {
                ...state,
                activeDateRangeId: payload
            }
        }

        case META_DATA_ACT_TYPES.SWITCH_USER_TYPE: {
            // payload: userType
            return {
                ...state,
                userType: payload
            }
        }

        default: return state
    }
}