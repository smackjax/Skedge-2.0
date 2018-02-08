import { updateByObject, overwriteByObject } from './GENERIC_REDUCERS';
import * as ACTIONS from '../../_action-types';

const initialState={
    // At the very least, this always gets returned
    '0' : {
        id: '0',
        name: 'Sunday',
        tasks: []
    },
    '1' : {
        id: '1',
        name: 'Monday',
        tasks: []
    },
    '2' : {
        id: '2',
        name: 'Tuesday',
        tasks: []
    },
    '3' : {
        id: '3',
        name: 'Wednesday',
        tasks: []
    },
    '4' : {
        id: '4',
        name: 'Thursday',
        tasks: []
    },
    '5' : {
        id: '5',
        name: 'Friday',
        tasks: []
    },
    '6' : {
        id: '6',
        name: 'Saturday',
        tasks: []
    }
}


export default (state={
    ...initialState
}, action)=>{
    const payload = action.payload;
    switch(action.type){

        // There's a set amount of days, so update instead of overwrite 
        case ACTIONS.LOAD_REDUX_STATE:
            return overwriteByObject(state, payload, 'days', initialState);

        case ACTIONS.CHANGE_ACTIVE_SCHEDULE: 
            return overwriteByObject(state, payload, 'days', initialState);

        case ACTIONS.SAVE_DAY:
            return updateByObject(state, payload, 'days');

        // - - TASK LISTENERS
        case ACTIONS.ADD_TASK_IDS_TO_DAYS:
            return updateByObject(state, payload, 'days');

        case ACTIONS.REMOVE_TASK_IDS_FROM_DAYS:
            return updateByObject(state, payload, 'days');
        
        case ACTIONS.DELETE_TASK_BY_ID: 
            return updateByObject(state, payload, 'days');
        
        default: return state;
    }
}
