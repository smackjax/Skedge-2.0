import {
    UPDATE_ACTIVE_SCHED_ID,
    CHANGE_ACTIVE_DATE_RANGE_ID,
    SWITCH_USER_TYPE
} from '../action-types';

export const changeActiveScheduleId = (scheduleId)=>(
    (dispatch)=>{
        const updates = {
            meta: {
                activeSchedId: scheduleId
            }
        }

        dispatch({
            type: UPDATE_ACTIVE_SCHED_ID,
            payload: updates
        })
    }
)

export const changeActiveDateRangeId = (dateRangeId)=>(
    (dispatch)=>{
        const updates = {
            meta: {
                activeDateRangeId: dateRangeId
            }
        }

        dispatch({
            type: CHANGE_ACTIVE_DATE_RANGE_ID,
            payload: updates
        })
    }
)

export const switchUserType = (newUserType)=>(
    (dispatch)=>{
        const updates = {
            meta: {
                userType: newUserType
            }
        }

        dispatch({
            type: SWITCH_USER_TYPE,
            payload: updates
        })
    }
)