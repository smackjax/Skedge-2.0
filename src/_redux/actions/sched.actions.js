import {
    SCHED_ACT_TYPES as TYPES,
    META_DATA_ACT_TYPES
} from './_ACTION_TYPES';

export default {
    schedGenSuccess: (schedData)=>{
        return {
            type: TYPES.SAVE_NEW_SCHED,
            payload: schedData
        }
    },
    changeActiveSchedId: (newSchedId)=>{
        return {
            type: META_DATA_ACT_TYPES.UPDATE_ACTIVE_SCHED_ID,
            payload: newSchedId
        }
    },
    deleteSchedById: (deleteId)=>{
        return {
            type: TYPES.DELETE_SCHED,
            payload: deleteId
        }
    }
}