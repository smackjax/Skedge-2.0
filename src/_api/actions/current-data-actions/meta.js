import { 
    getActiveSchedId, 
    saveUpdatesAndPush 
} from './_utilityFuncs';

import {
    UPDATE_ACTIVE_SCHED_ID,
    CHANGE_ACTIVE_DATE_RANGE_ID,
    SWITCH_USER_TYPE,
    CHANGE_CONNECTED_STATUS
} from '../action-types';

import { updateUserInDatabase } from '../database';

// Meta data is stored directly on schedule object,
// so the update object needs a little modifying

export const changeActiveScheduleId = (scheduleId)=>(
    (dispatch, getState)=>{

        const metaUpdates = {
            activeSchedId: scheduleId
        }

        dispatch({
            type: UPDATE_ACTIVE_SCHED_ID,
            payload: {
                meta: metaUpdates
            }
        })
        // TODO get/store active schedule ID on users
    }
)

export const changeActiveDateRangeId = (dateRangeId)=>(
    (dispatch, getState)=>{
        const state = getState();
        const updates={
            meta: {
                activeDateRangeId: dateRangeId
            }
        }

        dispatch({
            type: CHANGE_ACTIVE_DATE_RANGE_ID,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
)

export const changeUserType = (newUserType)=>(
    (dispatch, getState)=>{

        const metaUpdates = {
            userType: newUserType
        }

        dispatch({
            type: SWITCH_USER_TYPE,
            payload: {
                meta: metaUpdates
            }
        })
        
        return updateUserInDatabase('userType', newUserType)
    }
)

// Takes bool
export const changeConnectedStatus = (status)=>{
    return {
        type: CHANGE_CONNECTED_STATUS,
        payload: {
            meta: {
                connectedToInternet: status
            }
        }
    }
}