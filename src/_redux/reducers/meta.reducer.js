import * as ACTIONS from '../../_action-types';
import {
    updateByObject
} from './GENERIC_REDUCERS';

export default (state={
    // Holds interface type
    userType: "creator",
    syncedWithRemote: true,
    activeSchedId: '',
    activeSchedName: "schedNameTest",
    activeDateRangeId: "",
    connectedToInternet: false
}, action)=>{
    
    const payload = action.payload;
    
    switch(action.type){

        case ACTIONS.LOAD_REDUX_STATE: 
            return updateByObject(state, payload, 'meta');

        case ACTIONS.UPDATE_ACTIVE_SCHED_ID:
            return updateByObject(state, payload, 'meta');

        case ACTIONS.CHANGE_SYNC_STATUS: {
            return updateByObject(state, payload, 'meta')
        }

        case ACTIONS.SAVE_NEW_DATE_RANGE: 
            return updateByObject(state, payload, 'meta');
        
        case ACTIONS.CHANGE_ACTIVE_SCHEDULE: {
            const activeSchedName = payload.id ? 
            (payload.name || "No sched name"):
            "(None active)"

            return {
                ...state,
                activeSchedName,
                activeSchedId: (payload.id || ""),
                activeDateRangeId: (payload.activeDateRangeId || "")
            }
        }

        case ACTIONS.CHANGE_ACTIVE_DATE_RANGE_ID: 
            return updateByObject(state, payload, 'meta');
        

        case ACTIONS.SWITCH_USER_TYPE: 
            return updateByObject(state, payload, 'meta');

        case ACTIONS.CHANGE_CONNECTED_STATUS:
            return updateByObject(state, payload, 'meta');

        default: return state
    }
}