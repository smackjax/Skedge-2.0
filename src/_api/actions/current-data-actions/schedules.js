// Schedules aren't stored in redux,
// so only one action affects the store
import { CHANGE_ACTIVE_SCHEDULE } from '../action-types';

export const changeActiveSchedule = (scheduleObject)=>{
    return ({
        type: CHANGE_ACTIVE_SCHEDULE,
        payload: scheduleObject
    })
}
