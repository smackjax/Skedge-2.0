import * as ACTIONS from '../../_action-types';
import {
    updateByObject
} from './GENERIC_REDUCERS';

export default (state={
    // Holds interface type
    userType: "creator",
    activeSchedId: '',
    activeSchedName: "schedNameTest",
    activeDateRangeId: ""
}, action)=>{
    
    const payload = action.payload;
    
    switch(action.type){

        case ACTIONS.LOAD_REDUX_STATE: 
            return updateByObject(state, payload, 'meta');

        case ACTIONS.UPDATE_ACTIVE_SCHED_ID:
            return updateByObject(state, payload, 'meta');

        case ACTIONS.SAVE_NEW_DATE_RANGE: 
            return updateByObject(state, payload, 'meta');
        
        case ACTIONS.CHANGE_ACTIVE_SCHEDULE: {
            return {
                ...state,
                activeSchedName: payload.name,
                activeSchedId: payload.id,
                activeDateRangeId: (payload.activeDateRangeId || "")
            }
        }

        case ACTIONS.CHANGE_ACTIVE_DATE_RANGE_ID: 
            return updateByObject(state, payload, 'meta');
        

        case ACTIONS.SWITCH_USER_TYPE: 
            return updateByObject(state, payload, 'meta');

        default: return state
    }
}