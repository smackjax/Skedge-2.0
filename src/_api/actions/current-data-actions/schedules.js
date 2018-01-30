// Schedules aren't stored in redux,
// so only one action affects the store
import { CHANGE_ACTIVE_SCHEDULE } from '../action-types';
import { deleteScheduleById as deleteFromRemote } from '../database';
import { getActiveSchedId } from './_utilityFuncs';

export const changeActiveSchedule = (scheduleObject)=>{
    return ({
        type: CHANGE_ACTIVE_SCHEDULE,
        payload: scheduleObject
    })
}

export const deleteScheduleById=(idToDelete)=>(
    (dispatch, getState)=>{
        const activeSchedId = getActiveSchedId(getState());
        if(activeSchedId === idToDelete){
            dispatch({
              type: CHANGE_ACTIVE_SCHEDULE,
              payload: {}
            })

            return deleteFromRemote(idToDelete)
            .catch(err=>{
                console.log("Error deleting schedule", err);
                throw Error("Couldn't delete schedule");
            })
        }
        else {
            console.log("OLY OXEN FREE");
            return Promise.resolve(true)

        }
    }
)
    
