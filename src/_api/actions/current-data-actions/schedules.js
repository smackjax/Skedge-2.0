// Schedules aren't stored in redux,
// so only one action affects the store
import { CHANGE_ACTIVE_SCHEDULE } from '../action-types';
import { deleteScheduleById as deleteFromRemote } from '../database';
import { getActiveSchedId } from './_utilityFuncs';

export const changeActiveSchedule = (scheduleObject)=>{
    return (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{
            dispatch({
                type: CHANGE_ACTIVE_SCHEDULE,
                payload: scheduleObject
            })
            resolve(true);
        })
    }
}

export const deleteScheduleById=(idToDelete)=>(
    (dispatch, getState)=>{
        const activeSchedId = getActiveSchedId(getState());

        if(activeSchedId === idToDelete){
            dispatch({
              type: CHANGE_ACTIVE_SCHEDULE,
              payload: {}
            })
        }
        
        return deleteFromRemote(idToDelete)
        .catch(err=>{
            console.log("Error deleting schedule", err);
            throw Error("Couldn't delete schedule");
        })
    }
)
    
