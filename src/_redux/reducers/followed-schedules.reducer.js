import {
    LOAD_REDUX_STATE,
    UPDATE_FOLLOWED_SCHEDULES,
    DELETE_FOLLOWED_SCHEDULE
} from '../../_action-types';

import {
    overwriteByObject,
    updateByObject,
    deleteIdsByObject,
} from './GENERIC_REDUCERS';

export default (state={/*
    ScheduleId: {
        id: scheduleId,
        name: scheduleName,
        activeDateRangeId: (id)
        data: { dateRangeData }
    }
*/}, action)=>{
    const payload = action.payload;
    switch(action.type){

        case LOAD_REDUX_STATE:
            return overwriteByObject(state, payload, 'followedSchedules');

        case UPDATE_FOLLOWED_SCHEDULES: 
            return updateByObject(state, payload, 'followedSchedules');

        case DELETE_FOLLOWED_SCHEDULE:
            return deleteIdsByObject(state, payload, 'followedSchedules');

        default: return state;
    }
}