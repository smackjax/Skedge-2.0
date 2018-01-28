import {
    DATE_RANGE_ACT_TYPES as TYPES,
    META_DATA_ACT_TYPES
} from './_ACTION_TYPES';
// TODO this will be unneeded if only pulling schedule list on one page, when mounted
export default {
    schedGenSuccess: (schedData)=>{
        return {
            type: TYPES.SAVE_NEW_DATE_RANGE,
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
            type: TYPES.DELETE_DATE_RANGE,
            payload: deleteId
        }
    },
    
}